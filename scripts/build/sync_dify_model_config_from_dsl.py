#!/usr/bin/env python3
from __future__ import annotations

import argparse
import json
import os
import subprocess
import sys
from pathlib import Path

ROOT_DIR = Path(__file__).resolve().parents[2]
if str(ROOT_DIR) not in sys.path:
    sys.path.insert(0, str(ROOT_DIR))

from scripts.common.dify_console_client import DifyConsoleClient, DifyConsoleError

try:
    import yaml  # type: ignore
except ModuleNotFoundError:  # pragma: no cover - environment-specific fallback
    yaml = None


DEFAULT_DSL_PATH = ROOT_DIR / "services" / "dify-agent" / "dsl" / "askcrystal-agent-2026-04-23.dsl.yml"


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(
        description="Sync the full Dify app model_config from a repo DSL snapshot into an existing local Dify app."
    )
    parser.add_argument("--base-url", default=os.getenv("DIFY_BASE_URL", "http://localhost:18080"))
    parser.add_argument("--email", default=os.getenv("DIFY_ADMIN_EMAIL", "askcrystal.admin@example.com"))
    parser.add_argument("--password", default=os.getenv("DIFY_ADMIN_PASSWORD", "Askcrystal123"))
    parser.add_argument("--app-id", default=os.getenv("DIFY_APP_ID", "385c285a-0e61-4cf1-ba49-afde28c5ce12"))
    parser.add_argument("--dsl", default=str(DEFAULT_DSL_PATH), help="Path to the Dify DSL file to read.")
    parser.add_argument("--dry-run", action="store_true", help="Print the parsed model_config summary without updating Dify.")
    parser.add_argument(
        "--verify-only",
        action="store_true",
        help="Login and print the live app model_config summary without updating it.",
    )
    return parser.parse_args()


def load_dsl_model_config(dsl_path: Path) -> tuple[dict, dict]:
    if not dsl_path.exists():
        raise FileNotFoundError(f"DSL file not found: {dsl_path}")

    payload = load_yaml_payload(dsl_path)
    if not isinstance(payload, dict):
        raise ValueError(f"Unexpected DSL root payload in {dsl_path}")

    app = payload.get("app") or {}
    model_config = payload.get("model_config") or {}
    if not isinstance(model_config, dict):
        raise ValueError(f"Could not read model_config from {dsl_path}")

    return app, model_config


def load_yaml_payload(dsl_path: Path) -> dict:
    if yaml is not None:
        return yaml.safe_load(dsl_path.read_text(encoding="utf-8"))

    ruby_program = """
require "json"
require "yaml"
path = ARGV.fetch(0)
payload = YAML.load_file(path)
puts JSON.dump(payload)
"""
    result = subprocess.run(
        ["ruby", "-e", ruby_program, str(dsl_path)],
        check=True,
        capture_output=True,
        text=True,
    )
    return json.loads(result.stdout)


def summarize_model_config(model_config: dict) -> dict[str, object]:
    agent_mode = model_config.get("agent_mode") or {}
    tools = agent_mode.get("tools") or []
    suggested_questions = model_config.get("suggested_questions") or []

    return {
        "tool_count": len(tools) if isinstance(tools, list) else 0,
        "opening_statement": model_config.get("opening_statement") or "",
        "suggested_question_count": len(suggested_questions) if isinstance(suggested_questions, list) else 0,
        "max_iteration": (agent_mode.get("max_iteration") if isinstance(agent_mode, dict) else None),
    }


def main() -> int:
    args = parse_args()
    dsl_path = Path(args.dsl).expanduser().resolve()

    try:
        app_payload, model_config = load_dsl_model_config(dsl_path)
        summary = summarize_model_config(model_config)
        print(f"[model-sync] dsl={dsl_path}")
        print(f"[model-sync] app_id={args.app_id}")
        print(f"[model-sync] tool_count={summary['tool_count']}")
        print(f"[model-sync] max_iteration={summary['max_iteration']}")
        print(f"[model-sync] opening_statement={summary['opening_statement']}")
        print(f"[model-sync] suggested_question_count={summary['suggested_question_count']}")

        if args.dry_run:
            print("[model-sync] dry run complete")
            return 0

        client = DifyConsoleClient(args.base_url, timeout_seconds=180)
        client.login(email=args.email, password=args.password)

        app_before = client.get_app(args.app_id)
        model_config_before = app_before.get("model_config") or {}
        agent_before = model_config_before.get("agent_mode") or {}
        tools_before = agent_before.get("tools") or []
        print(f"[model-sync] live_tool_count_before={len(tools_before) if isinstance(tools_before, list) else 0}")

        if args.verify_only:
            print(f"[model-sync] live_opening_before={model_config_before.get('opening_statement') or ''}")
            print("[model-sync] verify-only complete")
            return 0

        client.request("POST", f"/console/api/apps/{args.app_id}/model-config", json_body=model_config)

        app_after = client.get_app(args.app_id)
        model_config_after = app_after.get("model_config") or {}
        agent_after = model_config_after.get("agent_mode") or {}
        tools_after = agent_after.get("tools") or []
        print(f"[model-sync] live_tool_count_after={len(tools_after) if isinstance(tools_after, list) else 0}")
        print(f"[model-sync] live_opening_after={model_config_after.get('opening_statement') or ''}")

        if isinstance(app_payload, dict):
            print(f"[model-sync] target_app_name={app_payload.get('name') or ''}")
            print(f"[model-sync] target_app_description={app_payload.get('description') or ''}")

        print("[model-sync] app model_config updated")
        return 0
    except (DifyConsoleError, FileNotFoundError, ValueError, json.JSONDecodeError, subprocess.CalledProcessError) as exc:
        print(f"[model-sync] failed: {exc}")
        if isinstance(exc, DifyConsoleError) and exc.payload is not None:
            print(f"[model-sync] details: {exc.payload}")
        return 1


if __name__ == "__main__":
    raise SystemExit(main())
