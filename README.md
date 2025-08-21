
# Simpliance Bitcoin Explorer (Frontend)

A Next.js (App Router + TypeScript) frontend for the Bitcoin Explorer home assignment.  
Visual style mirrors **https://simpliance.ltd/#services** via centralized tokens in `/styles/theme.css`.

## Quick Start
```bash
npm i
npm run dev
# or: pnpm i && pnpm dev
```

### Configure backend
The app expects a backend with endpoints:
- `GET /address/{bitcoinAddress}` → `{ address, balance, transaction_count }`
- `GET /transaction/{transactionHash}` → `{ hash, fee, inputs[], outputs[], transaction_index, block_time }`

Set the base URL with:
```bash
export NEXT_PUBLIC_API_BASE_URL="http://localhost:3000"
```

## Design System
All key tokens live in **/styles/theme.css**:
- `--color-bg`, `--color-text`, `--color-text-muted`
- `--color-accent-primary`, `--color-accent-secondary`
- `--color-border`

Update those values to match the exact Simpliance palette when available.

## Accessibility
- Keyboard-accessible, visible focus states

## Notes
- No third-party UI kits; minimal custom components in `/components/ui`.
- Security headers added in `next.config.ts` (basic CSP, tighten as needed).
- If you need a light mode, set `data-theme="light"` on `<html>`.

## Scripts
- `dev` – run locally
- `build` / `start` – production build/serve
- `lint` – ESLint
- `typecheck` – TypeScript
- `test` – Playwright (add tests in `/e2e`)
