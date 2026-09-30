# What AI Is Best for Making Games? Claude vs ChatGPT — Browser-Game Receipts

A live catalog of **vibecoded browser games** made with Claude, ChatGPT, and other AI tools. Compare the games, not the launch threads: every entry aims to bring **screenshots, gameplay video, a playable link, source/evidence, and a score**. **Receipts, not vibes.**

This catalog is the planned **[SubmitGame/Claude-vs-ChatGPT](https://github.com/SubmitGame/Claude-vs-ChatGPT)** successor to [VibeFin/awesome-opus-5.5-games](https://github.com/VibeFin/awesome-opus-5.5-games).

> **Note:** This repo **succeeds** [VibeFin/awesome-opus-5.5-games](https://github.com/VibeFin/awesome-opus-5.5-games) as the SubmitGame home for the catalog. The VibeFin list is **not deleted** and remains available as a historical / fallback mirror.

## Claude vs ChatGPT: the Arena

Who is best for making games? It depends on the brief, the workflow, the amount of iteration, and what “best” means: visual polish, playable systems, speed, cost, or shipping a real URL. The catalog is a running, playable answer—not a synthetic benchmark.

### Models in the catalog

As of the late-September 2026 public discourse, the headline versions are moving quickly:

- **Claude Opus family:** **Claude Opus 5.5** is the current headline version here. Older or parallel claims such as **4.5–4.6+** may remain useful as catalog tags when a creator names that version; they are not silently normalized to 5.5.
- **Claude Sonnet 5.5:** the faster/lower-cost Claude 5.5 sibling, tagged when the game or its source claims Sonnet 5.5.
- **Astra:** **Astra / GPT-6 Astra** entries are included where present in the catalog and where the source claims that model.
- **ChatGPT / GPT-5.x class:** ChatGPT-built games and GPT-5.x-class claims are kept as their own attribution when the source identifies them.
- **Everything else:** future models and mixed workflows remain discoverable through the raw `made_with` value in [`data/grokgames.json`](data/grokgames.json), including uncertain or multi-model claims.

These are **attribution tags, not independent lab results**: they record what the game, creator, or source claims. Models evolve, names change, and many games are hybrid builds. Check the source link on each entry for the latest context.

## What you get

- A searchable, living list of AI-made browser games across genres and platforms.
- Screenshots for quick visual comparison, plus gameplay clips in [`videos/`](videos/).
- Play links and source links so you can try the build yourself.
- A **screenshot score** for visual clarity and polish—not a gameplay or “best model” verdict.
- Model tags and evidence so Claude vs ChatGPT comparisons remain auditable.

## Browse the games

- **[AI Games Feed](https://github.com/SubmitGame/AI-Games-feed):** swipe through the catalog in a TikTok-style vertical browser of gameplay clips.
- **[omgithub.com](https://omgithub.com/):** discover more live GitHub games and projects.
- The catalog source of truth is [`data/grokgames.json`](data/grokgames.json); media lives in [`videos/`](videos/) and `screenshots/`.

## Submit a game

Open a pull request with:

1. A public playable URL and a unique entry in [`data/grokgames.json`](data/grokgames.json).
2. The creator/source link and any evidence for the `made_with` model tag.
3. A representative screenshot under `screenshots/`.
4. An optional short gameplay clip under `videos/`.
5. A concise description and, where useful, platform or input notes.

See [`CONTRIBUTING.md`](CONTRIBUTING.md) for the full checklist. Please submit public work only, and do not list private or internal repositories without permission.

## Why this exists

AI game-making is moving too fast for static “best model” lists. This is a living arena of things people can actually open, play, inspect, and compare—**Claude vs ChatGPT with receipts**.
