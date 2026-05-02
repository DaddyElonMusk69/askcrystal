#!/usr/bin/env python3
"""Provision AskCrystal Shopify custom data definitions and seed metaobjects.

Default mode is a no-network dry run. Pass --apply to call Shopify Admin GraphQL.
The script is intentionally idempotent for V1: existing definitions and entries
are skipped, not overwritten.
"""

from __future__ import annotations

import argparse
import http.client
import io
import json
import mimetypes
import os
import ssl
import subprocess
import sys
import time
import urllib.error
import urllib.parse
import urllib.request
import uuid
from dataclasses import dataclass
from pathlib import Path
from typing import Any

REPO_ROOT = Path(__file__).resolve().parents[2]
DEFAULT_METAOBJECT_DEFINITIONS = REPO_ROOT / "data/shopify/metaobject-definitions.askcrystal.json"
DEFAULT_METAFIELD_DEFINITIONS = REPO_ROOT / "data/shopify/metafield-definitions.askcrystal.json"
DEFAULT_METAOBJECT_ENTRIES = REPO_ROOT / "data/shopify/metaobject-entries.askcrystal.json"
DEFAULT_ARTIST_PROFILE_IMAGE_CACHE = REPO_ROOT / "data/shopify/generated/artist-profile-images.askcrystal.json"
ARTIST_METAOBJECT_TYPE = "askcrystal_artist"
ARTIST_PROFILE_IMAGE_FIELD = "profile_image"
ARTIST_PROFILE_IMAGE_ALT_FIELD = "profile_image_alt"

METAOBJECT_DEFINITION_BY_TYPE = """
query AskCrystalMetaobjectDefinitionByType($type: String!) {
  metaobjectDefinitionByType(type: $type) {
    id
    name
    type
    fieldDefinitions {
      key
      name
      type {
        name
      }
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

UPDATE_METAOBJECT_DEFINITION = """
mutation AskCrystalUpdateMetaobjectDefinition($id: ID!, $definition: MetaobjectDefinitionUpdateInput!) {
  metaobjectDefinitionUpdate(id: $id, definition: $definition) {
    metaobjectDefinition {
      id
      name
      type
      fieldDefinitions {
        key
        name
        type {
          name
        }
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

FILE_CREATE = """
mutation AskCrystalFileCreate($files: [FileCreateInput!]!) {
  fileCreate(files: $files) {
    files {
      id
      alt
      fileStatus
      ... on MediaImage {
        image {
          url
          width
          height
        }
      }
      ... on GenericFile {
        url
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

FILE_NODES_BY_IDS = """
query AskCrystalFileNodesByIds($ids: [ID!]!) {
  nodes(ids: $ids) {
    id
    ... on MediaImage {
      alt
      fileStatus
      image {
        url
        width
        height
      }
    }
    ... on GenericFile {
      alt
      fileStatus
      url
    }
  }
}
"""

UPDATE_METAOBJECT = """
mutation AskCrystalUpdateMetaobject($id: ID!, $metaobject: MetaobjectUpdateInput!) {
  metaobjectUpdate(id: $id, metaobject: $metaobject) {
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
    metaobject_definition_fields_created: int = 0
    metafield_definitions_created: int = 0
    metafield_definitions_existing: int = 0
    metaobject_entries_created: int = 0
    metaobject_entries_existing: int = 0
    artist_profile_images_synced: int = 0
    warnings: int = 0


@dataclass(frozen=True)
class ArtistProfileImageAssetPlan:
    entry_type: str
    handle: str
    field_key: str
    local_path: Path
    alt: str


@dataclass(frozen=True)
class ArtistProfileImageSyncResult:
    plan: ArtistProfileImageAssetPlan
    metaobject_id: str
    file_id: str
    image_url: str
    status: str


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
        payload_dict = {"query": query, "variables": variables or {}}
        if os.getenv("SHOPIFY_USE_CURL", "") == "1":
            body = post_json_with_curl(
                self.endpoint,
                payload_dict,
                {
                    "Content-Type": "application/json",
                    "X-Shopify-Access-Token": self.access_token,
                },
            )
            return decode_shopify_graphql_response(body)

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
                if shutil_which_curl():
                    print("  urllib Shopify Admin API call failed; retrying with curl")
                    body = post_json_with_curl(
                        self.endpoint,
                        payload_dict,
                        {
                            "Content-Type": "application/json",
                            "X-Shopify-Access-Token": self.access_token,
                        },
                    )
                    break
                raise ProvisioningError(f"failed to reach Shopify Admin API: {exc.reason}") from exc
            except http.client.RemoteDisconnected as exc:
                if attempt < 4:
                    wait_seconds = 2 ** attempt
                    print(f"  retry Shopify Admin API remote disconnect in {wait_seconds}s")
                    time.sleep(wait_seconds)
                    continue
                if shutil_which_curl():
                    print("  urllib Shopify Admin API call disconnected; retrying with curl")
                    body = post_json_with_curl(
                        self.endpoint,
                        payload_dict,
                        {
                            "Content-Type": "application/json",
                            "X-Shopify-Access-Token": self.access_token,
                        },
                    )
                    break
                raise ProvisioningError("failed to reach Shopify Admin API: remote disconnected") from exc

        return decode_shopify_graphql_response(body)


def shutil_which_curl() -> str:
    from shutil import which

    return which("curl") or ""


def post_json_with_curl(url: str, payload: dict[str, Any], headers: dict[str, str]) -> str:
    command = ["curl", "-fsS", "-X", "POST", url]
    for key, value in headers.items():
        command.extend(["-H", f"{key}: {value}"])
    command.extend(["--data-binary", json.dumps(payload, ensure_ascii=False)])
    result = subprocess.run(command, text=True, capture_output=True, check=False)
    if result.returncode != 0:
        raise ProvisioningError(f"curl request failed ({result.returncode}): {result.stderr.strip()}")
    return result.stdout


def decode_shopify_graphql_response(body: str) -> dict[str, Any]:
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
        if shutil_which_curl():
            print("  urllib Shopify token request failed; retrying with curl")
            response_body = fetch_admin_access_token_with_curl(
                endpoint=endpoint,
                client_id=client_id,
                client_secret=client_secret,
            )
        else:
            raise ProvisioningError(f"failed to reach Shopify token endpoint: {exc.reason}") from exc
    except http.client.RemoteDisconnected as exc:
        if shutil_which_curl():
            print("  urllib Shopify token request disconnected; retrying with curl")
            response_body = fetch_admin_access_token_with_curl(
                endpoint=endpoint,
                client_id=client_id,
                client_secret=client_secret,
            )
        else:
            raise ProvisioningError("failed to reach Shopify token endpoint: remote disconnected") from exc

    try:
        decoded = json.loads(response_body)
    except json.JSONDecodeError as exc:
        raise ProvisioningError(f"Shopify token endpoint returned non-JSON response: {response_body[:500]}") from exc

    token = decoded.get("access_token")
    if not token:
        raise ProvisioningError(f"Shopify token endpoint did not return access_token: {response_body[:500]}")
    return str(token)


def fetch_admin_access_token_with_curl(*, endpoint: str, client_id: str, client_secret: str) -> str:
    result = subprocess.run(
        [
            "curl",
            "-fsS",
            "-X",
            "POST",
            endpoint,
            "-H",
            "Content-Type: application/x-www-form-urlencoded",
            "--data-urlencode",
            "grant_type=client_credentials",
            "--data-urlencode",
            f"client_id={client_id}",
            "--data-urlencode",
            f"client_secret={client_secret}",
        ],
        text=True,
        capture_output=True,
        check=False,
    )
    if result.returncode != 0:
        raise ProvisioningError(f"curl Shopify token request failed ({result.returncode}): {result.stderr.strip()}")
    return result.stdout


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


def metaobject_field_create_payload(field: dict[str, Any]) -> dict[str, Any]:
    """Payload shape used when adding fields to an existing metaobject definition."""
    payload = field_definition_payload(field)
    payload["type"] = field["type"]
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


def resolve_repo_path(path: str | Path) -> Path:
    candidate = Path(path).expanduser()
    if candidate.is_absolute():
        return candidate
    return REPO_ROOT / candidate


def display_repo_path(path: Path) -> str:
    try:
        return str(path.resolve().relative_to(REPO_ROOT.resolve()))
    except ValueError:
        return str(path)


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
        "httpMethod": "POST",
    }


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

    raise ProvisioningError(f"unsupported staged upload HTTP method for {file_path}: {http_method}")


def upload_to_staged_target(target: dict[str, Any], file_path: Path, *, http_method: str) -> None:
    for attempt in range(1, 4):
        try:
            request = staged_target_request(target, file_path, http_method=http_method)
            with urllib.request.urlopen(request, timeout=60, context=build_ssl_context()) as response:
                response.read()
            return
        except urllib.error.HTTPError as exc:
            response_body = exc.read().decode("utf-8", errors="replace")
            if exc.code in {429, 500, 502, 503, 504} and attempt < 3:
                time.sleep(2**attempt)
                continue
            raise ProvisioningError(f"failed staged artist asset upload for {file_path}: HTTP {exc.code}: {response_body}") from exc
        except urllib.error.URLError as exc:
            if attempt < 3:
                time.sleep(2**attempt)
                continue
            raise ProvisioningError(f"failed staged artist asset upload for {file_path}: {exc.reason}") from exc
        except http.client.RemoteDisconnected as exc:
            if attempt < 3:
                time.sleep(2**attempt)
                continue
            raise ProvisioningError(f"failed staged artist asset upload for {file_path}: remote disconnected") from exc


def artist_profile_image_asset_plans(entries: list[dict[str, Any]]) -> list[ArtistProfileImageAssetPlan]:
    plans: list[ArtistProfileImageAssetPlan] = []
    for entry in entries:
        if entry.get("type") != ARTIST_METAOBJECT_TYPE:
            continue
        handle = str(entry.get("handle") or "").strip()
        if not handle:
            continue
        assets = entry.get("assets") or {}
        profile_image = assets.get(ARTIST_PROFILE_IMAGE_FIELD) or {}
        local_path = profile_image.get("local_path")
        if not local_path:
            continue
        fields = entry.get("fields") or {}
        alt = str(
            profile_image.get("alt")
            or fields.get(ARTIST_PROFILE_IMAGE_ALT_FIELD)
            or fields.get("name")
            or f"{handle} profile portrait"
        ).strip()
        plans.append(
            ArtistProfileImageAssetPlan(
                entry_type=ARTIST_METAOBJECT_TYPE,
                handle=handle,
                field_key=ARTIST_PROFILE_IMAGE_FIELD,
                local_path=resolve_repo_path(str(local_path)),
                alt=alt,
            )
        )
    return plans


def file_create_input_for_artist_asset(plan: ArtistProfileImageAssetPlan, *, resource_url: str) -> dict[str, str]:
    suffix = plan.local_path.suffix.lower() or ".jpg"
    return {
        "originalSource": resource_url,
        "contentType": "IMAGE",
        "filename": f"askcrystal-artist-{plan.handle}-profile{suffix}",
        "alt": plan.alt,
        "duplicateResolutionMode": "REPLACE",
    }


def artist_profile_image_metaobject_update_fields(
    plan: ArtistProfileImageAssetPlan,
    *,
    file_id: str,
) -> list[dict[str, str]]:
    fields = [{"key": plan.field_key, "value": file_id}]
    if plan.alt:
        fields.append({"key": ARTIST_PROFILE_IMAGE_ALT_FIELD, "value": plan.alt})
    return fields


def extract_file_url(file_node: dict[str, Any]) -> str:
    image = file_node.get("image") or {}
    if image.get("url"):
        return str(image["url"])
    if file_node.get("url"):
        return str(file_node["url"])
    return ""


def write_artist_profile_image_cache(path: Path, results: list[ArtistProfileImageSyncResult]) -> None:
    cache: dict[str, Any] = {
        "version": "2026-05-02",
        "artists": {},
    }
    for result in results:
        cache["artists"][result.plan.handle] = {
            result.plan.field_key: {
                "local_path": display_repo_path(result.plan.local_path),
                "file_id": result.file_id,
                "image_url": result.image_url,
                "status": result.status,
                "metaobject_id": result.metaobject_id,
                "alt": result.plan.alt,
            }
        }
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(json.dumps(cache, indent=2, ensure_ascii=False) + "\n", encoding="utf-8")


def stage_artist_profile_image(
    client: ShopifyAdminClient,
    plan: ArtistProfileImageAssetPlan,
) -> tuple[dict[str, Any], str]:
    upload_input = staged_upload_input(plan.local_path)
    result = client.graphql(STAGED_UPLOADS_CREATE, {"input": [upload_input]})["stagedUploadsCreate"]
    if result.get("userErrors"):
        raise ProvisioningError(
            f"failed to create staged upload for artist {plan.handle}: "
            f"{graphql_user_error_message(result['userErrors'])}"
        )
    targets = result.get("stagedTargets") or []
    if len(targets) != 1:
        raise ProvisioningError(f"Shopify returned {len(targets)} staged targets for artist {plan.handle}")
    target = targets[0]
    upload_to_staged_target(target, plan.local_path, http_method=upload_input["httpMethod"])
    return file_create_input_for_artist_asset(plan, resource_url=str(target["resourceUrl"])), str(target["resourceUrl"])


def fetch_file_node(client: ShopifyAdminClient, file_id: str) -> dict[str, Any]:
    result = client.graphql(FILE_NODES_BY_IDS, {"ids": [file_id]})
    nodes = result.get("nodes") or []
    if not nodes:
        return {"id": file_id}
    return nodes[0] or {"id": file_id}


def create_shopify_file_for_artist_asset(
    client: ShopifyAdminClient,
    plan: ArtistProfileImageAssetPlan,
) -> tuple[str, str, str]:
    file_input, _resource_url = stage_artist_profile_image(client, plan)
    result = client.graphql(FILE_CREATE, {"files": [file_input]})["fileCreate"]
    if result.get("userErrors"):
        raise ProvisioningError(
            f"failed to create Shopify file for artist {plan.handle}: "
            f"{graphql_user_error_message(result['userErrors'])}"
        )
    files = result.get("files") or []
    if len(files) != 1 or not files[0].get("id"):
        raise ProvisioningError(f"Shopify did not return a file ID for artist {plan.handle}")
    file_node = files[0]
    file_id = str(file_node["id"])
    image_url = extract_file_url(file_node)
    status = str(file_node.get("fileStatus") or "")
    if not image_url:
        hydrated_node = fetch_file_node(client, file_id)
        image_url = extract_file_url(hydrated_node)
        status = str(hydrated_node.get("fileStatus") or status)
    return file_id, image_url, status


def sync_artist_profile_images(
    client: ShopifyAdminClient,
    plans: list[ArtistProfileImageAssetPlan],
    *,
    counts: ProvisioningCounts,
) -> list[ArtistProfileImageSyncResult]:
    results: list[ArtistProfileImageSyncResult] = []
    if not plans:
        return results

    print("Artist profile image assets")
    for plan in plans:
        if not plan.local_path.exists():
            raise ProvisioningError(
                f"artist {plan.handle} profile image does not exist: {display_repo_path(plan.local_path)}"
            )
        existing = client.graphql(METAOBJECT_BY_HANDLE, {"type": plan.entry_type, "handle": plan.handle})[
            "metaobjectByHandle"
        ]
        if not existing:
            raise ProvisioningError(f"artist metaobject {plan.entry_type}/{plan.handle} does not exist on Shopify")

        file_id, image_url, status = create_shopify_file_for_artist_asset(client, plan)
        update_fields = artist_profile_image_metaobject_update_fields(plan, file_id=file_id)
        result = client.graphql(
            UPDATE_METAOBJECT,
            {"id": existing["id"], "metaobject": {"fields": update_fields}},
        )["metaobjectUpdate"]
        if result.get("userErrors"):
            raise ProvisioningError(
                f"failed to update artist metaobject {plan.handle}: "
                f"{graphql_user_error_message(result['userErrors'])}"
            )
        counts.artist_profile_images_synced += 1
        print(f"  synced {plan.handle} {plan.field_key} -> {file_id}")
        results.append(
            ArtistProfileImageSyncResult(
                plan=plan,
                metaobject_id=str(existing["id"]),
                file_id=file_id,
                image_url=image_url,
                status=status,
            )
        )
    return results


def print_artist_profile_image_plan(
    plans: list[ArtistProfileImageAssetPlan],
    *,
    apply: bool,
    sync_assets: bool,
    counts: ProvisioningCounts,
) -> None:
    if not plans:
        return
    if apply and sync_assets:
        return
    print("Artist profile image assets")
    for plan in plans:
        exists = plan.local_path.exists()
        if not exists:
            counts.warnings += 1
        suffix = "" if exists else " (missing local file)"
        print(f"  dry-run sync {plan.handle}.{plan.field_key} <- {display_repo_path(plan.local_path)}{suffix}")
    if apply and not sync_assets:
        print("  not uploaded; pass --sync-artist-assets with --apply to upload and attach profile images")


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
            missing_fields = [field for field in definition.get("fields", []) if field["key"] not in existing_fields]
            if missing_fields:
                variables = {
                    "id": existing["id"],
                    "definition": {
                        "fieldDefinitions": [
                            {"create": metaobject_field_create_payload(field)} for field in missing_fields
                        ]
                    },
                }
                result = client.graphql(UPDATE_METAOBJECT_DEFINITION, variables)["metaobjectDefinitionUpdate"]
                if result.get("userErrors"):
                    counts.warnings += 1
                    print(
                        f"  ! existing metaobject definition {metaobject_type} is missing fields: "
                        f"{', '.join(field['key'] for field in missing_fields)}"
                    )
                    print(f"    update failed: {graphql_user_error_message(result['userErrors'])}")
                else:
                    counts.metaobject_definition_fields_created += len(missing_fields)
                    print(
                        f"  added fields to {metaobject_type}: "
                        f"{', '.join(field['key'] for field in missing_fields)}"
                    )
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
    print(f"  metaobject definition fields created: {counts.metaobject_definition_fields_created}")
    print(f"  metafield definitions created: {counts.metafield_definitions_created}")
    print(f"  metafield definitions existing: {counts.metafield_definitions_existing}")
    print(f"  metaobject entries created: {counts.metaobject_entries_created}")
    print(f"  metaobject entries existing: {counts.metaobject_entries_existing}")
    print(f"  artist profile images synced: {counts.artist_profile_images_synced}")
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
    parser.add_argument(
        "--sync-artist-assets",
        action="store_true",
        help="With --apply, upload local askcrystal_artist profile images to Shopify Files and attach them to artist metaobjects.",
    )
    parser.add_argument(
        "--artist-assets-cache",
        type=Path,
        default=DEFAULT_ARTIST_PROFILE_IMAGE_CACHE,
        help="Generated cache path for Shopify artist profile image file IDs and CDN URLs.",
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
    artist_asset_plans = [] if args.skip_entries else artist_profile_image_asset_plans(entries)

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
        print_artist_profile_image_plan(
            artist_asset_plans,
            apply=args.apply,
            sync_assets=args.sync_artist_assets,
            counts=counts,
        )
        if args.apply and args.sync_artist_assets:
            assert client is not None
            artist_results = sync_artist_profile_images(client, artist_asset_plans, counts=counts)
            if artist_results:
                write_artist_profile_image_cache(args.artist_assets_cache, artist_results)
                print(f"  wrote artist asset cache -> {display_repo_path(args.artist_assets_cache)}")

    print_summary(counts, apply=args.apply)
    return 0


if __name__ == "__main__":
    try:
        raise SystemExit(main())
    except ProvisioningError as exc:
        print(f"error: {exc}", file=sys.stderr)
        raise SystemExit(1)
