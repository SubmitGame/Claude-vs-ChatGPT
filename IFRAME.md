# Iframe embed probe (Overheard / Opus Feed)

For each **NEW** game only (do not backfill the existing catalog), set:

- `iframe` (boolean, required on new games)
- `iframe_block_reason` (short string, optional; omit or null when `iframe` is true)

## Probe target

Embed parent is `https://games.omgithub.com`. Probe the game's HTTPS `play_url` with HEAD or GET (follow redirects).

## Set `iframe: true` only if ALL hold

1. No `X-Frame-Options: DENY` or `SAMEORIGIN`
2. If CSP has `frame-ancestors`, it must allow `https://games.omgithub.com` (or `*` or `https:`)
3. `Cross-Origin-Resource-Policy` must **not** be `same-origin` (absent or `cross-origin` OK)
4. `play_url` is HTTPS

Otherwise set `iframe: false` and a short `iframe_block_reason` (e.g. `xfo-sameorigin`, `csp-frame-ancestors-none`, `corp-same-origin`, `http-url`).

Do **not** require pointer-lock or storage APIs for this flag.

Also set `iframe: false` when the game needs `SharedArrayBuffer` / cross-origin isolation (typical multi-threaded WASM): an embed parent usually cannot be `crossOriginIsolated`, so use reason `wasm-sharedarraybuffer-needs-cross-origin-isolated`.

## Halo CE hosts (three distinct catalog entries)

Keep **distinct** `play_url`s so Opus Feed can list all three after runtime play_url dedupe is removed:

| Catalog id | Play URL | iframe | Notes |
|---|---|---|---|
| `halo-ce-browser` (mitchellhynes) | `https://mitchellhynes.com/halo` | **false** | Desktop Halo entry. HTTP headers allow framing, but WASM/Emscripten needs `SharedArrayBuffer` / `crossOriginIsolated` — fails inside feed iframe (`DataCloneError` in `halo.js`). Open top-level only. |
| `halo-ce-phone` (Caden) | `https://halo-ce.devcaden.workers.dev/` | **false** | CSP `frame-ancestors 'none'`. Alt `https://nothalo.lol/` same block — do not use as feed play_url for embed. |
| `halo-ce-mobile-sol61` (Reddit / Sol 6.1 / u/friuns) | `https://halo.omgithub.com/` | **true** | Preferred embed host for the mobile/touch Reddit build (same deployment as `halo.lolgames.net`). No XFO; CORP `cross-origin`. |

Do **not** collapse mitchellhynes or Caden onto omgithub/lolgames — those hosts belong to the Sol/mobile Reddit entry.

## Hourly routine

Folder id `hourly-opus-games-scan` should require these fields on each NEW game via UpdateState. If UpdateState is unavailable in a run, document in the report and keep this file as SoT for Overheard.
