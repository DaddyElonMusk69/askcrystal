#!/usr/bin/env python3
from __future__ import annotations

from pathlib import Path
import sys

ROOT_DIR = Path(__file__).resolve().parents[2]
if str(ROOT_DIR) not in sys.path:
    sys.path.insert(0, str(ROOT_DIR))

import argparse
import json
import os

from scripts.common.dify_console_client import DifyConsoleClient, DifyConsoleError


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(description="AskCrystal local Dify end-to-end smoke test")
    parser.add_argument("--base-url", default=os.getenv("DIFY_BASE_URL", "http://localhost:18080"))
    parser.add_argument("--email", default=os.getenv("DIFY_ADMIN_EMAIL", ""))
    parser.add_argument("--password", default=os.getenv("DIFY_ADMIN_PASSWORD", ""))
    parser.add_argument("--app-id", default=os.getenv("DIFY_APP_ID", ""))
    parser.add_argument("--dataset-name", default=os.getenv("DIFY_DATASET_NAME", "AskCrystal-KB"))
    parser.add_argument("--wait-timeout", type=int, default=300)
    return parser.parse_args()


def find_dataset_id_and_total_docs(client: DifyConsoleClient, dataset_name: str) -> tuple[str | None, int]:
    page = 1
    while True:
        result = client.list_datasets(page=page, limit=100)
        items = result.get("data", [])
        for item in items:
            if item.get("name") == dataset_name:
                dataset_id = item.get("id")
                if dataset_id:
                    docs = client.get_dataset_documents(dataset_id=dataset_id, page=1, limit=100)
                    total = int(docs.get("total", 0))
                    return dataset_id, total
                return None, 0
        if not result.get("has_more"):
            break
        page += 1
    return None, 0


def load_expected_workflow_tools() -> set[str]:
    catalog_path = ROOT_DIR / "services" / "dify-agent" / "workflows" / "workflow-skill-catalog.json"
    catalog = json.loads(catalog_path.read_text(encoding="utf-8"))
    workflows = catalog.get("workflows", [])
    if not isinstance(workflows, list):
        return set()
    return {
        item["dify_tool_name"]
        for item in workflows
        if isinstance(item, dict) and isinstance(item.get("dify_tool_name"), str)
    }


def get_agent_tools(app: dict) -> list[dict]:
    model_config = app.get("model_config")
    if not isinstance(model_config, dict):
        return []
    agent_mode = model_config.get("agent_mode")
    if not isinstance(agent_mode, dict):
        return []
    tools = agent_mode.get("tools")
    if not isinstance(tools, list):
        return []
    return [tool for tool in tools if isinstance(tool, dict)]


def is_removed_skill_bridge_tool(tool: dict) -> bool:
    provider_type = str(tool.get("provider_type") or "")
    provider_id = str(tool.get("provider_id") or "")
    provider_name = str(tool.get("provider_name") or "")
    tool_name = str(tool.get("tool_name") or "")
    if provider_type != "api":
        return False
    values = [provider_id, provider_name, tool_name]
    return any(value == "askcrystal_skill_bridge" or "skill_bridge" in value for value in values)


def check_workflow_tool_surface(
    client: DifyConsoleClient,
    *,
    app_id: str,
) -> bool:
    expected_tools = load_expected_workflow_tools()
    if not expected_tools:
        print("[smoke] workflow catalog has no expected tools")
        return False

    app = client.get_app(app_id)
    agent_tools = get_agent_tools(app)
    if not agent_tools:
        print(f"[smoke] app has no agent tool configuration: {app_id}")
        return False

    enabled_workflow_tools = [
        tool
        for tool in agent_tools
        if tool.get("enabled", True) and tool.get("provider_type") == "workflow"
    ]
    found_names = {
        str(tool.get("tool_name"))
        for tool in enabled_workflow_tools
        if isinstance(tool.get("tool_name"), str)
    }
    missing = sorted(expected_tools - found_names)
    if missing:
        print(f"[smoke] missing workflow-native tools on app {app_id}: {', '.join(missing)}")
        return False

    removed_bridge_tools = [tool for tool in agent_tools if is_removed_skill_bridge_tool(tool)]
    if removed_bridge_tools:
        removed_names = sorted(str(tool.get("tool_name") or "") for tool in removed_bridge_tools)
        print(f"[smoke] removed skill bridge tools still enabled on app {app_id}: {', '.join(removed_names)}")
        return False

    unresolved_providers: list[str] = []
    for tool in enabled_workflow_tools:
        provider_id = tool.get("provider_id")
        tool_name = tool.get("tool_name")
        if not isinstance(provider_id, str) or not provider_id:
            unresolved_providers.append(str(tool_name))
            continue
        try:
            client.get_workflow_tool(workflow_tool_id=provider_id)
        except DifyConsoleError:
            unresolved_providers.append(str(tool_name))

    if unresolved_providers:
        print(f"[smoke] workflow tool wrappers could not be resolved: {', '.join(unresolved_providers)}")
        return False

    print(f"[smoke] workflow-native tools: ok ({len(expected_tools)} expected, {len(enabled_workflow_tools)} enabled)")
    return True


def main() -> int:
    args = parse_args()
    client = DifyConsoleClient(args.base_url)

    try:
        setup = client.wait_until_ready(timeout_seconds=args.wait_timeout)
        if setup.get("step") != "finished":
            print(f"[smoke] setup not finished: {setup}")
            return 1
        print("[smoke] setup endpoint: ok")

        client.login(email=args.email, password=args.password)
        print("[smoke] login: ok")

        dataset_id, total_docs = find_dataset_id_and_total_docs(client, args.dataset_name)
        if not dataset_id:
            print(f"[smoke] dataset missing: {args.dataset_name}")
            return 1
        if total_docs < 1:
            print(f"[smoke] dataset has no documents: {args.dataset_name} ({dataset_id})")
            return 1
        print(f"[smoke] dataset: ok ({args.dataset_name}, id={dataset_id}, docs={total_docs})")

        if not check_workflow_tool_surface(client, app_id=args.app_id):
            return 1

        print("[smoke] all checks passed")
        return 0
    except (DifyConsoleError, RuntimeError) as exc:
        print(f"[smoke] failed: {exc}")
        return 1


if __name__ == "__main__":
    raise SystemExit(main())
