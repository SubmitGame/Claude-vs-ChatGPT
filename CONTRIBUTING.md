# Contributing

## Adding a game

Open a PR that:

1. Adds a row-worthy entry to `data/grokgames.json` (unique `id`, `play_url`, `description`, `found_via`, `found_via_network`, `screenshot_score`).
   Optionally set `engine` (e.g. `Three.js`, `Godot`, `Unity`, `Phaser`, `Spawn`, `Ryft`, `Claude artifact`) when there is concrete evidence of what it was built in; omit it when unknown.
2. Drops a screenshot under `screenshots/` and points `screenshot_path` at it.
3. Regenerates the README table (or ask maintainers to regenerate).

## Rules

- Must have a public play URL.
- Must be Opus 5.5 / vibecoded with some evidence.
- Screenshot scores rate the still only, not gameplay.
- Do not scrape or list private / org-internal repos without permission.
