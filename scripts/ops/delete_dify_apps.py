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
    parser = argparse.ArgumentParser(description="Delete selected apps from the local Dify workspace.")
    parser.add_argument("--base-url", default=os.getenv("DIFY_BASE_URL", "http://localhost:18080"))
    parser.add_argument("--email", default=os.getenv("DIFY_ADMIN_EMAIL", "askcrystal.admin@example.com"))
    parser.add_argument("--password", default=os.getenv("DIFY_ADMIN_PASSWORD", "Askcrystal123"))
    parser.add_argument("--app-id", action="append", dest="app_ids", required=True, help="App id to delete. Repeatable.")
    parser.add_argument("--dry-run", action="store_true", help="Print the apps that would be deleted without deleting them.")
    return parser.parse_args()


def main() -> int:
    args = parse_args()

    try:
        client = DifyConsoleClient(args.base_url, timeout_seconds=180)
        client.login(email=args.email, password=args.password)

        results: list[dict[str, str]] = []
        for app_id in args.app_ids:
            app = client.get_app(app_id)
            name = str(app.get("name") or "")
            mode = str(app.get("mode") or "")

            if args.dry_run:
                results.append({"app_id": app_id, "name": name, "mode": mode, "result": "dry-run"})
                continue

            client.request("DELETE", f"/console/api/apps/{app_id}", allow_status_codes={204})
            results.append({"app_id": app_id, "name": name, "mode": mode, "result": "deleted"})

        print(json.dumps({"ok": True, "results": results}, indent=2))
        return 0
    except DifyConsoleError as exc:
        print(json.dumps({"ok": False, "error": str(exc), "details": exc.payload}, indent=2))
        return 1


if __name__ == "__main__":
    raise SystemExit(main())
