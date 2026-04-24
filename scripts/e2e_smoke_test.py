#!/usr/bin/env python3
from __future__ import annotations

import argparse
import json
import os
from urllib.error import URLError
from urllib.request import urlopen

from dify_console_client import DifyConsoleClient, DifyConsoleError


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(description="AskCrystal local Dify end-to-end smoke test")
    parser.add_argument("--base-url", default=os.getenv("DIFY_BASE_URL", "http://localhost:18080"))
    parser.add_argument("--email", default=os.getenv("DIFY_ADMIN_EMAIL", "askcrystal.admin@example.com"))
    parser.add_argument("--password", default=os.getenv("DIFY_ADMIN_PASSWORD", "Askcrystal123"))
    parser.add_argument("--dataset-name", default=os.getenv("DIFY_DATASET_NAME", "AskCrystal-KB"))
    parser.add_argument("--provider", default=os.getenv("DIFY_SKILL_PROVIDER", "askcrystal_skill_bridge"))
    parser.add_argument("--bridge-health-url", default=os.getenv("SKILL_BRIDGE_HEALTH_URL", "http://localhost:8010/health"))
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


def fetch_json(url: str) -> dict:
    try:
        with urlopen(url, timeout=20) as response:
            body = response.read().decode("utf-8", errors="replace")
    except URLError as exc:
        raise RuntimeError(f"Failed to fetch {url}: {exc}") from exc

    try:
        parsed = json.loads(body)
    except json.JSONDecodeError as exc:
        raise RuntimeError(f"Non-JSON response from {url}: {exc}") from exc

    if not isinstance(parsed, dict):
        raise RuntimeError(f"Expected JSON object from {url}")
    return parsed


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

        bridge_health = fetch_json(args.bridge_health_url)
        if bridge_health.get("status") != "ok":
            print(f"[smoke] bridge health not ok: {bridge_health}")
            return 1
        print("[smoke] skill bridge health: ok")

        tools = client.list_api_tool_provider_tools(args.provider)
        if not tools:
            print(f"[smoke] provider has no tools: {args.provider}")
            return 1
        print(f"[smoke] provider tools: ok ({args.provider}, count={len(tools)})")

        print("[smoke] all checks passed")
        return 0
    except (DifyConsoleError, RuntimeError) as exc:
        print(f"[smoke] failed: {exc}")
        return 1


if __name__ == "__main__":
    raise SystemExit(main())
