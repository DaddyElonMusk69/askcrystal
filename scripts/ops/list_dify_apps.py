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


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(description="List apps from the local Dify console workspace.")
    parser.add_argument("--base-url", default=os.getenv("DIFY_BASE_URL", "http://localhost:18080"))
    parser.add_argument("--email", default=os.getenv("DIFY_ADMIN_EMAIL", "askcrystal.admin@example.com"))
    parser.add_argument("--password", default=os.getenv("DIFY_ADMIN_PASSWORD", "Askcrystal123"))
    parser.add_argument("--page", type=int, default=1)
    parser.add_argument("--limit", type=int, default=100)
    return parser.parse_args()


def normalize_apps(payload: dict[str, Any]) -> list[dict[str, Any]]:
    raw_apps = payload.get("data") if isinstance(payload, dict) else None
    if not isinstance(raw_apps, list):
        return []

    apps: list[dict[str, Any]] = []
    for item in raw_apps:
        if not isinstance(item, dict):
            continue

        model_config = item.get("model_config")
        workflow = item.get("workflow")
        apps.append(
            {
                "id": item.get("id"),
                "name": item.get("name"),
                "mode": item.get("mode"),
                "description": item.get("description"),
                "created_at": item.get("created_at"),
                "updated_at": item.get("updated_at"),
                "use_icon_as_answer_icon": item.get("use_icon_as_answer_icon"),
                "has_model_config": isinstance(model_config, dict),
                "has_workflow": isinstance(workflow, dict),
            }
        )

    return apps


def main() -> int:
    args = parse_args()

    try:
        client = DifyConsoleClient(args.base_url, timeout_seconds=180)
        client.login(email=args.email, password=args.password)
        payload = client.request("GET", "/console/api/apps", params={"page": args.page, "limit": args.limit})
        result = {
            "page": payload.get("page") if isinstance(payload, dict) else args.page,
            "limit": payload.get("limit") if isinstance(payload, dict) else args.limit,
            "total": payload.get("total") if isinstance(payload, dict) else None,
            "has_more": payload.get("has_more") if isinstance(payload, dict) else None,
            "apps": normalize_apps(payload if isinstance(payload, dict) else {}),
        }
        print(json.dumps(result, indent=2))
        return 0
    except DifyConsoleError as exc:
        print(json.dumps({"ok": False, "error": str(exc), "details": exc.payload}, indent=2))
        return 1


if __name__ == "__main__":
    raise SystemExit(main())
