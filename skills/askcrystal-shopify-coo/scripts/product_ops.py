#!/usr/bin/env python3
"""Small repo-aware helpers for AskCrystal Shopify product operations."""

from __future__ import annotations

import argparse
import html
import http.client
import io
import json
import mimetypes
import os
import re
import shutil
import subprocess
import sys
import time
import uuid
import urllib.error
import urllib.request
from pathlib import Path
from typing import Any


def find_repo_root(start: Path) -> Path:
    current = start.resolve()
    for candidate in [current, *current.parents]:
        if (candidate / "data/shopify/catalog").exists() and (candidate / "scripts/askcrystal_shopify.py").exists():
            return candidate
    raise SystemExit("Could not find AskCrystal repo root from current path")


REPO_ROOT = find_repo_root(Path.cwd())
CATALOG_DIR = REPO_ROOT / "data/shopify/catalog"
PRODUCTS_DIR = CATALOG_DIR / "products"
ASSET_PRODUCTS_DIR = CATALOG_DIR / "assets/products"
FACETS_PATH = CATALOG_DIR / "facets.askcrystal.json"
MATERIALS_PATH = REPO_ROOT / "data/shopify/metaobject-entries.askcrystal.json"
METAFIELDS_PATH = REPO_ROOT / "data/shopify/metafield-definitions.askcrystal.json"
GENERATED_DIR = REPO_ROOT / "data/shopify/generated"
JIMENG_TASKS_DIR = GENERATED_DIR / "jimeng-tasks"
BUILD_SCRIPTS_DIR = REPO_ROOT / "scripts/build"
if str(BUILD_SCRIPTS_DIR) not in sys.path:
    sys.path.insert(0, str(BUILD_SCRIPTS_DIR))

from provision_shopify_custom_data import (  # noqa: E402
    ShopifyAdminClient,
    ProvisioningError,
    graphql_user_error_message,
    load_project_env,
    resolve_admin_access_token,
)

JEWELRY_FORMS = {"bracelet", "necklace", "ring", "earrings", "anklet", "pendant"}
PORTRAIT_ASPECT_RATIO = "3:4 portrait"
JIMENG_RATIO = "3:4"
IMAGE_EXTENSIONS = {".avif", ".gif", ".jpeg", ".jpg", ".png", ".webp"}

PRODUCT_SET = """
mutation AskCrystalProductSet($identifier: ProductSetIdentifiers, $input: ProductSetInput!, $synchronous: Boolean!) {
  productSet(identifier: $identifier, input: $input, synchronous: $synchronous) {
    product {
      id
      handle
      title
      status
      media(first: 50) {
        nodes {
          id
          alt
          mediaContentType
          status
        }
      }
      variants(first: 100) {
        nodes {
          id
          sku
          title
        }
      }
    }
    productSetOperation {
      id
      status
      userErrors {
        field
        message
        code
      }
    }
    userErrors {
      field
      message
    }
  }
}
"""

ASKCRYSTAL_METAFIELD_SOURCES = {
    "primary_intention": ("primary_intention", "scalar"),
    "secondary_intentions": ("secondary_intentions", "list"),
    "product_form": ("product_form", "scalar"),
    "crystal_materials": ("crystal_material_handles", "material_refs"),
    "chakras": ("chakras", "list"),
    "color_families": ("color_families", "list"),
    "ritual_uses": ("ritual_uses", "list"),
    "gift_for": ("gift_for", "list"),
    "western_elements": ("western_elements", "list"),
    "five_elements": ("five_elements", "list"),
    "zodiac_signs": ("zodiac_signs", "list"),
    "energetic_properties": ("energetic_properties", "list"),
    "archetype_name": ("archetype_name", "scalar_optional"),
    "story_headline": ("story_headline", "scalar"),
    "story_summary": ("story_summary", "scalar"),
    "benefits": ("benefits", "list"),
    "ritual_title": ("ritual_title", "scalar"),
    "ritual_steps": ("ritual_steps", "list"),
    "care_steps": ("care_steps", "list"),
    "included_items": ("included_items", "list"),
    "quality_notes": ("quality_notes", "list"),
    "pairing_notes": ("pairing_notes", "scalar_optional"),
    "safety_note": ("safety_note", "scalar"),
    "agent_summary": ("agent_summary", "scalar"),
    "agent_tags": ("agent_tags", "list"),
    "data_status": ("data_status", "scalar"),
}

OPTIONAL_LIST_FIELDS = {"gift_for", "western_elements", "five_elements", "zodiac_signs"}
REVIEWED_PRODUCT_STATUSES = {"human_reviewed", "approved"}

STAGED_UPLOADS_CREATE = """
mutation AskCrystalStagedUploadsCreate($input: [StagedUploadInput!]!) {
  stagedUploadsCreate(input: $input) {
    stagedTargets {
      url
      resourceUrl
      parameters {
        name
        value
      }
    }
    userErrors {
      field
      message
    }
  }
}
"""

COLLECTION_BY_IDENTIFIER = """
query AskCrystalCollectionByHandle($handle: String!) {
  collection: collectionByIdentifier(identifier: {handle: $handle}) {
    id
    handle
    title
  }
}
"""

METAOBJECT_BY_HANDLE = """
query AskCrystalMetaobjectByHandle($type: String!, $handle: String!) {
  metaobjectByHandle(handle: {type: $type, handle: $handle}) {
    id
    handle
    type
  }
}
"""


def load_json(path: Path) -> Any:
    return json.loads(path.read_text(encoding="utf-8"))


def write_json(path: Path, data: Any) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(json.dumps(data, indent=2, ensure_ascii=False) + "\n", encoding="utf-8")


def append_jsonl(path: Path, data: Any) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    with path.open("a", encoding="utf-8") as handle:
        handle.write(json.dumps(data, ensure_ascii=False) + "\n")


def slugify(value: str) -> str:
    value = value.lower().strip()
    value = re.sub(r"[^a-z0-9]+", "-", value)
    return value.strip("-")


def snake(value: str) -> str:
    return value.strip().lower().replace("-", "_").replace(" ", "_")


def values(items: list[str] | None) -> list[str]:
    output: list[str] = []
    for item in items or []:
        for part in item.split(","):
            normalized = snake(part)
            if normalized and normalized not in output:
                output.append(normalized)
    return output


def material_handles() -> list[str]:
    entries = load_json(MATERIALS_PATH).get("entries", [])
    return sorted(
        entry["handle"]
        for entry in entries
        if entry.get("type") == "askcrystal_crystal_material" and entry.get("handle")
    )


def axis_allowed(axis_key: str) -> list[str]:
    facets = load_json(FACETS_PATH).get("axes", [])
    for axis in facets:
        if axis.get("key") == axis_key:
            if axis.get("source") == "metaobject_entries":
                return material_handles()
            return sorted(str(item["value"]) for item in axis.get("values", []) if item.get("value"))
    return []


def ensure_allowed(name: str, selected: list[str], allowed: list[str]) -> None:
    invalid = sorted(set(selected) - set(allowed))
    if invalid:
        raise SystemExit(f"Invalid {name}: {', '.join(invalid)}. Allowed: {', '.join(allowed)}")


def generated_tags(product: dict[str, Any]) -> list[str]:
    ask = product.get("askcrystal") or {}
    facets = load_json(FACETS_PATH).get("axes", [])
    tags: set[str] = set()
    for axis in facets:
        prefix = axis.get("tag_prefix")
        if not prefix:
            continue
        raw_values: list[Any] = []
        for field in axis.get("local_fields") or [axis.get("local_field")]:
            if not field:
                continue
            value = ask.get(str(field))
            if isinstance(value, list):
                raw_values.extend(value)
            elif value:
                raw_values.append(value)
        allowed = {snake(str(value)) for value in axis_allowed(str(axis.get("key") or ""))}
        for value in raw_values:
            normalized = snake(str(value))
            if not allowed or normalized in allowed:
                tags.add(f"{prefix}:{normalized}")
    return sorted(tags)


def humanize(value: str) -> str:
    return value.replace("_", " ").replace("-", " ").strip()


def title_case(value: str) -> str:
    return humanize(value).title()


def truncate_text(value: str, limit: int) -> str:
    normalized = re.sub(r"\s+", " ", value).strip()
    if len(normalized) <= limit:
        return normalized
    return normalized[: max(0, limit - 1)].rstrip(" ,.;:-") + "..."


def product_image_facts(product: dict[str, Any]) -> dict[str, str]:
    ask = product.get("askcrystal") or {}
    materials = ", ".join(humanize(item) for item in ask.get("crystal_material_handles", [])) or "crystal"
    form = humanize(ask.get("product_form") or product.get("product_type") or "product")
    primary_intention = humanize(ask.get("primary_intention") or "intentional energy")
    colors = ", ".join(humanize(item) for item in ask.get("color_families", [])) or "natural crystal tones"
    chakras = ", ".join(humanize(item) for item in ask.get("chakras", [])) or "balanced energy"
    ritual_uses = ", ".join(humanize(item) for item in ask.get("ritual_uses", [])) or "daily ritual"
    return {
        "title": str(product.get("title") or "AskCrystal product"),
        "handle": str(product.get("handle") or slugify(str(product.get("title") or "product"))),
        "materials": materials,
        "form": form,
        "form_key": str(ask.get("product_form") or "").strip(),
        "primary_intention": primary_intention,
        "colors": colors,
        "chakras": chakras,
        "ritual_uses": ritual_uses,
    }


def wearable_model_instruction(form_key: str, product_phrase: str) -> str:
    placements = {
        "bracelet": (
            f"Faceless close-up of a model wearing {product_phrase} correctly on the wrist. "
            "Show wrist and lower forearm only; never place a bracelet on the neck, ear, ankle, or finger."
        ),
        "necklace": (
            f"Faceless close-up of a model wearing {product_phrase} correctly around the neck and collarbone. "
            "Crop below the nose and above the torso; never place a necklace on the wrist, finger, ear, or ankle."
        ),
        "ring": (
            f"Close-up of a model wearing {product_phrase} correctly on a finger. "
            "Show hand and fingers only; never place a ring on the neck, wrist, ear, or ankle."
        ),
        "earrings": (
            f"Faceless side close-up of a model wearing {product_phrase} correctly on the ear. "
            "Show ear, jawline, and hair detail without a full face; never place earrings on the neck, wrist, finger, or ankle."
        ),
        "anklet": (
            f"Close-up of a model wearing {product_phrase} correctly around the ankle. "
            "Show ankle and lower leg only; never place an anklet on the neck, wrist, ear, or finger."
        ),
        "pendant": (
            f"Faceless close-up of a model wearing {product_phrase} correctly as a pendant on a chain at the chest or collarbone. "
            "Crop below the nose and above the torso; never place a pendant on the wrist, finger, ear, or ankle."
        ),
    }
    return placements.get(
        form_key,
        f"Close-up of hands gently holding {product_phrase}, realistic scale, product clearly visible.",
    )


def lifestyle_model_instruction(form_key: str, product_phrase: str) -> str:
    placements = {
        "bracelet": "wrist and lower forearm",
        "necklace": "neck and collarbone",
        "ring": "hand and fingers",
        "earrings": "ear and jawline",
        "anklet": "ankle and lower leg",
        "pendant": "chest and collarbone",
    }
    placement = placements.get(form_key)
    if not placement:
        return f"Ritual lifestyle scene with {product_phrase} placed in a calm intentional setting, product still the focal point."
    return (
        f"Faceless lifestyle crop of a model wearing {product_phrase} correctly on the {placement} in a quiet ritual moment. "
        "Product remains the focal point, no full face, realistic scale and placement."
    )


def image_seo_metadata(product: dict[str, Any], shot: dict[str, str]) -> dict[str, Any]:
    facts = product_image_facts(product)
    title = facts["title"]
    role_label = title_case(shot["role"])
    material_keywords = [humanize(item) for item in (product.get("askcrystal") or {}).get("crystal_material_handles", [])]
    keywords = [
        title,
        facts["form"],
        facts["primary_intention"],
        *material_keywords,
        humanize(shot["role"]),
        "AskCrystal",
    ]
    deduped_keywords: list[str] = []
    for keyword in keywords:
        normalized = re.sub(r"\s+", " ", str(keyword)).strip()
        if normalized and normalized.lower() not in {item.lower() for item in deduped_keywords}:
            deduped_keywords.append(normalized)

    return {
        "seo_title": truncate_text(f"{title} | {role_label} Product Image", 70),
        "seo_description": truncate_text(
            f"{shot['alt']} for AskCrystal, featuring {facts['materials']} with a focus on "
            f"{facts['primary_intention']} and {facts['ritual_uses']} use.",
            160,
        ),
        "caption": truncate_text(
            f"{title} shown as a {humanize(shot['role'])} view for {facts['primary_intention']} rituals.",
            140,
        ),
        "keywords": deduped_keywords[:10],
    }


def generic_image_style_prompt() -> str:
    return (
        "Transform the provided image into a high-end luxury product photograph. Preserve the exact product design, "
        "materials, and colors without alteration. Place it on a subtle dark mineral surface with a deep navy-to-black "
        "gradient background and faint particle bokeh. Use controlled cinematic studio lighting: soft directional key "
        "light, gentle fill, and a warm rim light for separation. Add subtle backlighting to enhance translucency and "
        "internal glow in crystal materials. Emphasize material quality with crisp specular highlights, internal "
        "reflections, and light scattering. Keep highlights sharp and premium, not blown out. Ensure the full product "
        "is sharp and clearly visible, with a softly blurred background. Apply a refined luxury grade: deep contrast, "
        "clean blacks, slightly cool shadows, warm highlights, enhanced micro-contrast, and a very subtle glow only in "
        "highlights and translucent areas. Keep composition clean, centered, and visually striking, realistic but "
        "elevated and eye-catching."
    )


def negative_image_prompt() -> str:
    return (
        "No text, no typography, no logo, no watermark, no price tag, no medical claims, no extra unrelated products, "
        "no distorted jewelry structure, no broken chain, no deformed hands, no visible face for model shots, "
        "no unrealistic oversized crystal unless explicitly part of the product."
    )


def image_shot_specs(product: dict[str, Any]) -> list[dict[str, str]]:
    facts = product_image_facts(product)
    is_jewelry = facts["form_key"] in JEWELRY_FORMS
    product_phrase = f"{facts['title']}, a {facts['materials']} {facts['form']}"
    context = (
        f"Product facts: material={facts['materials']}; form={facts['form']}; "
        f"primary intention={facts['primary_intention']}; color family={facts['colors']}; "
        f"chakra association={facts['chakras']}; ritual use={facts['ritual_uses']}."
    )

    wearing_closeup = wearable_model_instruction(facts["form_key"], product_phrase)
    lifestyle_model = lifestyle_model_instruction(facts["form_key"], product_phrase)
    side_or_back = (
        f"Back or side detail view of {product_phrase}, showing clasp, band, setting, chain, hook, or closure construction where applicable."
        if is_jewelry
        else f"Side profile view of {product_phrase}, showing depth, texture, edges, and silhouette."
    )

    shots = [
        {
            "id": "01_hero_front",
            "filename": "01-hero-front.webp",
            "role": "hero",
            "alt": f"{facts['title']} front view on a dark atmospheric backdrop",
            "brief": f"Front-facing ecommerce hero image of {product_phrase}, full product visible, centered, clean composition.",
        },
        {
            "id": "02_three_quarter",
            "filename": "02-three-quarter.webp",
            "role": "alternate_angle",
            "alt": f"{facts['title']} angled three-quarter product view",
            "brief": f"Three-quarter angled view of {product_phrase}, full product visible, dimensional highlights, clear silhouette.",
        },
        {
            "id": "03_side_or_back_detail",
            "filename": "03-side-or-back-detail.webp",
            "role": "construction_detail",
            "alt": f"{facts['title']} side or closure detail",
            "brief": side_or_back,
        },
        {
            "id": "04_macro_crystal",
            "filename": "04-macro-crystal.webp",
            "role": "macro",
            "alt": f"{facts['title']} crystal texture close-up",
            "brief": f"Extreme macro close-up of the {facts['materials']} surface, natural texture, inclusions, polish or raw edges visible.",
        },
        {
            "id": "05_scale_in_hand",
            "filename": "05-scale-in-hand.webp",
            "role": "scale",
            "alt": f"{facts['title']} shown in hand for scale",
            "brief": f"Scale reference shot of {product_phrase} resting in or near a hand, realistic size, product in focus.",
        },
        {
            "id": "06_faceless_wearing_closeup",
            "filename": "06-faceless-wearing-closeup.webp",
            "role": "wearing_closeup" if is_jewelry else "hands_closeup",
            "alt": f"{facts['title']} faceless model close-up" if is_jewelry else f"{facts['title']} held in hands close-up",
            "brief": wearing_closeup,
        },
        {
            "id": "07_lifestyle_context",
            "filename": "07-lifestyle-context.webp",
            "role": "lifestyle",
            "alt": f"{facts['title']} lifestyle ritual context",
            "brief": lifestyle_model,
        },
        {
            "id": "08_ritual_still_life",
            "filename": "08-ritual-still-life.webp",
            "role": "ritual",
            "alt": f"{facts['title']} styled for {facts['ritual_uses']} ritual use",
            "brief": f"Still-life ritual scene for {facts['ritual_uses']} with {product_phrase}, product clearly dominant, minimal supporting props.",
        },
        {
            "id": "09_packaging_flatlay",
            "filename": "09-packaging-flatlay.webp",
            "role": "packaging",
            "alt": f"{facts['title']} packaging flat lay",
            "brief": f"Premium flat lay of {product_phrase} with simple pouch or care card styling, no readable text, ready-for-gift presentation.",
        },
    ]

    style = generic_image_style_prompt()
    negative = negative_image_prompt()
    for shot in shots:
        shot["aspect_ratio"] = PORTRAIT_ASPECT_RATIO
        shot.update(image_seo_metadata(product, shot))
        shot["prompt"] = (
            f"{style} Shot-specific direction: {shot['brief']} {context} Use {PORTRAIT_ASPECT_RATIO} framing. "
            f"Negative requirements: {negative}"
        )
        shot["review_status"] = "prompt_ready"
        shot["source"] = "ai_generated"
    return shots


def run_repo_command(args: list[str]) -> int:
    return subprocess.call(args, cwd=REPO_ROOT)


def load_product(handle: str) -> tuple[Path, dict[str, Any]]:
    product_path = PRODUCTS_DIR / f"{handle}.json"
    if not product_path.exists():
        raise SystemExit(f"Product file not found: {product_path}")
    return product_path, load_json(product_path)


def resolve_shopify_client(args: argparse.Namespace) -> ShopifyAdminClient:
    load_project_env()
    args.store_domain = args.store_domain or os.getenv("SHOPIFY_STORE_DOMAIN", "")
    args.access_token = args.access_token or os.getenv("SHOPIFY_ADMIN_ACCESS_TOKEN", "")
    args.client_id = args.client_id or os.getenv("SHOPIFY_CLIENT_ID", "") or os.getenv("SHOPIFY_API_KEY", "")
    args.client_secret = args.client_secret or os.getenv("SHOPIFY_CLIENT_SECRET", "") or os.getenv("SHOPIFY_API_SECRET", "")
    if args.api_version == "2026-04":
        args.api_version = os.getenv("SHOPIFY_ADMIN_API_VERSION", args.api_version)

    if not args.store_domain:
        raise SystemExit("missing SHOPIFY_STORE_DOMAIN")
    try:
        access_token = resolve_admin_access_token(args)
    except ProvisioningError as exc:
        raise SystemExit(f"error: {exc}") from exc
    return ShopifyAdminClient(store_domain=args.store_domain, access_token=access_token, api_version=args.api_version)


def text_to_description_html(value: str) -> str:
    paragraphs = [paragraph.strip() for paragraph in re.split(r"\n{2,}", value or "") if paragraph.strip()]
    if not paragraphs:
        return ""
    return "\n".join(f"<p>{html.escape(paragraph).replace(chr(10), '<br>')}</p>" for paragraph in paragraphs)


def product_status_input(value: Any) -> str:
    normalized = str(value or "").strip().lower()
    if normalized == "active":
        return "ACTIVE"
    if normalized == "archived":
        return "ARCHIVED"
    return "DRAFT"


def product_seo_input(product: dict[str, Any]) -> dict[str, str]:
    ask = product.get("askcrystal") or {}
    title = str(product.get("title") or "")
    headline = str(ask.get("story_headline") or title)
    summary = str(ask.get("story_summary") or product.get("description") or "")
    return {
        "title": truncate_text(f"{title} | {headline}", 70),
        "description": truncate_text(summary, 320),
    }


def product_options_input(product: dict[str, Any]) -> list[dict[str, Any]]:
    options: list[dict[str, Any]] = []
    for option in product.get("options") or []:
        values_payload = [{"name": str(value)} for value in option.get("values", []) if str(value).strip()]
        if values_payload:
            options.append({"name": str(option["name"]), "values": values_payload})
    return options


def product_variants_input(product: dict[str, Any]) -> list[dict[str, Any]]:
    options = product.get("options") or []
    option_names = [str(option.get("name") or f"Option {index}") for index, option in enumerate(options, start=1)]
    variants: list[dict[str, Any]] = []
    for variant in product.get("variants") or []:
        option_values = [
            {"optionName": option_name, "name": str(value)}
            for option_name, value in zip(option_names, variant.get("option_values") or [])
        ]
        payload: dict[str, Any] = {
            "price": str(variant["price"]),
            "sku": str(variant["sku"]),
            "optionValues": option_values,
        }
        if variant.get("compare_at_price") is not None:
            payload["compareAtPrice"] = str(variant["compare_at_price"])
        if variant.get("barcode") is not None:
            payload["barcode"] = str(variant["barcode"])
        if "taxable" in variant:
            payload["taxable"] = bool(variant["taxable"])
        if "requires_shipping" in variant:
            payload["inventoryItem"] = {"requiresShipping": bool(variant["requires_shipping"])}
        variants.append(payload)
    return variants


def remote_metaobject_id_by_handle(client: ShopifyAdminClient, metaobject_type: str, handle: str) -> str | None:
    try:
        result = client.graphql(METAOBJECT_BY_HANDLE, {"type": metaobject_type, "handle": handle})["metaobjectByHandle"]
    except ProvisioningError as exc:
        raise SystemExit(f"error fetching metaobject {metaobject_type}/{handle}: {exc}") from exc
    if not result:
        return None
    return str(result["id"])


def remote_collection_id_by_handle(client: ShopifyAdminClient, handle: str) -> str | None:
    try:
        result = client.graphql(COLLECTION_BY_IDENTIFIER, {"handle": handle})["collection"]
    except ProvisioningError as exc:
        raise SystemExit(f"error fetching collection {handle}: {exc}") from exc
    if not result:
        return None
    return str(result["id"])


def metafield_value_for_product(
    *,
    client: ShopifyAdminClient | None,
    askcrystal: dict[str, Any],
    local_key: str,
    mode: str,
    material_cache: dict[str, str],
    resolve_remote_refs: bool,
) -> str | None:
    value = askcrystal.get(local_key)
    if mode == "scalar_optional":
        return None if value is None or str(value).strip() == "" else str(value)
    if mode == "scalar":
        return str(value or "")
    if mode == "list":
        values_payload = value if isinstance(value, list) else []
        if not values_payload and local_key in OPTIONAL_LIST_FIELDS:
            return None
        return json.dumps(values_payload, ensure_ascii=False)
    if mode == "material_refs":
        handles = value if isinstance(value, list) else []
        if not resolve_remote_refs:
            return json.dumps(handles, ensure_ascii=False)
        assert client is not None
        material_ids: list[str] = []
        missing: list[str] = []
        for handle in handles:
            handle = str(handle)
            if handle not in material_cache:
                metaobject_id = remote_metaobject_id_by_handle(client, "askcrystal_crystal_material", handle)
                if metaobject_id:
                    material_cache[handle] = metaobject_id
            if handle in material_cache:
                material_ids.append(material_cache[handle])
            else:
                missing.append(handle)
        if missing:
            raise SystemExit(f"material metaobject handles not found in Shopify: {', '.join(missing)}")
        return json.dumps(material_ids, ensure_ascii=False)
    return str(value or "")


def product_metafields_input(
    *,
    client: ShopifyAdminClient | None,
    product: dict[str, Any],
    material_cache: dict[str, str],
    resolve_remote_refs: bool,
) -> list[dict[str, str]]:
    askcrystal = product.get("askcrystal") or {}
    type_by_key = {
        definition["key"]: definition["type"]
        for definition in load_json(METAFIELDS_PATH).get("definitions", [])
        if definition.get("key") and definition.get("type")
    }
    metafields: list[dict[str, str]] = []
    for remote_key, (local_key, mode) in ASKCRYSTAL_METAFIELD_SOURCES.items():
        value = metafield_value_for_product(
            client=client,
            askcrystal=askcrystal,
            local_key=local_key,
            mode=mode,
            material_cache=material_cache,
            resolve_remote_refs=resolve_remote_refs,
        )
        if value is None:
            continue
        payload = {"namespace": "askcrystal", "key": remote_key, "value": value}
        if type_by_key.get(remote_key):
            payload["type"] = type_by_key[remote_key]
        metafields.append(payload)
    return metafields


def local_media_path(src: str) -> Path | None:
    if src.startswith(("http://", "https://", "shopify://")):
        return None
    return (REPO_ROOT / src).resolve()


def display_path(path: Path) -> str:
    try:
        return str(path.relative_to(REPO_ROOT))
    except ValueError:
        return str(path)


def image_manifest_path(handle: str) -> Path:
    return ASSET_PRODUCTS_DIR / handle / "manifest.json"


def load_image_manifest(handle: str) -> tuple[Path, dict[str, Any]]:
    manifest_path = image_manifest_path(handle)
    if not manifest_path.exists():
        raise SystemExit(
            f"Image manifest not found: {manifest_path}. "
            f"Run: python3 skills/askcrystal-shopify-coo/scripts/product_ops.py image-plan --product {handle}"
        )
    return manifest_path, load_json(manifest_path)


def product_source_image_paths(handle: str) -> list[Path]:
    source_dir = ASSET_PRODUCTS_DIR / handle / "source"
    if not source_dir.exists():
        return []
    return sorted(path for path in source_dir.iterdir() if path.is_file() and path.suffix.lower() in IMAGE_EXTENSIONS)


def jimeng_binary(explicit_path: str | None = None) -> str:
    candidates = [explicit_path, os.getenv("JIMENG_CLI"), os.getenv("DREAMINA_CLI"), "dreamina"]
    for candidate in candidates:
        if not candidate:
            continue
        resolved = shutil.which(candidate) or (candidate if Path(candidate).exists() else "")
        if resolved:
            return resolved
    raise SystemExit(
        "Jimeng/Dreamina CLI not found. Install it with: curl -s https://jimeng.jianying.com/cli | bash\n"
        "Then reopen the terminal or set JIMENG_CLI/DREAMINA_CLI to the dreamina binary path."
    )


def run_capture(command: list[str], *, cwd: Path = REPO_ROOT) -> subprocess.CompletedProcess[str]:
    return subprocess.run(command, cwd=cwd, text=True, capture_output=True, check=False)


def print_completed_process(result: subprocess.CompletedProcess[str]) -> None:
    if result.stdout:
        print(result.stdout.rstrip())
    if result.stderr:
        print(result.stderr.rstrip(), file=sys.stderr)


def extract_submit_id(output: str) -> str | None:
    patterns = [
        r'"submit_id"\s*:\s*"([^"]+)"',
        r"'submit_id'\s*:\s*'([^']+)'",
        r"\bsubmit_id\b\s*[:=]\s*([A-Za-z0-9._:-]+)",
    ]
    for pattern in patterns:
        match = re.search(pattern, output)
        if match:
            return match.group(1).strip().strip(",")
    return None


def extract_gen_status(output: str) -> str | None:
    patterns = [
        r'"gen_status"\s*:\s*"([^"]+)"',
        r"'gen_status'\s*:\s*'([^']+)'",
        r"\bgen_status\b\s*[:=]\s*([A-Za-z0-9._:-]+)",
    ]
    for pattern in patterns:
        match = re.search(pattern, output)
        if match:
            return match.group(1).strip().strip(",").lower()
    return None


def selected_manifest_shots(manifest: dict[str, Any], shot_ids: list[str] | None) -> list[dict[str, Any]]:
    shots = [shot for shot in manifest.get("shots") or [] if isinstance(shot, dict)]
    if not shot_ids:
        return shots
    selected = set(shot_ids)
    matched = [shot for shot in shots if str(shot.get("id")) in selected or str(shot.get("filename")) in selected]
    missing = selected - {str(shot.get("id")) for shot in matched} - {str(shot.get("filename")) for shot in matched}
    if missing:
        raise SystemExit(f"shot id(s) not found in manifest: {', '.join(sorted(missing))}")
    return matched


def file_content_type(path: Path) -> str:
    content_type = mimetypes.guess_type(path.name)[0] or "application/octet-stream"
    if content_type == "image/jpg":
        return "image/jpeg"
    return content_type


def staged_upload_input(path: Path) -> dict[str, str]:
    return {
        "resource": "IMAGE",
        "filename": path.name,
        "mimeType": file_content_type(path),
        "httpMethod": "PUT",
    }


def is_path_inside(path: Path, parent: Path) -> bool:
    try:
        path.resolve().relative_to(parent.resolve())
        return True
    except ValueError:
        return False


def is_source_media_path(handle: str, path: Path) -> bool:
    return is_path_inside(path, ASSET_PRODUCTS_DIR / handle / "source")


def multipart_form_data(
    *,
    fields: list[dict[str, str]],
    file_path: Path,
    file_field_name: str = "file",
) -> tuple[bytes, str]:
    boundary = f"----AskCrystal{uuid.uuid4().hex}"
    buffer = io.BytesIO()
    for field in fields:
        buffer.write(f"--{boundary}\r\n".encode("utf-8"))
        buffer.write(f'Content-Disposition: form-data; name="{field["name"]}"\r\n\r\n'.encode("utf-8"))
        buffer.write(str(field["value"]).encode("utf-8"))
        buffer.write(b"\r\n")
    buffer.write(f"--{boundary}\r\n".encode("utf-8"))
    buffer.write(
        (
            f'Content-Disposition: form-data; name="{file_field_name}"; filename="{file_path.name}"\r\n'
            f"Content-Type: {file_content_type(file_path)}\r\n\r\n"
        ).encode("utf-8")
    )
    buffer.write(file_path.read_bytes())
    buffer.write(b"\r\n")
    buffer.write(f"--{boundary}--\r\n".encode("utf-8"))
    return buffer.getvalue(), boundary


def staged_target_request(target: dict[str, Any], file_path: Path, *, http_method: str) -> urllib.request.Request:
    method = http_method.upper()
    if method == "PUT":
        headers = {
            str(parameter["name"]): str(parameter["value"])
            for parameter in target.get("parameters") or []
            if parameter.get("name")
        }
        return urllib.request.Request(
            str(target["url"]),
            data=file_path.read_bytes(),
            headers=headers,
            method="PUT",
        )

    if method == "POST":
        body, boundary = multipart_form_data(fields=target.get("parameters") or [], file_path=file_path)
        return urllib.request.Request(
            str(target["url"]),
            data=body,
            headers={"Content-Type": f"multipart/form-data; boundary={boundary}"},
            method="POST",
        )

    raise SystemExit(f"unsupported staged upload HTTP method for {file_path}: {http_method}")


def upload_to_staged_target(target: dict[str, Any], file_path: Path, *, http_method: str) -> None:
    for attempt in range(1, 4):
        try:
            request = staged_target_request(target, file_path, http_method=http_method)
            with urllib.request.urlopen(request, timeout=60) as response:
                response.read()
            return
        except urllib.error.HTTPError as exc:
            response_body = exc.read().decode("utf-8", errors="replace")
            if exc.code in {429, 500, 502, 503, 504} and attempt < 3:
                time.sleep(2**attempt)
                continue
            raise SystemExit(f"failed staged media upload for {file_path}: HTTP {exc.code}: {response_body}") from exc
        except urllib.error.URLError as exc:
            if attempt < 3:
                time.sleep(2**attempt)
                continue
            raise SystemExit(f"failed staged media upload for {file_path}: {exc.reason}") from exc
        except http.client.RemoteDisconnected as exc:
            if attempt < 3:
                time.sleep(2**attempt)
                continue
            raise SystemExit(f"failed staged media upload for {file_path}: remote disconnected") from exc


def stage_local_media(client: ShopifyAdminClient, media_entries: list[dict[str, str]]) -> tuple[list[dict[str, Any]], list[dict[str, Any]]]:
    upload_items: list[dict[str, Any]] = []
    for index, media in enumerate(media_entries):
        src = str(media.get("src") or "")
        path = local_media_path(src)
        if path is None or not path.exists():
            continue
        upload_input = staged_upload_input(path)
        upload_items.append({"index": index, "media": media, "path": path, "upload_input": upload_input})

    if not upload_items:
        return [], []

    result = client.graphql(STAGED_UPLOADS_CREATE, {"input": [item["upload_input"] for item in upload_items]})[
        "stagedUploadsCreate"
    ]
    if result.get("userErrors"):
        raise SystemExit(f"failed to create staged uploads: {graphql_user_error_message(result['userErrors'])}")
    targets = result.get("stagedTargets") or []
    if len(targets) != len(upload_items):
        raise SystemExit(f"Shopify returned {len(targets)} staged targets for {len(upload_items)} local media files")

    files: list[dict[str, Any]] = []
    cache_items: list[dict[str, Any]] = []
    for item, target in zip(upload_items, targets):
        upload_to_staged_target(target, item["path"], http_method=item["upload_input"]["httpMethod"])
        media = item["media"]
        path = item["path"]
        files.append(
            {
                "originalSource": str(target["resourceUrl"]),
                "alt": str(media.get("alt") or ""),
                "filename": path.name,
                "contentType": "IMAGE",
                "duplicateResolutionMode": "REPLACE",
            }
        )
        cache_items.append(
            {
                "local_path": display_path(path),
                "resource_url": str(target["resourceUrl"]),
                "alt": str(media.get("alt") or ""),
            }
        )
    return files, cache_items


def remote_url_media_files(product: dict[str, Any]) -> list[dict[str, Any]]:
    files: list[dict[str, Any]] = []
    for media in product.get("media") or []:
        src = str(media.get("src") or "")
        if not src.startswith(("http://", "https://")):
            continue
        files.append(
            {
                "originalSource": src,
                "alt": str(media.get("alt") or ""),
                "filename": Path(src.split("?", 1)[0]).name or f"{product['handle']}.jpg",
                "contentType": "IMAGE",
                "duplicateResolutionMode": "REPLACE",
            }
        )
    return files


def collection_ids_for_product(
    *,
    client: ShopifyAdminClient | None,
    product: dict[str, Any],
    resolve_remote_refs: bool,
) -> list[str]:
    handles = [str(handle) for handle in product.get("collections") or [] if str(handle).strip()]
    if not resolve_remote_refs:
        return handles
    assert client is not None
    collection_ids: list[str] = []
    missing: list[str] = []
    for handle in handles:
        collection_id = remote_collection_id_by_handle(client, handle)
        if collection_id:
            collection_ids.append(collection_id)
        else:
            missing.append(handle)
    if missing:
        raise SystemExit(f"collection handles not found in Shopify: {', '.join(missing)}")
    return collection_ids


def product_set_input(
    *,
    client: ShopifyAdminClient | None,
    product: dict[str, Any],
    material_cache: dict[str, str],
    resolve_remote_refs: bool,
    files: list[dict[str, Any]] | None,
) -> dict[str, Any]:
    payload: dict[str, Any] = {
        "handle": product["handle"],
        "title": product["title"],
        "descriptionHtml": text_to_description_html(product.get("description", "")),
        "vendor": product.get("vendor") or "AskCrystal",
        "productType": product.get("product_type") or "",
        "status": product_status_input(product.get("shopify_status")),
        "tags": sorted(set(product.get("tags") or []) | set(generated_tags(product))),
        "productOptions": product_options_input(product),
        "variants": product_variants_input(product),
        "metafields": product_metafields_input(
            client=client,
            product=product,
            material_cache=material_cache,
            resolve_remote_refs=resolve_remote_refs,
        ),
        "seo": product_seo_input(product),
    }
    collection_ids = collection_ids_for_product(client=client, product=product, resolve_remote_refs=resolve_remote_refs)
    if collection_ids:
        payload["collections"] = collection_ids
    if files:
        payload["files"] = files
    return payload


def compact_product_set_preview(payload: dict[str, Any]) -> dict[str, Any]:
    preview = dict(payload)
    preview["descriptionHtml"] = truncate_text(str(preview.get("descriptionHtml") or ""), 160)
    preview["metafields"] = f"{len(payload.get('metafields') or [])} metafield(s)"
    preview["variants"] = f"{len(payload.get('variants') or [])} variant(s)"
    preview["files"] = f"{len(payload.get('files') or [])} file(s)"
    return preview


def cmd_summary(_args: argparse.Namespace) -> int:
    product_count = len([path for path in PRODUCTS_DIR.glob("*.json") if path.is_file()]) if PRODUCTS_DIR.exists() else 0
    print("AskCrystal Shopify COO summary")
    print(f"  repo: {REPO_ROOT}")
    print(f"  products: {product_count}")
    print(f"  materials: {', '.join(material_handles())}")
    for key in ["product_form", "intentions", "chakras", "zodiac_signs", "color_families", "ritual_uses", "gift_for"]:
        allowed = axis_allowed(key)
        if allowed:
            print(f"  {key}: {', '.join(allowed)}")
    return 0


def cmd_validate(_args: argparse.Namespace) -> int:
    return run_repo_command([sys.executable, "scripts/askcrystal_shopify.py", "catalog", "validate"])


def cmd_collection_plan(_args: argparse.Namespace) -> int:
    return run_repo_command([sys.executable, "scripts/askcrystal_shopify.py", "catalog", "provision-collections"])


def cmd_image_plan(args: argparse.Namespace) -> int:
    product_path, product = load_product(args.product)
    handle = product.get("handle") or args.product
    asset_dir = ASSET_PRODUCTS_DIR / handle
    manifest_path = asset_dir / "manifest.json"
    if manifest_path.exists() and not args.force:
        raise SystemExit(f"Image manifest already exists: {manifest_path}. Pass --force to overwrite.")

    shots = image_shot_specs(product)
    for shot in shots:
        shot["local_path"] = str((asset_dir / shot["filename"]).relative_to(REPO_ROOT))

    if args.update_product_media:
        missing_generated = [asset_dir / shot["filename"] for shot in shots if not (asset_dir / shot["filename"]).exists()]
        if missing_generated:
            missing_list = "\n".join(f"  - {display_path(path)}" for path in missing_generated)
            raise SystemExit(
                "Refusing to update product media before generated files exist.\n"
                "Run image-plan without --update-product-media, generate/review Jimeng images, then update media.\n"
                f"Missing generated file(s):\n{missing_list}"
            )

    manifest = {
        "schema_version": 1,
        "product_handle": handle,
        "product_title": product.get("title"),
        "aspect_ratio": PORTRAIT_ASPECT_RATIO,
        "generation_provider": "jimeng_dreamina",
        "preferred_generation_mode": "image2image_with_source_photos",
        "source_image_dir": str((asset_dir / "source").relative_to(REPO_ROOT)),
        "style_status": "askcrystal_luxury_base_prompt_v1",
        "style_prompt": generic_image_style_prompt(),
        "negative_prompt": negative_image_prompt(),
        "notes": [
            "Generate exactly these nine images unless the user asks for a different shot list.",
            "Use the local_path value as the canonical repo asset path after image generation.",
            "Put raw/provided product reference photos in source_image_dir so Jimeng can preserve exact design, materials, and colors.",
            "Jimeng image2image is required when source photos exist unless the user explicitly chooses a product-data-only or text-only workflow.",
            "Never add files from source_image_dir to product JSON media unless the user explicitly requests raw source media.",
            "Generated images require human review before Shopify upload or product publish.",
        ],
        "shots": shots,
    }
    write_json(manifest_path, manifest)

    if args.update_product_media:
        media = product.get("media") or []
        existing_srcs = {item.get("src") for item in media if isinstance(item, dict)}
        for shot in shots:
            if shot["local_path"] not in existing_srcs:
                media.append({"src": shot["local_path"], "alt": shot["alt"]})
        product["media"] = media
        write_json(product_path, product)
        print(f"updated product media entries in {product_path}")

    print(f"wrote {manifest_path}")
    print("next: generate the nine local images, review them, then attach approved local paths during product sync")
    return 0


def cmd_jimeng_status(args: argparse.Namespace) -> int:
    binary = jimeng_binary(args.cli)
    print(f"Jimeng/Dreamina CLI: {binary}")

    for command in ([binary, "-h"], [binary, "text2image", "-h"], [binary, "query_result", "-h"]):
        print("")
        print(f"$ {' '.join(command)}")
        result = run_capture(command)
        print_completed_process(result)
        if result.returncode != 0:
            return result.returncode

    if args.credit:
        print("")
        print(f"$ {binary} user_credit")
        result = run_capture([binary, "user_credit"])
        print_completed_process(result)
        return result.returncode

    print("\nCredit check skipped. Pass --credit to call `dreamina user_credit`.")
    return 0


def cmd_jimeng_generate(args: argparse.Namespace) -> int:
    _product_path, product = load_product(args.product)
    handle = product["handle"]
    manifest_path, manifest = load_image_manifest(handle)
    shots = selected_manifest_shots(manifest, args.shot)
    if not shots:
        raise SystemExit(f"No shots found in {manifest_path}")
    if args.max_source_images < 1 or args.max_source_images > 10:
        raise SystemExit("--max-source-images must be between 1 and 10")

    binary = jimeng_binary(args.cli)
    task_log_path = JIMENG_TASKS_DIR / f"{handle}.jsonl"
    print("AskCrystal Jimeng image generation")
    print(f"  mode: {'apply' if args.apply else 'dry-run'}")
    print(f"  product: {handle}")
    print(f"  manifest: {display_path(manifest_path)}")
    print(f"  shots selected: {len(shots)}")
    print(f"  ratio: {args.ratio}")
    print(f"  resolution_type: {args.resolution_type or '(model default)'}")
    print(f"  model_version: {args.model_version or '(CLI default)'}")
    print(f"  poll seconds: {args.poll}")
    source_images = product_source_image_paths(handle) if not args.text_only else []
    generation_subcommand = "image2image" if source_images else "text2image"
    print(f"  generation mode: {generation_subcommand}")
    if source_images:
        print(f"  source images: {', '.join(display_path(path) for path in source_images)}")
    elif not args.text_only:
        print(f"  source images: none found in {display_path(ASSET_PRODUCTS_DIR / handle / 'source')} (falling back to text2image)")

    if args.credit:
        print("")
        print(f"$ {binary} user_credit")
        credit_result = run_capture([binary, "user_credit"])
        print_completed_process(credit_result)
        if credit_result.returncode != 0:
            return credit_result.returncode

    submitted = 0
    for shot in shots:
        command = [
            binary,
            generation_subcommand,
            f"--prompt={shot['prompt']}",
            f"--ratio={args.ratio}",
            f"--poll={args.poll}",
        ]
        if source_images:
            command.extend(f"--images={path}" for path in source_images[: args.max_source_images])
        if args.resolution_type:
            command.append(f"--resolution_type={args.resolution_type}")
        if args.model_version:
            command.append(f"--model_version={args.model_version}")

        print("")
        print(f"shot {shot.get('id')} -> {shot.get('local_path')}")
        printable_command = [*command[:2]]
        if source_images:
            printable_command.append(f"--images=<source x{min(len(source_images), args.max_source_images)}>")
        printable_command.append("--prompt=<manifest prompt>")
        printable_command.extend(arg for arg in command[3:] if not arg.startswith("--images="))
        print("$ " + " ".join(printable_command))
        if not args.apply:
            continue

        result = run_capture(command)
        print_completed_process(result)
        combined_output = f"{result.stdout}\n{result.stderr}"
        submit_id = extract_submit_id(combined_output)
        gen_status = extract_gen_status(combined_output)
        record = {
            "schema_version": 1,
            "submitted_at_unix": int(time.time()),
            "product_handle": handle,
            "shot_id": shot.get("id"),
            "filename": shot.get("filename"),
            "local_path": shot.get("local_path"),
            "submit_id": submit_id,
            "gen_status": gen_status,
            "returncode": result.returncode,
            "command": {
                "binary": binary,
                "subcommand": generation_subcommand,
                "ratio": args.ratio,
                "resolution_type": args.resolution_type,
                "model_version": args.model_version,
                "poll": args.poll,
                "source_images": [display_path(path) for path in source_images[: args.max_source_images]],
            },
        }
        append_jsonl(task_log_path, record)
        if result.returncode != 0:
            raise SystemExit(f"Jimeng {generation_subcommand} failed for shot {shot.get('id')} with exit code {result.returncode}")
        if not submit_id:
            raise SystemExit(f"Jimeng {generation_subcommand} did not return a submit_id for shot {shot.get('id')}")
        if gen_status == "fail":
            raise SystemExit(f"Jimeng text2image returned gen_status=fail for shot {shot.get('id')}")
        submitted += 1

    if args.apply:
        print("")
        print(f"submitted: {submitted}")
        print(f"task log: {display_path(task_log_path)}")
        print("next: use jimeng-query to download finished results into the product asset folder")
    else:
        print("\nNo Jimeng tasks were submitted. Pass --apply to consume credits and submit selected shots.")
    return 0


def cmd_jimeng_query(args: argparse.Namespace) -> int:
    _product_path, product = load_product(args.product)
    handle = product["handle"]
    manifest_path, manifest = load_image_manifest(handle)
    binary = jimeng_binary(args.cli)

    task_log_path = args.task_log or (JIMENG_TASKS_DIR / f"{handle}.jsonl")
    if not task_log_path.exists():
        raise SystemExit(f"Jimeng task log not found: {task_log_path}")

    selected_shots_by_id = {str(shot.get("id")): shot for shot in selected_manifest_shots(manifest, args.shot)}
    records: list[dict[str, Any]] = []
    for line in task_log_path.read_text(encoding="utf-8").splitlines():
        if not line.strip():
            continue
        record = json.loads(line)
        if record.get("product_handle") != handle:
            continue
        if args.shot and str(record.get("shot_id")) not in selected_shots_by_id:
            continue
        if record.get("submit_id"):
            records.append(record)

    if args.submit_id:
        records = [
            {
                "product_handle": handle,
                "shot_id": "manual",
                "submit_id": args.submit_id,
                "local_path": None,
            }
        ]

    if not records:
        raise SystemExit(f"No Jimeng submit_id records found for {handle}")

    print("AskCrystal Jimeng query")
    print(f"  mode: {'apply' if args.apply else 'dry-run'}")
    print(f"  product: {handle}")
    print(f"  records selected: {len(records)}")
    print(f"  download_dir: {display_path(ASSET_PRODUCTS_DIR / handle)}")

    query_log_path = JIMENG_TASKS_DIR / f"{handle}.query.jsonl"
    for record in records:
        submit_id = str(record["submit_id"])
        command = [
            binary,
            "query_result",
            f"--submit_id={submit_id}",
            f"--download_dir={ASSET_PRODUCTS_DIR / handle}",
        ]
        print("")
        print(f"shot {record.get('shot_id')} submit_id={submit_id}")
        print("$ " + " ".join(command))
        if not args.apply:
            continue

        before = {path.name for path in (ASSET_PRODUCTS_DIR / handle).glob("*") if path.is_file()}
        result = run_capture(command)
        print_completed_process(result)
        after_paths = [path for path in (ASSET_PRODUCTS_DIR / handle).glob("*") if path.is_file() and path.name not in before]
        combined_output = f"{result.stdout}\n{result.stderr}"
        append_jsonl(
            query_log_path,
            {
                "schema_version": 1,
                "queried_at_unix": int(time.time()),
                "product_handle": handle,
                "shot_id": record.get("shot_id"),
                "submit_id": submit_id,
                "returncode": result.returncode,
                "gen_status": extract_gen_status(combined_output),
                "downloaded_files": [display_path(path) for path in after_paths],
            },
        )
        if result.returncode != 0:
            raise SystemExit(f"Jimeng query_result failed for submit_id {submit_id} with exit code {result.returncode}")

    if args.apply:
        print("")
        print(f"query log: {display_path(query_log_path)}")
        print("Review downloaded files, rename/move them to the manifest local_path filenames if needed, then update product media.")
    else:
        print("\nNo Jimeng results were queried/downloaded. Pass --apply to call query_result.")
    return 0


def cmd_product_upload(args: argparse.Namespace) -> int:
    validation_code = cmd_validate(args)
    if validation_code != 0:
        print("\nProduct upload aborted because local catalog validation failed.")
        return validation_code

    _product_path, product = load_product(args.product)
    handle = product["handle"]
    workflow_status = product.get("workflow_status")
    if workflow_status not in REVIEWED_PRODUCT_STATUSES and not args.include_unreviewed:
        raise SystemExit(
            f"Refusing to upload {handle} because workflow_status={workflow_status!r}. "
            "Review it first, or pass --include-unreviewed for an intentional draft/test push."
        )

    media_entries = product.get("media") or []
    remote_media = remote_url_media_files(product)
    source_images = product_source_image_paths(handle)
    local_media = []
    reviewed_local_media = []
    source_media = []
    missing_local_media = []
    for media in media_entries:
        path = local_media_path(str(media.get("src") or ""))
        if path is None:
            continue
        if is_source_media_path(handle, path):
            source_media.append(path)
        if path.exists():
            local_media.append(path)
            if not is_source_media_path(handle, path):
                reviewed_local_media.append(path)
        else:
            missing_local_media.append(path)
    if missing_local_media and not args.skip_media:
        missing_list = "\n".join(f"  - {display_path(path)}" for path in missing_local_media)
        raise SystemExit(
            "Product media references missing local file(s); refusing to silently upload without them.\n"
            "Generate/download the approved images, update product media, or pass --skip-media for an explicit product-data-only sync.\n"
            f"Missing file(s):\n{missing_list}"
        )

    if source_media and not args.skip_media and not args.allow_source_media:
        source_list = "\n".join(f"  - {display_path(path)}" for path in source_media)
        raise SystemExit(
            "Refusing to upload raw source/reference images as product media.\n"
            "Run Jimeng image2image from the source photos, review the generated files, then update product media.\n"
            "Use --skip-media only for an explicit product-data-only sync, or --allow-source-media only if the user explicitly requested raw source media.\n"
            f"Source media reference(s):\n{source_list}"
        )

    if source_images and not args.skip_media and not args.allow_source_media and not reviewed_local_media and not remote_media:
        raise SystemExit(
            "Source/reference photos exist, but no reviewed generated media is attached to the product.\n"
            "Run the Jimeng image workflow and update product media, or pass --skip-media for an explicit product-data-only sync."
        )

    dry_run_payload = product_set_input(
        client=None,
        product=product,
        material_cache={},
        resolve_remote_refs=False,
        files=[] if args.skip_media else remote_media,
    )

    print("\nAskCrystal product upload")
    print(f"  mode: {'apply' if args.apply else 'dry-run'}")
    print(f"  product: {handle}")
    print(f"  workflow_status: {workflow_status}")
    print(f"  shopify_status: {product.get('shopify_status')}")
    print(f"  variants: {len(product.get('variants') or [])}")
    print(f"  metafields: {len(dry_run_payload.get('metafields') or [])}")
    print(f"  generated tags: {len(generated_tags(product))}")
    print(f"  local media files found: {len(local_media)}")
    print(f"  source/reference media refs: {len(source_media)}")
    print(f"  remote URL media refs: {len(remote_media)}")
    print(f"  collections: {', '.join(product.get('collections') or []) or '(none)'}")

    if args.show_payload:
        print("\nProductSet preview")
        print(json.dumps(compact_product_set_preview(dry_run_payload), indent=2, ensure_ascii=False))

    if not args.apply:
        print("\nNo Shopify calls were made. Pass --apply to stage media and create/update this product.")
        return 0

    client = resolve_shopify_client(args)
    media_files: list[dict[str, Any]] = []
    staged_cache: list[dict[str, Any]] = []
    if not args.skip_media:
        staged_files, staged_cache = stage_local_media(client, media_entries)
        media_files.extend(staged_files)
        media_files.extend(remote_media)

    material_cache: dict[str, str] = {}
    payload = product_set_input(
        client=client,
        product=product,
        material_cache=material_cache,
        resolve_remote_refs=True,
        files=media_files,
    )
    result = client.graphql(
        PRODUCT_SET,
        {
            "identifier": {"handle": handle},
            "input": payload,
            "synchronous": args.synchronous,
        },
    )["productSet"]
    if result.get("userErrors"):
        raise SystemExit(f"failed to upload product {handle}: {graphql_user_error_message(result['userErrors'])}")
    operation = result.get("productSetOperation") or {}
    if operation.get("userErrors"):
        raise SystemExit(
            f"failed to upload product {handle}: " f"{graphql_user_error_message(operation['userErrors'])}"
        )

    product_result = result.get("product") or {}
    cache = {
        "schema_version": 1,
        "product_handle": handle,
        "synced_at_unix": int(time.time()),
        "operation": {
            "id": operation.get("id"),
            "status": operation.get("status"),
            "synchronous": args.synchronous,
        },
        "product": product_result,
        "staged_media": staged_cache,
        "remote_url_media": remote_media,
        "notes": [
            "Generated file is a Shopify deployment cache, not local source of truth.",
            "Keep product facts and local image paths in data/shopify/catalog/.",
        ],
    }
    cache_path = GENERATED_DIR / f"product-upload-cache.{handle}.json"
    write_json(cache_path, cache)

    print("")
    print(f"  uploaded {product_result.get('handle') or handle} -> {product_result.get('id', 'unknown-id')}")
    print(f"  status: {product_result.get('status', product.get('shopify_status'))}")
    print(f"  media attached/requested: {len(media_files)}")
    print(f"  cache: {display_path(cache_path)}")
    print("\nNote: product upload does not publish products separately or mutate inventory.")
    return 0


def cmd_draft_product(args: argparse.Namespace) -> int:
    handle = args.handle or slugify(args.title)
    output_path = PRODUCTS_DIR / f"{handle}.json"
    if output_path.exists() and not args.force:
        raise SystemExit(f"Product already exists: {output_path}. Pass --force to overwrite.")

    materials = values(args.material)
    secondary_intentions = values(args.secondary_intention)
    chakras = values(args.chakra)
    color_families = values(args.color_family)
    ritual_uses = values(args.ritual_use)
    gift_for = values(args.gift_for)
    zodiac_signs = values(args.zodiac_sign)
    western_elements = values(args.western_element)
    five_elements = values(args.five_element)

    product_form = snake(args.product_form)
    primary_intention = snake(args.primary_intention)
    allowed_intentions = axis_allowed("intentions") + ["intuition", "self_love", "emotional_balance"]

    ensure_allowed("material", materials, material_handles())
    ensure_allowed("product_form", [product_form], axis_allowed("product_form"))
    ensure_allowed("primary_intention", [primary_intention], allowed_intentions)
    ensure_allowed("secondary_intention", secondary_intentions, allowed_intentions)
    ensure_allowed("chakra", chakras, axis_allowed("chakras"))
    ensure_allowed("color_family", color_families, axis_allowed("color_families"))
    ensure_allowed("ritual_use", ritual_uses, axis_allowed("ritual_uses"))
    if gift_for:
        ensure_allowed("gift_for", gift_for, axis_allowed("gift_for"))
    if zodiac_signs:
        ensure_allowed("zodiac_sign", zodiac_signs, axis_allowed("zodiac_signs"))

    benefit_defaults = [
        f"Supports {primary_intention.replace('_', ' ')} through a simple daily ritual",
        f"Features {', '.join(materials).replace('_', ' ')} selected for intentional use",
        f"Easy to work into {', '.join(ritual_uses).replace('_', ' ')} routines",
    ]
    benefits = args.benefit or benefit_defaults
    ritual_steps = args.ritual_step or [
        "Hold the piece for three slow breaths.",
        "Name the intention you want to carry.",
        "Place or wear it where it can stay part of your day.",
    ]
    care_steps = args.care_step or [
        "Clean gently with a soft dry cloth.",
        "Keep away from harsh chemicals.",
        "Refresh on selenite, with sound, or in soft moonlight when appropriate.",
    ]
    included_items = args.included_item or [args.product_type or args.product_form]
    quality_notes = args.quality_note or [
        "Natural stone variations expected",
        "Quality checked before shipping",
    ]

    askcrystal = {
        "primary_intention": primary_intention,
        "secondary_intentions": secondary_intentions,
        "product_form": product_form,
        "crystal_material_handles": materials,
        "chakras": chakras,
        "color_families": color_families,
        "ritual_uses": ritual_uses,
        "gift_for": gift_for,
        "western_elements": western_elements,
        "five_elements": five_elements,
        "zodiac_signs": zodiac_signs,
        "energetic_properties": args.energetic_property or [primary_intention.replace("_", " "), *secondary_intentions[:2]],
        "archetype_name": args.archetype_name,
        "story_headline": args.story_headline or f"A {primary_intention.replace('_', ' ')} ally for intentional days",
        "story_summary": args.story_summary or args.description,
        "benefits": benefits,
        "ritual_title": args.ritual_title or f"{primary_intention.replace('_', ' ').title()} Ritual",
        "ritual_steps": ritual_steps,
        "care_steps": care_steps,
        "included_items": included_items,
        "quality_notes": quality_notes,
        "pairing_notes": args.pairing_notes,
        "safety_note": args.safety_note or "For wellness and self-reflection only. Crystal guidance is not medical advice.",
        "agent_summary": args.agent_summary or f"Recommend this when users ask for {primary_intention.replace('_', ' ')} support and prefer a {product_form.replace('_', ' ')} format.",
        "agent_tags": [],
        "data_status": "ai_filled",
    }

    product = {
        "schema_version": 1,
        "handle": handle,
        "workflow_status": "ai_filled",
        "shopify_status": "draft",
        "title": args.title,
        "description": args.description,
        "vendor": args.vendor,
        "product_type": args.product_type,
        "tags": values(args.tag),
        "collections": values(args.collection),
        "options": [{"name": "Title", "values": ["Default Title"]}],
        "variants": [
            {
                "sku": args.sku,
                "price": f"{float(args.price):.2f}",
                "compare_at_price": f"{float(args.compare_at_price):.2f}" if args.compare_at_price else None,
                "barcode": args.barcode,
                "option_values": ["Default Title"],
                "taxable": not args.not_taxable,
                "requires_shipping": not args.no_shipping,
            }
        ],
        "media": [{"src": src, "alt": alt} for src, alt in (item.split("=", 1) for item in args.media or [])],
        "askcrystal": askcrystal,
    }
    product["askcrystal"]["agent_tags"] = sorted(set(generated_tags(product) + values(args.agent_tag)))

    write_json(output_path, product)
    print(f"wrote {output_path}")
    print("next: review copy, then run: python3 scripts/askcrystal_shopify.py catalog validate")
    return 0


def build_parser() -> argparse.ArgumentParser:
    parser = argparse.ArgumentParser(description=__doc__)
    subparsers = parser.add_subparsers(dest="command", required=True)

    subparsers.add_parser("summary", help="Print repo catalog/facet summary").set_defaults(func=cmd_summary)
    subparsers.add_parser("validate", help="Run repo catalog validation").set_defaults(func=cmd_validate)
    subparsers.add_parser("collection-plan", help="Preview generated Shopify collection plan").set_defaults(func=cmd_collection_plan)

    image_plan = subparsers.add_parser("image-plan", help="Create a nine-shot local product image prompt manifest")
    image_plan.add_argument("--product", required=True, help="Product handle with a local catalog JSON file")
    image_plan.add_argument("--force", action="store_true", help="Overwrite an existing image manifest")
    image_plan.add_argument(
        "--update-product-media",
        action="store_true",
        help="Also add reviewed generated local image paths to product JSON media as src/alt entries",
    )
    image_plan.set_defaults(func=cmd_image_plan)

    jimeng_status = subparsers.add_parser("jimeng-status", help="Inspect local Jimeng/Dreamina CLI setup and image help")
    jimeng_status.add_argument("--cli", help="Path to dreamina binary. Defaults to JIMENG_CLI/DREAMINA_CLI/PATH.")
    jimeng_status.add_argument("--credit", action="store_true", help="Also call dreamina user_credit.")
    jimeng_status.set_defaults(func=cmd_jimeng_status)

    jimeng_generate = subparsers.add_parser(
        "jimeng-generate",
        help="Submit Jimeng/Dreamina image2image/text2image tasks from a product image manifest",
    )
    jimeng_generate.add_argument("--product", required=True, help="Product handle with a local image manifest")
    jimeng_generate.add_argument("--shot", action="append", help="Limit to a manifest shot id or filename. Repeat as needed.")
    jimeng_generate.add_argument("--apply", action="store_true", help="Submit real Jimeng tasks. Default is dry-run.")
    jimeng_generate.add_argument("--cli", help="Path to dreamina binary. Defaults to JIMENG_CLI/DREAMINA_CLI/PATH.")
    jimeng_generate.add_argument("--ratio", default=JIMENG_RATIO, help="Dreamina generation ratio. Default: 3:4.")
    jimeng_generate.add_argument("--resolution-type", default="2k", help="Dreamina resolution_type. Use empty string for CLI default.")
    jimeng_generate.add_argument("--model-version", default="", help="Dreamina model_version. Empty means CLI default.")
    jimeng_generate.add_argument("--poll", type=int, default=0, help="Seconds to poll immediately after submit.")
    jimeng_generate.add_argument("--credit", action="store_true", help="Call dreamina user_credit before generation.")
    jimeng_generate.add_argument(
        "--text-only",
        action="store_true",
        help="Force text2image even when source product photos exist. Use only when the user explicitly asks.",
    )
    jimeng_generate.add_argument(
        "--max-source-images",
        type=int,
        default=10,
        help="Maximum source images to pass to image2image. Dreamina supports up to 10.",
    )
    jimeng_generate.set_defaults(func=cmd_jimeng_generate)

    jimeng_query = subparsers.add_parser(
        "jimeng-query",
        help="Query/download Jimeng/Dreamina task results into the product asset folder",
    )
    jimeng_query.add_argument("--product", required=True, help="Product handle with a local image manifest")
    jimeng_query.add_argument("--shot", action="append", help="Limit to a manifest shot id. Repeat as needed.")
    jimeng_query.add_argument("--submit-id", help="Query one submit_id directly instead of reading the task log.")
    jimeng_query.add_argument("--task-log", type=Path, help="Path to a Jimeng task log JSONL file.")
    jimeng_query.add_argument("--apply", action="store_true", help="Call query_result and download files. Default is dry-run.")
    jimeng_query.add_argument("--cli", help="Path to dreamina binary. Defaults to JIMENG_CLI/DREAMINA_CLI/PATH.")
    jimeng_query.set_defaults(func=cmd_jimeng_query)

    upload = subparsers.add_parser(
        "product-upload",
        help="Dry-run or upload one local product JSON to Shopify with AskCrystal metafields and media",
    )
    upload.add_argument("--product", required=True, help="Product handle with a local catalog JSON file")
    upload.add_argument("--apply", action="store_true", help="Write product changes to Shopify. Default is dry-run.")
    upload.add_argument(
        "--include-unreviewed",
        action="store_true",
        help="Allow workflow_status=draft or ai_filled products to upload for an intentional test push.",
    )
    upload.add_argument(
        "--skip-media",
        action="store_true",
        help="Explicit product-data-only sync: do not stage or attach product media.",
    )
    upload.add_argument(
        "--allow-source-media",
        action="store_true",
        help="Allow raw source/reference media upload only when the user explicitly requested it.",
    )
    upload.add_argument(
        "--synchronous",
        action=argparse.BooleanOptionalAction,
        default=True,
        help="Run Shopify productSet synchronously when possible. Use --no-synchronous for async operation.",
    )
    upload.add_argument("--show-payload", action="store_true", help="Print a compact ProductSet payload preview.")
    upload.add_argument("--store-domain", default="", help="Shopify myshopify domain. Defaults to SHOPIFY_STORE_DOMAIN.")
    upload.add_argument("--access-token", default="", help="Shopify Admin API access token. Defaults to SHOPIFY_ADMIN_ACCESS_TOKEN.")
    upload.add_argument("--client-id", default="", help="Shopify app Client ID. Defaults to SHOPIFY_CLIENT_ID or SHOPIFY_API_KEY.")
    upload.add_argument("--client-secret", default="", help="Shopify app Client secret. Defaults to SHOPIFY_CLIENT_SECRET or SHOPIFY_API_SECRET.")
    upload.add_argument("--api-version", default="2026-04", help="Shopify Admin API version.")
    upload.set_defaults(func=cmd_product_upload)

    draft = subparsers.add_parser("draft-product", help="Create a valid local AskCrystal product JSON draft")
    draft.add_argument("--title", required=True)
    draft.add_argument("--handle")
    draft.add_argument("--description", required=True)
    draft.add_argument("--vendor", default="AskCrystal")
    draft.add_argument("--product-type", required=True)
    draft.add_argument("--product-form", required=True)
    draft.add_argument("--price", required=True)
    draft.add_argument("--compare-at-price")
    draft.add_argument("--sku", required=True)
    draft.add_argument("--barcode")
    draft.add_argument("--not-taxable", action="store_true")
    draft.add_argument("--no-shipping", action="store_true")
    draft.add_argument("--material", action="append", required=True, help="Repeat or comma-separate material handles")
    draft.add_argument("--primary-intention", required=True)
    draft.add_argument("--secondary-intention", action="append", required=True)
    draft.add_argument("--chakra", action="append", required=True)
    draft.add_argument("--color-family", action="append", required=True)
    draft.add_argument("--ritual-use", action="append", required=True)
    draft.add_argument("--gift-for", action="append")
    draft.add_argument("--zodiac-sign", action="append")
    draft.add_argument("--western-element", action="append")
    draft.add_argument("--five-element", action="append")
    draft.add_argument("--energetic-property", action="append")
    draft.add_argument("--archetype-name")
    draft.add_argument("--story-headline")
    draft.add_argument("--story-summary")
    draft.add_argument("--benefit", action="append")
    draft.add_argument("--ritual-title")
    draft.add_argument("--ritual-step", action="append")
    draft.add_argument("--care-step", action="append")
    draft.add_argument("--included-item", action="append")
    draft.add_argument("--quality-note", action="append")
    draft.add_argument("--pairing-notes")
    draft.add_argument("--safety-note")
    draft.add_argument("--agent-summary")
    draft.add_argument("--agent-tag", action="append")
    draft.add_argument("--tag", action="append")
    draft.add_argument("--collection", action="append")
    draft.add_argument("--media", action="append", help="Use src=alt. Only stable URLs or existing repo paths.")
    draft.add_argument("--force", action="store_true")
    draft.set_defaults(func=cmd_draft_product)

    return parser


def main() -> int:
    parser = build_parser()
    args = parser.parse_args()
    return args.func(args)


if __name__ == "__main__":
    raise SystemExit(main())
