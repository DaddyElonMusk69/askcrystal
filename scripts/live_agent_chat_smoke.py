#!/usr/bin/env python3
from __future__ import annotations

import argparse
import json
import os
import time
from typing import Any

from dify_console_client import DifyConsoleClient, DifyConsoleError


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(description="Run live streaming chat smoke tests against AskCrystal agent app")
    parser.add_argument("--base-url", default=os.getenv("DIFY_BASE_URL", "http://localhost:18080"))
    parser.add_argument("--email", default=os.getenv("DIFY_ADMIN_EMAIL", "askcrystal.admin@example.com"))
    parser.add_argument("--password", default=os.getenv("DIFY_ADMIN_PASSWORD", "Askcrystal123"))
    parser.add_argument("--app-id", default=os.getenv("DIFY_APP_ID", "385c285a-0e61-4cf1-ba49-afde28c5ce12"))
    parser.add_argument("--retries", type=int, default=2, help="Retry count per query on stream errors")
    parser.add_argument(
        "--query",
        action="append",
        default=[],
        help="Query to test (can be specified multiple times). If omitted, built-in smoke queries are used.",
    )
    return parser.parse_args()


def parse_sse_events(stream_text: str) -> list[dict[str, Any]]:
    events: list[dict[str, Any]] = []
    for line in stream_text.splitlines():
        line = line.strip()
        if not line.startswith("data:"):
            continue
        payload = line[5:].strip()
        if not payload:
            continue
        try:
            obj = json.loads(payload)
        except json.JSONDecodeError:
            continue
        if isinstance(obj, dict):
            events.append(obj)
    return events


def run_stream_query(
    client: DifyConsoleClient,
    *,
    app_id: str,
    model_config: dict[str, Any],
    query: str,
    retries: int,
) -> dict[str, Any]:
    attempts = max(1, retries + 1)
    last_error: str | None = None

    for attempt in range(1, attempts + 1):
        payload = {
            "inputs": {},
            "query": query,
            "response_mode": "streaming",
            "model_config": model_config,
        }
        try:
            response = client.request("POST", f"/console/api/apps/{app_id}/chat-messages", json_body=payload)
        except DifyConsoleError as exc:
            last_error = str(exc)
            print(f"[chat] attempt {attempt}/{attempts} request failed: {last_error}")
            time.sleep(1.0)
            continue

        if not isinstance(response, str):
            last_error = f"unexpected response type: {type(response).__name__}"
            print(f"[chat] attempt {attempt}/{attempts} parse failed: {last_error}")
            time.sleep(1.0)
            continue

        events = parse_sse_events(response)
        error_events = [event for event in events if event.get("event") == "error"]
        tools = sorted(
            {
                event.get("tool")
                for event in events
                if event.get("event") == "agent_thought" and isinstance(event.get("tool"), str) and event.get("tool")
            }
        )
        answer = "".join(
            event.get("answer", "")
            for event in events
            if event.get("event") == "agent_message" and isinstance(event.get("answer"), str)
        )

        if not error_events:
            return {
                "ok": True,
                "events": len(events),
                "errors": 0,
                "tools": tools,
                "answer_len": len(answer),
                "answer_preview": answer[:280].replace("\n", " "),
            }

        last_error = json.dumps(error_events[0], ensure_ascii=False)
        print(f"[chat] attempt {attempt}/{attempts} stream error: {last_error[:240]}")
        time.sleep(1.0)

    return {"ok": False, "error": last_error or "unknown error"}


def main() -> int:
    args = parse_args()
    queries = args.query or [
        "I feel anxious and want better sleep. Recommend one crystal and a short nightly ritual.",
        "Use one mythology or astrology skill if available, then give concise guidance and one crystal suggestion.",
    ]

    client = DifyConsoleClient(args.base_url, timeout_seconds=300)
    try:
        client.login(email=args.email, password=args.password)
        app = client.request("GET", f"/console/api/apps/{args.app_id}")
        model_config = app.get("model_config") or {}
        if not isinstance(model_config, dict) or not model_config:
            print("[chat] app model_config missing")
            return 1

        print(f"[chat] app={args.app_id}")
        all_ok = True
        for idx, query in enumerate(queries, 1):
            print(f"[chat] case {idx} query={query}")
            result = run_stream_query(
                client,
                app_id=args.app_id,
                model_config=model_config,
                query=query,
                retries=args.retries,
            )
            if not result.get("ok"):
                print(f"[chat] case {idx} failed: {result.get('error')}")
                all_ok = False
                continue
            print(
                "[chat] case {idx} ok events={events} errors={errors} tools={tools} answer_len={answer_len}".format(
                    idx=idx,
                    events=result["events"],
                    errors=result["errors"],
                    tools=result["tools"],
                    answer_len=result["answer_len"],
                )
            )
            print(f"[chat] case {idx} answer_preview={result['answer_preview']}")

        if all_ok:
            print("[chat] all live chat smoke cases passed")
            return 0
        return 1
    except DifyConsoleError as exc:
        print(f"[chat] failed: {exc}")
        return 1


if __name__ == "__main__":
    raise SystemExit(main())
