#!/usr/bin/env python3
from __future__ import annotations

import sys
from pathlib import Path

ROOT_DIR = Path(__file__).resolve().parents[2]
if str(ROOT_DIR) not in sys.path:
    sys.path.insert(0, str(ROOT_DIR))

import argparse
import os

from scripts.common.dify_console_client import DifyConsoleClient, DifyConsoleError


REPO_ROOT = Path(__file__).resolve().parents[2]
DEFAULT_DSL_PATH = REPO_ROOT / "services" / "dify-agent" / "dsl" / "askcrystal-agent-2026-04-23.dsl.yml"


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(
        description="Sync prompt-related fields from a Dify DSL snapshot into an existing local Dify app."
    )
    parser.add_argument("--base-url", default=os.getenv("DIFY_BASE_URL", "http://localhost:18080"))
    parser.add_argument("--email", default=os.getenv("DIFY_ADMIN_EMAIL", ""))
    parser.add_argument("--password", default=os.getenv("DIFY_ADMIN_PASSWORD", ""))
    parser.add_argument("--app-id", default=os.getenv("DIFY_APP_ID", ""))
    parser.add_argument("--dsl", default=str(DEFAULT_DSL_PATH), help="Path to the Dify DSL file to read.")
    parser.add_argument("--dry-run", action="store_true", help="Print the extracted prompt fields without updating Dify.")
    return parser.parse_args()


def load_lines(path: Path) -> list[str]:
    if not path.exists():
        raise FileNotFoundError(f"DSL file not found: {path}")
    return path.read_text(encoding="utf-8").splitlines()


def extract_block_scalar(lines: list[str], key: str) -> str | None:
    prefix = f"  {key}:"
    for index, line in enumerate(lines):
        if not line.startswith(prefix):
            continue

        remainder = line[len(prefix):].strip()
        if remainder not in {"|", "|-"}:
            return None

        block_lines: list[str] = []
        for next_line in lines[index + 1 :]:
            if next_line.startswith("    "):
                block_lines.append(next_line[4:])
                continue
            if not next_line.strip():
                block_lines.append("")
                continue
            break

        return "\n".join(block_lines).rstrip("\n")

    return None


def extract_inline_scalar(lines: list[str], key: str) -> str | None:
    prefix = f"  {key}:"
    for index, line in enumerate(lines):
        if not line.startswith(prefix):
            continue

        value = line[len(prefix):].strip()
        if not value:
            return ""

        continuation_parts = [value]
        for next_line in lines[index + 1 :]:
            if next_line.startswith("    "):
                continuation_parts.append(next_line.strip())
                continue
            break

        combined = " ".join(part for part in continuation_parts if part).strip()

        if len(combined) >= 2 and combined[0] == combined[-1] and combined[0] in {'"', "'"}:
            return combined[1:-1]

        return combined

    return None


def main() -> int:
    args = parse_args()
    dsl_path = Path(args.dsl).expanduser().resolve()

    try:
        lines = load_lines(dsl_path)
        pre_prompt = extract_block_scalar(lines, "pre_prompt")
        opening_statement = extract_inline_scalar(lines, "opening_statement")
        prompt_type = extract_inline_scalar(lines, "prompt_type")

        if not pre_prompt:
            raise ValueError(f"Could not extract model_config.pre_prompt from {dsl_path}")

        print(f"[prompt-sync] dsl={dsl_path}")
        print(f"[prompt-sync] app_id={args.app_id}")
        print(f"[prompt-sync] pre_prompt_chars={len(pre_prompt)}")
        print(f"[prompt-sync] opening_statement={opening_statement or ''}")
        print(f"[prompt-sync] prompt_type={prompt_type or ''}")

        if args.dry_run:
            print("[prompt-sync] dry run complete")
            return 0

        client = DifyConsoleClient(args.base_url, timeout_seconds=180)
        client.login(email=args.email, password=args.password)

        app = client.request("GET", f"/console/api/apps/{args.app_id}")
        model_config = app.get("model_config") or {}
        if not isinstance(model_config, dict):
            raise DifyConsoleError("App model_config is missing or invalid", payload=app)

        model_config["pre_prompt"] = pre_prompt
        if opening_statement is not None:
            model_config["opening_statement"] = opening_statement
        if prompt_type:
            model_config["prompt_type"] = prompt_type

        client.request("POST", f"/console/api/apps/{args.app_id}/model-config", json_body=model_config)

        app_after = client.request("GET", f"/console/api/apps/{args.app_id}")
        model_config_after = app_after.get("model_config") or {}
        print("[prompt-sync] app updated")
        print(f"[prompt-sync] pre_prompt_chars_after={len(str(model_config_after.get('pre_prompt') or ''))}")
        print(f"[prompt-sync] prompt_type_after={model_config_after.get('prompt_type') or ''}")
        return 0
    except (DifyConsoleError, FileNotFoundError, ValueError) as exc:
        print(f"[prompt-sync] failed: {exc}")
        if isinstance(exc, DifyConsoleError) and exc.payload is not None:
            print(f"[prompt-sync] details: {exc.payload}")
        return 1


if __name__ == "__main__":
    raise SystemExit(main())
