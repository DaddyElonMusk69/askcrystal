#!/usr/bin/env python3
"""Validate AskCrystal product enrichment rows and emit a Shopify metafield CSV.

This script is intentionally small and standard-library only so a future AI skill
can call it after filling the enrichment spreadsheet.
"""

from __future__ import annotations

import argparse
import csv
import json
import sys
from pathlib import Path

REQUIRED_COLUMNS = [
    "handle",
    "product_title",
    "product_form",
    "primary_intention",
    "secondary_intentions_json",
    "crystal_material_handles_json",
    "chakra_keys_json",
    "color_families_json",
    "ritual_uses_json",
    "energetic_properties_json",
    "story_headline",
    "story_summary",
    "benefits_json",
    "ritual_title",
    "ritual_steps_json",
    "care_steps_json",
    "included_items_json",
    "quality_notes_json",
    "safety_note",
    "agent_summary",
    "agent_tags_json",
    "data_status",
]

JSON_LIST_COLUMNS = [
    "secondary_intentions_json",
    "crystal_material_handles_json",
    "chakra_keys_json",
    "color_families_json",
    "ritual_uses_json",
    "gift_for_json",
    "western_elements_json",
    "five_elements_json",
    "zodiac_signs_json",
    "energetic_properties_json",
    "benefits_json",
    "ritual_steps_json",
    "care_steps_json",
    "included_items_json",
    "quality_notes_json",
    "agent_tags_json",
]

CANONICAL_VALUES = {
    "secondary_intentions_json": {
        "calm", "protection", "love", "sleep", "grounding", "focus", "abundance", "clarity",
        "confidence", "emotional_healing", "intuition", "self_love", "emotional_balance",
    },
    "chakra_keys_json": {"root", "sacral", "solar_plexus", "heart", "throat", "third_eye", "crown"},
    "color_families_json": {"purple", "pink", "black", "clear", "green", "blue", "gold", "white"},
    "ritual_uses_json": {"meditation", "bedside", "daily_wear", "cleansing", "manifestation", "travel", "work_desk"},
    "gift_for_json": {"partner", "friend", "mother", "birthday", "breakup_support", "new_beginning", "stress_relief"},
    "western_elements_json": {"fire", "earth", "air", "water"},
    "five_elements_json": {"wood", "fire", "earth", "metal", "water"},
    "zodiac_signs_json": {
        "aries", "taurus", "gemini", "cancer", "leo", "virgo", "libra", "scorpio",
        "sagittarius", "capricorn", "aquarius", "pisces",
    },
}

ALLOWED_SCALAR_VALUES = {
    "primary_intention": {
        "calm", "protection", "love", "sleep", "grounding", "focus", "abundance", "clarity",
        "confidence", "emotional_healing", "intuition", "self_love", "emotional_balance",
    },
    "product_form": {"bracelet", "necklace", "ring", "earrings", "anklet", "pendant", "tumbled_stone", "raw_stone", "set", "ritual_kit"},
    "data_status": {"draft", "ai_filled", "human_reviewed", "approved"},
}

SHOPIFY_COLUMNS = [
    ("Handle", "handle"),
    ("Title", "product_title"),
    ("Metafield: askcrystal.primary_intention [single_line_text_field]", "primary_intention"),
    ("Metafield: askcrystal.secondary_intentions [list.single_line_text_field]", "secondary_intentions_json"),
    ("Metafield: askcrystal.product_form [single_line_text_field]", "product_form"),
    ("Metafield: askcrystal.chakras [list.single_line_text_field]", "chakra_keys_json"),
    ("Metafield: askcrystal.color_families [list.single_line_text_field]", "color_families_json"),
    ("Metafield: askcrystal.ritual_uses [list.single_line_text_field]", "ritual_uses_json"),
    ("Metafield: askcrystal.gift_for [list.single_line_text_field]", "gift_for_json"),
    ("Metafield: askcrystal.western_elements [list.single_line_text_field]", "western_elements_json"),
    ("Metafield: askcrystal.five_elements [list.single_line_text_field]", "five_elements_json"),
    ("Metafield: askcrystal.zodiac_signs [list.single_line_text_field]", "zodiac_signs_json"),
    ("Metafield: askcrystal.energetic_properties [list.single_line_text_field]", "energetic_properties_json"),
    ("Metafield: askcrystal.archetype_name [single_line_text_field]", "archetype_name"),
    ("Metafield: askcrystal.story_headline [single_line_text_field]", "story_headline"),
    ("Metafield: askcrystal.story_summary [multi_line_text_field]", "story_summary"),
    ("Metafield: askcrystal.benefits [list.single_line_text_field]", "benefits_json"),
    ("Metafield: askcrystal.ritual_title [single_line_text_field]", "ritual_title"),
    ("Metafield: askcrystal.ritual_steps [list.single_line_text_field]", "ritual_steps_json"),
    ("Metafield: askcrystal.care_steps [list.single_line_text_field]", "care_steps_json"),
    ("Metafield: askcrystal.included_items [list.single_line_text_field]", "included_items_json"),
    ("Metafield: askcrystal.quality_notes [list.single_line_text_field]", "quality_notes_json"),
    ("Metafield: askcrystal.pairing_notes [multi_line_text_field]", "pairing_notes"),
    ("Metafield: askcrystal.safety_note [multi_line_text_field]", "safety_note"),
    ("Metafield: askcrystal.agent_summary [multi_line_text_field]", "agent_summary"),
    ("Metafield: askcrystal.agent_tags [list.single_line_text_field]", "agent_tags_json"),
    ("Metafield: askcrystal.data_status [single_line_text_field]", "data_status"),
]


def load_rows(path: Path) -> list[dict[str, str]]:
    with path.open(newline="", encoding="utf-8") as handle:
        return list(csv.DictReader(handle))


def parse_json_list(value: str, row_number: int, column: str) -> list[str]:
    if not value.strip():
        return []
    try:
        parsed = json.loads(value)
    except json.JSONDecodeError as exc:
        raise ValueError(f"row {row_number}: {column} is not valid JSON: {exc.msg}") from exc
    if not isinstance(parsed, list) or not all(isinstance(item, str) and item.strip() for item in parsed):
        raise ValueError(f"row {row_number}: {column} must be a JSON array of non-empty strings")
    return [item.strip() for item in parsed]


def validate_rows(rows: list[dict[str, str]]) -> None:
    if not rows:
        raise ValueError("enrichment CSV has no product rows")

    missing_columns = [column for column in REQUIRED_COLUMNS if column not in rows[0]]
    if missing_columns:
        raise ValueError(f"enrichment CSV missing required columns: {', '.join(missing_columns)}")

    seen_handles: set[str] = set()
    for index, row in enumerate(rows, start=2):
        handle = row.get("handle", "").strip()
        if not handle:
            raise ValueError(f"row {index}: handle is required")
        if handle in seen_handles:
            raise ValueError(f"row {index}: duplicate handle {handle}")
        seen_handles.add(handle)

        for column in REQUIRED_COLUMNS:
            if not row.get(column, "").strip():
                raise ValueError(f"row {index}: {column} is required")

        for column in JSON_LIST_COLUMNS:
            values = parse_json_list(row.get(column, ""), index, column)
            allowed_values = CANONICAL_VALUES.get(column)
            if allowed_values:
                invalid = [value for value in values if value not in allowed_values]
                if invalid:
                    raise ValueError(f"row {index}: {column} contains invalid values: {', '.join(invalid)}")

        for column, allowed_values in ALLOWED_SCALAR_VALUES.items():
            value = row.get(column, "").strip()
            if value not in allowed_values:
                raise ValueError(f"row {index}: {column} must be one of: {', '.join(sorted(allowed_values))}")


def write_shopify_csv(rows: list[dict[str, str]], output_path: Path) -> None:
    output_path.parent.mkdir(parents=True, exist_ok=True)
    with output_path.open("w", newline="", encoding="utf-8") as handle:
        writer = csv.DictWriter(handle, fieldnames=[column for column, _source in SHOPIFY_COLUMNS])
        writer.writeheader()
        for row in rows:
            writer.writerow({column: row.get(source, "").strip() for column, source in SHOPIFY_COLUMNS})


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument(
        "input",
        nargs="?",
        default="data/shopify/templates/askcrystal-product-enrichment-template.csv",
        help="Path to AskCrystal enrichment CSV",
    )
    parser.add_argument(
        "--output",
        default="data/shopify/generated/askcrystal-shopify-product-metafields.csv",
        help="Path to write Shopify-shaped product metafield CSV",
    )
    args = parser.parse_args()

    input_path = Path(args.input)
    output_path = Path(args.output)
    rows = load_rows(input_path)
    validate_rows(rows)
    write_shopify_csv(rows, output_path)
    print(f"validated {len(rows)} row(s)")
    print(f"wrote {output_path}")
    return 0


if __name__ == "__main__":
    try:
        raise SystemExit(main())
    except ValueError as exc:
        print(f"error: {exc}", file=sys.stderr)
        raise SystemExit(1)
