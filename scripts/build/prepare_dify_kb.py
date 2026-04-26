from __future__ import annotations

import sys

ROOT_DIR = Path(__file__).resolve().parents[2]
if str(ROOT_DIR) not in sys.path:
    sys.path.insert(0, str(ROOT_DIR))

import argparse
import json
import re
from pathlib import Path
from typing import Any


def slugify(value: str) -> str:
    value = value.lower().strip()
    value = re.sub(r"[^a-z0-9]+", "-", value)
    return value.strip("-") or "item"


def to_bullet_lines(items: list[Any]) -> str:
    if not items:
        return "- N/A"
    lines = []
    for item in items:
        lines.append(f"- {item}")
    return "\n".join(lines)


def dict_to_lines(data: dict[str, Any]) -> str:
    if not data:
        return "- N/A"
    lines = []
    for key, value in data.items():
        if isinstance(value, list):
            joined = ", ".join(str(v) for v in value)
            lines.append(f"- {key}: {joined}")
        elif isinstance(value, dict):
            compact = ", ".join(f"{k}={v}" for k, v in value.items())
            lines.append(f"- {key}: {compact}")
        else:
            lines.append(f"- {key}: {value}")
    return "\n".join(lines)


def as_text(value: Any) -> str:
    if value is None:
        return "N/A"
    if isinstance(value, (dict, list)):
        try:
            return json.dumps(value, ensure_ascii=False)
        except TypeError:
            return str(value)
    return str(value)


def crystal_markdown(slug: str, crystal: dict[str, Any]) -> str:
    name = crystal.get("name", slug)
    aliases = crystal.get("aliases", [])
    zodiac = crystal.get("zodiac", [])
    keywords = crystal.get("keywords", [])

    lines = [
        f"# {name}",
        "",
        "## Quick Facts",
        f"- Slug: {slug}",
        f"- Color: {crystal.get('color', 'N/A')}",
        f"- Chakra: {crystal.get('chakra', 'N/A')}",
        f"- Element: {crystal.get('element', 'N/A')}",
        f"- Hardness: {crystal.get('hardness', 'N/A')}",
        f"- Vibration: {crystal.get('vibration', 'N/A')}",
        f"- Numerology: {crystal.get('numerology', 'N/A')}",
        f"- Planetary Ruler: {crystal.get('planetary_ruler', 'N/A')}",
        f"- Planetary Energy: {crystal.get('planetary_energy', 'N/A')}",
        f"- Rarity: {crystal.get('rarity', 'N/A')}",
        "",
        "## Aliases",
        to_bullet_lines(aliases),
        "",
        "## Zodiac",
        to_bullet_lines(zodiac),
        "",
        "## Keywords",
        to_bullet_lines(keywords),
        "",
        "## Affirmation",
        as_text(crystal.get("affirmation", "N/A")),
        "",
        "## Healing Properties",
        dict_to_lines(crystal.get("healing_properties", {})),
        "",
        "## Usage Methods",
        dict_to_lines(crystal.get("usage_methods", {})),
        "",
        "## Pairings",
        to_bullet_lines(crystal.get("pairings", [])),
        "",
        "## Avoid Pairings",
        to_bullet_lines(crystal.get("avoid_pairings", [])),
        "",
        "## Care",
        dict_to_lines(crystal.get("care", {})),
        "",
        "## Scientific Notes",
        as_text(crystal.get("scientific_notes", "N/A")),
        "",
        "## Optimal Timing",
        dict_to_lines(crystal.get("optimal_timing", {})),
        "",
        "## Validation",
        dict_to_lines(crystal.get("validation", {})),
        "",
        "## Varieties",
        to_bullet_lines(crystal.get("varieties", [])),
        "",
    ]
    return "\n".join(lines)


def mapping_markdown(title: str, data: dict[str, Any]) -> str:
    lines = [f"# {title}", ""]
    for key, value in data.items():
        lines.append(f"## {key}")
        if isinstance(value, dict):
            lines.append(dict_to_lines(value))
        elif isinstance(value, list):
            lines.append(to_bullet_lines(value))
        else:
            lines.append(f"- {value}")
        lines.append("")
    return "\n".join(lines)


def build_docs(input_path: Path, output_dir: Path) -> None:
    payload = json.loads(input_path.read_text(encoding="utf-8"))
    crystals = payload.get("crystals", {})

    crystals_dir = output_dir / "crystals"
    maps_dir = output_dir / "mappings"
    crystals_dir.mkdir(parents=True, exist_ok=True)
    maps_dir.mkdir(parents=True, exist_ok=True)

    for slug, crystal in crystals.items():
        filename = slugify(slug) + ".md"
        (crystals_dir / filename).write_text(
            crystal_markdown(slug, crystal), encoding="utf-8"
        )

    for key in ["zodiac_mapping", "chakra_mapping", "element_mapping"]:
        mapping = payload.get(key, {})
        title = key.replace("_", " ").title()
        (maps_dir / f"{key}.md").write_text(
            mapping_markdown(title, mapping), encoding="utf-8"
        )

    metadata = payload.get("metadata", {})
    sources = payload.get("sources", {})
    index_lines = [
        "# AskCrystal Knowledge Base Index",
        "",
        f"- Source JSON: {input_path.name}",
        f"- Total crystals: {len(crystals)}",
        "",
        "## Metadata",
        dict_to_lines(metadata),
        "",
        "## Sources",
        dict_to_lines(sources),
        "",
        "## Generated Structure",
        "- crystals/: One markdown document per crystal",
        "- mappings/: Zodiac, chakra, and element mapping docs",
        "",
    ]
    (output_dir / "index.md").write_text("\n".join(index_lines), encoding="utf-8")


def main() -> None:
    parser = argparse.ArgumentParser(description="Prepare Dify-friendly KB docs from crystal JSON")
    parser.add_argument(
        "--input",
        default="data/knowledge-base/crystal_knowledge_base_final-90b679ba5d.json",
        help="Path to knowledge base JSON",
    )
    parser.add_argument(
        "--output",
        default="data/knowledge-base/dify_kb_docs",
        help="Output directory for generated markdown docs",
    )
    args = parser.parse_args()

    input_path = Path(args.input).resolve()
    output_dir = Path(args.output).resolve()
    output_dir.mkdir(parents=True, exist_ok=True)

    build_docs(input_path, output_dir)
    print(f"Generated Dify KB docs at: {output_dir}")


if __name__ == "__main__":
    main()
