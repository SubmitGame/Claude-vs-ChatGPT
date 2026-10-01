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

## Known bad hosts (Halo)

Do not use as feed-facing play URLs:

- `https://halo-ce.devcaden.workers.dev/`
- `https://nothalo.lol/`

Prefer embeddable: `https://halo.omgithub.com/` — never retarget `halo-ce-browser` / `halo-ce-phone` to `*.lolgames.net`, mitchellhynes, workers.dev, or nothalo.lol.

## Hourly routine

Folder id `hourly-opus-games-scan` should require these fields on each NEW game via UpdateState. If UpdateState is unavailable in a run, document in the report and keep this file as SoT for Overheard.
