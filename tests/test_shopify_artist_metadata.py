import copy
import importlib.util
import json
from pathlib import Path

import pytest

import scripts.askcrystal_shopify as shopify
from scripts.build import provision_shopify_custom_data as custom_data
from scripts.build import sync_askcrystal_product_metafields as bridge_sync

PRODUCT_OPS_PATH = Path(__file__).resolve().parents[1] / "skills/askcrystal-shopify-coo/scripts/product_ops.py"
PRODUCT_OPS_SPEC = importlib.util.spec_from_file_location("askcrystal_product_ops", PRODUCT_OPS_PATH)
assert PRODUCT_OPS_SPEC is not None
assert PRODUCT_OPS_SPEC.loader is not None
product_ops = importlib.util.module_from_spec(PRODUCT_OPS_SPEC)
PRODUCT_OPS_SPEC.loader.exec_module(product_ops)


BASE_PRODUCT = {
    "schema_version": 1,
    "handle": "premium-amethyst-test",
    "workflow_status": "ai_filled",
    "shopify_status": "draft",
    "title": "Premium Amethyst Test",
    "description": "A premium test product.",
    "vendor": "AskCrystal",
    "product_type": "Bracelet",
    "tags": [],
    "collections": [],
    "options": [{"name": "Title", "values": ["Default Title"]}],
    "variants": [
        {
            "sku": "AC-TEST-001",
            "price": "99.99",
            "compare_at_price": None,
            "barcode": None,
            "option_values": ["Default Title"],
            "taxable": True,
            "requires_shipping": True,
        }
    ],
    "media": [],
    "askcrystal": {
        "primary_intention": "calm",
        "secondary_intentions": ["intuition"],
        "product_form": "bracelet",
        "crystal_material_handles": ["amethyst"],
        "chakras": ["third_eye"],
        "color_families": ["purple"],
        "ritual_uses": ["daily_wear"],
        "gift_for": [],
        "western_elements": [],
        "five_elements": [],
        "zodiac_signs": [],
        "energetic_properties": ["calming"],
        "archetype_name": None,
        "story_headline": "A quiet premium test",
        "story_summary": "Soft ritual support for a test listing.",
        "benefits": ["Supports a calm moment"],
        "ritual_title": "Calm Ritual",
        "ritual_steps": ["Take three breaths"],
        "care_steps": ["Clean with a dry cloth"],
        "included_items": ["Bracelet"],
        "quality_notes": ["Natural variation expected"],
        "pairing_notes": None,
        "safety_note": "For wellness and self-reflection only.",
        "agent_summary": "Recommend for calm support.",
        "agent_tags": ["calm"],
        "data_status": "ai_filled",
    },
}


def test_premium_product_requires_seeded_artist_handle() -> None:
    product = copy.deepcopy(BASE_PRODUCT)

    issues = shopify.validate_premium_artist_policy(
        product=product,
        file=Path("premium-amethyst-test.json"),
        artist_handles={"elise-hartmann"},
    )

    assert [issue.path for issue in issues] == ["askcrystal.artist_handle"]


def test_lower_price_product_can_omit_artist_handle() -> None:
    product = copy.deepcopy(BASE_PRODUCT)
    product["variants"][0]["price"] = "98.99"

    issues = shopify.validate_premium_artist_policy(
        product=product,
        file=Path("premium-amethyst-test.json"),
        artist_handles={"elise-hartmann"},
    )

    assert issues == []


def test_artist_metafield_resolves_single_metaobject_reference() -> None:
    class Client:
        def graphql(self, _query, variables):
            assert variables == {"type": "askcrystal_artist", "handle": "elise-hartmann"}
            return {"metaobjectByHandle": {"id": "gid://shopify/Metaobject/1", "handle": "elise-hartmann"}}

    value = shopify.metafield_value_for_product(
        client=Client(),
        askcrystal={"artist_handle": "elise-hartmann"},
        local_key="artist_handle",
        mode="artist_ref_optional",
        material_cache={},
        metaobject_cache={},
        resolve_remote_refs=True,
    )

    assert value == "gid://shopify/Metaobject/1"


def test_artist_metafield_dry_run_uses_handle_value() -> None:
    value = shopify.metafield_value_for_product(
        client=None,
        askcrystal={"artist_handle": "elise-hartmann"},
        local_key="artist_handle",
        mode="artist_ref_optional",
        material_cache={},
        metaobject_cache={},
        resolve_remote_refs=False,
    )

    assert json.loads(value) == "elise-hartmann"


def test_enrichment_bridge_maps_artist_handle_to_artist_metafield(monkeypatch: pytest.MonkeyPatch) -> None:
    monkeypatch.setattr(bridge_sync, "METAFIELD_SOURCES", {"artist": "artist_handle"})

    metafields = bridge_sync.build_metafields_for_row(
        {"artist_handle": "elise-hartmann"},
        row_number=2,
        namespace="askcrystal",
        metafield_types={"artist": "metaobject_reference"},
        owner_id=None,
        client=None,
        check_remote=False,
        material_cache={},
        metaobject_cache={},
    )

    assert metafields == [
        {
            "namespace": "askcrystal",
            "key": "artist",
            "type": "metaobject_reference",
            "value": json.dumps("elise-hartmann"),
        }
    ]


def test_artist_profile_image_asset_plan_uses_local_artist_asset_path(tmp_path: Path) -> None:
    image_path = tmp_path / "artists" / "elise-hartmann" / "profile.webp"
    image_path.parent.mkdir(parents=True)
    image_path.write_bytes(b"fake image")

    entries = [
        {
            "type": "askcrystal_artist",
            "handle": "elise-hartmann",
            "fields": {"profile_image_alt": "Portrait of Elise Hartmann"},
            "assets": {"profile_image": {"local_path": str(image_path), "alt": "Elise Hartmann portrait"}},
        }
    ]

    plans = custom_data.artist_profile_image_asset_plans(entries)

    assert plans[0].handle == "elise-hartmann"
    assert plans[0].field_key == "profile_image"
    assert plans[0].local_path == image_path
    assert plans[0].alt == "Elise Hartmann portrait"


def test_file_create_payload_uses_staged_resource_url(tmp_path: Path) -> None:
    image_path = tmp_path / "profile.webp"
    image_path.write_bytes(b"fake image")
    plan = custom_data.ArtistProfileImageAssetPlan(
        entry_type="askcrystal_artist",
        handle="elise-hartmann",
        field_key="profile_image",
        local_path=image_path,
        alt="Elise Hartmann portrait",
    )

    payload = custom_data.file_create_input_for_artist_asset(plan, resource_url="staged://profile.webp")

    assert payload == {
        "originalSource": "staged://profile.webp",
        "contentType": "IMAGE",
        "filename": "askcrystal-artist-elise-hartmann-profile.webp",
        "alt": "Elise Hartmann portrait",
        "duplicateResolutionMode": "REPLACE",
    }


def test_artist_profile_staged_upload_uses_image_resource(tmp_path: Path) -> None:
    image_path = tmp_path / "profile.webp"
    image_path.write_bytes(b"fake image")

    payload = custom_data.staged_upload_input(image_path)

    assert payload["resource"] == "IMAGE"
    assert payload["httpMethod"] == "POST"
    assert payload["mimeType"] == "image/webp"


def test_artist_profile_cache_records_shopify_file_url(tmp_path: Path) -> None:
    cache_path = tmp_path / "artist-profile-images.json"
    plan = custom_data.ArtistProfileImageAssetPlan(
        entry_type="askcrystal_artist",
        handle="elise-hartmann",
        field_key="profile_image",
        local_path=tmp_path / "profile.webp",
        alt="Elise Hartmann portrait",
    )

    custom_data.write_artist_profile_image_cache(
        cache_path,
        [
            custom_data.ArtistProfileImageSyncResult(
                plan=plan,
                metaobject_id="gid://shopify/Metaobject/1",
                file_id="gid://shopify/MediaImage/1",
                image_url="https://cdn.shopify.com/elise-hartmann.webp",
                status="READY",
            )
        ],
    )

    cached = json.loads(cache_path.read_text())
    assert cached["artists"]["elise-hartmann"]["profile_image"]["file_id"] == "gid://shopify/MediaImage/1"
    assert cached["artists"]["elise-hartmann"]["profile_image"]["image_url"] == "https://cdn.shopify.com/elise-hartmann.webp"


def test_artist_profile_metaobject_update_fields_include_file_reference_and_alt(tmp_path: Path) -> None:
    plan = custom_data.ArtistProfileImageAssetPlan(
        entry_type="askcrystal_artist",
        handle="elise-hartmann",
        field_key="profile_image",
        local_path=tmp_path / "profile.webp",
        alt="Elise Hartmann portrait",
    )

    fields = custom_data.artist_profile_image_metaobject_update_fields(
        plan,
        file_id="gid://shopify/MediaImage/1",
    )

    assert fields == [
        {"key": "profile_image", "value": "gid://shopify/MediaImage/1"},
        {"key": "profile_image_alt", "value": "Elise Hartmann portrait"},
    ]


def test_product_upload_auto_detects_online_store_publication() -> None:
    class Client:
        def graphql(self, _query, _variables=None):
            return {
                "publications": {
                    "nodes": [
                        {"name": "Point of Sale", "id": "gid://shopify/Publication/1"},
                        {"name": "Online Store", "id": "gid://shopify/Publication/2"},
                    ]
                }
            }

    assert product_ops.online_store_publication_id(Client()) == "gid://shopify/Publication/2"


def test_product_publish_uses_publishable_publish_mutation() -> None:
    calls = []

    class Client:
        def graphql(self, query, variables=None):
            calls.append((query, variables))
            return {"publishablePublish": {"userErrors": []}}

    product_ops.publish_product_to_publication(
        Client(),
        product_id="gid://shopify/Product/1",
        publication_id="gid://shopify/Publication/2",
    )

    assert calls[0][1] == {
        "id": "gid://shopify/Product/1",
        "input": [{"publicationId": "gid://shopify/Publication/2"}],
    }
