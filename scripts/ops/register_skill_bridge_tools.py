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
from urllib.error import URLError
from urllib.request import urlopen

from scripts.common.dify_console_client import DifyConsoleClient, DifyConsoleError


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(description="Register or update AskCrystal skill bridge as a Dify API tool provider")
    parser.add_argument("--base-url", default=os.getenv("DIFY_BASE_URL", "http://localhost:18080"))
    parser.add_argument("--email", default=os.getenv("DIFY_ADMIN_EMAIL", "askcrystal.admin@example.com"))
    parser.add_argument("--password", default=os.getenv("DIFY_ADMIN_PASSWORD", "Askcrystal123"))
    parser.add_argument(
        "--bridge-openapi-url",
        default=os.getenv("SKILL_BRIDGE_OPENAPI_URL", "http://localhost:8010/openapi.json"),
        help="URL fetched by this script to read the bridge OpenAPI schema",
    )
    parser.add_argument(
        "--tool-server-url",
        default=os.getenv("SKILL_BRIDGE_TOOL_SERVER_URL", "http://host.docker.internal:8010"),
        help="Base URL that Dify should use when executing tool calls",
    )
    parser.add_argument(
        "--provider",
        default=os.getenv("DIFY_SKILL_PROVIDER", "askcrystal_skill_bridge"),
        help="Dify API tool provider name",
    )
    parser.add_argument("--wait-timeout", type=int, default=300)
    return parser.parse_args()


def fetch_openapi_schema(url: str) -> dict:
    try:
        with urlopen(url, timeout=20) as response:
            body = response.read().decode("utf-8", errors="replace")
    except URLError as exc:
        raise RuntimeError(f"Could not fetch bridge OpenAPI from {url}: {exc}") from exc

    try:
        return json.loads(body)
    except json.JSONDecodeError as exc:
        raise RuntimeError(f"OpenAPI response is not valid JSON: {exc}") from exc


def prepare_schema(schema: dict, tool_server_url: str) -> str:
    updated = dict(schema)
    updated["servers"] = [{"url": tool_server_url}]
    info = updated.get("info") if isinstance(updated.get("info"), dict) else {}
    description = info.get("description", "")
    note = "Registered by AskCrystal local automation for Dify custom tools."
    info["description"] = f"{description}\n\n{note}".strip()
    updated["info"] = info
    return json.dumps(updated, ensure_ascii=False)


def main() -> int:
    args = parse_args()

    try:
        raw_schema = fetch_openapi_schema(args.bridge_openapi_url)
        schema_text = prepare_schema(raw_schema, args.tool_server_url)
    except RuntimeError as exc:
        print(f"[tools] failed: {exc}")
        return 1

    client = DifyConsoleClient(args.base_url)

    try:
        setup = client.wait_until_ready(timeout_seconds=args.wait_timeout)
        if setup.get("step") != "finished":
            print("[tools] setup is not finished. run bootstrap first")
            return 1

        client.login(email=args.email, password=args.password)
        print("[tools] login passed")

        action = "created"
        try:
            client.create_api_tool_provider(
                provider=args.provider,
                schema=schema_text,
                icon={"background": "#0f172a", "content": "AC"},
                custom_disclaimer=(
                    "For mythology and crystal guidance only. Do not present symbolic outputs as guaranteed outcomes."
                ),
            )
        except DifyConsoleError as exc:
            if "already exists" in str(exc).lower():
                client.update_api_tool_provider(
                    provider=args.provider,
                    original_provider=args.provider,
                    schema=schema_text,
                    icon={"background": "#0f172a", "content": "AC"},
                    custom_disclaimer=(
                        "For mythology and crystal guidance only. Do not present symbolic outputs as guaranteed outcomes."
                    ),
                )
                action = "updated"
            else:
                raise

        tools = client.list_api_tool_provider_tools(args.provider)
        tool_names = [tool.get("name") for tool in tools if isinstance(tool, dict)]

        print(f"[tools] provider {action}: {args.provider}")
        print(f"[tools] bridge schema source: {args.bridge_openapi_url}")
        print(f"[tools] runtime server url:   {args.tool_server_url}")
        print(f"[tools] tools available:      {len(tool_names)}")
        if tool_names:
            print("[tools] tool names:")
            for name in tool_names:
                print(f"  - {name}")

        return 0
    except DifyConsoleError as exc:
        print(f"[tools] failed: {exc}")
        if exc.payload is not None:
            print(f"[tools] details: {exc.payload}")
        return 1


if __name__ == "__main__":
    raise SystemExit(main())
