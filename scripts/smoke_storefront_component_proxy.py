#!/usr/bin/env python3
from __future__ import annotations

import argparse
import json
from typing import Any
from urllib.request import Request, urlopen


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(description="Smoke-test AskCrystal proxy component streaming.")
    parser.add_argument("--proxy-base-url", default="http://localhost:8787")
    parser.add_argument(
        "--message",
        default="I feel anxious and want better sleep. Recommend one crystal and a short nightly ritual.",
    )
    parser.add_argument("--session-id", default="component-smoke")
    return parser.parse_args()


def parse_sse_events(stream_text: str) -> list[dict[str, Any]]:
    events: list[dict[str, Any]] = []
    current_event = "message"

    for raw_line in stream_text.splitlines():
        line = raw_line.strip()
        if not line:
            continue
        if line.startswith("event:"):
            current_event = line[6:].strip() or "message"
            continue
        if not line.startswith("data:"):
            continue

        payload_text = line[5:].strip()
        if not payload_text:
            continue

        payload = json.loads(payload_text)
        if isinstance(payload, dict):
            events.append({
                "event": current_event,
                "payload": payload,
            })

    return events


def get_hydration_mode(payload: dict[str, Any]) -> str | None:
    hydration = payload.get("storefrontHydration")
    if isinstance(hydration, dict):
        mode = hydration.get("mode")
        if isinstance(mode, str) and mode:
            return mode

    metadata = payload.get("metadata")
    if isinstance(metadata, dict):
        hydration = metadata.get("storefrontHydration")
        if isinstance(hydration, dict):
            mode = hydration.get("mode")
            if isinstance(mode, str) and mode:
                return mode

    return None


def main() -> int:
    args = parse_args()

    body = json.dumps({
        "message": args.message,
        "sessionId": args.session_id,
    }).encode("utf-8")

    request = Request(
        f"{args.proxy_base_url.rstrip('/')}/apps/askcrystal/chat/stream",
        data=body,
        method="POST",
        headers={
            "Content-Type": "application/json",
            "Accept": "text/event-stream",
        },
    )

    with urlopen(request, timeout=180) as response:
        stream_text = response.read().decode("utf-8", errors="replace")

    events = parse_sse_events(stream_text)
    component_events = [event for event in events if event["event"] == "component"]
    complete_event = next((event for event in reversed(events) if event["event"] == "complete"), None)
    component_types = sorted({
        str(component.get("component"))
        for event in component_events
        for component in (event["payload"].get("components") or [])
        if isinstance(component, dict) and component.get("component")
    })
    delta_text = "".join(
        str(event["payload"].get("answer") or event["payload"].get("text") or "")
        for event in events
        if event["event"] in {"delta", "message", "agent_message"}
    ).strip()

    summary = {
        "event_count": len(events),
        "delta_preview": delta_text[:240],
        "component_event_count": len(component_events),
        "component_counts": [
            len(event["payload"].get("components") or [])
            for event in component_events
            if isinstance(event["payload"].get("components"), list)
        ],
        "component_types": component_types,
        "component_hydration_modes": sorted({
            mode
            for event in component_events
            for mode in [get_hydration_mode(event["payload"])]
            if mode
        }),
        "complete_component_count": (
            len(complete_event["payload"].get("components") or [])
            if complete_event and isinstance(complete_event["payload"].get("components"), list)
            else 0
        ),
        "complete_component_types": sorted({
            str(component.get("component"))
            for component in ((complete_event or {}).get("payload", {}).get("components") or [])
            if isinstance(component, dict) and component.get("component")
        }),
        "complete_hydration_mode": (
            get_hydration_mode(complete_event["payload"])
            if complete_event and isinstance(complete_event.get("payload"), dict)
            else None
        ),
    }

    ok = bool(delta_text) and bool(component_events) and summary["complete_component_count"] > 0
    summary["ok"] = ok

    print(json.dumps(summary, indent=2))
    return 0 if ok else 1


if __name__ == "__main__":
    raise SystemExit(main())
