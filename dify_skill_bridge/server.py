from __future__ import annotations

import json
import os
import re
from pathlib import Path
from typing import Any
from urllib.error import HTTPError, URLError
from urllib.request import Request, urlopen

from fastapi import FastAPI, HTTPException, Query
from pydantic import BaseModel, Field

try:
    from .crystal_index import CrystalIndex
    from .skill_runtime import SkillNotFoundError, SkillRuntime, SkillValidationError
except ImportError:  # pragma: no cover
    from crystal_index import CrystalIndex
    from skill_runtime import SkillNotFoundError, SkillRuntime, SkillValidationError


ROOT = Path(__file__).resolve().parent
DEFAULT_SKILLS_DIR = ROOT / "skills"
DEFAULT_KB_PATH = ROOT.parent / "crystal_knowledge_base_final-90b679ba5d.json"
DEFAULT_SHOPIFY_STORE_DOMAIN = "askcrystal.myshopify.com"
DEFAULT_SHOPIFY_MCP_PATH = "/api/mcp"
ENABLE_BRIDGE_SHOPIFY_MCP = os.getenv("ENABLE_BRIDGE_SHOPIFY_MCP", "0").strip().lower() in {
    "1",
    "true",
    "yes",
    "on",
}

skills_dir = Path(os.getenv("SKILL_BRIDGE_SKILLS_DIR", str(DEFAULT_SKILLS_DIR))).resolve()
kb_path = Path(os.getenv("SKILL_BRIDGE_KB_PATH", str(DEFAULT_KB_PATH))).resolve()

runtime = SkillRuntime.from_directory(skills_dir)
index = CrystalIndex(kb_path)

app = FastAPI(
    title="AskCrystal Skill Bridge",
    version="0.1.0",
    description=(
        "Bridges pluggable skill packs into Dify-compatible tool endpoints. "
        "Also exposes deterministic crystal lookup/search backed by local knowledge JSON."
    ),
)


class RunSkillRequest(BaseModel):
    skill_id: str = Field(description="The skill identifier to execute")
    variables: dict[str, Any] = Field(default_factory=dict, description="Template variables for the skill")


class SkillInvokeRequest(BaseModel):
    variables: dict[str, Any] = Field(default_factory=dict, description="Template variables for the skill")


class CrystalSearchRequest(BaseModel):
    query: str = ""
    element: str | None = None
    chakra: str | None = None
    zodiac: str | None = None
    limit: int = 8


if ENABLE_BRIDGE_SHOPIFY_MCP:
    class StorefrontListToolsRequest(BaseModel):
        store_domain: str | None = Field(
            default=None,
            description="Optional Shopify store domain override. Example: askcrystal.myshopify.com",
        )


    class StorefrontToolCallRequest(BaseModel):
        tool_name: str = Field(description="MCP tool name, e.g. search_shop_catalog, get_cart, update_cart")
        arguments: dict[str, Any] = Field(default_factory=dict, description="Arguments passed to the MCP tool")
        store_domain: str | None = Field(
            default=None,
            description="Optional Shopify store domain override. Example: askcrystal.myshopify.com",
        )


    class StorefrontCatalogSearchRequest(BaseModel):
        query: str = Field(description="User product query")
        context: str = Field(default="", description="Optional contextual hints (intent, budget, style)")
        limit: int | None = Field(default=None, ge=1, le=30, description="Optional result cap")
        store_domain: str | None = Field(default=None, description="Optional Shopify store domain override")


    class StorefrontPolicySearchRequest(BaseModel):
        query: str = Field(description="Policy or FAQ question")
        context: str = Field(default="", description="Optional context")
        store_domain: str | None = Field(default=None, description="Optional Shopify store domain override")


    class StorefrontGetCartRequest(BaseModel):
        cart_id: str = Field(description="Shopify cart ID")
        store_domain: str | None = Field(default=None, description="Optional Shopify store domain override")


    class StorefrontUpdateCartRequest(BaseModel):
        arguments: dict[str, Any] = Field(
            default_factory=dict,
            description=(
                "Arguments for update_cart tool. "
                "Typical keys: cart_id, add_items, update_line_items, remove_line_item_ids, note, attributes."
            ),
        )
        store_domain: str | None = Field(default=None, description="Optional Shopify store domain override")


@app.get("/health")
def health() -> dict[str, Any]:
    return {
        "status": "ok",
        "skills_loaded": len(runtime.export_skill_ids()),
        "skills_dir": str(skills_dir),
        "knowledge_base": str(kb_path),
    }


@app.get("/skills")
def list_skills() -> dict[str, Any]:
    return {"skills": runtime.list_skills()}


@app.post("/skills/run")
def run_skill(payload: RunSkillRequest) -> dict[str, Any]:
    try:
        return runtime.run_skill(payload.skill_id, payload.variables)
    except SkillNotFoundError as exc:
        raise HTTPException(status_code=404, detail=str(exc)) from exc
    except SkillValidationError as exc:
        raise HTTPException(status_code=422, detail=str(exc)) from exc


@app.get("/crystals")
def list_crystals(limit: int = Query(default=50, ge=1, le=200)) -> dict[str, Any]:
    return {"items": index.list_crystals(limit=limit)}


@app.get("/crystals/{slug}")
def get_crystal(slug: str) -> dict[str, Any]:
    item = index.get_crystal(slug)
    if item is None:
        raise HTTPException(status_code=404, detail=f"Crystal not found: {slug}")
    return item


@app.post("/crystals/search")
def search_crystals(payload: CrystalSearchRequest) -> dict[str, Any]:
    return {
        "items": index.search(
            query=payload.query,
            element=payload.element,
            chakra=payload.chakra,
            zodiac=payload.zodiac,
            limit=payload.limit,
        )
    }


if ENABLE_BRIDGE_SHOPIFY_MCP:
    def _resolve_storefront_mcp_url(store_domain: str | None = None) -> str:
        explicit_url = os.getenv("SHOPIFY_STOREFRONT_MCP_URL", "").strip()
        if explicit_url:
            return explicit_url

        domain = (store_domain or os.getenv("SHOPIFY_STORE_DOMAIN", DEFAULT_SHOPIFY_STORE_DOMAIN)).strip()
        if not domain:
            raise HTTPException(
                status_code=500,
                detail="Missing Shopify store domain. Set SHOPIFY_STORE_DOMAIN or pass store_domain.",
            )

        path = os.getenv("SHOPIFY_STOREFRONT_MCP_PATH", DEFAULT_SHOPIFY_MCP_PATH).strip() or DEFAULT_SHOPIFY_MCP_PATH
        if not path.startswith("/"):
            path = "/" + path

        return f"https://{domain}{path}"


    def _call_storefront_mcp(method: str, params: dict[str, Any], *, store_domain: str | None = None) -> dict[str, Any]:
        url = _resolve_storefront_mcp_url(store_domain)
        payload = {
            "jsonrpc": "2.0",
            "id": "askcrystal-shopify",
            "method": method,
            "params": params,
        }
        body = json.dumps(payload).encode("utf-8")

        headers = {
            "Content-Type": "application/json",
            "Accept": "application/json",
        }

        storefront_token = os.getenv("SHOPIFY_STOREFRONT_ACCESS_TOKEN", "").strip()
        if storefront_token:
            headers["X-Shopify-Storefront-Access-Token"] = storefront_token

        bearer_token = os.getenv("SHOPIFY_STOREFRONT_MCP_BEARER_TOKEN", "").strip()
        if bearer_token:
            headers["Authorization"] = f"Bearer {bearer_token}"

        request = Request(url=url, data=body, headers=headers, method="POST")

        try:
            with urlopen(request, timeout=30) as response:
                response_text = response.read().decode("utf-8", errors="replace")
        except HTTPError as exc:
            error_text = exc.read().decode("utf-8", errors="replace")
            raise HTTPException(
                status_code=502,
                detail=f"Shopify MCP HTTP error {exc.code}: {error_text[:500]}",
            ) from exc
        except URLError as exc:
            raise HTTPException(status_code=502, detail=f"Shopify MCP connection error: {exc}") from exc

        try:
            parsed = json.loads(response_text)
        except json.JSONDecodeError as exc:
            raise HTTPException(status_code=502, detail=f"Shopify MCP returned non-JSON: {response_text[:500]}") from exc

        if not isinstance(parsed, dict):
            raise HTTPException(status_code=502, detail=f"Unexpected Shopify MCP response: {type(parsed).__name__}")

        if isinstance(parsed.get("error"), dict):
            raise HTTPException(status_code=502, detail=f"Shopify MCP error: {parsed['error']}")

        return parsed


    def _call_storefront_tool(tool_name: str, arguments: dict[str, Any], *, store_domain: str | None = None) -> dict[str, Any]:
        mcp_response = _call_storefront_mcp(
            "tools/call",
            {"name": tool_name, "arguments": arguments},
            store_domain=store_domain,
        )
        return {
            "tool_name": tool_name,
            "arguments": arguments,
            "mcp_response": mcp_response,
        }


    @app.post(
        "/shopify/storefront/tools/list",
        operation_id="shopify_storefront_tools_list_post",
        summary="Shopify Storefront MCP Tools List",
        tags=["shopify-storefront-mcp"],
    )
    def storefront_tools_list(payload: StorefrontListToolsRequest) -> dict[str, Any]:
        response = _call_storefront_mcp("tools/list", {}, store_domain=payload.store_domain)
        return {"mcp_response": response}


    @app.post(
        "/shopify/storefront/tools/call",
        operation_id="shopify_storefront_tools_call_post",
        summary="Shopify Storefront MCP Generic Tool Call",
        tags=["shopify-storefront-mcp"],
    )
    def storefront_tools_call(payload: StorefrontToolCallRequest) -> dict[str, Any]:
        return _call_storefront_tool(
            payload.tool_name,
            payload.arguments,
            store_domain=payload.store_domain,
        )


    @app.post(
        "/shopify/storefront/search-catalog",
        operation_id="shopify_storefront_search_catalog_post",
        summary="Shopify Catalog Search (search_shop_catalog)",
        tags=["shopify-storefront-mcp"],
    )
    def storefront_search_catalog(payload: StorefrontCatalogSearchRequest) -> dict[str, Any]:
        arguments: dict[str, Any] = {"query": payload.query}
        if payload.context.strip():
            arguments["context"] = payload.context.strip()
        if payload.limit is not None:
            arguments["limit"] = payload.limit

        return _call_storefront_tool(
            "search_shop_catalog",
            arguments,
            store_domain=payload.store_domain,
        )


    @app.post(
        "/shopify/storefront/search-policies",
        operation_id="shopify_storefront_search_policies_post",
        summary="Shopify Policy/FAQ Search (search_shop_policies_and_faqs)",
        tags=["shopify-storefront-mcp"],
    )
    def storefront_search_policies(payload: StorefrontPolicySearchRequest) -> dict[str, Any]:
        arguments: dict[str, Any] = {"query": payload.query}
        if payload.context.strip():
            arguments["context"] = payload.context.strip()

        return _call_storefront_tool(
            "search_shop_policies_and_faqs",
            arguments,
            store_domain=payload.store_domain,
        )


    @app.post(
        "/shopify/storefront/get-cart",
        operation_id="shopify_storefront_get_cart_post",
        summary="Shopify Cart Read (get_cart)",
        tags=["shopify-storefront-mcp"],
    )
    def storefront_get_cart(payload: StorefrontGetCartRequest) -> dict[str, Any]:
        return _call_storefront_tool(
            "get_cart",
            {"cart_id": payload.cart_id},
            store_domain=payload.store_domain,
        )


    @app.post(
        "/shopify/storefront/update-cart",
        operation_id="shopify_storefront_update_cart_post",
        summary="Shopify Cart Update (update_cart)",
        tags=["shopify-storefront-mcp"],
    )
    def storefront_update_cart(payload: StorefrontUpdateCartRequest) -> dict[str, Any]:
        if not payload.arguments:
            raise HTTPException(status_code=422, detail="arguments is required for update_cart")
        return _call_storefront_tool(
            "update_cart",
            payload.arguments,
            store_domain=payload.store_domain,
        )


def _build_skill_operation_id(skill_id: str) -> str:
    normalized = re.sub(r"[^a-zA-Z0-9_]+", "_", skill_id).strip("_")
    if not normalized:
        normalized = "unknown_skill"
    return f"run_{normalized}_skill_post"


def _register_skill_tool_endpoints() -> None:
    for skill in runtime.list_skills():
        skill_id = str(skill.get("id", "")).strip()
        skill_name = str(skill.get("name", skill_id)).strip()
        when_to_use = str(skill.get("when_to_use", "")).strip()
        if not skill_id:
            continue

        path = f"/skill-tools/{skill_id}"
        operation_id = _build_skill_operation_id(skill_id)
        summary = f"Run Skill: {skill_name}"
        description = (
            f"Execute AskCrystal skill '{skill_name}' (id: {skill_id}). "
            f"{when_to_use}".strip()
        )

        def _make_handler(bound_skill_id: str):
            def _handler(payload: SkillInvokeRequest) -> dict[str, Any]:
                try:
                    return runtime.run_skill(bound_skill_id, payload.variables)
                except SkillNotFoundError as exc:
                    raise HTTPException(status_code=404, detail=str(exc)) from exc
                except SkillValidationError as exc:
                    raise HTTPException(status_code=422, detail=str(exc)) from exc

            safe_name = re.sub(r"[^a-zA-Z0-9_]+", "_", bound_skill_id).strip("_") or "skill"
            _handler.__name__ = f"run_{safe_name}_handler"
            return _handler

        app.post(
            path,
            operation_id=operation_id,
            summary=summary,
            description=description,
            tags=["skill-tools"],
        )(_make_handler(skill_id))


_register_skill_tool_endpoints()


if __name__ == "__main__":
    import uvicorn

    uvicorn.run(app, host="0.0.0.0", port=8010, reload=False)
