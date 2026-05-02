#!/usr/bin/env python3
"""AskCrystal Shopify operations CLI."""

from __future__ import annotations

import argparse
import html
import json
import os
import re
import sys
from dataclasses import dataclass
from pathlib import Path
from typing import Any

REPO_ROOT = Path(__file__).resolve().parents[1]
BUILD_SCRIPTS_DIR = REPO_ROOT / "scripts/build"
if str(BUILD_SCRIPTS_DIR) not in sys.path:
    sys.path.insert(0, str(BUILD_SCRIPTS_DIR))

from provision_shopify_custom_data import ShopifyAdminClient, ProvisioningError, load_project_env, resolve_admin_access_token

CATALOG_DIR = REPO_ROOT / "data/shopify/catalog"
PRODUCTS_DIR = CATALOG_DIR / "products"
COLLECTIONS_DIR = CATALOG_DIR / "collections"
ASSETS_DIR = CATALOG_DIR / "assets"
PRODUCT_SCHEMA = CATALOG_DIR / "schemas/product.schema.json"
COLLECTION_SCHEMA = CATALOG_DIR / "schemas/collection.schema.json"
FACETS_CONFIG = CATALOG_DIR / "facets.askcrystal.json"
METAOBJECT_ENTRIES = REPO_ROOT / "data/shopify/metaobject-entries.askcrystal.json"
PREMIUM_ARTIST_PRICE_THRESHOLD = 99.99

INVENTORY_KEYS = {
    "inventory_quantity",
    "inventory_quantities",
    "inventory_level",
    "inventory_levels",
    "available_quantity",
    "stock",
    "stock_quantity",
    "quantity_available",
}

PRODUCT_BY_IDENTIFIER = """
query AskCrystalCatalogProductByHandle($handle: String!) {
  product: productByIdentifier(identifier: { handle: $handle }) {
    id
    handle
    title
    descriptionHtml
    vendor
    productType
    status
    tags
    collections(first: 100) {
      nodes {
        handle
      }
    }
    options {
      name
      values
    }
    variants(first: 100) {
      nodes {
        id
        title
        sku
        price
        compareAtPrice
        barcode
        taxable
        selectedOptions {
          name
          value
        }
      }
    }
    metafields(namespace: "askcrystal", first: 100) {
      nodes {
        key
        type
        value
        references(first: 20) {
          nodes {
            ... on Metaobject {
              handle
              type
            }
          }
        }
      }
    }
  }
}
"""

COLLECTION_BY_IDENTIFIER = """
query AskCrystalCatalogCollectionByHandle($handle: String!) {
  collection: collectionByIdentifier(identifier: { handle: $handle }) {
    id
    handle
    title
    descriptionHtml
    sortOrder
    ruleSet {
      appliedDisjunctively
      rules {
        column
        relation
        condition
      }
    }
    products(first: 250) {
      nodes {
        handle
      }
    }
  }
}
"""

COLLECTION_CREATE = """
mutation AskCrystalCollectionCreate($input: CollectionInput!) {
  collectionCreate(input: $input) {
    collection {
      id
      handle
      title
    }
    userErrors {
      field
      message
    }
  }
}
"""

COLLECTION_UPDATE = """
mutation AskCrystalCollectionUpdate($input: CollectionInput!) {
  collectionUpdate(input: $input) {
    collection {
      id
      handle
      title
    }
    userErrors {
      field
      message
    }
  }
}
"""

PUBLISHABLE_PUBLISH = """
mutation AskCrystalPublishCollection($id: ID!, $input: [PublicationInput!]!) {
  publishablePublish(id: $id, input: $input) {
    publishable {
      ... on Collection {
        id
      }
    }
    userErrors {
      field
      message
    }
  }
}
"""

PUBLICATIONS = """
query AskCrystalPublications {
  publications(first: 50) {
    nodes {
      id
      name
    }
  }
}
"""

PRODUCT_SET = """
mutation AskCrystalProductSet(
  $input: ProductSetInput!
  $identifier: ProductSetIdentifiers
  $synchronous: Boolean!
) {
  productSet(input: $input, identifier: $identifier, synchronous: $synchronous) {
    product {
      id
      handle
      title
      status
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

ASKCRYSTAL_METAFIELD_SOURCES = {
    "primary_intention": ("primary_intention", "scalar"),
    "secondary_intentions": ("secondary_intentions", "list"),
    "product_form": ("product_form", "scalar"),
    "crystal_materials": ("crystal_material_handles", "material_refs"),
    "artist": ("artist_handle", "artist_ref_optional"),
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

REVIEWED_PRODUCT_STATUSES = {"human_reviewed", "approved"}
OPTION_VALUE_FIELDS = {"gift_for", "western_elements", "five_elements", "zodiac_signs"}
SINGLE_METAOBJECT_REF_MODES = {"artist_ref_optional": "askcrystal_artist"}

COLLECTION_SORT_ORDER_INPUT = {
    "manual": "MANUAL",
    "best-selling": "BEST_SELLING",
    "title-ascending": "ALPHA_ASC",
    "title-descending": "ALPHA_DESC",
    "created": "CREATED",
    "created-descending": "CREATED_DESC",
    "price-ascending": "PRICE_ASC",
    "price-descending": "PRICE_DESC",
}


@dataclass
class ValidationIssue:
    level: str
    file: Path
    path: str
    message: str

    def format(self) -> str:
        location = f"{self.file}:{self.path}" if self.path else str(self.file)
        return f"[{self.level}] {location} - {self.message}"


def load_json(path: Path) -> Any:
    try:
        return json.loads(path.read_text(encoding="utf-8"))
    except FileNotFoundError as exc:
        raise SystemExit(f"file not found: {path}") from exc
    except json.JSONDecodeError as exc:
        raise SystemExit(f"invalid JSON in {path}: {exc}") from exc


def json_files(directory: Path) -> list[Path]:
    if not directory.exists():
        return []
    return sorted(path for path in directory.glob("*.json") if path.is_file())


def path_join(path: str, key: str | int) -> str:
    if isinstance(key, int):
        return f"{path}[{key}]"
    if not path:
        return key
    return f"{path}.{key}"


def type_matches(value: Any, expected: str) -> bool:
    if expected == "object":
        return isinstance(value, dict)
    if expected == "array":
        return isinstance(value, list)
    if expected == "string":
        return isinstance(value, str)
    if expected == "integer":
        return isinstance(value, int) and not isinstance(value, bool)
    if expected == "number":
        return isinstance(value, (int, float)) and not isinstance(value, bool)
    if expected == "boolean":
        return isinstance(value, bool)
    if expected == "null":
        return value is None
    return True


def schema_matches(value: Any, schema: dict[str, Any], root_schema: dict[str, Any]) -> bool:
    return not validate_schema(value, schema, root_schema, Path("<schema>"), "")


def resolve_ref(ref: str, root_schema: dict[str, Any]) -> dict[str, Any]:
    if not ref.startswith("#/"):
        raise ValueError(f"only local JSON schema refs are supported: {ref}")
    target: Any = root_schema
    for part in ref.removeprefix("#/").split("/"):
        target = target[part]
    if not isinstance(target, dict):
        raise ValueError(f"schema ref does not point to an object: {ref}")
    return target


def validate_schema(
    value: Any,
    schema: dict[str, Any],
    root_schema: dict[str, Any],
    file: Path,
    path: str,
) -> list[ValidationIssue]:
    issues: list[ValidationIssue] = []

    if "$ref" in schema:
        return validate_schema(value, resolve_ref(schema["$ref"], root_schema), root_schema, file, path)

    for sub_schema in schema.get("allOf", []):
        issues.extend(validate_schema(value, sub_schema, root_schema, file, path))

    if "if" in schema and "then" in schema and schema_matches(value, schema["if"], root_schema):
        issues.extend(validate_schema(value, schema["then"], root_schema, file, path))

    if "anyOf" in schema and not any(schema_matches(value, candidate, root_schema) for candidate in schema["anyOf"]):
        issues.append(ValidationIssue("error", file, path, "must match at least one allowed shape"))

    expected_type = schema.get("type")
    if expected_type is not None:
        expected_types = expected_type if isinstance(expected_type, list) else [expected_type]
        if not any(type_matches(value, candidate) for candidate in expected_types):
            issues.append(
                ValidationIssue(
                    "error",
                    file,
                    path,
                    f"expected type {'/'.join(expected_types)}, got {type(value).__name__}",
                )
            )
            return issues

    if "const" in schema and value != schema["const"]:
        issues.append(ValidationIssue("error", file, path, f"must equal {schema['const']!r}"))

    if "enum" in schema and value not in schema["enum"]:
        issues.append(ValidationIssue("error", file, path, f"must be one of: {', '.join(map(str, schema['enum']))}"))

    if isinstance(value, str):
        if "minLength" in schema and len(value) < int(schema["minLength"]):
            issues.append(ValidationIssue("error", file, path, f"must be at least {schema['minLength']} characters"))
        if "pattern" in schema and not re.fullmatch(schema["pattern"], value):
            issues.append(ValidationIssue("error", file, path, f"does not match pattern {schema['pattern']}"))

    if isinstance(value, list):
        if "minItems" in schema and len(value) < int(schema["minItems"]):
            issues.append(ValidationIssue("error", file, path, f"must contain at least {schema['minItems']} item(s)"))
        if schema.get("uniqueItems"):
            encoded_items = [json.dumps(item, sort_keys=True, ensure_ascii=False) for item in value]
            if len(encoded_items) != len(set(encoded_items)):
                issues.append(ValidationIssue("error", file, path, "must not contain duplicate items"))
        item_schema = schema.get("items")
        if isinstance(item_schema, dict):
            for index, item in enumerate(value):
                issues.extend(validate_schema(item, item_schema, root_schema, file, path_join(path, index)))

    if isinstance(value, dict):
        required = schema.get("required") or []
        for key in required:
            if key not in value:
                issues.append(ValidationIssue("error", file, path_join(path, key), "is required"))

        properties = schema.get("properties") or {}
        if schema.get("additionalProperties") is False:
            for key in sorted(set(value) - set(properties)):
                issues.append(ValidationIssue("error", file, path_join(path, key), "is not allowed"))

        for key, property_schema in properties.items():
            if key in value:
                issues.extend(validate_schema(value[key], property_schema, root_schema, file, path_join(path, key)))

    return issues


def find_inventory_keys(value: Any, file: Path, path: str = "") -> list[ValidationIssue]:
    issues: list[ValidationIssue] = []
    if isinstance(value, dict):
        for key, item in value.items():
            child_path = path_join(path, key)
            if key in INVENTORY_KEYS:
                issues.append(
                    ValidationIssue(
                        "error",
                        file,
                        child_path,
                        "inventory belongs to a separate system and must not be managed in local catalog files",
                    )
                )
            issues.extend(find_inventory_keys(item, file, child_path))
    elif isinstance(value, list):
        for index, item in enumerate(value):
            issues.extend(find_inventory_keys(item, file, path_join(path, index)))
    return issues


def load_material_handles() -> set[str]:
    entries = load_json(METAOBJECT_ENTRIES).get("entries", [])
    return {
        entry["handle"]
        for entry in entries
        if entry.get("type") == "askcrystal_crystal_material" and entry.get("handle")
    }


def load_artist_handles() -> set[str]:
    entries = load_json(METAOBJECT_ENTRIES).get("entries", [])
    return {
        entry["handle"]
        for entry in entries
        if entry.get("type") == "askcrystal_artist" and entry.get("handle")
    }


def load_material_values() -> list[dict[str, str]]:
    entries = load_json(METAOBJECT_ENTRIES).get("entries", [])
    values: list[dict[str, str]] = []
    for entry in entries:
        if entry.get("type") != "askcrystal_crystal_material" or not entry.get("handle"):
            continue
        fields = entry.get("fields") or {}
        label = fields.get("name") or entry["handle"].replace("_", " ").title()
        values.append({"value": entry["handle"], "label": str(label)})
    return values


def load_facets_config(path: Path = FACETS_CONFIG) -> dict[str, Any]:
    config = load_json(path)
    axes = config.get("axes")
    if not isinstance(axes, list):
        raise SystemExit(f"{path} must include an axes list")
    return config


def normalize_facet_value(value: Any) -> str:
    return str(value or "").strip().lower().replace(" ", "_").replace("-", "_")


def facet_tag(prefix: str, value: Any) -> str:
    return f"{prefix}:{normalize_facet_value(value)}"


def axis_values(axis: dict[str, Any]) -> list[dict[str, str]]:
    if axis.get("source") == "metaobject_entries":
        return load_material_values()
    values = axis.get("values") or []
    return [
        {
            **value,
            "value": str(value["value"]),
            "label": str(value.get("label") or value["value"]).strip(),
        }
        for value in values
        if isinstance(value, dict) and value.get("value")
    ]


def product_values_for_axis(askcrystal: dict[str, Any], axis: dict[str, Any]) -> list[str]:
    values: list[str] = []
    if axis.get("local_fields"):
        for field in axis["local_fields"]:
            raw_value = askcrystal.get(field)
            if isinstance(raw_value, list):
                values.extend(str(value) for value in raw_value if str(value).strip())
            elif raw_value:
                values.append(str(raw_value))
    else:
        raw_value = askcrystal.get(axis.get("local_field", ""))
        if isinstance(raw_value, list):
            values.extend(str(value) for value in raw_value if str(value).strip())
        elif raw_value:
            values.append(str(raw_value))
    return sorted({normalize_facet_value(value) for value in values})


def generated_facet_tags(product: dict[str, Any], facets_config: dict[str, Any] | None = None) -> list[str]:
    facets_config = facets_config or load_facets_config()
    askcrystal = product.get("askcrystal") or {}
    tags: set[str] = set()
    for axis in facets_config.get("axes", []):
        tag_prefix = axis.get("tag_prefix")
        if not tag_prefix:
            continue
        allowed_values = {normalize_facet_value(value["value"]) for value in axis_values(axis)}
        for value in product_values_for_axis(askcrystal, axis):
            if value in allowed_values:
                tags.add(facet_tag(str(tag_prefix), value))
    return sorted(tags)


def effective_product_tags(product: dict[str, Any], facets_config: dict[str, Any] | None = None) -> list[str]:
    manual_tags = [str(tag) for tag in product.get("tags", []) if str(tag).strip()]
    return sorted(set(manual_tags) | set(generated_facet_tags(product, facets_config)))


def template_text(template: str, *, value: str, label: str) -> str:
    handle_value = value.replace("_", "-")
    return template.format(
        value=value,
        handle_value=handle_value,
        label=label,
        label_lower=label.lower(),
    )


def generated_facet_collection_plans(facets_config: dict[str, Any]) -> list[dict[str, Any]]:
    plans: list[dict[str, Any]] = []
    for axis in facets_config.get("axes", []):
        tag_prefix = axis.get("tag_prefix")
        if not tag_prefix:
            continue
        for value_config in axis_values(axis):
            value = normalize_facet_value(value_config["value"])
            label = value_config["label"]
            handle = value_config.get("collection_handle")
            title = value_config.get("collection_title")
            if not handle:
                handle_template = axis.get("collection_handle_template") or "{handle_value}"
                handle = template_text(str(handle_template), value=value, label=label)
            if not title:
                title_template = axis.get("collection_title_template") or "{label}"
                title = template_text(str(title_template), value=value, label=label)
            description_template = axis.get("collection_description_template") or ""
            description = template_text(str(description_template), value=value, label=label) if description_template else ""
            plans.append(
                {
                    "schema_version": 1,
                    "handle": handle,
                    "workflow_status": "approved",
                    "shopify_status": "active",
                    "title": title,
                    "description": description,
                    "image": None,
                    "rules": {
                        "mode": "tag",
                        "required_tags": [facet_tag(str(tag_prefix), value)],
                    },
                    "sort_order": "best-selling",
                    "_generated_from_facet": axis.get("key"),
                }
            )
    return plans


def collection_rule_set_for_tags(required_tags: list[str]) -> dict[str, Any]:
    return {
        "appliedDisjunctively": False,
        "rules": [
            {
                "column": "TAG",
                "relation": "EQUALS",
                "condition": tag,
            }
            for tag in required_tags
        ],
    }


def remote_collection_required_tags(collection: dict[str, Any] | None) -> list[str]:
    if not collection:
        return []
    rule_set = collection.get("ruleSet") or {}
    if rule_set.get("appliedDisjunctively"):
        return []
    tags: list[str] = []
    for rule in rule_set.get("rules") or []:
        if rule.get("column") == "TAG" and rule.get("relation") == "EQUALS" and rule.get("condition"):
            tags.append(str(rule["condition"]))
    return sorted(tags)


def variant_prices(product: dict[str, Any]) -> list[float]:
    prices: list[float] = []
    for variant in product.get("variants") or []:
        try:
            prices.append(float(variant.get("price")))
        except (TypeError, ValueError):
            continue
    return prices


def is_premium_product(product: dict[str, Any]) -> bool:
    return any(price >= PREMIUM_ARTIST_PRICE_THRESHOLD for price in variant_prices(product))


def validate_premium_artist_policy(
    *,
    product: dict[str, Any],
    file: Path,
    artist_handles: set[str],
) -> list[ValidationIssue]:
    issues: list[ValidationIssue] = []
    askcrystal = product.get("askcrystal") or {}
    artist_handle = askcrystal.get("artist_handle")
    normalized_artist_handle = str(artist_handle).strip() if artist_handle is not None else ""

    if is_premium_product(product) and not normalized_artist_handle:
        issues.append(
            ValidationIssue(
                "error",
                file,
                "askcrystal.artist_handle",
                f"products priced at ${PREMIUM_ARTIST_PRICE_THRESHOLD:.2f}+ require a seeded artist_handle",
            )
        )
        return issues

    if normalized_artist_handle and normalized_artist_handle not in artist_handles:
        issues.append(
            ValidationIssue(
                "error",
                file,
                "askcrystal.artist_handle",
                f"references missing artist metaobject seed {normalized_artist_handle!r}",
            )
        )

    return issues


def validate_product_cross_refs(
    *,
    product: dict[str, Any],
    file: Path,
    collection_handles: set[str],
    material_handles: set[str],
    artist_handles: set[str],
    sku_registry: dict[str, Path],
) -> list[ValidationIssue]:
    issues: list[ValidationIssue] = []
    handle = product.get("handle")
    if isinstance(handle, str) and file.stem != handle:
        issues.append(ValidationIssue("error", file, "handle", f"must match filename stem {file.stem!r}"))

    for collection_handle in product.get("collections", []):
        if collection_handle not in collection_handles:
            issues.append(
                ValidationIssue(
                    "error",
                    file,
                    "collections",
                    f"references missing local collection {collection_handle!r}",
                )
            )

    askcrystal = product.get("askcrystal") or {}
    for material_handle in askcrystal.get("crystal_material_handles", []):
        if material_handle not in material_handles:
            issues.append(
                ValidationIssue(
                    "error",
                    file,
                    "askcrystal.crystal_material_handles",
                    f"references missing material metaobject seed {material_handle!r}",
                )
            )

    issues.extend(validate_premium_artist_policy(product=product, file=file, artist_handles=artist_handles))

    workflow_status = product.get("workflow_status")
    data_status = askcrystal.get("data_status")
    if workflow_status and data_status and workflow_status != data_status:
        issues.append(
            ValidationIssue(
                "warning",
                file,
                "askcrystal.data_status",
                f"differs from workflow_status {workflow_status!r}; keep them aligned unless this is intentional",
            )
        )

    for index, variant in enumerate(product.get("variants", [])):
        sku = variant.get("sku")
        if not sku:
            continue
        if sku in sku_registry:
            issues.append(
                ValidationIssue(
                    "error",
                    file,
                    path_join("variants", index),
                    f"duplicate SKU {sku!r}; already used in {sku_registry[sku]}",
                )
            )
        else:
            sku_registry[sku] = file

    for index, media in enumerate(product.get("media", [])):
        src = media.get("src")
        if not isinstance(src, str) or src.startswith(("http://", "https://", "shopify://")):
            continue
        media_path = (REPO_ROOT / src).resolve()
        if not media_path.exists():
            issues.append(
                ValidationIssue(
                    "warning",
                    file,
                    path_join("media", index),
                    f"local media path does not exist yet: {src}",
                )
            )

    return issues


def validate_collection_cross_refs(
    *,
    collection: dict[str, Any],
    file: Path,
    product_handles: set[str],
) -> list[ValidationIssue]:
    issues: list[ValidationIssue] = []
    handle = collection.get("handle")
    if isinstance(handle, str) and file.stem != handle:
        issues.append(ValidationIssue("error", file, "handle", f"must match filename stem {file.stem!r}"))

    rules = collection.get("rules") or {}
    for product_handle in rules.get("product_handles", []):
        if product_handle not in product_handles:
            issues.append(
                ValidationIssue(
                    "error",
                    file,
                    "rules.product_handles",
                    f"references missing local product {product_handle!r}",
                )
            )
    return issues


@dataclass
class DiffItem:
    kind: str
    handle: str
    field: str
    local: Any
    remote: Any

    def format(self) -> str:
        local = json.dumps(self.local, ensure_ascii=False, sort_keys=True) if isinstance(self.local, (list, dict)) else repr(self.local)
        remote = json.dumps(self.remote, ensure_ascii=False, sort_keys=True) if isinstance(self.remote, (list, dict)) else repr(self.remote)
        return f"[{self.kind}] {self.handle}:{self.field} local={local} remote={remote}"


def html_to_textish(value: Any) -> str:
    if not isinstance(value, str):
        return ""
    text = re.sub(r"<br\\s*/?>", "\n", value, flags=re.IGNORECASE)
    text = re.sub(r"</p\\s*>", "\n", text, flags=re.IGNORECASE)
    text = re.sub(r"<[^>]+>", "", text)
    return re.sub(r"\s+", " ", text).strip()


def normalize_text(value: Any) -> str:
    if value is None:
        return ""
    return re.sub(r"\s+", " ", str(value)).strip()


def normalize_status(value: Any) -> str:
    return str(value or "").strip().lower()


def normalize_sort_order(value: Any) -> str:
    return normalize_status(value).replace("_", "-")


def sorted_strings(values: Any) -> list[str]:
    if not isinstance(values, list):
        return []
    return sorted(str(value) for value in values)


def selected_option_values(variant: dict[str, Any]) -> list[str]:
    return [str(option.get("value", "")) for option in variant.get("selectedOptions", []) if option.get("value") is not None]


def remote_metafield_map(product: dict[str, Any]) -> dict[str, dict[str, Any]]:
    return {
        metafield.get("key"): metafield
        for metafield in ((product.get("metafields") or {}).get("nodes") or [])
        if metafield.get("key")
    }


def expected_metafield_value(askcrystal: dict[str, Any], local_key: str, mode: str) -> Any:
    value = askcrystal.get(local_key)
    if mode == "scalar_optional":
        return "" if value is None else str(value)
    if mode == "scalar":
        return "" if value is None else str(value)
    if mode in {"list", "material_refs"}:
        return value if isinstance(value, list) else []
    if mode in SINGLE_METAOBJECT_REF_MODES:
        return "" if value is None else str(value)
    return value


def remote_metafield_value(metafield: dict[str, Any] | None, mode: str) -> Any:
    if not metafield:
        return [] if mode in {"list", "material_refs"} else ""
    if mode == "material_refs":
        nodes = ((metafield.get("references") or {}).get("nodes") or [])
        return sorted(node.get("handle") for node in nodes if node.get("type") == "askcrystal_crystal_material")
    if mode in SINGLE_METAOBJECT_REF_MODES:
        metaobject_type = SINGLE_METAOBJECT_REF_MODES[mode]
        nodes = ((metafield.get("references") or {}).get("nodes") or [])
        for node in nodes:
            if node.get("type") == metaobject_type and node.get("handle"):
                return str(node["handle"])
        return ""
    if mode == "list":
        try:
            decoded = json.loads(metafield.get("value") or "[]")
        except json.JSONDecodeError:
            return metafield.get("value") or ""
        return decoded if isinstance(decoded, list) else []
    return metafield.get("value") or ""


def add_diff(diffs: list[DiffItem], kind: str, handle: str, field: str, local: Any, remote: Any) -> None:
    if local != remote:
        diffs.append(DiffItem(kind=kind, handle=handle, field=field, local=local, remote=remote))


def diff_product(local: dict[str, Any], remote: dict[str, Any] | None) -> list[DiffItem]:
    handle = local["handle"]
    if not remote:
        return [DiffItem("create", handle, "product", "present locally", "missing remotely")]

    diffs: list[DiffItem] = []
    add_diff(diffs, "update", handle, "title", normalize_text(local.get("title")), normalize_text(remote.get("title")))
    add_diff(
        diffs,
        "update",
        handle,
        "description",
        normalize_text(local.get("description")),
        html_to_textish(remote.get("descriptionHtml")),
    )
    add_diff(diffs, "update", handle, "vendor", normalize_text(local.get("vendor")), normalize_text(remote.get("vendor")))
    add_diff(
        diffs,
        "update",
        handle,
        "product_type",
        normalize_text(local.get("product_type")),
        normalize_text(remote.get("productType")),
    )
    add_diff(diffs, "update", handle, "shopify_status", normalize_status(local.get("shopify_status")), normalize_status(remote.get("status")))
    add_diff(diffs, "update", handle, "tags", effective_product_tags(local), sorted_strings(remote.get("tags")))
    add_diff(
        diffs,
        "update",
        handle,
        "collections",
        sorted_strings(local.get("collections")),
        sorted_strings([collection.get("handle") for collection in (remote.get("collections") or {}).get("nodes", [])]),
    )

    local_options = [
        {"name": option.get("name"), "values": option.get("values", [])}
        for option in local.get("options", [])
    ]
    remote_options = [
        {"name": option.get("name"), "values": option.get("values", [])}
        for option in remote.get("options", [])
    ]
    add_diff(diffs, "update", handle, "options", local_options, remote_options)

    remote_variants_by_sku = {
        variant.get("sku"): variant
        for variant in (remote.get("variants") or {}).get("nodes", [])
        if variant.get("sku")
    }
    local_skus = sorted(variant.get("sku") for variant in local.get("variants", []) if variant.get("sku"))
    remote_skus = sorted(remote_variants_by_sku)
    add_diff(diffs, "update", handle, "variant_skus", local_skus, remote_skus)
    for variant in local.get("variants", []):
        sku = variant.get("sku")
        if not sku:
            continue
        remote_variant = remote_variants_by_sku.get(sku)
        if not remote_variant:
            continue
        prefix = f"variants[{sku}]"
        add_diff(diffs, "update", handle, f"{prefix}.price", str(variant.get("price")), str(remote_variant.get("price")))
        add_diff(
            diffs,
            "update",
            handle,
            f"{prefix}.compare_at_price",
            "" if variant.get("compare_at_price") is None else str(variant.get("compare_at_price")),
            "" if remote_variant.get("compareAtPrice") is None else str(remote_variant.get("compareAtPrice")),
        )
        add_diff(
            diffs,
            "update",
            handle,
            f"{prefix}.barcode",
            "" if variant.get("barcode") is None else str(variant.get("barcode")),
            "" if remote_variant.get("barcode") is None else str(remote_variant.get("barcode")),
        )
        add_diff(
            diffs,
            "update",
            handle,
            f"{prefix}.option_values",
            [str(value) for value in variant.get("option_values", [])],
            selected_option_values(remote_variant),
        )
        if "taxable" in variant and remote_variant.get("taxable") is not None:
            add_diff(diffs, "update", handle, f"{prefix}.taxable", bool(variant.get("taxable")), bool(remote_variant.get("taxable")))

    askcrystal = local.get("askcrystal") or {}
    metafields = remote_metafield_map(remote)
    for remote_key, (local_key, mode) in ASKCRYSTAL_METAFIELD_SOURCES.items():
        local_value = expected_metafield_value(askcrystal, local_key, mode)
        remote_value = remote_metafield_value(metafields.get(remote_key), mode)
        if isinstance(local_value, list):
            local_value = sorted_strings(local_value)
        if isinstance(remote_value, list):
            remote_value = sorted_strings(remote_value)
        add_diff(diffs, "metafield", handle, f"askcrystal.{remote_key}", local_value, remote_value)

    return diffs


def diff_collection(local: dict[str, Any], remote: dict[str, Any] | None) -> list[DiffItem]:
    handle = local["handle"]
    if not remote:
        return [DiffItem("create", handle, "collection", "present locally", "missing remotely")]

    diffs: list[DiffItem] = []
    add_diff(diffs, "update", handle, "title", normalize_text(local.get("title")), normalize_text(remote.get("title")))
    add_diff(
        diffs,
        "update",
        handle,
        "description",
        normalize_text(local.get("description")),
        html_to_textish(remote.get("descriptionHtml")),
    )
    add_diff(diffs, "update", handle, "sort_order", normalize_sort_order(local.get("sort_order")), normalize_sort_order(remote.get("sortOrder")))
    rules = local.get("rules") or {}
    if rules.get("mode") == "manual":
        add_diff(
            diffs,
            "update",
            handle,
            "rules.product_handles",
            sorted_strings(rules.get("product_handles")),
            sorted_strings([product.get("handle") for product in (remote.get("products") or {}).get("nodes", [])]),
        )
    elif rules.get("mode") == "tag":
        add_diff(
            diffs,
            "update",
            handle,
            "rules.required_tags",
            sorted_strings(rules.get("required_tags")),
            remote_collection_required_tags(remote),
        )
    return diffs


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


def remote_product_by_handle(client: ShopifyAdminClient, handle: str) -> dict[str, Any] | None:
    try:
        return client.graphql(PRODUCT_BY_IDENTIFIER, {"handle": handle})["product"]
    except ProvisioningError as exc:
        raise SystemExit(f"error fetching product {handle}: {exc}") from exc


def remote_collection_by_handle(client: ShopifyAdminClient, handle: str) -> dict[str, Any] | None:
    try:
        return client.graphql(COLLECTION_BY_IDENTIFIER, {"handle": handle})["collection"]
    except ProvisioningError as exc:
        raise SystemExit(f"error fetching collection {handle}: {exc}") from exc


def remote_metaobject_id_by_handle(client: ShopifyAdminClient, metaobject_type: str, handle: str) -> str | None:
    try:
        result = client.graphql(METAOBJECT_BY_HANDLE, {"type": metaobject_type, "handle": handle})["metaobjectByHandle"]
    except ProvisioningError as exc:
        raise SystemExit(f"error fetching metaobject {metaobject_type}/{handle}: {exc}") from exc
    if not result:
        return None
    return str(result["id"])


def resolve_metaobject_id(
    *,
    client: ShopifyAdminClient,
    metaobject_type: str,
    handle: str,
    cache: dict[tuple[str, str], str],
) -> str | None:
    key = (metaobject_type, handle)
    if key not in cache:
        metaobject_id = remote_metaobject_id_by_handle(client, metaobject_type, handle)
        if metaobject_id:
            cache[key] = metaobject_id
    return cache.get(key)


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


def text_to_description_html(value: str) -> str:
    paragraphs = [paragraph.strip() for paragraph in re.split(r"\n{2,}", value or "") if paragraph.strip()]
    if not paragraphs:
        return ""
    return "\n".join(f"<p>{html.escape(paragraph).replace(chr(10), '<br>')}</p>" for paragraph in paragraphs)


def product_status_input(value: Any) -> str:
    normalized = normalize_status(value)
    if normalized == "active":
        return "ACTIVE"
    if normalized == "archived":
        return "ARCHIVED"
    return "DRAFT"


def metafield_value_for_product(
    *,
    client: ShopifyAdminClient | None,
    askcrystal: dict[str, Any],
    local_key: str,
    mode: str,
    material_cache: dict[str, str],
    resolve_remote_refs: bool,
    metaobject_cache: dict[tuple[str, str], str] | None = None,
) -> str | None:
    value = askcrystal.get(local_key)
    if mode == "scalar_optional":
        return None if value is None or str(value).strip() == "" else str(value)
    if mode == "scalar":
        return str(value or "")
    if mode == "list":
        values = value if isinstance(value, list) else []
        if not values and local_key in OPTION_VALUE_FIELDS:
            return None
        return json.dumps(values, ensure_ascii=False)
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
    if mode in SINGLE_METAOBJECT_REF_MODES:
        handle = str(value or "").strip()
        if not handle:
            return None
        if not resolve_remote_refs:
            return json.dumps(handle, ensure_ascii=False)
        assert client is not None
        metaobject_type = SINGLE_METAOBJECT_REF_MODES[mode]
        cache = metaobject_cache if metaobject_cache is not None else {}
        metaobject_id = resolve_metaobject_id(
            client=client,
            metaobject_type=metaobject_type,
            handle=handle,
            cache=cache,
        )
        if not metaobject_id:
            raise SystemExit(f"{metaobject_type} metaobject handle not found in Shopify: {handle}")
        return metaobject_id
    return str(value or "")


def product_metafields_input(
    *,
    client: ShopifyAdminClient | None,
    product: dict[str, Any],
    material_cache: dict[str, str],
    resolve_remote_refs: bool,
    metaobject_cache: dict[tuple[str, str], str] | None = None,
) -> list[dict[str, str]]:
    askcrystal = product.get("askcrystal") or {}
    metafields: list[dict[str, str]] = []
    for remote_key, (local_key, mode) in ASKCRYSTAL_METAFIELD_SOURCES.items():
        value = metafield_value_for_product(
            client=client,
            askcrystal=askcrystal,
            local_key=local_key,
            mode=mode,
            material_cache=material_cache,
            metaobject_cache=metaobject_cache,
            resolve_remote_refs=resolve_remote_refs,
        )
        if value is None:
            continue
        metafields.append(
            {
                "namespace": "askcrystal",
                "key": remote_key,
                "value": value,
            }
        )
    return metafields


def product_options_input(product: dict[str, Any]) -> list[dict[str, Any]]:
    options: list[dict[str, Any]] = []
    for option in product.get("options") or []:
        values = [{"name": str(value)} for value in option.get("values", [])]
        if not values:
            continue
        options.append({"name": str(option["name"]), "values": values})
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
        variants.append(payload)
    return variants


def product_set_input(
    *,
    client: ShopifyAdminClient | None,
    product: dict[str, Any],
    material_cache: dict[str, str],
    metaobject_cache: dict[tuple[str, str], str] | None = None,
    resolve_remote_refs: bool,
) -> dict[str, Any]:
    return {
        "handle": product["handle"],
        "title": product["title"],
        "descriptionHtml": text_to_description_html(product.get("description", "")),
        "vendor": product.get("vendor") or "AskCrystal",
        "productType": product.get("product_type") or "",
        "status": product_status_input(product.get("shopify_status")),
        "tags": effective_product_tags(product),
        "productOptions": product_options_input(product),
        "variants": product_variants_input(product),
        "metafields": product_metafields_input(
            client=client,
            product=product,
            material_cache=material_cache,
            metaobject_cache=metaobject_cache,
            resolve_remote_refs=resolve_remote_refs,
        ),
    }


def validate_catalog(args: argparse.Namespace) -> int:
    product_schema = load_json(args.product_schema)
    collection_schema = load_json(args.collection_schema)
    material_handles = load_material_handles()
    artist_handles = load_artist_handles()

    product_files = json_files(args.products_dir)
    collection_files = json_files(args.collections_dir)
    products = {path: load_json(path) for path in product_files}
    collections = {path: load_json(path) for path in collection_files}

    issues: list[ValidationIssue] = []

    for path, product in products.items():
        issues.extend(validate_schema(product, product_schema, product_schema, path, ""))
        issues.extend(find_inventory_keys(product, path))

    for path, collection in collections.items():
        issues.extend(validate_schema(collection, collection_schema, collection_schema, path, ""))

    product_handles = {
        product.get("handle")
        for product in products.values()
        if isinstance(product, dict) and isinstance(product.get("handle"), str)
    }
    collection_handles = {
        collection.get("handle")
        for collection in collections.values()
        if isinstance(collection, dict) and isinstance(collection.get("handle"), str)
    }

    sku_registry: dict[str, Path] = {}
    for path, product in products.items():
        if isinstance(product, dict):
            issues.extend(
                validate_product_cross_refs(
                    product=product,
                    file=path,
                    collection_handles=collection_handles,
                    material_handles=material_handles,
                    artist_handles=artist_handles,
                    sku_registry=sku_registry,
                )
            )

    for path, collection in collections.items():
        if isinstance(collection, dict):
            issues.extend(validate_collection_cross_refs(collection=collection, file=path, product_handles=product_handles))

    errors = [issue for issue in issues if issue.level == "error"]
    warnings = [issue for issue in issues if issue.level == "warning"]

    print("AskCrystal catalog validation")
    print(f"  products: {len(product_files)}")
    print(f"  collections: {len(collection_files)}")
    print(f"  material registry entries: {len(material_handles)}")
    print(f"  artist registry entries: {len(artist_handles)}")

    if issues:
        print("")
        for issue in issues:
            print(issue.format())
    else:
        print("  issues: 0")

    print("")
    print(f"Summary: {len(errors)} error(s), {len(warnings)} warning(s)")
    return 1 if errors else 0


def diff_catalog(args: argparse.Namespace) -> int:
    validation_code = validate_catalog(args)
    if validation_code != 0:
        print("\nDiff aborted because local catalog validation failed.")
        return validation_code

    product_files = json_files(args.products_dir)
    collection_files = json_files(args.collections_dir)
    products = [load_json(path) for path in product_files]
    collections = [load_json(path) for path in collection_files]

    if not products and not collections:
        print("\nAskCrystal catalog diff")
        print("  products checked: 0")
        print("  collections checked: 0")
        print("  differences: 0")
        return 0

    client = resolve_shopify_client(args)
    diffs: list[DiffItem] = []

    for product in products:
        remote = remote_product_by_handle(client, product["handle"])
        diffs.extend(diff_product(product, remote))

    for collection in collections:
        remote = remote_collection_by_handle(client, collection["handle"])
        diffs.extend(diff_collection(collection, remote))

    print("\nAskCrystal catalog diff")
    print(f"  products checked: {len(products)}")
    print(f"  collections checked: {len(collections)}")
    print(f"  differences: {len(diffs)}")
    if diffs:
        print("")
        for diff in diffs:
            print(diff.format())

    return 2 if diffs and args.fail_on_diff else 0


def selected_product_files(args: argparse.Namespace) -> list[Path]:
    files = json_files(args.products_dir)
    if not args.handle:
        return files
    selected = set(args.handle)
    return [path for path in files if path.stem in selected]


def print_product_sync_plan(products: list[dict[str, Any]], *, apply: bool, include_unreviewed: bool) -> None:
    mode = "apply" if apply else "dry-run"
    print(f"AskCrystal product sync ({mode})")
    print(f"  products selected: {len(products)}")
    if include_unreviewed:
        print("  review gate: include unreviewed")
    for product in products:
        print(
            "  "
            f"{product['handle']} [{product['title']}] "
            f"status={product.get('shopify_status', 'draft')} "
            f"workflow={product.get('workflow_status', '')} "
            f"variants={len(product.get('variants', []))} "
            f"metafields={len(ASKCRYSTAL_METAFIELD_SOURCES)} "
            f"tags={len(effective_product_tags(product))}"
        )


def sync_products(args: argparse.Namespace) -> int:
    validation_code = validate_catalog(args)
    if validation_code != 0:
        print("\nProduct sync aborted because local catalog validation failed.")
        return validation_code

    product_files = selected_product_files(args)
    products = [load_json(path) for path in product_files]

    if args.handle:
        found_handles = {product["handle"] for product in products}
        missing_handles = sorted(set(args.handle) - found_handles)
        if missing_handles:
            raise SystemExit(f"product handle(s) not found locally: {', '.join(missing_handles)}")

    planned: list[dict[str, Any]] = []
    skipped = 0
    for product in products:
        workflow_status = product.get("workflow_status")
        if not args.include_unreviewed and workflow_status not in REVIEWED_PRODUCT_STATUSES:
            skipped += 1
            print(f"  skip {product['handle']}: workflow_status={workflow_status} (pass --include-unreviewed to sync)")
            continue
        planned.append(product)

    print_product_sync_plan(planned, apply=args.apply, include_unreviewed=args.include_unreviewed)
    if skipped:
        print(f"  skipped: {skipped}")

    if not args.apply:
        print("\nNo Shopify calls were made. Pass --apply to create/update draft products.")
        return 0

    client = resolve_shopify_client(args)
    material_cache: dict[str, str] = {}
    metaobject_cache: dict[tuple[str, str], str] = {}
    print("")
    for product in planned:
        result = client.graphql(
            PRODUCT_SET,
            {
                "identifier": {"handle": product["handle"]},
                "input": product_set_input(
                    client=client,
                    product=product,
                    material_cache=material_cache,
                    metaobject_cache=metaobject_cache,
                    resolve_remote_refs=True,
                ),
                "synchronous": True,
            },
        )["productSet"]
        if result.get("userErrors"):
            raise SystemExit(f"failed to sync product {product['handle']}: {graphql_user_error_message(result['userErrors'])}")
        operation = result.get("productSetOperation") or {}
        if operation.get("userErrors"):
            raise SystemExit(
                f"failed to sync product {product['handle']}: "
                f"{graphql_user_error_message(operation['userErrors'])}"
            )
        product_result = result.get("product") or {}
        print(
            "  synced "
            f"{product_result.get('handle') or product['handle']} -> "
            f"{product_result.get('id', 'unknown-id')} "
            f"status={product_result.get('status', product.get('shopify_status'))}"
        )

    print("\nNote: product sync does not publish products or mutate inventory.")
    return 0


def collection_input(collection: dict[str, Any], *, collection_id: str | None = None) -> dict[str, Any]:
    sort_order = COLLECTION_SORT_ORDER_INPUT.get(collection.get("sort_order") or "best-selling")
    if not sort_order:
        raise SystemExit(f"unsupported collection sort_order for {collection['handle']}: {collection.get('sort_order')}")

    payload: dict[str, Any] = {
        "title": collection["title"],
        "handle": collection["handle"],
        "descriptionHtml": collection.get("description") or "",
        "sortOrder": sort_order,
    }
    if collection_id:
        payload["id"] = collection_id

    rules = collection.get("rules") or {}
    if rules.get("mode") == "tag":
        required_tags = [str(tag) for tag in rules.get("required_tags", []) if str(tag).strip()]
        if not required_tags:
            raise SystemExit(f"collection {collection['handle']} has no required_tags")
        payload["ruleSet"] = collection_rule_set_for_tags(required_tags)
    return payload


def write_collection(client: ShopifyAdminClient, collection: dict[str, Any]) -> tuple[str, str]:
    remote = remote_collection_by_handle(client, collection["handle"])
    if remote:
        result = client.graphql(
            COLLECTION_UPDATE,
            {"input": collection_input(collection, collection_id=remote["id"])},
        )["collectionUpdate"]
        action = "updated"
    else:
        result = client.graphql(COLLECTION_CREATE, {"input": collection_input(collection)})["collectionCreate"]
        action = "created"

    if result.get("userErrors"):
        raise SystemExit(
            f"failed to provision collection {collection['handle']}: "
            f"{graphql_user_error_message(result['userErrors'])}"
        )
    created = result.get("collection") or {}
    collection_id = str(created.get("id") or (remote.get("id") if remote else ""))
    return collection_id, f"{action} {collection['handle']} -> {collection_id or 'unknown-id'}"


def publish_collection(client: ShopifyAdminClient, collection_id: str, publication_id: str) -> str:
    result = client.graphql(
        PUBLISHABLE_PUBLISH,
        {
            "id": collection_id,
            "input": [{"publicationId": publication_id}],
        },
    )["publishablePublish"]
    if result.get("userErrors"):
        raise SystemExit(
            f"failed to publish collection {collection_id}: "
            f"{graphql_user_error_message(result['userErrors'])}"
        )
    return f"published {collection_id} -> {publication_id}"


def load_collection_plans(args: argparse.Namespace) -> tuple[list[dict[str, Any]], list[str]]:
    plans_by_handle: dict[str, dict[str, Any]] = {}
    warnings: list[str] = []

    if not args.skip_generated_facets:
        facets_config = load_facets_config(args.facets_config)
        for collection in generated_facet_collection_plans(facets_config):
            plans_by_handle[collection["handle"]] = collection

    if not args.skip_local:
        for path in json_files(args.collections_dir):
            collection = load_json(path)
            rules = collection.get("rules") or {}
            if rules.get("mode") != "tag":
                warnings.append(f"skip {collection.get('handle', path.stem)}: only tag-mode collections are provisioned by this command")
                continue
            plans_by_handle[collection["handle"]] = collection

    return list(plans_by_handle.values()), warnings


def provision_collections(args: argparse.Namespace) -> int:
    plans, warnings = load_collection_plans(args)
    mode = "apply" if args.apply else "dry-run"
    print(f"AskCrystal collection provisioning ({mode})")
    print(f"  collections planned: {len(plans)}")

    if warnings:
        print("")
        for warning in warnings:
            print(f"  ! {warning}")

    if plans:
        print("")
        for collection in plans:
            source = collection.get("_generated_from_facet")
            source_note = f" facet={source}" if source else ""
            tags = ", ".join((collection.get("rules") or {}).get("required_tags", []))
            print(f"  {collection['handle']} [{collection['title']}] tags=[{tags}]{source_note}")

    if not args.apply:
        print("\nNo Shopify calls were made. Pass --apply to create/update collections.")
        return 0

    client = resolve_shopify_client(args)
    print("")
    for collection in plans:
        collection_id, message = write_collection(client, collection)
        print(f"  {message}")
        if args.publication_id:
            print(f"  {publish_collection(client, collection_id, args.publication_id)}")
    if not args.publication_id:
        print("\nNote: created collections may remain unpublished. Pass --publication-id or set SHOPIFY_ONLINE_STORE_PUBLICATION_ID to publish them.")
    return 0


def list_publications(args: argparse.Namespace) -> int:
    client = resolve_shopify_client(args)
    result = client.graphql(PUBLICATIONS)["publications"]
    publications = result.get("nodes") or []
    print("Shopify publications")
    if not publications:
        print("  none found")
        return 0
    for publication in publications:
        print(f"  {publication.get('name')}: {publication.get('id')}")
    return 0


def build_parser() -> argparse.ArgumentParser:
    parser = argparse.ArgumentParser(description=__doc__)
    subparsers = parser.add_subparsers(dest="command", required=True)

    catalog = subparsers.add_parser("catalog", help="Local Shopify catalog operations")
    catalog_subparsers = catalog.add_subparsers(dest="catalog_command", required=True)

    validate = catalog_subparsers.add_parser("validate", help="Validate local catalog JSON files")
    validate.add_argument("--products-dir", type=Path, default=PRODUCTS_DIR)
    validate.add_argument("--collections-dir", type=Path, default=COLLECTIONS_DIR)
    validate.add_argument("--product-schema", type=Path, default=PRODUCT_SCHEMA)
    validate.add_argument("--collection-schema", type=Path, default=COLLECTION_SCHEMA)
    validate.set_defaults(func=validate_catalog)

    diff = catalog_subparsers.add_parser("diff", help="Compare local catalog JSON files against Shopify")
    diff.add_argument("--products-dir", type=Path, default=PRODUCTS_DIR)
    diff.add_argument("--collections-dir", type=Path, default=COLLECTIONS_DIR)
    diff.add_argument("--product-schema", type=Path, default=PRODUCT_SCHEMA)
    diff.add_argument("--collection-schema", type=Path, default=COLLECTION_SCHEMA)
    diff.add_argument("--store-domain", default="", help="Shopify myshopify domain. Defaults to SHOPIFY_STORE_DOMAIN.")
    diff.add_argument("--access-token", default="", help="Shopify Admin API access token. Defaults to SHOPIFY_ADMIN_ACCESS_TOKEN.")
    diff.add_argument("--client-id", default="", help="Shopify app Client ID. Defaults to SHOPIFY_CLIENT_ID or SHOPIFY_API_KEY.")
    diff.add_argument("--client-secret", default="", help="Shopify app Client secret. Defaults to SHOPIFY_CLIENT_SECRET or SHOPIFY_API_SECRET.")
    diff.add_argument("--api-version", default="2026-04", help="Shopify Admin API version.")
    diff.add_argument("--fail-on-diff", action="store_true", help="Exit 2 when any differences are found.")
    diff.set_defaults(func=diff_catalog)

    sync_products_parser = catalog_subparsers.add_parser(
        "sync-products",
        help="Create/update Shopify draft products from local product JSON files",
    )
    sync_products_parser.add_argument("--apply", action="store_true", help="Write product changes to Shopify.")
    sync_products_parser.add_argument("--handle", action="append", help="Limit sync to a local product handle. Repeat as needed.")
    sync_products_parser.add_argument(
        "--include-unreviewed",
        action="store_true",
        help="Allow products with workflow_status=draft or ai_filled.",
    )
    sync_products_parser.add_argument("--products-dir", type=Path, default=PRODUCTS_DIR)
    sync_products_parser.add_argument("--collections-dir", type=Path, default=COLLECTIONS_DIR)
    sync_products_parser.add_argument("--product-schema", type=Path, default=PRODUCT_SCHEMA)
    sync_products_parser.add_argument("--collection-schema", type=Path, default=COLLECTION_SCHEMA)
    sync_products_parser.add_argument("--store-domain", default="", help="Shopify myshopify domain. Defaults to SHOPIFY_STORE_DOMAIN.")
    sync_products_parser.add_argument("--access-token", default="", help="Shopify Admin API access token. Defaults to SHOPIFY_ADMIN_ACCESS_TOKEN.")
    sync_products_parser.add_argument("--client-id", default="", help="Shopify app Client ID. Defaults to SHOPIFY_CLIENT_ID or SHOPIFY_API_KEY.")
    sync_products_parser.add_argument("--client-secret", default="", help="Shopify app Client secret. Defaults to SHOPIFY_CLIENT_SECRET or SHOPIFY_API_SECRET.")
    sync_products_parser.add_argument("--api-version", default="2026-04", help="Shopify Admin API version.")
    sync_products_parser.set_defaults(func=sync_products)

    provision_collections_parser = catalog_subparsers.add_parser(
        "provision-collections",
        help="Create/update Shopify automated collections from local facet/tag rules",
    )
    provision_collections_parser.add_argument("--apply", action="store_true", help="Write collection changes to Shopify.")
    provision_collections_parser.add_argument("--collections-dir", type=Path, default=COLLECTIONS_DIR)
    provision_collections_parser.add_argument("--facets-config", type=Path, default=FACETS_CONFIG)
    provision_collections_parser.add_argument(
        "--skip-generated-facets",
        action="store_true",
        help="Only provision tag-mode collection JSON files; skip generated facet collections.",
    )
    provision_collections_parser.add_argument(
        "--skip-local",
        action="store_true",
        help="Only provision generated facet collections; skip local collection JSON files.",
    )
    provision_collections_parser.add_argument("--store-domain", default="", help="Shopify myshopify domain. Defaults to SHOPIFY_STORE_DOMAIN.")
    provision_collections_parser.add_argument("--access-token", default="", help="Shopify Admin API access token. Defaults to SHOPIFY_ADMIN_ACCESS_TOKEN.")
    provision_collections_parser.add_argument("--client-id", default="", help="Shopify app Client ID. Defaults to SHOPIFY_CLIENT_ID or SHOPIFY_API_KEY.")
    provision_collections_parser.add_argument("--client-secret", default="", help="Shopify app Client secret. Defaults to SHOPIFY_CLIENT_SECRET or SHOPIFY_API_SECRET.")
    provision_collections_parser.add_argument("--api-version", default="2026-04", help="Shopify Admin API version.")
    provision_collections_parser.add_argument(
        "--publication-id",
        default=os.getenv("SHOPIFY_ONLINE_STORE_PUBLICATION_ID", ""),
        help="Optional Shopify publication ID to publish created/updated collections, e.g. the Online Store publication.",
    )
    provision_collections_parser.set_defaults(func=provision_collections)

    publications = catalog_subparsers.add_parser("publications", help="List Shopify publications and IDs")
    publications.add_argument("--store-domain", default="", help="Shopify myshopify domain. Defaults to SHOPIFY_STORE_DOMAIN.")
    publications.add_argument("--access-token", default="", help="Shopify Admin API access token. Defaults to SHOPIFY_ADMIN_ACCESS_TOKEN.")
    publications.add_argument("--client-id", default="", help="Shopify app Client ID. Defaults to SHOPIFY_CLIENT_ID or SHOPIFY_API_KEY.")
    publications.add_argument("--client-secret", default="", help="Shopify app Client secret. Defaults to SHOPIFY_CLIENT_SECRET or SHOPIFY_API_SECRET.")
    publications.add_argument("--api-version", default="2026-04", help="Shopify Admin API version.")
    publications.set_defaults(func=list_publications)

    return parser


def main() -> int:
    parser = build_parser()
    args = parser.parse_args()
    return args.func(args)


if __name__ == "__main__":
    raise SystemExit(main())
