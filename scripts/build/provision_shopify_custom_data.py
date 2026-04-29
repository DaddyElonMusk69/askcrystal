#!/usr/bin/env python3
"""Provision AskCrystal Shopify custom data definitions and seed metaobjects.

Default mode is a no-network dry run. Pass --apply to call Shopify Admin GraphQL.
The script is intentionally idempotent for V1: existing definitions and entries
are skipped, not overwritten.
"""

from __future__ import annotations

import argparse
import json
import os
import ssl
import sys
import time
import urllib.error
import urllib.parse
import urllib.request
from dataclasses import dataclass
from pathlib import Path
from typing import Any

REPO_ROOT = Path(__file__).resolve().parents[2]
DEFAULT_METAOBJECT_DEFINITIONS = REPO_ROOT / "data/shopify/metaobject-definitions.askcrystal.json"
DEFAULT_METAFIELD_DEFINITIONS = REPO_ROOT / "data/shopify/metafield-definitions.askcrystal.json"
DEFAULT_METAOBJECT_ENTRIES = REPO_ROOT / "data/shopify/metaobject-entries.askcrystal.json"

METAOBJECT_DEFINITION_BY_TYPE = """
query AskCrystalMetaobjectDefinitionByType($type: String!) {
  metaobjectDefinitionByType(type: $type) {
    id
    name
    type
    fieldDefinitions {
      key
      name
    }
  }
}
"""

CREATE_METAOBJECT_DEFINITION = """
mutation AskCrystalCreateMetaobjectDefinition($definition: MetaobjectDefinitionCreateInput!) {
  metaobjectDefinitionCreate(definition: $definition) {
    metaobjectDefinition {
      id
      name
      type
      fieldDefinitions {
        key
        name
      }
    }
    userErrors {
      field
      message
      code
    }
  }
}
"""

METAFIELD_DEFINITION_BY_IDENTIFIER = """
query AskCrystalMetafieldDefinition(
  $ownerType: MetafieldOwnerType!
  $namespace: String!
  $key: String!
) {
  metafieldDefinition(identifier: { ownerType: $ownerType, namespace: $namespace, key: $key }) {
    id
    name
    namespace
    key
    ownerType
    type {
      name
    }
    validations {
      name
      value
    }
  }
}
"""

CREATE_METAFIELD_DEFINITION = """
mutation AskCrystalCreateMetafieldDefinition($definition: MetafieldDefinitionInput!) {
  metafieldDefinitionCreate(definition: $definition) {
    createdDefinition {
      id
      name
      namespace
      key
      ownerType
      type {
        name
      }
    }
    userErrors {
      field
      message
      code
    }
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

CREATE_METAOBJECT = """
mutation AskCrystalCreateMetaobject($metaobject: MetaobjectCreateInput!) {
  metaobjectCreate(metaobject: $metaobject) {
    metaobject {
      id
      handle
      type
    }
    userErrors {
      field
      message
      code
    }
  }
}
"""


class ProvisioningError(RuntimeError):
    """Raised when the Shopify provisioning operation cannot continue."""


@dataclass
class ProvisioningCounts:
    metaobject_definitions_created: int = 0
    metaobject_definitions_existing: int = 0
    metafield_definitions_created: int = 0
    metafield_definitions_existing: int = 0
    metaobject_entries_created: int = 0
    metaobject_entries_existing: int = 0
    warnings: int = 0


def load_env_file(path: Path) -> None:
    if not path.exists():
        return
    for raw_line in path.read_text(encoding="utf-8").splitlines():
        line = raw_line.strip()
        if not line or line.startswith("#") or "=" not in line:
            continue
        key, value = line.split("=", 1)
        key = key.strip()
        if not key or key in os.environ:
            continue
        value = value.strip()
        if (value.startswith('"') and value.endswith('"')) or (value.startswith("'") and value.endswith("'")):
            value = value[1:-1]
        os.environ[key] = value


def load_project_env() -> None:
    load_env_file(REPO_ROOT / ".env")
    load_env_file(REPO_ROOT / ".env.local")
    load_env_file(REPO_ROOT / "deployables/shopify-app/.env")
    load_env_file(REPO_ROOT / "deployables/shopify-app/.env.local")


def load_json(path: Path) -> dict[str, Any]:
    try:
        return json.loads(path.read_text(encoding="utf-8"))
    except FileNotFoundError as exc:
        raise ProvisioningError(f"file not found: {path}") from exc
    except json.JSONDecodeError as exc:
        raise ProvisioningError(f"{path} is not valid JSON: {exc}") from exc


def normalize_shop_domain(value: str) -> str:
    value = value.strip()
    if value.startswith("https://"):
        value = value.removeprefix("https://")
    elif value.startswith("http://"):
        value = value.removeprefix("http://")
    return value.strip("/")


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


class ShopifyAdminClient:
    def __init__(self, *, store_domain: str, access_token: str, api_version: str) -> None:
        self.endpoint = f"https://{normalize_shop_domain(store_domain)}/admin/api/{api_version}/graphql.json"
        self.access_token = access_token
        self.ssl_context = build_ssl_context()

    def graphql(self, query: str, variables: dict[str, Any] | None = None) -> dict[str, Any]:
        payload = json.dumps({"query": query, "variables": variables or {}}).encode("utf-8")
        request = urllib.request.Request(
            self.endpoint,
            data=payload,
            headers={
                "Content-Type": "application/json",
                "X-Shopify-Access-Token": self.access_token,
            },
            method="POST",
        )
        body = ""
        for attempt in range(1, 5):
            try:
                with urllib.request.urlopen(request, timeout=30, context=self.ssl_context) as response:
                    body = response.read().decode("utf-8")
                break
            except urllib.error.HTTPError as exc:
                body = exc.read().decode("utf-8", errors="replace")
                if exc.code in {429, 500, 502, 503, 504} and attempt < 4:
                    wait_seconds = 2 ** attempt
                    print(f"  retry Shopify Admin API HTTP {exc.code} in {wait_seconds}s")
                    time.sleep(wait_seconds)
                    continue
                raise ProvisioningError(f"Shopify Admin API HTTP {exc.code}: {body}") from exc
            except urllib.error.URLError as exc:
                if attempt < 4:
                    wait_seconds = 2 ** attempt
                    print(f"  retry Shopify Admin API network error in {wait_seconds}s: {exc.reason}")
                    time.sleep(wait_seconds)
                    continue
                raise ProvisioningError(f"failed to reach Shopify Admin API: {exc.reason}") from exc

        try:
            decoded = json.loads(body)
        except json.JSONDecodeError as exc:
            raise ProvisioningError(f"Shopify Admin API returned non-JSON response: {body[:500]}") from exc

        if decoded.get("errors"):
            raise ProvisioningError(f"Shopify GraphQL errors: {json.dumps(decoded['errors'], ensure_ascii=False)}")
        return decoded.get("data") or {}


def build_ssl_context() -> ssl.SSLContext:
    """Use an explicit CA bundle when the local Python install has no default."""
    explicit_cafile = os.getenv("SSL_CERT_FILE") or os.getenv("REQUESTS_CA_BUNDLE")
    if explicit_cafile:
        return ssl.create_default_context(cafile=explicit_cafile)

    try:
        import certifi  # type: ignore
    except ImportError:
        return ssl.create_default_context()

    return ssl.create_default_context(cafile=certifi.where())


def fetch_admin_access_token_with_client_credentials(
    *,
    store_domain: str,
    client_id: str,
    client_secret: str,
    ssl_context: ssl.SSLContext,
) -> str:
    """Fetch a short-lived Admin API token for Shopify Dev Dashboard apps."""
    endpoint = f"https://{normalize_shop_domain(store_domain)}/admin/oauth/access_token"
    body = urllib.parse.urlencode(
        {
            "grant_type": "client_credentials",
            "client_id": client_id,
            "client_secret": client_secret,
        }
    ).encode("utf-8")
    request = urllib.request.Request(
        endpoint,
        data=body,
        headers={"Content-Type": "application/x-www-form-urlencoded"},
        method="POST",
    )
    try:
        with urllib.request.urlopen(request, timeout=30, context=ssl_context) as response:
            response_body = response.read().decode("utf-8")
    except urllib.error.HTTPError as exc:
        response_body = exc.read().decode("utf-8", errors="replace")
        raise ProvisioningError(f"Shopify token request HTTP {exc.code}: {response_body}") from exc
    except urllib.error.URLError as exc:
        raise ProvisioningError(f"failed to reach Shopify token endpoint: {exc.reason}") from exc

    try:
        decoded = json.loads(response_body)
    except json.JSONDecodeError as exc:
        raise ProvisioningError(f"Shopify token endpoint returned non-JSON response: {response_body[:500]}") from exc

    token = decoded.get("access_token")
    if not token:
        raise ProvisioningError(f"Shopify token endpoint did not return access_token: {response_body[:500]}")
    return str(token)


def resolve_admin_access_token(args: argparse.Namespace) -> str:
    if args.access_token:
        return args.access_token

    client_id = args.client_id or os.getenv("SHOPIFY_CLIENT_ID") or os.getenv("SHOPIFY_API_KEY") or ""
    client_secret = args.client_secret or os.getenv("SHOPIFY_CLIENT_SECRET") or os.getenv("SHOPIFY_API_SECRET") or ""
    if not client_id or not client_secret:
        raise ProvisioningError(
            "missing Shopify Admin credentials. Set SHOPIFY_ADMIN_ACCESS_TOKEN, or set "
            "SHOPIFY_CLIENT_ID/SHOPIFY_CLIENT_SECRET from the app's Client ID and Client secret"
        )

    print("No SHOPIFY_ADMIN_ACCESS_TOKEN found; requesting a short-lived Admin token with client credentials.")
    return fetch_admin_access_token_with_client_credentials(
        store_domain=args.store_domain,
        client_id=client_id,
        client_secret=client_secret,
        ssl_context=build_ssl_context(),
    )


def field_definition_payload(field: dict[str, Any]) -> dict[str, Any]:
    payload = {
        "key": field["key"],
        "name": field.get("name") or field["key"],
        "type": field["type"],
        "required": bool(field.get("required")),
    }
    if field.get("description"):
        payload["description"] = field["description"]
    return payload


def metaobject_definition_payload(definition: dict[str, Any], *, storefront_public_read: bool) -> dict[str, Any]:
    payload = {
        "name": definition["name"],
        "type": definition["type"],
        "description": definition.get("description") or "",
        "displayNameKey": definition.get("display_name_field") or "name",
        "fieldDefinitions": [field_definition_payload(field) for field in definition.get("fields", [])],
    }
    if storefront_public_read:
        payload["access"] = {
            "storefront": "PUBLIC_READ",
        }
    return payload


def metafield_definition_payload(
    definition: dict[str, Any],
    *,
    namespace: str,
    metaobject_definition_ids: dict[str, str],
    storefront_public_read: bool,
) -> dict[str, Any]:
    payload: dict[str, Any] = {
        "name": definition["name"],
        "namespace": namespace,
        "key": definition["key"],
        "type": definition["type"],
        "ownerType": "PRODUCT",
        "description": definition.get("ui_slot") or definition.get("name") or "",
    }
    if storefront_public_read:
        payload["access"] = {
            "storefront": "PUBLIC_READ",
        }
    if definition["type"].endswith("metaobject_reference"):
        metaobject_type = definition.get("metaobject_type")
        metaobject_definition_id = metaobject_definition_ids.get(metaobject_type or "")
        if not metaobject_definition_id:
            raise ProvisioningError(
                f"metafield {namespace}.{definition['key']} requires metaobject definition {metaobject_type}, "
                "but that definition was not found or created"
            )
        payload["validations"] = [
            {
                "name": "metaobject_definition_id",
                "value": metaobject_definition_id,
            }
        ]
    return payload


def encode_metaobject_field_value(value: Any) -> str:
    if isinstance(value, (list, dict)):
        return json.dumps(value, ensure_ascii=False)
    if value is None:
        return ""
    return str(value)


def metaobject_entry_payload(entry: dict[str, Any]) -> dict[str, Any]:
    fields = [
        {"key": key, "value": encode_metaobject_field_value(value)}
        for key, value in sorted((entry.get("fields") or {}).items())
        if value is not None
    ]
    return {
        "type": entry["type"],
        "handle": entry["handle"],
        "fields": fields,
    }


def warn_missing_fields(kind: str, name: str, expected_keys: set[str], existing_keys: set[str], counts: ProvisioningCounts) -> None:
    missing = sorted(expected_keys - existing_keys)
    if not missing:
        return
    counts.warnings += 1
    print(f"  ! existing {kind} {name} is missing fields: {', '.join(missing)}")


def provision_metaobject_definitions(
    client: ShopifyAdminClient | None,
    definitions: list[dict[str, Any]],
    *,
    apply: bool,
    storefront_public_read: bool,
    counts: ProvisioningCounts,
) -> dict[str, str]:
    definition_ids: dict[str, str] = {}
    print("Metaobject definitions")
    for definition in definitions:
        metaobject_type = definition["type"]
        expected_fields = {field["key"] for field in definition.get("fields", [])}
        if not apply:
            print(f"  dry-run create/verify {metaobject_type} ({len(expected_fields)} fields)")
            continue

        assert client is not None
        existing = client.graphql(METAOBJECT_DEFINITION_BY_TYPE, {"type": metaobject_type})["metaobjectDefinitionByType"]
        if existing:
            counts.metaobject_definitions_existing += 1
            definition_ids[metaobject_type] = existing["id"]
            existing_fields = {field["key"] for field in existing.get("fieldDefinitions", [])}
            print(f"  exists {metaobject_type} -> {existing['id']}")
            warn_missing_fields("metaobject definition", metaobject_type, expected_fields, existing_fields, counts)
            continue

        variables = {
            "definition": metaobject_definition_payload(definition, storefront_public_read=storefront_public_read),
        }
        result = client.graphql(CREATE_METAOBJECT_DEFINITION, variables)["metaobjectDefinitionCreate"]
        if result.get("userErrors"):
            raise ProvisioningError(
                f"failed to create metaobject definition {metaobject_type}: "
                f"{graphql_user_error_message(result['userErrors'])}"
            )
        created = result["metaobjectDefinition"]
        counts.metaobject_definitions_created += 1
        definition_ids[metaobject_type] = created["id"]
        print(f"  created {metaobject_type} -> {created['id']}")
    return definition_ids


def provision_metafield_definitions(
    client: ShopifyAdminClient | None,
    definitions: list[dict[str, Any]],
    *,
    namespace: str,
    apply: bool,
    storefront_public_read: bool,
    metaobject_definition_ids: dict[str, str],
    counts: ProvisioningCounts,
) -> None:
    print("Product metafield definitions")
    for definition in definitions:
        key = definition["key"]
        full_key = f"{namespace}.{key}"
        if not apply:
            print(f"  dry-run create/verify {full_key} [{definition['type']}]")
            continue

        assert client is not None
        existing = client.graphql(
            METAFIELD_DEFINITION_BY_IDENTIFIER,
            {"ownerType": "PRODUCT", "namespace": namespace, "key": key},
        )["metafieldDefinition"]
        if existing:
            counts.metafield_definitions_existing += 1
            print(f"  exists {full_key} -> {existing['id']}")
            continue

        variables = {
            "definition": metafield_definition_payload(
                definition,
                namespace=namespace,
                metaobject_definition_ids=metaobject_definition_ids,
                storefront_public_read=storefront_public_read,
            )
        }
        result = client.graphql(CREATE_METAFIELD_DEFINITION, variables)["metafieldDefinitionCreate"]
        if result.get("userErrors"):
            raise ProvisioningError(
                f"failed to create metafield definition {full_key}: "
                f"{graphql_user_error_message(result['userErrors'])}"
            )
        created = result["createdDefinition"]
        counts.metafield_definitions_created += 1
        print(f"  created {full_key} -> {created['id']}")


def provision_metaobject_entries(
    client: ShopifyAdminClient | None,
    entries: list[dict[str, Any]],
    *,
    apply: bool,
    counts: ProvisioningCounts,
) -> None:
    print("Metaobject entries")
    for entry in entries:
        entry_type = entry["type"]
        handle = entry["handle"]
        if not apply:
            print(f"  dry-run create/verify {entry_type}/{handle}")
            continue

        assert client is not None
        existing = client.graphql(METAOBJECT_BY_HANDLE, {"type": entry_type, "handle": handle})["metaobjectByHandle"]
        if existing:
            counts.metaobject_entries_existing += 1
            print(f"  exists {entry_type}/{handle} -> {existing['id']}")
            continue

        result = client.graphql(CREATE_METAOBJECT, {"metaobject": metaobject_entry_payload(entry)})["metaobjectCreate"]
        if result.get("userErrors"):
            raise ProvisioningError(
                f"failed to create metaobject entry {entry_type}/{handle}: "
                f"{graphql_user_error_message(result['userErrors'])}"
            )
        created = result["metaobject"]
        counts.metaobject_entries_created += 1
        print(f"  created {entry_type}/{handle} -> {created['id']}")


def validate_input_shape(metaobject_config: dict[str, Any], metafield_config: dict[str, Any], entries_config: dict[str, Any]) -> None:
    if not isinstance(metaobject_config.get("metaobjects"), list):
        raise ProvisioningError("metaobject definitions JSON must include a metaobjects list")
    if not isinstance(metafield_config.get("definitions"), list):
        raise ProvisioningError("metafield definitions JSON must include a definitions list")
    if entries_config and not isinstance(entries_config.get("entries"), list):
        raise ProvisioningError("metaobject entries JSON must include an entries list")


def print_summary(counts: ProvisioningCounts, *, apply: bool) -> None:
    mode = "applied" if apply else "dry-run"
    print(f"\nSummary ({mode})")
    print(f"  metaobject definitions created: {counts.metaobject_definitions_created}")
    print(f"  metaobject definitions existing: {counts.metaobject_definitions_existing}")
    print(f"  metafield definitions created: {counts.metafield_definitions_created}")
    print(f"  metafield definitions existing: {counts.metafield_definitions_existing}")
    print(f"  metaobject entries created: {counts.metaobject_entries_created}")
    print(f"  metaobject entries existing: {counts.metaobject_entries_existing}")
    print(f"  warnings: {counts.warnings}")


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--apply", action="store_true", help="Write changes to Shopify. Without this, only print a dry-run plan.")
    parser.add_argument("--skip-entries", action="store_true", help="Provision definitions only; skip seed metaobject entries.")
    parser.add_argument(
        "--private-storefront-access",
        action="store_true",
        help="Do not request PUBLIC_READ storefront access on created definitions.",
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
        default=os.getenv("SHOPIFY_ADMIN_API_VERSION", "2026-04"),
        help="Shopify Admin API version.",
    )
    parser.add_argument(
        "--metaobject-definitions",
        type=Path,
        default=DEFAULT_METAOBJECT_DEFINITIONS,
        help="Path to AskCrystal metaobject definition JSON.",
    )
    parser.add_argument(
        "--metafield-definitions",
        type=Path,
        default=DEFAULT_METAFIELD_DEFINITIONS,
        help="Path to AskCrystal product metafield definition JSON.",
    )
    parser.add_argument(
        "--metaobject-entries",
        type=Path,
        default=DEFAULT_METAOBJECT_ENTRIES,
        help="Path to AskCrystal seed metaobject entry JSON.",
    )
    return parser.parse_args()


def main() -> int:
    load_project_env()
    args = parse_args()

    metaobject_config = load_json(args.metaobject_definitions)
    metafield_config = load_json(args.metafield_definitions)
    entries_config = {} if args.skip_entries else load_json(args.metaobject_entries)
    validate_input_shape(metaobject_config, metafield_config, entries_config)

    if args.apply:
        if not args.store_domain:
            raise ProvisioningError("missing required Shopify environment value: SHOPIFY_STORE_DOMAIN")
        access_token = resolve_admin_access_token(args)
        client: ShopifyAdminClient | None = ShopifyAdminClient(
            store_domain=args.store_domain,
            access_token=access_token,
            api_version=args.api_version,
        )
    else:
        client = None
        print("Dry run only. Pass --apply to write to Shopify.")

    counts = ProvisioningCounts()
    storefront_public_read = not args.private_storefront_access
    metaobject_definitions = metaobject_config["metaobjects"]
    metafield_definitions = metafield_config["definitions"]
    namespace = metafield_config.get("namespace") or "askcrystal"
    entries = entries_config.get("entries", [])

    metaobject_definition_ids = provision_metaobject_definitions(
        client,
        metaobject_definitions,
        apply=args.apply,
        storefront_public_read=storefront_public_read,
        counts=counts,
    )
    provision_metafield_definitions(
        client,
        metafield_definitions,
        namespace=namespace,
        apply=args.apply,
        storefront_public_read=storefront_public_read,
        metaobject_definition_ids=metaobject_definition_ids,
        counts=counts,
    )
    if not args.skip_entries:
        provision_metaobject_entries(client, entries, apply=args.apply, counts=counts)

    print_summary(counts, apply=args.apply)
    return 0


if __name__ == "__main__":
    try:
        raise SystemExit(main())
    except ProvisioningError as exc:
        print(f"error: {exc}", file=sys.stderr)
        raise SystemExit(1)
