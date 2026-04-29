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
from typing import Any

from scripts.common.dify_console_client import DifyConsoleClient, DifyConsoleError


REPO_ROOT = Path(__file__).resolve().parents[2]
DEFAULT_DSL_PATH = REPO_ROOT / "services" / "dify-agent" / "dsl" / "askcrystal-fengshui-workflow-2026-04-26.dsl.yml"
WORKFLOW_TOOL_NAME = "workflow_fengshui_space_audit"
WORKFLOW_TOOL_LABEL = "Fengshui Space Audit"
WORKFLOW_TOOL_DESCRIPTION = (
    "Builds a grounded home or workspace fengshui audit contract for the main AskCrystal agent to interpret."
)
WORKFLOW_TOOL_ICON = {"type": "emoji", "emoji": "🧭"}
WORKFLOW_TOOL_LABELS = ["utilities"]
WORKFLOW_TOOL_PARAMETERS = [
    {
        "name": "space_description",
        "description": "A plain-language description of the room, home, or workspace layout and the main issue the user wants help with.",
        "form": "llm",
    },
    {
        "name": "facing_direction",
        "description": "Optional facing direction such as north, south, southeast, or west.",
        "form": "llm",
    },
    {
        "name": "priority_goal",
        "description": "Optional goal such as sleep, focus, wealth flow, calm, relationships, or health.",
        "form": "llm",
    },
    {
        "name": "move_in_year",
        "description": "Optional move-in or renovation-completion year used for light period framing.",
        "form": "llm",
    },
]


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(
        description="Import, publish, and register the AskCrystal fengshui workflow as a Dify workflow tool."
    )
    parser.add_argument("--base-url", default=os.getenv("DIFY_BASE_URL", "http://localhost:18080"))
    parser.add_argument("--email", default=os.getenv("DIFY_ADMIN_EMAIL", ""))
    parser.add_argument("--password", default=os.getenv("DIFY_ADMIN_PASSWORD", ""))
    parser.add_argument("--dsl", default=str(DEFAULT_DSL_PATH), help="Path to the workflow DSL file to import.")
    parser.add_argument("--app-id", default=None, help="Optional existing workflow app id to overwrite when supported.")
    parser.add_argument("--skip-publish", action="store_true", help="Import the workflow but do not publish it.")
    parser.add_argument("--skip-tool-create", action="store_true", help="Import and publish the workflow without creating the workflow tool wrapper.")
    parser.add_argument("--publish-marked-name", default="Fengshui workflow", help="Release marker name shown in Dify workflow history.")
    parser.add_argument("--publish-marked-comment", default="Provisioned from the AskCrystal repo automation.", help="Release marker comment shown in Dify workflow history.")
    parser.add_argument("--output-json", default="", help="Optional path for a non-secret provisioning summary JSON file.")
    return parser.parse_args()


def load_dsl(path: Path) -> str:
    if not path.exists():
        raise FileNotFoundError(f"DSL file not found: {path}")
    return path.read_text(encoding="utf-8")


def maybe_confirm_import(client: DifyConsoleClient, import_result: dict[str, Any]) -> dict[str, Any]:
    status = str(import_result.get("status") or "")
    if status != "pending":
        return import_result

    import_id = import_result.get("id")
    if not isinstance(import_id, str) or not import_id:
        raise DifyConsoleError("Dify import requires confirmation but did not return an import id", payload=import_result)

    return client.confirm_app_import(import_id)


def ensure_workflow_tool(client: DifyConsoleClient, workflow_app_id: str) -> dict[str, Any]:
    try:
        existing = client.get_workflow_tool(workflow_app_id=workflow_app_id)
        if isinstance(existing, dict) and existing:
            workflow_tool_id = existing.get("workflow_tool_id") or existing.get("id")
            if isinstance(workflow_tool_id, str) and workflow_tool_id:
                # Refresh the pinned workflow version and parameter contract after every publish.
                client.update_workflow_tool(
                    workflow_tool_id=workflow_tool_id,
                    name=WORKFLOW_TOOL_NAME,
                    label=WORKFLOW_TOOL_LABEL,
                    description=WORKFLOW_TOOL_DESCRIPTION,
                    parameters=WORKFLOW_TOOL_PARAMETERS,
                    icon=WORKFLOW_TOOL_ICON,
                    labels=WORKFLOW_TOOL_LABELS,
                )
                return client.get_workflow_tool(workflow_tool_id=workflow_tool_id)
            return existing
    except DifyConsoleError:
        pass

    created = client.create_workflow_tool(
        workflow_app_id=workflow_app_id,
        name=WORKFLOW_TOOL_NAME,
        label=WORKFLOW_TOOL_LABEL,
        description=WORKFLOW_TOOL_DESCRIPTION,
        icon=WORKFLOW_TOOL_ICON,
        labels=WORKFLOW_TOOL_LABELS,
        parameters=WORKFLOW_TOOL_PARAMETERS,
    )
    workflow_tool_id = created.get("workflow_tool_id") or created.get("id")
    if isinstance(workflow_tool_id, str) and workflow_tool_id:
        return client.get_workflow_tool(workflow_tool_id=workflow_tool_id)
    return client.get_workflow_tool(workflow_app_id=workflow_app_id)


def main() -> int:
    args = parse_args()
    dsl_path = Path(args.dsl).expanduser().resolve()

    try:
        client = DifyConsoleClient(args.base_url, timeout_seconds=180)
        client.login(email=args.email, password=args.password)

        import_result = client.import_app_dsl(
            yaml_content=load_dsl(dsl_path),
            app_id=args.app_id,
        )
        final_import = maybe_confirm_import(client, import_result)

        app_id = final_import.get("app_id")
        if not isinstance(app_id, str) or not app_id:
            raise DifyConsoleError("Dify import did not return an app id", payload=final_import)

        publish_result: dict[str, Any] | None = None
        if not args.skip_publish:
            publish_result = client.publish_workflow(
                app_id,
                marked_name=args.publish_marked_name,
                marked_comment=args.publish_marked_comment,
            )

        workflow_tool: dict[str, Any] | None = None
        workflow_tool_tools: list[dict[str, Any]] = []
        if not args.skip_tool_create:
            workflow_tool = ensure_workflow_tool(client, app_id)
            workflow_tool_id = workflow_tool.get("workflow_tool_id") or workflow_tool.get("id")
            if isinstance(workflow_tool_id, str) and workflow_tool_id:
                workflow_tool_tools = client.list_workflow_tool_tools(workflow_tool_id)

        app_detail = client.get_app(app_id)
        summary = {
            "dsl_path": str(dsl_path),
            "app_id": app_id,
            "app_name": app_detail.get("name"),
            "app_mode": app_detail.get("mode"),
            "import_status": final_import.get("status"),
            "published": publish_result is not None,
            "publish_result": publish_result or {},
            "workflow_tool": workflow_tool or {},
            "workflow_tool_tools": workflow_tool_tools,
        }

        if args.output_json:
            output_path = Path(args.output_json).expanduser().resolve()
            output_path.parent.mkdir(parents=True, exist_ok=True)
            output_path.write_text(json.dumps(summary, indent=2), encoding="utf-8")

        print(json.dumps(summary, indent=2))
        return 0
    except (DifyConsoleError, FileNotFoundError) as exc:
        print(json.dumps({"ok": False, "error": str(exc)}, indent=2))
        return 1


if __name__ == "__main__":
    raise SystemExit(main())
