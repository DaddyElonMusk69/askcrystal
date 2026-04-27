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

## 3) Colima image pull/cache corruption

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

## 4) Quick health checklist

```bash
cd /Users/haokaiqin/Desktop/AskCrystal
./scripts/dev/start_local_stack.sh --backend-only
python3 scripts/dev/e2e_smoke_test.py
```
