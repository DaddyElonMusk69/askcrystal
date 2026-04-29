#!/usr/bin/env python3
"""Small repo-aware helpers for AskCrystal Shopify product operations."""

from __future__ import annotations

import argparse
import json
import re
import subprocess
import sys
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
FACETS_PATH = CATALOG_DIR / "facets.askcrystal.json"
MATERIALS_PATH = REPO_ROOT / "data/shopify/metaobject-entries.askcrystal.json"


def load_json(path: Path) -> Any:
    return json.loads(path.read_text(encoding="utf-8"))


def write_json(path: Path, data: Any) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(json.dumps(data, indent=2, ensure_ascii=False) + "\n", encoding="utf-8")


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
    ask = product["askcrystal"]
    tags = set()
    for material in ask.get("crystal_material_handles", []):
        tags.add(f"material:{material}")
    if ask.get("product_form"):
        tags.add(f"form:{ask['product_form']}")
    if ask.get("primary_intention"):
        tags.add(f"intention:{ask['primary_intention']}")
    for item in ask.get("secondary_intentions", []):
        tags.add(f"intention:{item}")
    for item in ask.get("chakras", []):
        tags.add(f"chakra:{item}")
    for item in ask.get("zodiac_signs", []):
        tags.add(f"zodiac:{item}")
    for item in ask.get("color_families", []):
        tags.add(f"color:{item}")
    for item in ask.get("ritual_uses", []):
        tags.add(f"ritual:{item}")
    for item in ask.get("gift_for", []):
        tags.add(f"gift:{item}")
    return sorted(tags)


def run_repo_command(args: list[str]) -> int:
    return subprocess.call(args, cwd=REPO_ROOT)


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
