from __future__ import annotations

from dataclasses import dataclass, field
from pathlib import Path
from typing import Any

try:
    from .skill_runtime import load_json
except ImportError:  # pragma: no cover
    from skill_runtime import load_json


@dataclass(slots=True)
class CrystalIndex:
    data_path: Path
    _payload: dict[str, Any] = field(init=False, repr=False)
    _crystals: dict[str, Any] = field(init=False, repr=False)

    def __post_init__(self) -> None:
        payload = load_json(self.data_path)
        crystals = payload.get("crystals", {})
        if not isinstance(crystals, dict):
            raise ValueError("Expected 'crystals' to be a dictionary")

        self._payload = payload
        self._crystals = crystals

    def list_crystals(self, limit: int = 50) -> list[dict[str, Any]]:
        out: list[dict[str, Any]] = []
        for slug, item in self._crystals.items():
            out.append(
                {
                    "slug": slug,
                    "name": item.get("name", slug),
                    "element": item.get("element"),
                    "chakra": item.get("chakra"),
                    "zodiac": item.get("zodiac", []),
                    "keywords": item.get("keywords", []),
                }
            )
            if len(out) >= limit:
                break
        return out

    def get_crystal(self, slug: str) -> dict[str, Any] | None:
        item = self._crystals.get(slug)
        if item is None:
            return None
        return {"slug": slug, **item}

    def search(
        self,
        query: str = "",
        element: str | None = None,
        chakra: str | None = None,
        zodiac: str | None = None,
        limit: int = 8,
    ) -> list[dict[str, Any]]:
        q = query.strip().lower()
        element = (element or "").strip().lower() or None
        chakra = (chakra or "").strip().lower() or None
        zodiac = (zodiac or "").strip().lower() or None

        results: list[tuple[int, dict[str, Any]]] = []
        for slug, item in self._crystals.items():
            score = 0

            item_element = str(item.get("element", "")).lower()
            item_chakra = str(item.get("chakra", "")).lower()
            item_zodiac = [str(z).lower() for z in item.get("zodiac", [])]

            if element and item_element != element:
                continue
            if chakra and item_chakra != chakra:
                continue
            if zodiac and zodiac not in item_zodiac:
                continue

            if q:
                blob_parts: list[str] = [
                    str(item.get("name", "")),
                    str(item.get("color", "")),
                    str(item.get("affirmation", "")),
                    " ".join([str(x) for x in item.get("aliases", [])]),
                    " ".join([str(x) for x in item.get("keywords", [])]),
                ]

                healing = item.get("healing_properties", {})
                if isinstance(healing, dict):
                    blob_parts.extend([str(v) for v in healing.values()])

                blob = "\n".join(blob_parts).lower()
                if q not in blob:
                    continue

                score += 2

            if element:
                score += 1
            if chakra:
                score += 1
            if zodiac:
                score += 1

            results.append(
                (
                    score,
                    {
                        "slug": slug,
                        "name": item.get("name", slug),
                        "element": item.get("element"),
                        "chakra": item.get("chakra"),
                        "zodiac": item.get("zodiac", []),
                        "keywords": item.get("keywords", []),
                        "affirmation": item.get("affirmation"),
                    },
                )
            )

        results.sort(key=lambda pair: pair[0], reverse=True)
        return [row for _, row in results[:limit]]
