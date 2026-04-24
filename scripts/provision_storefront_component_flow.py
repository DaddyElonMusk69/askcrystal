#!/usr/bin/env python3
from __future__ import annotations

import argparse
import json
import os
from pathlib import Path
from typing import Any

from dify_console_client import DifyConsoleClient, DifyConsoleError


REPO_ROOT = Path(__file__).resolve().parents[1]
DEFAULT_DSL_PATH = REPO_ROOT / "agent" / "dify" / "dsl" / "askcrystal-storefront-components-chatflow-2026-04-24.dsl.yml"


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(
        description="Import and publish the AskCrystal storefront component chatflow in a local Dify workspace."
    )
    parser.add_argument("--base-url", default=os.getenv("DIFY_BASE_URL", "http://localhost:18080"))
    parser.add_argument("--email", default=os.getenv("DIFY_ADMIN_EMAIL", "askcrystal.admin@example.com"))
    parser.add_argument("--password", default=os.getenv("DIFY_ADMIN_PASSWORD", "Askcrystal123"))
    parser.add_argument("--dsl", default=str(DEFAULT_DSL_PATH), help="Path to the Dify DSL file to import.")
    parser.add_argument("--app-id", default=None, help="Optional existing app id to overwrite when supported.")
    parser.add_argument("--skip-publish", action="store_true", help="Import the flow but do not publish it.")
    parser.add_argument(
        "--skip-api-key",
        action="store_true",
        help="Import and publish the flow without ensuring a service API key.",
    )
    parser.add_argument(
        "--publish-marked-name",
        default="Storefront render",
        help="Release marker name shown in Dify workflow history.",
    )
    parser.add_argument(
        "--publish-marked-comment",
        default="Provisioned from the AskCrystal repo automation.",
        help="Release marker comment shown in Dify workflow history.",
    )
    parser.add_argument(
        "--output-json",
        default="",
        help="Optional path for a non-secret provisioning summary JSON file.",
    )
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

        api_key_created = False
        api_key_hint = None
        if not args.skip_api_key:
            existing_keys = client.list_app_api_keys(app_id)
            raw_existing_keys = existing_keys.get("data") if isinstance(existing_keys, dict) else None
            had_existing_key = isinstance(raw_existing_keys, list) and len(raw_existing_keys) > 0
            token = client.ensure_app_api_key(app_id)
            api_key_created = not had_existing_key
            api_key_hint = f"{token[:8]}...{token[-4:]}" if len(token) >= 12 else "***"

        app_detail = client.get_app(app_id)
        summary = {
            "dsl_path": str(dsl_path),
            "app_id": app_id,
            "app_name": app_detail.get("name"),
            "app_mode": app_detail.get("mode"),
            "import_status": final_import.get("status"),
            "published": publish_result is not None,
            "publish_result": publish_result or {},
            "api_key_created": api_key_created,
            "api_key_hint": api_key_hint,
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
