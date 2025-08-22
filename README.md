
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

## Sophisticated Assumptions
- Backend API strictly follows the documented endpoints and response shapes (see above and `lib/api.ts`).
- Bitcoin address validation is performed server-side, supporting both Base58 and Bech32 formats.
- Transaction hashes are expected to be 64-character hex strings.
- Frontend expects backend to handle all error messaging and returns user-friendly errors based on backend responses.
- App is designed to be themable via CSS variables, with a light mode toggle using `data-theme="light"` on `<html>`.
- No third-party UI kits are used; all UI is custom and minimal.
- Security headers (including a basic CSP) are set in `next.config.ts`.
- Frontend disables fetch caching for API calls to always show the latest data.

## Bonus Features implemented byond scope 
- Accessibility: Keyboard navigation and visible focus states are implemented.
- Centralized design tokens for easy theming and palette updates.
- Mock backend (`server.js`) for local development and testing, including error simulation endpoints.
- TypeScript and ESLint/typecheck scripts included for code quality.
- Playwright E2E test setup scaffolded in `/e2e`.
- Responsive UI components (e.g., grid layouts in transaction details).
- User-friendly error handling and display in the frontend.

## Scripts
- `dev` – run locally
- `build` / `start` – production build/serve
- `lint` – ESLint
- `typecheck` – TypeScript
- `test` – Playwright (add tests in `/e2e`)
