#!/usr/bin/env python3
from __future__ import annotations

from pathlib import Path
import sys

ROOT_DIR = Path(__file__).resolve().parents[2]
if str(ROOT_DIR) not in sys.path:
    sys.path.insert(0, str(ROOT_DIR))

import argparse
import os

from scripts.common.dify_console_client import DifyConsoleClient, DifyConsoleError


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(description="Bootstrap local Dify setup with an admin account")
    parser.add_argument("--base-url", default=os.getenv("DIFY_BASE_URL", "http://localhost:18080"))
    parser.add_argument(
        "--email",
        default=os.getenv("DIFY_ADMIN_EMAIL", "askcrystal.admin@example.com"),
        help="Admin email used for Dify login",
    )
    parser.add_argument(
        "--name",
        default=os.getenv("DIFY_ADMIN_NAME", "AskCrystal Admin"),
        help="Admin display name",
    )
    parser.add_argument(
        "--password",
        default=os.getenv("DIFY_ADMIN_PASSWORD", "Askcrystal123"),
        help="Admin password (must include letters and digits, length >= 8)",
    )
    parser.add_argument("--language", default=os.getenv("DIFY_ADMIN_LANGUAGE", "en-US"))
    parser.add_argument("--wait-timeout", type=int, default=300)
    return parser.parse_args()


def main() -> int:
    args = parse_args()
    client = DifyConsoleClient(args.base_url)

    try:
        status = client.wait_until_ready(timeout_seconds=args.wait_timeout)
        print(f"[bootstrap] setup endpoint ready: step={status.get('step')}")

        result = client.ensure_setup(
            email=args.email,
            name=args.name,
            password=args.password,
            language=args.language,
        )
        final_status = result.get("status", {})
        print(f"[bootstrap] {result.get('result')}: step={final_status.get('step')}")

        client.login(email=args.email, password=args.password)
        print("[bootstrap] login check passed")

        print("[bootstrap] admin credentials")
        print(f"  base_url: {args.base_url}")
        print(f"  email:    {args.email}")
        print(f"  password: {args.password}")

        return 0
    except DifyConsoleError as exc:
        print(f"[bootstrap] failed: {exc}")
        if exc.payload is not None:
            print(f"[bootstrap] details: {exc.payload}")
        return 1


if __name__ == "__main__":
    raise SystemExit(main())
