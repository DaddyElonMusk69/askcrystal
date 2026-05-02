#!/usr/bin/env python3
"""Sync AskCrystal product enrichment rows to Shopify product metafields.

Default mode is a local dry run. Pass --check-remote to resolve products and
material metaobjects without writing, or --apply to write metafields to Shopify.
"""

from __future__ import annotations

import argparse
import json
import os
import sys
from dataclasses import dataclass
from pathlib import Path
from typing import Any

from prepare_askcrystal_product_metafields import load_rows, parse_json_list, validate_rows
from provision_shopify_custom_data import (
    ShopifyAdminClient,
    ProvisioningError,
    load_json,
    load_project_env,
    resolve_admin_access_token,
)

REPO_ROOT = Path(__file__).resolve().parents[2]
DEFAULT_INPUT = REPO_ROOT / "data/shopify/templates/askcrystal-product-enrichment-template.csv"
DEFAULT_METAFIELD_DEFINITIONS = REPO_ROOT / "data/shopify/metafield-definitions.askcrystal.json"
DEFAULT_API_VERSION = "2026-04"

PRODUCT_BY_IDENTIFIER = """
query AskCrystalProductByHandle($handle: String!) {
  product: productByIdentifier(identifier: { handle: $handle }) {
    id
    handle
    title
  }
}
"""

METAOBJECT_BY_HANDLE = """
query AskCrystalMetaobjectByHandle($type: String!, $handle: String!) {
  metaobjectByHandle(handle: { type: $type, handle: $handle }) {
    id
    handle
    type
  }
}
"""

METAFIELDS_SET = """
mutation AskCrystalMetafieldsSet($metafields: [MetafieldsSetInput!]!) {
  metafieldsSet(metafields: $metafields) {
    metafields {
      id
      namespace
      key
      type
      value
      updatedAt
    }
    userErrors {
      field
      message
      code
    }
  }
}
"""

TAGS_ADD = """
mutation AskCrystalTagsAdd($id: ID!, $tags: [String!]!) {
  tagsAdd(id: $id, tags: $tags) {
    node {
      id
    }
    userErrors {
      field
      message
      code
    }
  }
}
"""

METAFIELD_SOURCES = {
    "primary_intention": "primary_intention",
    "secondary_intentions": "secondary_intentions_json",
    "product_form": "product_form",
    "crystal_materials": "crystal_material_handles_json",
    "artist": "artist_handle",
    "chakras": "chakra_keys_json",
    "color_families": "color_families_json",
    "ritual_uses": "ritual_uses_json",
    "gift_for": "gift_for_json",
    "western_elements": "western_elements_json",
    "five_elements": "five_elements_json",
    "zodiac_signs": "zodiac_signs_json",
    "energetic_properties": "energetic_properties_json",
    "archetype_name": "archetype_name",
    "story_headline": "story_headline",
    "story_summary": "story_summary",
    "benefits": "benefits_json",
    "ritual_title": "ritual_title",
    "ritual_steps": "ritual_steps_json",
    "care_steps": "care_steps_json",
    "included_items": "included_items_json",
    "quality_notes": "quality_notes_json",
    "pairing_notes": "pairing_notes",
    "safety_note": "safety_note",
    "agent_summary": "agent_summary",
    "agent_tags": "agent_tags_json",
    "data_status": "data_status",
}

REVIEWED_STATUSES = {"human_reviewed", "approved"}
SINGLE_METAOBJECT_REFS = {"artist": "askcrystal_artist"}


@dataclass
class ProductPlan:
    row_number: int
    handle: str
    title: str
    data_status: str
    product_id: str | None
    metafields: list[dict[str, str]]
    facet_tags: list[str]


@dataclass
class SyncCounts:
    rows_total: int = 0
    rows_skipped: int = 0
    rows_planned: int = 0
    rows_written: int = 0
    metafields_planned: int = 0
    metafields_written: int = 0
    facet_tags_planned: int = 0
    facet_tags_written: int = 0
    warnings: int = 0


def graphql_user_error_message(errors: list[dict[str, Any]]) -> str:
    parts: list[str] = []
    for error in errors:
        field = ".".join(str(part) for part in error.get("field") or [])
        message = error.get("message") or "unknown error"
        code = error.get("code")
        if field and code:
            parts.append(f"{field}: {message} ({code})")
        elif field:
            parts.append(f"{field}: {message}")
        elif code:
            parts.append(f"{message} ({code})")
        else:
            parts.append(message)
    return "; ".join(parts)


def chunked(items: list[dict[str, str]], size: int) -> list[list[dict[str, str]]]:
    return [items[index : index + size] for index in range(0, len(items), size)]


def load_metafield_types(path: Path) -> tuple[str, dict[str, str]]:
    config = load_json(path)
    namespace = config.get("namespace") or "askcrystal"
    definitions = config.get("definitions")
    if not isinstance(definitions, list):
        raise ProvisioningError(f"{path} must include a definitions list")
    return namespace, {definition["key"]: definition["type"] for definition in definitions}


def list_source_value(value: str, row_number: int, source_column: str) -> str:
    values = parse_json_list(value, row_number, source_column)
    return json.dumps(values, ensure_ascii=False)


def scalar_source_value(value: str) -> str:
    return value.strip()


def normalize_facet_value(value: str) -> str:
    return value.strip().lower().replace(" ", "_").replace("-", "_")


def facet_tag(prefix: str, value: str) -> str:
    return f"{prefix}:{normalize_facet_value(value)}"


def row_facet_tags(row: dict[str, str], row_number: int) -> list[str]:
    tags: set[str] = set()

    for material in parse_json_list(row.get("crystal_material_handles_json", ""), row_number, "crystal_material_handles_json"):
        tags.add(facet_tag("material", material))

    product_form = row.get("product_form", "").strip()
    if product_form:
        tags.add(facet_tag("form", product_form))

    primary_intention = row.get("primary_intention", "").strip()
    if primary_intention:
        tags.add(facet_tag("intention", primary_intention))
    for intention in parse_json_list(row.get("secondary_intentions_json", ""), row_number, "secondary_intentions_json"):
        tags.add(facet_tag("intention", intention))

    for chakra in parse_json_list(row.get("chakra_keys_json", ""), row_number, "chakra_keys_json"):
        tags.add(facet_tag("chakra", chakra))
    for sign in parse_json_list(row.get("zodiac_signs_json", ""), row_number, "zodiac_signs_json"):
        tags.add(facet_tag("zodiac", sign))
    for color in parse_json_list(row.get("color_families_json", ""), row_number, "color_families_json"):
        tags.add(facet_tag("color", color))
    for ritual_use in parse_json_list(row.get("ritual_uses_json", ""), row_number, "ritual_uses_json"):
        tags.add(facet_tag("ritual", ritual_use))
    for gift in parse_json_list(row.get("gift_for_json", ""), row_number, "gift_for_json"):
        tags.add(facet_tag("gift", gift))

    return sorted(tags)


def get_product_by_handle(client: ShopifyAdminClient, handle: str) -> dict[str, Any] | None:
    return client.graphql(PRODUCT_BY_IDENTIFIER, {"handle": handle})["product"]


def get_metaobject_id(client: ShopifyAdminClient, metaobject_type: str, handle: str) -> str | None:
    result = client.graphql(METAOBJECT_BY_HANDLE, {"type": metaobject_type, "handle": handle})["metaobjectByHandle"]
    if not result:
        return None
    return result["id"]


def resolve_material_ids(
    client: ShopifyAdminClient | None,
    *,
    row: dict[str, str],
    row_number: int,
    check_remote: bool,
    material_cache: dict[str, str],
) -> str:
    handles = parse_json_list(row.get("crystal_material_handles_json", ""), row_number, "crystal_material_handles_json")
    if not check_remote:
        return json.dumps(handles, ensure_ascii=False)

    assert client is not None
    material_ids: list[str] = []
    missing: list[str] = []
    for handle in handles:
        if handle not in material_cache:
            metaobject_id = get_metaobject_id(client, "askcrystal_crystal_material", handle)
            if metaobject_id:
                material_cache[handle] = metaobject_id
        if handle in material_cache:
            material_ids.append(material_cache[handle])
        else:
            missing.append(handle)
    if missing:
        raise ProvisioningError(
            f"row {row_number}: material metaobject handles not found in Shopify: {', '.join(missing)}"
        )
    return json.dumps(material_ids, ensure_ascii=False)


def resolve_single_metaobject_id(
    client: ShopifyAdminClient | None,
    *,
    handle: str,
    metafield_key: str,
    metaobject_type: str,
    row_number: int,
    check_remote: bool,
    metaobject_cache: dict[tuple[str, str], str],
) -> str:
    normalized_handle = handle.strip()
    if not check_remote:
        return json.dumps(normalized_handle, ensure_ascii=False)

    assert client is not None
    cache_key = (metaobject_type, normalized_handle)
    if cache_key not in metaobject_cache:
        metaobject_id = get_metaobject_id(client, metaobject_type, normalized_handle)
        if metaobject_id:
            metaobject_cache[cache_key] = metaobject_id
    if cache_key not in metaobject_cache:
        raise ProvisioningError(
            f"row {row_number}: {metafield_key} metaobject handle not found in Shopify: {normalized_handle}"
        )
    return metaobject_cache[cache_key]


def build_metafields_for_row(
    row: dict[str, str],
    *,
    row_number: int,
    namespace: str,
    metafield_types: dict[str, str],
    owner_id: str | None,
    client: ShopifyAdminClient | None,
    check_remote: bool,
    material_cache: dict[str, str],
    metaobject_cache: dict[tuple[str, str], str],
) -> list[dict[str, str]]:
    metafields: list[dict[str, str]] = []
    for key, source_column in METAFIELD_SOURCES.items():
        metafield_type = metafield_types.get(key)
        if not metafield_type:
            raise ProvisioningError(f"definition missing for metafield key: {key}")

        raw_value = row.get(source_column, "")
        if not raw_value.strip() and source_column not in {
            "western_elements_json",
            "five_elements_json",
            "zodiac_signs_json",
            "gift_for_json",
            "archetype_name",
            "pairing_notes",
            "artist_handle",
        }:
            raise ProvisioningError(f"row {row_number}: {source_column} is required for {namespace}.{key}")

        if not raw_value.strip():
            continue

        if key == "crystal_materials":
            value = resolve_material_ids(
                client,
                row=row,
                row_number=row_number,
                check_remote=check_remote,
                material_cache=material_cache,
            )
        elif key in SINGLE_METAOBJECT_REFS:
            value = resolve_single_metaobject_id(
                client,
                handle=raw_value,
                metafield_key=key,
                metaobject_type=SINGLE_METAOBJECT_REFS[key],
                row_number=row_number,
                check_remote=check_remote,
                metaobject_cache=metaobject_cache,
            )
        elif metafield_type.startswith("list."):
            value = list_source_value(raw_value, row_number, source_column)
        else:
            value = scalar_source_value(raw_value)

        metafield = {
            "namespace": namespace,
            "key": key,
            "type": metafield_type,
            "value": value,
        }
        if owner_id:
            metafield["ownerId"] = owner_id
        metafields.append(metafield)

    return metafields


def build_plans(
    rows: list[dict[str, str]],
    *,
    namespace: str,
    metafield_types: dict[str, str],
    client: ShopifyAdminClient | None,
    check_remote: bool,
    include_unreviewed: bool,
    limit: int | None,
    counts: SyncCounts,
) -> list[ProductPlan]:
    plans: list[ProductPlan] = []
    material_cache: dict[str, str] = {}
    metaobject_cache: dict[tuple[str, str], str] = {}

    selected_rows = rows[:limit] if limit else rows
    counts.rows_total = len(selected_rows)

    for offset, row in enumerate(selected_rows, start=2):
        handle = row.get("handle", "").strip()
        title = row.get("product_title", "").strip()
        data_status = row.get("data_status", "").strip()

        if not include_unreviewed and data_status not in REVIEWED_STATUSES:
            counts.rows_skipped += 1
            print(f"  skip {handle}: data_status={data_status} (pass --include-unreviewed to sync)")
            continue

        product_id: str | None = None
        if check_remote:
            assert client is not None
            product = get_product_by_handle(client, handle)
            if not product:
                raise ProvisioningError(f"row {offset}: product handle not found in Shopify: {handle}")
            product_id = product["id"]
            title = product.get("title") or title

        metafields = build_metafields_for_row(
            row,
            row_number=offset,
            namespace=namespace,
            metafield_types=metafield_types,
            owner_id=product_id,
            client=client,
            check_remote=check_remote,
            material_cache=material_cache,
            metaobject_cache=metaobject_cache,
        )
        facet_tags = row_facet_tags(row, offset)
        plans.append(
            ProductPlan(
                row_number=offset,
                handle=handle,
                title=title,
                data_status=data_status,
                product_id=product_id,
                metafields=metafields,
                facet_tags=facet_tags,
            )
        )
        counts.rows_planned += 1
        counts.metafields_planned += len(metafields)
        counts.facet_tags_planned += len(facet_tags)

    return plans


def write_plan(client: ShopifyAdminClient, plan: ProductPlan, counts: SyncCounts, *, sync_facet_tags: bool) -> None:
    for batch in chunked(plan.metafields, 25):
        result = client.graphql(METAFIELDS_SET, {"metafields": batch})["metafieldsSet"]
        if result.get("userErrors"):
            raise ProvisioningError(
                f"failed to sync metafields for {plan.handle}: {graphql_user_error_message(result['userErrors'])}"
            )
        counts.metafields_written += len(result.get("metafields") or [])
    if sync_facet_tags and plan.facet_tags:
        if not plan.product_id:
            raise ProvisioningError(f"cannot sync facet tags for {plan.handle}: product ID was not resolved")
        result = client.graphql(TAGS_ADD, {"id": plan.product_id, "tags": plan.facet_tags})["tagsAdd"]
        if result.get("userErrors"):
            raise ProvisioningError(
                f"failed to sync facet tags for {plan.handle}: {graphql_user_error_message(result['userErrors'])}"
            )
        counts.facet_tags_written += len(plan.facet_tags)
    counts.rows_written += 1


def resolve_client(args: argparse.Namespace) -> ShopifyAdminClient:
    if not args.store_domain:
        raise ProvisioningError("missing required Shopify environment value: SHOPIFY_STORE_DOMAIN")
    access_token = resolve_admin_access_token(args)
    return ShopifyAdminClient(
        store_domain=args.store_domain,
        access_token=access_token,
        api_version=args.api_version,
    )


def print_plan(plans: list[ProductPlan], *, check_remote: bool, apply: bool) -> None:
    mode = "apply" if apply else "remote check" if check_remote else "dry run"
    print(f"Product metafield sync plan ({mode})")
    for plan in plans:
        target = plan.product_id or "local-only"
        print(f"  {plan.handle} -> {target} ({len(plan.metafields)} metafields, {len(plan.facet_tags)} facet tags)")


def print_summary(counts: SyncCounts, *, check_remote: bool, apply: bool) -> None:
    mode = "applied" if apply else "remote check" if check_remote else "dry-run"
    print(f"\nSummary ({mode})")
    print(f"  rows total: {counts.rows_total}")
    print(f"  rows skipped: {counts.rows_skipped}")
    print(f"  rows planned: {counts.rows_planned}")
    print(f"  rows written: {counts.rows_written}")
    print(f"  metafields planned: {counts.metafields_planned}")
    print(f"  metafields written: {counts.metafields_written}")
    print(f"  facet tags planned: {counts.facet_tags_planned}")
    print(f"  facet tags written: {counts.facet_tags_written}")
    print(f"  warnings: {counts.warnings}")


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--apply", action="store_true", help="Write metafields to Shopify.")
    parser.add_argument(
        "--sync-facet-tags",
        action="store_true",
        help="When applying, also add generated collection facet tags to each Shopify product.",
    )
    parser.add_argument(
        "--check-remote",
        action="store_true",
        help="Resolve Shopify products and material metaobjects without writing.",
    )
    parser.add_argument(
        "--include-unreviewed",
        action="store_true",
        help="Allow syncing rows with data_status=draft or ai_filled.",
    )
    parser.add_argument("--limit", type=int, default=0, help="Limit number of CSV rows processed.")
    parser.add_argument("--input", type=Path, default=DEFAULT_INPUT, help="Path to enrichment CSV.")
    parser.add_argument(
        "--metafield-definitions",
        type=Path,
        default=DEFAULT_METAFIELD_DEFINITIONS,
        help="Path to AskCrystal product metafield definition JSON.",
    )
    parser.add_argument("--store-domain", default=os.getenv("SHOPIFY_STORE_DOMAIN", ""), help="Shopify myshopify domain.")
    parser.add_argument(
        "--access-token",
        default=os.getenv("SHOPIFY_ADMIN_ACCESS_TOKEN", ""),
        help="Shopify Admin API access token. If omitted, client credentials are used when configured.",
    )
    parser.add_argument(
        "--client-id",
        default=os.getenv("SHOPIFY_CLIENT_ID", "") or os.getenv("SHOPIFY_API_KEY", ""),
        help="Shopify app Client ID. Falls back to SHOPIFY_API_KEY for older env naming.",
    )
    parser.add_argument(
        "--client-secret",
        default=os.getenv("SHOPIFY_CLIENT_SECRET", "") or os.getenv("SHOPIFY_API_SECRET", ""),
        help="Shopify app Client secret. Falls back to SHOPIFY_API_SECRET for older env naming.",
    )
    parser.add_argument(
        "--api-version",
        default=os.getenv("SHOPIFY_ADMIN_API_VERSION", DEFAULT_API_VERSION),
        help="Shopify Admin API version.",
    )
    return parser.parse_args()


def main() -> int:
    load_project_env()
    args = parse_args()
    check_remote = bool(args.apply or args.check_remote)

    rows = load_rows(args.input)
    validate_rows(rows)
    namespace, metafield_types = load_metafield_types(args.metafield_definitions)

    client = resolve_client(args) if check_remote else None
    counts = SyncCounts()
    plans = build_plans(
        rows,
        namespace=namespace,
        metafield_types=metafield_types,
        client=client,
        check_remote=check_remote,
        include_unreviewed=args.include_unreviewed,
        limit=args.limit or None,
        counts=counts,
    )
    print_plan(plans, check_remote=check_remote, apply=args.apply)

    if args.apply:
        assert client is not None
        for plan in plans:
            write_plan(client, plan, counts, sync_facet_tags=args.sync_facet_tags)

    print_summary(counts, check_remote=check_remote, apply=args.apply)
    if not args.apply and not args.check_remote:
        print("\nNo Shopify calls were made. Pass --check-remote to resolve IDs or --apply to write.")
    return 0


if __name__ == "__main__":
    try:
        raise SystemExit(main())
    except ProvisioningError as exc:
        print(f"error: {exc}", file=sys.stderr)
        raise SystemExit(1)
