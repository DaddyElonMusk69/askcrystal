#!/usr/bin/env python3
from __future__ import annotations

import argparse
import os
from pathlib import Path

from dify_console_client import DifyConsoleClient, DifyConsoleError


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(description="Ingest local markdown KB files into a Dify dataset")
    parser.add_argument("--base-url", default=os.getenv("DIFY_BASE_URL", "http://localhost:18080"))
    parser.add_argument("--email", default=os.getenv("DIFY_ADMIN_EMAIL", "askcrystal.admin@example.com"))
    parser.add_argument("--password", default=os.getenv("DIFY_ADMIN_PASSWORD", "Askcrystal123"))
    parser.add_argument("--dataset-name", default=os.getenv("DIFY_DATASET_NAME", "AskCrystal-KB"))
    parser.add_argument("--dataset-description", default="AskCrystal RAG corpus generated from project knowledge JSON")
    parser.add_argument(
        "--kb-dir",
        default=os.getenv("DIFY_KB_DIR", "dify_kb_docs"),
        help="Directory containing .md files to ingest",
    )
    parser.add_argument(
        "--indexing-technique",
        default=os.getenv("DIFY_INDEXING_TECHNIQUE", "economy"),
        choices=["economy", "high_quality"],
        help="Use economy for local bring-up without embedding provider setup",
    )
    parser.add_argument("--skip-existing", action="store_true", default=True)
    parser.add_argument("--no-skip-existing", dest="skip_existing", action="store_false")
    parser.add_argument("--wait-timeout", type=int, default=300)
    return parser.parse_args()


def find_dataset_id(client: DifyConsoleClient, name: str) -> str | None:
    page = 1
    while True:
        result = client.list_datasets(page=page, limit=100)
        items = result.get("data", [])
        for item in items:
            if item.get("name") == name:
                return item.get("id")
        has_more = bool(result.get("has_more"))
        if not has_more:
            return None
        page += 1


def list_dataset_document_names(client: DifyConsoleClient, dataset_id: str) -> set[str]:
    names: set[str] = set()
    page = 1
    while True:
        result = client.get_dataset_documents(dataset_id=dataset_id, page=page, limit=100)
        items = result.get("data", [])
        for item in items:
            name = item.get("name")
            if isinstance(name, str) and name.strip():
                names.add(name)
        has_more = bool(result.get("has_more"))
        if not has_more:
            break
        page += 1
    return names


def collect_markdown_files(root: Path) -> list[Path]:
    return sorted(p for p in root.rglob("*.md") if p.is_file())


def main() -> int:
    args = parse_args()
    kb_dir = Path(args.kb_dir).resolve()
    if not kb_dir.exists():
        print(f"[ingest] kb directory not found: {kb_dir}")
        return 1

    files = collect_markdown_files(kb_dir)
    if not files:
        print(f"[ingest] no markdown files found in {kb_dir}")
        return 1

    client = DifyConsoleClient(args.base_url)

    try:
        setup = client.wait_until_ready(timeout_seconds=args.wait_timeout)
        if setup.get("step") != "finished":
            print("[ingest] setup is not finished. run bootstrap script first")
            return 1

        client.login(email=args.email, password=args.password)
        print("[ingest] login passed")

        dataset_id = find_dataset_id(client, args.dataset_name)
        if dataset_id is None:
            created = client.create_dataset(
                name=args.dataset_name,
                description=args.dataset_description,
                indexing_technique=args.indexing_technique,
            )
            dataset_id = created.get("id")
            print(f"[ingest] created dataset: {args.dataset_name} ({dataset_id})")
        else:
            print(f"[ingest] using existing dataset: {args.dataset_name} ({dataset_id})")

        if not dataset_id:
            print("[ingest] failed to resolve dataset id")
            return 1

        existing_names = list_dataset_document_names(client, dataset_id) if args.skip_existing else set()
        print(f"[ingest] source markdown files: {len(files)}")
        if args.skip_existing:
            print(f"[ingest] existing dataset docs: {len(existing_names)}")

        created_count = 0
        skipped_count = 0
        failed_count = 0

        for idx, file_path in enumerate(files, start=1):
            doc_name = file_path.name
            if args.skip_existing and doc_name in existing_names:
                skipped_count += 1
                print(f"[ingest] [{idx}/{len(files)}] skip existing: {doc_name}")
                continue

            try:
                upload_response = client.upload_dataset_file(file_path)
                file_id = upload_response.get("id")
                if not file_id:
                    raise DifyConsoleError("upload did not return file id", payload=upload_response)

                create_response = client.create_document_from_file(
                    dataset_id=dataset_id,
                    file_id=file_id,
                    indexing_technique=args.indexing_technique,
                )
                docs = create_response.get("documents", [])
                created_names = [doc.get("name") for doc in docs if isinstance(doc, dict)]
                created_count += 1
                print(
                    f"[ingest] [{idx}/{len(files)}] created: {doc_name}"
                    + (f" -> {created_names}" if created_names else "")
                )
            except DifyConsoleError as exc:
                failed_count += 1
                print(f"[ingest] [{idx}/{len(files)}] failed: {doc_name} ({exc})")

        print("[ingest] summary")
        print(f"  dataset_id: {dataset_id}")
        print(f"  created:    {created_count}")
        print(f"  skipped:    {skipped_count}")
        print(f"  failed:     {failed_count}")
        return 0 if failed_count == 0 else 2

    except DifyConsoleError as exc:
        print(f"[ingest] failed: {exc}")
        if exc.payload is not None:
            print(f"[ingest] details: {exc.payload}")
        return 1


if __name__ == "__main__":
    raise SystemExit(main())
