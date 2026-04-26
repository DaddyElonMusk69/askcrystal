#!/usr/bin/env python3
from __future__ import annotations

import sys

ROOT_DIR = Path(__file__).resolve().parents[2]
if str(ROOT_DIR) not in sys.path:
    sys.path.insert(0, str(ROOT_DIR))

import argparse
import json
import os
import re
import subprocess
from datetime import datetime
from typing import Any

from scripts.common.dify_console_client import DifyConsoleClient, DifyConsoleError


REPO_ROOT = Path(__file__).resolve().parents[2]
DEFAULT_OUTPUT_DIR = REPO_ROOT / "services" / "dify-agent" / "dsl"


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(
        description="Export the current AskCrystal Dify app as a cloud-importable DSL snapshot."
    )
    parser.add_argument("--base-url", default=os.getenv("DIFY_BASE_URL", "http://localhost:18080"))
    parser.add_argument("--email", default=os.getenv("DIFY_ADMIN_EMAIL", "askcrystal.admin@example.com"))
    parser.add_argument("--password", default=os.getenv("DIFY_ADMIN_PASSWORD", "Askcrystal123"))
    parser.add_argument("--app-id", default=os.getenv("DIFY_APP_ID", "385c285a-0e61-4cf1-ba49-afde28c5ce12"))
    parser.add_argument("--basename", default="askcrystal-agent")
    parser.add_argument(
        "--snapshot-tag",
        default=datetime.now().astimezone().date().isoformat(),
        help="Filename tag, usually a date like 2026-04-23",
    )
    parser.add_argument("--output-dir", default=str(DEFAULT_OUTPUT_DIR))
    parser.add_argument(
        "--include-secret",
        action="store_true",
        help="Include Dify secret fields in the exported DSL (not recommended for version control).",
    )
    return parser.parse_args()


def slugify(value: str) -> str:
    slug = re.sub(r"[^a-zA-Z0-9._-]+", "-", value.strip())
    slug = re.sub(r"-{2,}", "-", slug).strip("-")
    return slug or "snapshot"


def run_git(repo_path: Path, *args: str) -> str | None:
    if not repo_path.exists():
        return None

    try:
        result = subprocess.run(
            ["git", "-C", str(repo_path), *args],
            check=True,
            capture_output=True,
            text=True,
        )
    except (FileNotFoundError, subprocess.CalledProcessError):
        return None

    output = result.stdout.strip()
    return output or None


def extract_workspace_datasets(client: DifyConsoleClient) -> list[dict[str, Any]]:
    response = client.list_datasets(page=1, limit=100)
    raw_items = response.get("data") or response.get("items") or []
    datasets: list[dict[str, Any]] = []

    if not isinstance(raw_items, list):
        return datasets

    for item in raw_items:
        if not isinstance(item, dict):
            continue
        datasets.append(
            {
                "id": item.get("id"),
                "name": item.get("name"),
                "description": item.get("description"),
                "document_count": item.get("document_count"),
                "word_count": item.get("word_count"),
            }
        )

    return datasets


def extract_tool_refs(
    client: DifyConsoleClient,
    model_config: dict[str, Any],
) -> list[dict[str, Any]]:
    provider_name_by_id: dict[str, str] = {}
    tool_providers = client.list_tool_providers()
    if isinstance(tool_providers, list):
        for provider in tool_providers:
            if not isinstance(provider, dict):
                continue
            provider_id = provider.get("id")
            provider_name = provider.get("name")
            if provider_id and provider_name:
                provider_name_by_id[str(provider_id)] = str(provider_name)

    agent_mode = model_config.get("agent_mode") or {}
    raw_tools = agent_mode.get("tools") or []
    if not isinstance(raw_tools, list):
        return []

    tool_refs: list[dict[str, Any]] = []
    for tool in raw_tools:
        if not isinstance(tool, dict):
            continue
        provider_id = tool.get("provider_id")
        provider_type = tool.get("provider_type")
        tool_refs.append(
            {
                "tool_name": tool.get("tool_name"),
                "provider_type": provider_type,
                "provider_id": provider_id,
                "provider_name": (
                    provider_name_by_id.get(str(provider_id))
                    if provider_id
                    else None
                )
                or (str(provider_id) if provider_type == "mcp" and provider_id else None),
                "enabled": bool(tool.get("enabled", True)),
            }
        )

    return tool_refs


def extract_dataset_refs(
    model_config: dict[str, Any],
    workspace_datasets: list[dict[str, Any]],
) -> list[dict[str, Any]]:
    dataset_name_by_id = {
        str(item["id"]): item.get("name")
        for item in workspace_datasets
        if isinstance(item, dict) and item.get("id")
    }

    dataset_refs: list[dict[str, Any]] = []
    seen: set[str] = set()

    def register(dataset_id: str | None, dataset_name: str | None = None):
        if not dataset_id:
            return
        normalized = str(dataset_id)
        if normalized in seen:
            return
        seen.add(normalized)
        dataset_refs.append(
            {
                "dataset_id": normalized,
                "dataset_name": dataset_name or dataset_name_by_id.get(normalized),
            }
        )

    raw_configs = model_config.get("dataset_configs") or model_config.get("dataset_config") or []

    def walk_dataset_candidate(candidate: Any):
        if isinstance(candidate, list):
            for item in candidate:
                walk_dataset_candidate(item)
            return

        if not isinstance(candidate, dict):
            return

        dataset_id = candidate.get("dataset_id")
        dataset = candidate.get("dataset")
        dataset_name = None
        if isinstance(dataset, dict):
            dataset_id = dataset_id or dataset.get("id")
            dataset_name = dataset.get("name")
        register(dataset_id, dataset_name)

        dataset_ids = candidate.get("dataset_ids")
        if isinstance(dataset_ids, list):
            for item in dataset_ids:
                if isinstance(item, str):
                    register(item)

        for value in candidate.values():
            if isinstance(value, (dict, list)):
                walk_dataset_candidate(value)

    walk_dataset_candidate(raw_configs)

    return dataset_refs


def build_metadata(
    *,
    args: argparse.Namespace,
    app_detail: dict[str, Any],
    workspace_datasets: list[dict[str, Any]],
    tool_refs: list[dict[str, Any]],
    dsl_path: Path,
    metadata_path: Path,
    exported_at: str,
    system_features: dict[str, Any] | None,
) -> dict[str, Any]:
    model_config = app_detail.get("model_config") or {}
    if not isinstance(model_config, dict):
        model_config = {}

    agent_mode = model_config.get("agent_mode") or {}
    if not isinstance(agent_mode, dict):
        agent_mode = {}

    dataset_refs = extract_dataset_refs(model_config, workspace_datasets)

    dify_repo = REPO_ROOT / "services" / "dify-runtime"
    dify_git_commit = run_git(dify_repo, "rev-parse", "HEAD")
    dify_git_describe = run_git(dify_repo, "describe", "--tags", "--always")

    try:
        dsl_relpath = str(dsl_path.relative_to(REPO_ROOT))
    except ValueError:
        dsl_relpath = str(dsl_path)

    try:
        metadata_relpath = str(metadata_path.relative_to(REPO_ROOT))
    except ValueError:
        metadata_relpath = str(metadata_path)

    return {
        "exported_at": exported_at,
        "source": {
            "base_url": args.base_url,
            "app_id": args.app_id,
            "include_secret": args.include_secret,
            "dify_local_git_commit": dify_git_commit,
            "dify_local_git_describe": dify_git_describe,
            "system_features": system_features or {},
        },
        "app": {
            "id": app_detail.get("id"),
            "name": app_detail.get("name"),
            "mode": app_detail.get("mode"),
            "description": app_detail.get("description"),
            "icon": app_detail.get("icon"),
            "icon_type": app_detail.get("icon_type"),
            "icon_background": app_detail.get("icon_background"),
            "use_icon_as_answer_icon": app_detail.get("use_icon_as_answer_icon"),
        },
        "model": {
            "provider": model_config.get("provider"),
            "model": model_config.get("model"),
            "completion_params": model_config.get("completion_params"),
            "opening_statement": model_config.get("opening_statement"),
        },
        "agent": {
            "strategy": agent_mode.get("strategy"),
            "max_iteration": agent_mode.get("max_iteration"),
            "tool_count": len(tool_refs),
            "tool_refs": tool_refs,
        },
        "datasets": {
            "bound_datasets": dataset_refs,
            "workspace_inventory": workspace_datasets,
        },
        "artifacts": {
            "dsl_file": dsl_relpath,
            "metadata_file": metadata_relpath,
        },
    }


def main() -> int:
    args = parse_args()
    output_dir = Path(args.output_dir).expanduser().resolve()
    snapshot_tag = slugify(args.snapshot_tag)
    basename = slugify(args.basename)
    dsl_path = output_dir / f"{basename}-{snapshot_tag}.dsl.yml"
    metadata_path = output_dir / f"{basename}-{snapshot_tag}.metadata.json"

    client = DifyConsoleClient(args.base_url, timeout_seconds=180)
    exported_at = datetime.now().astimezone().isoformat(timespec="seconds")

    try:
        client.login(email=args.email, password=args.password)
        print(f"[export] login passed base_url={args.base_url}")

        app_detail = client.get_app(args.app_id)
        dsl_content = client.export_app_dsl(args.app_id, include_secret=args.include_secret)
        workspace_datasets = extract_workspace_datasets(client)
        tool_refs = extract_tool_refs(client, app_detail.get("model_config") or {})

        try:
            system_features = client.get_system_features()
        except DifyConsoleError as exc:
            print(f"[export] system-features skipped: {exc}")
            system_features = {}

        output_dir.mkdir(parents=True, exist_ok=True)
        dsl_path.write_text(dsl_content, encoding="utf-8")

        metadata = build_metadata(
            args=args,
            app_detail=app_detail,
            workspace_datasets=workspace_datasets,
            tool_refs=tool_refs,
            dsl_path=dsl_path,
            metadata_path=metadata_path,
            exported_at=exported_at,
            system_features=system_features,
        )
        metadata_path.write_text(json.dumps(metadata, indent=2, ensure_ascii=False) + "\n", encoding="utf-8")

        print(f"[export] app={metadata['app']['name']} mode={metadata['app']['mode']}")
        print(f"[export] tool_count={metadata['agent']['tool_count']} dataset_refs={len(metadata['datasets']['bound_datasets'])}")
        print(f"[export] wrote DSL: {dsl_path}")
        print(f"[export] wrote metadata: {metadata_path}")
        return 0
    except DifyConsoleError as exc:
        print(f"[export] failed: {exc}")
        if exc.payload is not None:
            print(f"[export] details: {exc.payload}")
        return 1


if __name__ == "__main__":
    raise SystemExit(main())
