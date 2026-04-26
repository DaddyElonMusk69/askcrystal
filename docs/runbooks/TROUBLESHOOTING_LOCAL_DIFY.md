# Troubleshooting Local Dify

## 1) `curl ... /console/api/setup` returns `502`

Symptom:

- Nginx is up but API/worker still initializing.

Fix:

```bash
cd /Users/haokaiqin/Desktop/AskCrystal/services/dify-runtime/docker
docker compose ps
./../../scripts/dev/check_local_dify.sh
```

`check_local_dify.sh` now retries for up to 120 seconds.

## 2) CSRF 401 from console APIs

Symptom:

- `{"code":"unauthorized","message":"CSRF token is missing or invalid."}`

Cause:

- Dify console endpoints require cookie + `X-CSRF-Token` header, including authenticated `GET` requests.

Fix:

- Use `scripts/dify_console_client.py` (already handles login cookies + CSRF header automatically).

## 3) Skill bridge dependency install fails with SSL cert error

Symptom:

- `SSLCertVerificationError` during `pip install`.

Fix:

- `scripts/dev/start_skill_bridge.sh` now prefers an existing runtime with `fastapi/uvicorn/pydantic` and starts without forcing pip install.
- If you want auto-install to `.venv`, set:

```bash
SKILL_BRIDGE_AUTO_INSTALL=1 ./scripts/dev/start_skill_bridge.sh
```

## 4) Dify cannot reach bridge at runtime

Symptom:

- Tools are registered but execution fails.

Checks:

1. Bridge process is running on host `:8010`.
2. Provider was registered with `--tool-server-url http://host.docker.internal:8010` if the bridge runs on the host.
3. Container-to-host connectivity test:

```bash
cd /Users/haokaiqin/Desktop/AskCrystal/services/dify-runtime/docker
docker compose exec -T api python - <<'PY'
import urllib.request
with urllib.request.urlopen('http://host.docker.internal:8010/health', timeout=10) as r:
    print(r.status)
PY
```

If you intentionally run the bridge as a Docker service instead, re-register the provider with the Docker-network URL, for example `http://askcrystal:8010`.

## 5) Colima image pull/cache corruption

Symptom:

- Pull/start failures with checksum mismatch in colima cache.

Fix pattern:

```bash
colima stop
rm -f ~/Library/Caches/colima/caches/*.downloading.invalid
colima start --cpu 4 --memory 8 --disk 60 --runtime docker --network-address
```

Then rerun:

```bash
cd /Users/haokaiqin/Desktop/AskCrystal
./scripts/dev/start_local_dify.sh
```

## 6) Quick health checklist

```bash
cd /Users/haokaiqin/Desktop/AskCrystal
./scripts/dev/check_local_dify.sh
curl -fsS http://localhost:8010/health
python3 scripts/dev/e2e_smoke_test.py
```
