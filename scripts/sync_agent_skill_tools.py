#!/usr/bin/env python3
from __future__ import annotations

import argparse
import os

from dify_console_client import DifyConsoleClient, DifyConsoleError


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(
        description="Sync AskCrystal app agent tools with all per-skill endpoints from the skill bridge provider"
    )
    parser.add_argument("--base-url", default=os.getenv("DIFY_BASE_URL", "http://localhost:18080"))
    parser.add_argument("--email", default=os.getenv("DIFY_ADMIN_EMAIL", "askcrystal.admin@example.com"))
    parser.add_argument("--password", default=os.getenv("DIFY_ADMIN_PASSWORD", "Askcrystal123"))
    parser.add_argument("--app-id", default=os.getenv("DIFY_APP_ID", "385c285a-0e61-4cf1-ba49-afde28c5ce12"))
    parser.add_argument("--provider", default=os.getenv("DIFY_SKILL_PROVIDER", "askcrystal_skill_bridge"))
    parser.add_argument(
        "--include-list-skills",
        action="store_true",
        help="Also include list_skills_skills_get tool in app config",
    )
    parser.add_argument(
        "--include-bridge-shopify-tools",
        action="store_true",
        help="Include bridge-side shopify_storefront_* tools (disabled by default)",
    )
    parser.add_argument("--dry-run", action="store_true", help="Print selected tools without updating app config")
    return parser.parse_args()


def find_provider_id(client: DifyConsoleClient, provider_name: str) -> str:
    providers = client.list_tool_providers(provider_type="api")
    if not isinstance(providers, list):
        raise DifyConsoleError("Unexpected tool providers payload", payload=providers)

    for item in providers:
        if isinstance(item, dict) and item.get("name") == provider_name and item.get("id"):
            return str(item["id"])

    raise DifyConsoleError(f"API tool provider not found: {provider_name}")


def build_selected_tool_names(
    available_names: set[str],
    *,
    include_list_skills: bool,
    include_bridge_shopify_tools: bool,
) -> list[str]:
    skill_tools = sorted(
        name for name in available_names if name.startswith("run_") and name.endswith("_skill_post")
    )

    if not skill_tools:
        # Backward-compatible fallback for older bridge schemas.
        fallback = [name for name in ["run_skill_skills_run_post"] if name in available_names]
        if not fallback:
            raise DifyConsoleError("No skill execution tools found in provider schema")
        skill_tools = fallback

    selected = list(skill_tools)

    if include_list_skills and "list_skills_skills_get" in available_names:
        selected.append("list_skills_skills_get")

    if include_bridge_shopify_tools:
        shopify_tools = sorted(
            name
            for name in available_names
            if name.startswith("shopify_storefront_") and name.endswith("_post")
        )
        selected.extend(shopify_tools)

    for name in [
        "search_crystals_crystals_search_post",
        "get_crystal_crystals__slug__get",
        "list_crystals_crystals_get",
    ]:
        if name in available_names:
            selected.append(name)

    # Preserve order while removing duplicates.
    return list(dict.fromkeys(selected))


def main() -> int:
    args = parse_args()
    client = DifyConsoleClient(args.base_url, timeout_seconds=120)

    try:
        client.login(email=args.email, password=args.password)
        provider_id = find_provider_id(client, args.provider)
        provider_tools = client.list_api_tool_provider_tools(args.provider)
        available_names = {
            str(item.get("name"))
            for item in provider_tools
            if isinstance(item, dict) and isinstance(item.get("name"), str)
        }

        selected_names = build_selected_tool_names(
            available_names,
            include_list_skills=args.include_list_skills,
            include_bridge_shopify_tools=args.include_bridge_shopify_tools,
        )
        print(f"[sync] provider={args.provider} id={provider_id}")
        print(f"[sync] selected tools={len(selected_names)}")
        for name in selected_names:
            print(f"  - {name}")

        if args.dry_run:
            print("[sync] dry run complete")
            return 0

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

        retained_tools = [
            tool
            for tool in existing_tools
            if not (
                isinstance(tool, dict)
                and tool.get("provider_type") == "api"
                and str(tool.get("provider_id")) == provider_id
            )
        ]

        new_refs = [
            {
                "enabled": True,
                "provider_type": "api",
                "provider_id": provider_id,
                "tool_name": name,
                "tool_parameters": {},
            }
            for name in selected_names
        ]

        agent_mode["enabled"] = True
        agent_mode["tools"] = retained_tools + new_refs
        model_config["agent_mode"] = agent_mode

        client.request("POST", f"/console/api/apps/{args.app_id}/model-config", json_body=model_config)
        print(
            f"[sync] app updated app_id={args.app_id} "
            f"retained={len(retained_tools)} injected={len(new_refs)} total={len(agent_mode['tools'])}"
        )
        return 0
    except DifyConsoleError as exc:
        print(f"[sync] failed: {exc}")
        if exc.payload is not None:
            print(f"[sync] details: {exc.payload}")
        return 1


if __name__ == "__main__":
    raise SystemExit(main())
