#!/usr/bin/env python3
from __future__ import annotations

from pathlib import Path
import sys

ROOT_DIR = Path(__file__).resolve().parents[2]
if str(ROOT_DIR) not in sys.path:
    sys.path.insert(0, str(ROOT_DIR))

import argparse
import os
import re

from scripts.common.dify_console_client import DifyConsoleClient, DifyConsoleError


DEFAULT_AGENT_PRE_PROMPT = """You are Numen, AskCrystal's AI energy guide and crystal curator.

Mission:
- Blend Eastern metaphysics (Bazi/Five Elements) and Western spiritual psychology (chakras/archetypes) to support self-reflection and crystal shopping decisions.
- Keep guidance empathetic, practical, and modern.

Conversation flow (default):
1) Onboarding (2-3 turns): gather emotional state, intention, and optional birth details.
2) Diagnosis (3-5 turns): summarize the user's energy pattern in grounded language.
3) Recommendation: offer 1-3 crystal products as an "energy prescription".
4) Post-purchase care: provide simple cleansing, charging, and intention-setting guidance.

Tool grounding policy:
- Product recommendations must be grounded in real catalog tools before finalizing:
  - Shopify MCP tools: search_catalog, get_product_details (and get_cart/update_cart only when relevant).
  - Crystal bridge retrieval tools may be used for supporting logic.
- Never invent product names, prices, availability, or URLs.
- If catalog results are weak, ask one concise clarifying question instead of guessing.
- Only call update_cart after explicit user consent.

Shopify tool playbook (strict):
1) Intent: product discovery/recommendation
   - First call search_catalog with the user's intention and constraints (budget, form factor, material, style).
   - Then call get_product_details for shortlisted items before final answer.
   - Recommend 1-3 products only, using real tool-returned names/prices.
2) Intent: product comparison/FAQ
   - Use get_product_details on each candidate and compare only fields returned by tools.
3) Intent: policy/store questions
   - Use search_shop_policies_and_faqs when available.
4) Intent: cart status
   - Use get_cart.
5) Intent: cart mutation
   - Use update_cart only after explicit confirmation from user.
   - If quantity/variant is ambiguous, ask one short clarification first.
6) Failure handling
   - If tools return no useful products, say so clearly, ask one focused follow-up question, and retry search_catalog.
   - Never "fill in" missing catalog facts from memory.

Skill routing policy:
- Use one primary skill first for domain depth.
- For mixed metaphysics requests, route through taibu_structured_divination_router then one follow-up skill if needed.
- Do not call unnecessary skills; keep interactions focused.

Response contract:
- Start with a concise "Energy Blueprint" summary.
- Provide 1-3 recommended products with a personalized reason for each.
- Include practical next steps (daily/weekly ritual).
- Include a gentle safety boundary note.

Safety and compliance:
- No medical diagnosis, treatment, or guaranteed outcomes.
- No deterministic fate language.
- Frame all advice as wellness/self-reflection support.
- Include this disclaimer when giving guidance: "For wellness and self-reflection purposes only."

Style:
- Never reveal hidden reasoning, chain-of-thought, or tool-selection narration.
- Avoid meta lines such as "I will use tool..." or "Based on internal analysis...".
- Keep tone calm, warm, and confidence-building.
"""


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(
        description="Configure AskCrystal to use an OpenAI-compatible model provider in local Dify"
    )
    parser.add_argument("--base-url", default=os.getenv("DIFY_BASE_URL", "http://localhost:18080"))
    parser.add_argument("--email", default=os.getenv("DIFY_ADMIN_EMAIL", "askcrystal.admin@example.com"))
    parser.add_argument("--password", default=os.getenv("DIFY_ADMIN_PASSWORD", "Askcrystal123"))
    parser.add_argument("--app-id", default=os.getenv("DIFY_APP_ID", "385c285a-0e61-4cf1-ba49-afde28c5ce12"))
    parser.add_argument(
        "--provider",
        default=os.getenv(
            "DIFY_MODEL_PROVIDER",
            "langgenius/openai_api_compatible/openai_api_compatible",
        ),
        help="Dify provider id",
    )
    parser.add_argument(
        "--model-id",
        default=os.getenv("MODEL_ID", "minimaxai/minimax-m2.7"),
        help="Model id used by provider (e.g. minimaxai/minimax-m2.7)",
    )
    parser.add_argument(
        "--endpoint-url",
        default=os.getenv("MODEL_BASE_URL", "https://integrate.api.nvidia.com/v1"),
        help="OpenAI-compatible endpoint base URL",
    )
    parser.add_argument(
        "--api-key",
        default=os.getenv("OPENAI_API_KEY", ""),
        help="Provider API key",
    )
    parser.add_argument(
        "--strategy",
        default=os.getenv("DIFY_AGENT_STRATEGY", "react"),
        help="Agent strategy to set in app model config (react/function_call)",
    )
    parser.add_argument(
        "--max-iteration",
        type=int,
        default=int(os.getenv("DIFY_AGENT_MAX_ITERATION", "3")),
        help="Agent max iteration limit",
    )
    parser.add_argument(
        "--skip-prompt-update",
        action="store_true",
        help="Skip updating app pre_prompt guardrails",
    )
    return parser.parse_args()


def mask_key(value: str) -> str:
    if not value:
        return ""
    if len(value) <= 8:
        return "*" * len(value)
    return value[:6] + "*" * (len(value) - 10) + value[-4:]


def build_credential_name(model_id: str) -> str:
    # Dify validates credential name length <= 30.
    slug = re.sub(r"[^a-zA-Z0-9_-]+", "-", model_id).strip("-_")
    if not slug:
        slug = "model"
    return f"{slug[:19]}-cred"


def main() -> int:
    args = parse_args()
    if not args.api_key:
        print("[configure] missing --api-key (or OPENAI_API_KEY)")
        return 1

    client = DifyConsoleClient(args.base_url, timeout_seconds=180)
    credential_name = build_credential_name(args.model_id)

    try:
        client.login(email=args.email, password=args.password)
        print("[configure] login passed")

        providers = client.request(
            "GET",
            "/console/api/workspaces/current/model-providers",
            params={"model_type": "llm"},
        ).get("data", [])
        provider_ids = {item.get("provider") for item in providers if isinstance(item, dict)}
        if args.provider not in provider_ids:
            print(f"[configure] provider not available: {args.provider}")
            print("[configure] install provider plugin first (e.g. openai_api_compatible)")
            return 1

        credentials = {
            "display_name": f"{args.model_id} (OpenAI-compatible)",
            "api_key": args.api_key,
            "endpoint_url": args.endpoint_url,
            "endpoint_model_name": args.model_id,
            "mode": "chat",
            "context_size": "128000",
            "max_tokens_to_sample": "4096",
        }

        # create or keep existing model credential
        try:
            client.request(
                "POST",
                f"/console/api/workspaces/current/model-providers/{args.provider}/models/credentials",
                json_body={
                    "model": args.model_id,
                    "model_type": "llm",
                    "credentials": credentials,
                    "name": credential_name,
                },
            )
            print("[configure] model credential created")
        except DifyConsoleError as exc:
            print(f"[configure] model credential create skipped: {exc.message}")

        model_cred = client.request(
            "GET",
            f"/console/api/workspaces/current/model-providers/{args.provider}/models/credentials",
            params={
                "model": args.model_id,
                "model_type": "llm",
                "config_from": "custom-model",
            },
        )
        credential_id = model_cred.get("current_credential_id")
        if not credential_id:
            print("[configure] failed to resolve current_credential_id for model")
            return 1

        # add/switch model credential in model list
        try:
            client.request(
                "POST",
                f"/console/api/workspaces/current/model-providers/{args.provider}/models/credentials/switch",
                json_body={
                    "model": args.model_id,
                    "model_type": "llm",
                    "credential_id": credential_id,
                },
            )
            print("[configure] model credential switched")
        except DifyConsoleError as exc:
            # "Can't add same credential" is safe to ignore
            print(f"[configure] switch skipped: {exc.message}")

        # optional enable call (safe if already enabled)
        try:
            client.request(
                "PATCH",
                f"/console/api/workspaces/current/model-providers/{args.provider}/models/enable",
                json_body={"model": args.model_id, "model_type": "llm"},
            )
            print("[configure] model enabled")
        except DifyConsoleError as exc:
            print(f"[configure] enable skipped: {exc.message}")

        app = client.request("GET", f"/console/api/apps/{args.app_id}")
        model_config = app.get("model_config") or {}

        if not isinstance(model_config, dict) or "model" not in model_config:
            print("[configure] app model_config missing")
            return 1

        model_config["model"]["provider"] = args.provider
        model_config["model"]["name"] = args.model_id
        model_config["model"]["completion_params"] = model_config["model"].get("completion_params") or {}
        if not args.skip_prompt_update:
            model_config["pre_prompt"] = DEFAULT_AGENT_PRE_PROMPT

        agent_mode = model_config.get("agent_mode") or {}
        agent_mode["enabled"] = True
        agent_mode["strategy"] = args.strategy
        agent_mode["max_iteration"] = args.max_iteration
        model_config["agent_mode"] = agent_mode

        client.request("POST", f"/console/api/apps/{args.app_id}/model-config", json_body=model_config)
        print("[configure] app model config updated")

        app_after = client.request("GET", f"/console/api/apps/{args.app_id}")
        after_model = (app_after.get("model_config") or {}).get("model", {})
        after_agent = (app_after.get("model_config") or {}).get("agent_mode", {})
        print("[configure] final")
        print(f"  provider:      {after_model.get('provider')}")
        print(f"  model:         {after_model.get('name')}")
        print(f"  strategy:      {after_agent.get('strategy')}")
        print(f"  max_iteration: {after_agent.get('max_iteration')}")
        print(f"  endpoint_url:  {args.endpoint_url}")
        print(f"  api_key:       {mask_key(args.api_key)}")
        return 0
    except DifyConsoleError as exc:
        print(f"[configure] failed: {exc}")
        if exc.payload is not None:
            print(f"[configure] details: {exc.payload}")
        return 1


if __name__ == "__main__":
    raise SystemExit(main())
