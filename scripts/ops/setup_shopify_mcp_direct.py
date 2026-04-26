#!/usr/bin/env python3
from __future__ import annotations

from pathlib import Path
import sys

ROOT_DIR = Path(__file__).resolve().parents[2]
if str(ROOT_DIR) not in sys.path:
    sys.path.insert(0, str(ROOT_DIR))

import argparse
import os
from typing import Any

from scripts.common.dify_console_client import DifyConsoleClient, DifyConsoleError


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(
        description="Configure Shopify Storefront MCP directly in Dify and attach MCP tools to AskCrystal app"
    )
    parser.add_argument("--base-url", default=os.getenv("DIFY_BASE_URL", "http://localhost:18080"))
    parser.add_argument("--email", default=os.getenv("DIFY_ADMIN_EMAIL", "askcrystal.admin@example.com"))
    parser.add_argument("--password", default=os.getenv("DIFY_ADMIN_PASSWORD", "Askcrystal123"))
    parser.add_argument("--app-id", default=os.getenv("DIFY_APP_ID", "385c285a-0e61-4cf1-ba49-afde28c5ce12"))
    parser.add_argument("--name", default=os.getenv("SHOPIFY_MCP_PROVIDER_NAME", "Shopify Storefront MCP"))
    parser.add_argument(
        "--server-identifier",
        default=os.getenv("SHOPIFY_MCP_SERVER_IDENTIFIER", "shopify_storefront"),
        help="MCP provider identifier stored in Dify (used as provider_id in agent tools)",
    )
    parser.add_argument(
        "--server-url",
        default=os.getenv("SHOPIFY_STOREFRONT_MCP_URL", "https://askcrystal.myshopify.com/api/mcp"),
    )
    parser.add_argument("--timeout", type=float, default=float(os.getenv("SHOPIFY_MCP_TIMEOUT", "30")))
    parser.add_argument("--sse-read-timeout", type=float, default=float(os.getenv("SHOPIFY_MCP_SSE_TIMEOUT", "300")))
    parser.add_argument(
        "--storefront-token",
        default=os.getenv("SHOPIFY_STOREFRONT_ACCESS_TOKEN", ""),
        help="Optional X-Shopify-Storefront-Access-Token header value",
    )
    parser.add_argument(
        "--bearer-token",
        default=os.getenv("SHOPIFY_STOREFRONT_MCP_BEARER_TOKEN", ""),
        help="Optional Authorization bearer token value",
    )
    parser.add_argument("--dry-run", action="store_true")
    return parser.parse_args()


def _list_mcp_providers(client: DifyConsoleClient) -> list[dict[str, Any]]:
    providers = client.request("GET", "/console/api/workspaces/current/tool-providers", params={"type": "mcp"})
    if isinstance(providers, list):
        return [item for item in providers if isinstance(item, dict)]
    return []


def _find_provider(
    providers: list[dict[str, Any]],
    *,
    server_identifier: str,
    name: str,
) -> dict[str, Any] | None:
    for item in providers:
        if item.get("server_identifier") == server_identifier:
            return item
    for item in providers:
        if item.get("name") == name:
            return item
    return None


def _extract_tool_names(provider_payload: Any) -> list[str]:
    if not isinstance(provider_payload, dict):
        return []
    tools = provider_payload.get("tools")
    if not isinstance(tools, list):
        return []
    names: list[str] = []
    for item in tools:
        if isinstance(item, dict) and isinstance(item.get("name"), str):
            names.append(item["name"])
    return sorted(set(names))


def _build_headers(args: argparse.Namespace) -> dict[str, str]:
    headers: dict[str, str] = {}
    if args.storefront_token.strip():
        headers["X-Shopify-Storefront-Access-Token"] = args.storefront_token.strip()
    if args.bearer_token.strip():
        headers["Authorization"] = f"Bearer {args.bearer_token.strip()}"
    return headers


def main() -> int:
    args = parse_args()
    client = DifyConsoleClient(args.base_url, timeout_seconds=120)

    try:
        client.login(email=args.email, password=args.password)

        headers = _build_headers(args)
        upsert_payload = {
            "server_url": args.server_url,
            "name": args.name,
            "icon": "😀",
            "icon_type": "emoji",
            "icon_background": "#16A34A",
            "server_identifier": args.server_identifier,
            "configuration": {
                "timeout": args.timeout,
                "sse_read_timeout": args.sse_read_timeout,
            },
            "headers": headers,
            "authentication": {},
        }

        providers = _list_mcp_providers(client)
        existing = _find_provider(
            providers,
            server_identifier=args.server_identifier,
            name=args.name,
        )

        if existing:
            provider_uuid = str(existing.get("id", "")).strip()
            if not provider_uuid:
                raise DifyConsoleError("Existing MCP provider is missing id", payload=existing)
            update_payload = dict(upsert_payload)
            update_payload["provider_id"] = provider_uuid
            print(f"[mcp] updating provider id={provider_uuid} identifier={args.server_identifier}")
            if not args.dry_run:
                client.request("PUT", "/console/api/workspaces/current/tool-provider/mcp", json_body=update_payload)
        else:
            print(f"[mcp] creating provider identifier={args.server_identifier}")
            if not args.dry_run:
                client.request("POST", "/console/api/workspaces/current/tool-provider/mcp", json_body=upsert_payload)

        providers_after = _list_mcp_providers(client)
        provider = _find_provider(
            providers_after,
            server_identifier=args.server_identifier,
            name=args.name,
        )
        if not provider:
            raise DifyConsoleError("MCP provider was not found after create/update")

        provider_uuid = str(provider.get("id", "")).strip()
        if not provider_uuid:
            raise DifyConsoleError("MCP provider id is empty", payload=provider)

        print(f"[mcp] provider ready id={provider_uuid} identifier={args.server_identifier}")

        detail_payload: dict[str, Any] = {}
        if not args.dry_run:
            try:
                # Refresh/validate remote tools when authorized.
                client.request("GET", f"/console/api/workspaces/current/tool-provider/mcp/update/{provider_uuid}")
            except DifyConsoleError as exc:
                print(f"[mcp] tool refresh skipped: {exc}")

            try:
                detail_obj = client.request("GET", f"/console/api/workspaces/current/tool-provider/mcp/tools/{provider_uuid}")
                if isinstance(detail_obj, dict):
                    detail_payload = detail_obj
            except DifyConsoleError as exc:
                print(f"[mcp] tool detail fetch skipped: {exc}")

        tool_names = _extract_tool_names(detail_payload)
        print(f"[mcp] tools discovered={len(tool_names)}")
        for name in tool_names:
            print(f"  - {name}")

        app = client.request("GET", f"/console/api/apps/{args.app_id}")
        model_config = app.get("model_config") or {}
        if not isinstance(model_config, dict):
            raise DifyConsoleError("App model_config is missing or invalid")

        agent_mode = model_config.get("agent_mode") or {}
        if not isinstance(agent_mode, dict):
            agent_mode = {}

        existing_tools = agent_mode.get("tools") or []
        if not isinstance(existing_tools, list):
            existing_tools = []

        retained_tools: list[dict[str, Any]] = []
        for tool in existing_tools:
            if not isinstance(tool, dict):
                continue

            provider_type = str(tool.get("provider_type", ""))
            provider_id = str(tool.get("provider_id", ""))
            tool_name = str(tool.get("tool_name", ""))

            if provider_type == "mcp" and provider_id == args.server_identifier:
                # Replace MCP tool refs for this provider.
                continue

            if provider_type == "api" and tool_name.startswith("shopify_storefront_"):
                # Remove legacy bridge Shopify tool refs.
                continue

            retained_tools.append(tool)

        new_mcp_refs = [
            {
                "enabled": True,
                "provider_type": "mcp",
                "provider_id": args.server_identifier,
                "tool_name": tool_name,
                "tool_parameters": {},
            }
            for tool_name in tool_names
        ]

        agent_mode["enabled"] = True
        agent_mode["tools"] = retained_tools + new_mcp_refs
        model_config["agent_mode"] = agent_mode

        print(
            "[mcp] app tool merge retained={retained} mcp_added={mcp_added} total={total}".format(
                retained=len(retained_tools),
                mcp_added=len(new_mcp_refs),
                total=len(agent_mode["tools"]),
            )
        )

        if args.dry_run:
            print("[mcp] dry run complete")
            return 0

        client.request("POST", f"/console/api/apps/{args.app_id}/model-config", json_body=model_config)
        print(f"[mcp] app updated app_id={args.app_id}")

        if not tool_names:
            print("[mcp] warning: provider exists but no MCP tools are available yet (likely auth/permission issue)")
        return 0
    except DifyConsoleError as exc:
        print(f"[mcp] failed: {exc}")
        if exc.payload is not None:
            print(f"[mcp] details: {exc.payload}")
        return 1


if __name__ == "__main__":
    raise SystemExit(main())
