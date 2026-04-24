from __future__ import annotations

import base64
import json
import mimetypes
import time
import uuid
from dataclasses import dataclass
from http.cookiejar import CookieJar
from pathlib import Path
from typing import Any
from urllib.error import HTTPError, URLError
from urllib.parse import urlencode, urlparse
from urllib.request import HTTPCookieProcessor, Request, build_opener


@dataclass
class DifyConsoleError(RuntimeError):
    message: str
    status_code: int | None = None
    payload: Any = None

    def __str__(self) -> str:
        prefix = f"HTTP {self.status_code}: " if self.status_code else ""
        return f"{prefix}{self.message}"


class DifyConsoleClient:
    def __init__(self, base_url: str, timeout_seconds: int = 30):
        self.base_url = base_url.rstrip("/")
        self.timeout_seconds = timeout_seconds
        self.cookie_jar = CookieJar()
        self.opener = build_opener(HTTPCookieProcessor(self.cookie_jar))
        self.csrf_token: str | None = None

    def wait_until_ready(self, timeout_seconds: int = 300, interval_seconds: float = 2.0) -> dict[str, Any]:
        deadline = time.time() + timeout_seconds
        last_error: Exception | None = None

        while time.time() < deadline:
            try:
                status = self.get_setup_status()
                if isinstance(status, dict) and "step" in status:
                    return status
            except Exception as exc:  # pragma: no cover - runtime wait loop
                last_error = exc
            time.sleep(interval_seconds)

        raise DifyConsoleError(
            f"Dify setup endpoint did not become ready in {timeout_seconds}s",
            payload=str(last_error) if last_error else None,
        )

    def ensure_setup(self, *, email: str, name: str, password: str, language: str = "en-US") -> dict[str, Any]:
        status = self.get_setup_status()
        step = status.get("step")
        if step == "finished":
            return {"result": "already_configured", "status": status}
        if step != "not_started":
            raise DifyConsoleError("Unexpected setup step", payload=status)

        payload = {
            "email": email,
            "name": name,
            "password": password,
            "language": language,
        }
        self.request("POST", "/console/api/setup", json_body=payload)
        status_after = self.get_setup_status()
        return {"result": "configured", "status": status_after}

    def login(self, *, email: str, password: str, remember_me: bool = True) -> dict[str, Any]:
        encoded_password = base64.b64encode(password.encode("utf-8")).decode("ascii")
        payload = {
            "email": email,
            "password": encoded_password,
            "remember_me": remember_me,
        }
        result = self.request("POST", "/console/api/login", json_body=payload)
        self._refresh_csrf_token_from_cookies()
        if not self.csrf_token:
            raise DifyConsoleError("Login succeeded but csrf_token cookie was not found")
        return result

    def get_setup_status(self) -> dict[str, Any]:
        return self.request("GET", "/console/api/setup")

    def get_system_features(self) -> dict[str, Any]:
        return self.request("GET", "/console/api/system-features")

    def get_app(self, app_id: str) -> dict[str, Any]:
        return self.request("GET", f"/console/api/apps/{app_id}")

    def import_app_dsl(
        self,
        *,
        yaml_content: str,
        name: str | None = None,
        description: str | None = None,
        icon_type: str | None = None,
        icon: str | None = None,
        icon_background: str | None = None,
        app_id: str | None = None,
    ) -> dict[str, Any]:
        payload: dict[str, Any] = {
            "mode": "yaml-content",
            "yaml_content": yaml_content,
        }
        if name:
            payload["name"] = name
        if description:
            payload["description"] = description
        if icon_type:
            payload["icon_type"] = icon_type
        if icon:
            payload["icon"] = icon
        if icon_background:
            payload["icon_background"] = icon_background
        if app_id:
            payload["app_id"] = app_id

        response = self.request(
            "POST",
            "/console/api/apps/imports",
            json_body=payload,
            allow_status_codes={202},
        )
        if not isinstance(response, dict):
            raise DifyConsoleError("Unexpected app import payload", payload=response)
        return response

    def confirm_app_import(self, import_id: str) -> dict[str, Any]:
        response = self.request("POST", f"/console/api/apps/imports/{import_id}/confirm", json_body={})
        if not isinstance(response, dict):
            raise DifyConsoleError("Unexpected app import confirmation payload", payload=response)
        return response

    def get_published_workflow(self, app_id: str) -> dict[str, Any]:
        response = self.request("GET", f"/console/api/apps/{app_id}/workflows/publish")
        if not isinstance(response, dict):
            raise DifyConsoleError("Unexpected published workflow payload", payload=response)
        return response

    def publish_workflow(
        self,
        app_id: str,
        *,
        marked_name: str = "",
        marked_comment: str = "",
    ) -> dict[str, Any]:
        payload = {
            "marked_name": marked_name,
            "marked_comment": marked_comment,
        }
        response = self.request("POST", f"/console/api/apps/{app_id}/workflows/publish", json_body=payload)
        if not isinstance(response, dict):
            raise DifyConsoleError("Unexpected publish workflow payload", payload=response)
        return response

    def list_app_api_keys(self, app_id: str) -> dict[str, Any]:
        response = self.request("GET", f"/console/api/apps/{app_id}/api-keys")
        if not isinstance(response, dict):
            raise DifyConsoleError("Unexpected app api keys payload", payload=response)
        return response

    def create_app_api_key(self, app_id: str) -> dict[str, Any]:
        response = self.request("POST", f"/console/api/apps/{app_id}/api-keys")
        if not isinstance(response, dict):
            raise DifyConsoleError("Unexpected create app api key payload", payload=response)
        return response

    def ensure_app_api_key(self, app_id: str) -> str:
        existing_keys = self.list_app_api_keys(app_id)
        existing_token = (
            existing_keys.get("data", [{}])[0].get("token")
            if isinstance(existing_keys.get("data"), list) and existing_keys.get("data")
            else None
        )
        if isinstance(existing_token, str) and existing_token:
            return existing_token

        created_key = self.create_app_api_key(app_id)
        token = created_key.get("token") or created_key.get("data", {}).get("token")
        if not isinstance(token, str) or not token:
            raise DifyConsoleError("Dify did not return an app API key", payload=created_key)
        return token

    def export_app_dsl(
        self,
        app_id: str,
        *,
        include_secret: bool = False,
        workflow_id: str | None = None,
    ) -> str:
        params: dict[str, Any] = {
            "include_secret": "true" if include_secret else "false",
        }
        if workflow_id:
            params["workflow_id"] = workflow_id

        response = self.request("GET", f"/console/api/apps/{app_id}/export", params=params)
        if not isinstance(response, dict):
            raise DifyConsoleError("Unexpected app export payload", payload=response)

        data = response.get("data")
        if not isinstance(data, str) or not data.strip():
            raise DifyConsoleError("App export payload did not include DSL content", payload=response)

        return data

    def list_datasets(self, *, page: int = 1, limit: int = 100, keyword: str | None = None) -> dict[str, Any]:
        params: dict[str, Any] = {"page": page, "limit": limit}
        if keyword:
            params["keyword"] = keyword
        return self.request("GET", "/console/api/datasets", params=params)

    def get_dataset_documents(self, dataset_id: str, *, page: int = 1, limit: int = 100) -> dict[str, Any]:
        return self.request(
            "GET",
            f"/console/api/datasets/{dataset_id}/documents",
            params={"page": page, "limit": limit, "fetch": "false"},
        )

    def create_dataset(self, *, name: str, description: str = "", indexing_technique: str = "economy") -> dict[str, Any]:
        payload = {
            "name": name,
            "description": description,
            "indexing_technique": indexing_technique,
            "permission": "only_me",
            "provider": "vendor",
        }
        return self.request("POST", "/console/api/datasets", json_body=payload)

    def upload_dataset_file(self, file_path: Path) -> dict[str, Any]:
        body, content_type = build_multipart_form_data(
            fields={"source": "datasets"},
            file_field_name="file",
            file_path=file_path,
        )
        return self.request(
            "POST",
            "/console/api/files/upload",
            body=body,
            content_type=content_type,
        )

    def create_document_from_file(
        self,
        *,
        dataset_id: str,
        file_id: str,
        indexing_technique: str = "economy",
        doc_language: str = "English",
    ) -> dict[str, Any]:
        payload = {
            "indexing_technique": indexing_technique,
            "doc_form": "text_model",
            "doc_language": doc_language,
            "duplicate": True,
            "process_rule": {"mode": "automatic"},
            "data_source": {
                "info_list": {
                    "data_source_type": "upload_file",
                    "file_info_list": {"file_ids": [file_id]},
                }
            },
        }
        return self.request("POST", f"/console/api/datasets/{dataset_id}/documents", json_body=payload)

    def list_tool_providers(self, provider_type: str | None = None) -> Any:
        params: dict[str, Any] = {}
        if provider_type:
            params["type"] = provider_type
        return self.request("GET", "/console/api/workspaces/current/tool-providers", params=params)

    def create_workflow_tool(
        self,
        *,
        workflow_app_id: str,
        name: str,
        label: str,
        description: str,
        parameters: list[dict[str, Any]],
        icon: dict[str, Any] | None = None,
        privacy_policy: str = "",
        labels: list[str] | None = None,
    ) -> dict[str, Any]:
        payload = {
            "workflow_app_id": workflow_app_id,
            "name": name,
            "label": label,
            "icon": icon or {"type": "emoji", "emoji": "🧩"},
            "description": description,
            "parameters": parameters,
            "privacy_policy": privacy_policy,
            "labels": labels or [],
        }
        response = self.request(
            "POST",
            "/console/api/workspaces/current/tool-provider/workflow/create",
            json_body=payload,
        )
        if not isinstance(response, dict):
            raise DifyConsoleError("Unexpected workflow tool creation payload", payload=response)
        return response

    def get_workflow_tool(
        self,
        *,
        workflow_tool_id: str | None = None,
        workflow_app_id: str | None = None,
    ) -> dict[str, Any]:
        params: dict[str, Any] = {}
        if workflow_tool_id:
            params["workflow_tool_id"] = workflow_tool_id
        if workflow_app_id:
            params["workflow_app_id"] = workflow_app_id
        if not params:
            raise ValueError("workflow_tool_id or workflow_app_id is required")

        response = self.request(
            "GET",
            "/console/api/workspaces/current/tool-provider/workflow/get",
            params=params,
        )
        if not isinstance(response, dict):
            raise DifyConsoleError("Unexpected workflow tool payload", payload=response)
        return response

    def list_workflow_tool_tools(self, workflow_tool_id: str) -> list[dict[str, Any]]:
        response = self.request(
            "GET",
            "/console/api/workspaces/current/tool-provider/workflow/tools",
            params={"workflow_tool_id": workflow_tool_id},
        )
        if not isinstance(response, list):
            raise DifyConsoleError("Unexpected workflow tool tools payload", payload=response)
        return response

    def get_api_tool_provider(self, provider: str) -> dict[str, Any]:
        return self.request(
            "GET",
            "/console/api/workspaces/current/tool-provider/api/get",
            params={"provider": provider},
        )

    def list_api_tool_provider_tools(self, provider: str) -> list[dict[str, Any]]:
        return self.request(
            "GET",
            "/console/api/workspaces/current/tool-provider/api/tools",
            params={"provider": provider},
        )

    def fetch_remote_schema(self, url: str) -> dict[str, Any]:
        return self.request(
            "GET",
            "/console/api/workspaces/current/tool-provider/api/remote",
            params={"url": url},
        )

    def create_api_tool_provider(
        self,
        *,
        provider: str,
        schema: str,
        icon: dict[str, Any] | None = None,
        credentials: dict[str, Any] | None = None,
        privacy_policy: str = "",
        custom_disclaimer: str = "",
        labels: list[str] | None = None,
    ) -> dict[str, Any]:
        payload = {
            "provider": provider,
            "icon": icon or {"background": "#334155", "content": "AC"},
            "credentials": credentials or {"auth_type": "none", "api_key_header": "api_key", "api_key_value": ""},
            "schema_type": "openapi",
            "schema": schema,
            "privacy_policy": privacy_policy,
            "custom_disclaimer": custom_disclaimer,
            "labels": labels or [],
        }
        return self.request("POST", "/console/api/workspaces/current/tool-provider/api/add", json_body=payload)

    def update_api_tool_provider(
        self,
        *,
        provider: str,
        original_provider: str,
        schema: str,
        icon: dict[str, Any] | None = None,
        credentials: dict[str, Any] | None = None,
        privacy_policy: str = "",
        custom_disclaimer: str = "",
        labels: list[str] | None = None,
    ) -> dict[str, Any]:
        payload = {
            "provider": provider,
            "original_provider": original_provider,
            "icon": icon or {"background": "#334155", "content": "AC"},
            "credentials": credentials or {"auth_type": "none", "api_key_header": "api_key", "api_key_value": ""},
            "schema_type": "openapi",
            "schema": schema,
            "privacy_policy": privacy_policy,
            "custom_disclaimer": custom_disclaimer,
            "labels": labels or [],
        }
        return self.request("POST", "/console/api/workspaces/current/tool-provider/api/update", json_body=payload)

    def request(
        self,
        method: str,
        path: str,
        *,
        params: dict[str, Any] | None = None,
        headers: dict[str, str] | None = None,
        json_body: dict[str, Any] | list[Any] | None = None,
        body: bytes | None = None,
        content_type: str | None = None,
        allow_status_codes: set[int] | None = None,
    ) -> Any:
        final_headers: dict[str, str] = {"Accept": "application/json"}
        if headers:
            final_headers.update(headers)

        payload_bytes: bytes | None = None
        if json_body is not None and body is not None:
            raise ValueError("Provide either json_body or body, not both")

        if json_body is not None:
            payload_bytes = json.dumps(json_body).encode("utf-8")
            final_headers.setdefault("Content-Type", "application/json")
        elif body is not None:
            payload_bytes = body
            if content_type:
                final_headers.setdefault("Content-Type", content_type)

        method_upper = method.upper()
        self._refresh_csrf_token_from_cookies()
        excluded = {"/console/api/login", "/console/api/setup"}
        parsed_path = urlparse(self._build_url(path)).path
        if self.csrf_token and parsed_path not in excluded:
            final_headers.setdefault("X-CSRF-Token", self.csrf_token)

        url = self._build_url(path)
        if params:
            query = urlencode(params, doseq=True)
            url = f"{url}?{query}"

        request = Request(url=url, data=payload_bytes, method=method_upper, headers=final_headers)

        try:
            with self.opener.open(request, timeout=self.timeout_seconds) as response:
                response_text = response.read().decode("utf-8", errors="replace")
                self._refresh_csrf_token_from_cookies()
                return self._parse_response_text(response_text)
        except HTTPError as exc:
            response_text = exc.read().decode("utf-8", errors="replace")
            parsed = self._parse_response_text(response_text)
            if allow_status_codes and exc.code in allow_status_codes:
                return parsed
            raise DifyConsoleError(
                self._extract_error_message(parsed),
                status_code=exc.code,
                payload=parsed,
            ) from exc
        except URLError as exc:
            raise DifyConsoleError(f"Connection error: {exc}") from exc

    def _build_url(self, path: str) -> str:
        if path.startswith("http://") or path.startswith("https://"):
            return path
        normalized = path if path.startswith("/") else f"/{path}"
        return f"{self.base_url}{normalized}"

    def _refresh_csrf_token_from_cookies(self) -> None:
        for cookie in self.cookie_jar:
            if cookie.name.endswith("csrf_token"):
                self.csrf_token = cookie.value

    @staticmethod
    def _parse_response_text(response_text: str) -> Any:
        text = response_text.strip()
        if not text:
            return {}
        if text.startswith("{") or text.startswith("["):
            try:
                return json.loads(text)
            except json.JSONDecodeError:
                return text
        return text

    @staticmethod
    def _extract_error_message(payload: Any) -> str:
        if isinstance(payload, dict):
            for key in ("message", "error", "detail", "msg"):
                value = payload.get(key)
                if isinstance(value, str) and value.strip():
                    return value
            return json.dumps(payload, ensure_ascii=False)
        if isinstance(payload, str) and payload.strip():
            return payload
        return "Unknown Dify API error"


def build_multipart_form_data(
    *,
    fields: dict[str, str],
    file_field_name: str,
    file_path: Path,
) -> tuple[bytes, str]:
    boundary = f"----AskCrystalBoundary{uuid.uuid4().hex}"
    line_break = b"\r\n"
    chunks: list[bytes] = []

    for key, value in fields.items():
        chunks.append(f"--{boundary}".encode("utf-8"))
        chunks.append(f'Content-Disposition: form-data; name="{key}"'.encode("utf-8"))
        chunks.append(b"")
        chunks.append(value.encode("utf-8"))

    file_bytes = file_path.read_bytes()
    mime_type = mimetypes.guess_type(file_path.name)[0] or "application/octet-stream"

    chunks.append(f"--{boundary}".encode("utf-8"))
    chunks.append(
        f'Content-Disposition: form-data; name="{file_field_name}"; filename="{file_path.name}"'.encode("utf-8")
    )
    chunks.append(f"Content-Type: {mime_type}".encode("utf-8"))
    chunks.append(b"")
    chunks.append(file_bytes)
    chunks.append(f"--{boundary}--".encode("utf-8"))
    chunks.append(b"")

    body = line_break.join(chunks)
    content_type = f"multipart/form-data; boundary={boundary}"
    return body, content_type
