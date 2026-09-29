(() => {
  const grid = document.getElementById("grid");
  const stats = document.getElementById("stats");
  const meta = document.getElementById("meta");
  const empty = document.getElementById("empty");
  const searchInput = document.getElementById("search");
  const sortSelect = document.getElementById("sort");

  let games = [];
  let updatedAt = null;

  function escapeHtml(str) {
    return String(str ?? "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }

  function screenshotSrc(path) {
    if (!path) return null;
    const name = String(path).split(/[/\\]/).pop();
    if (!name) return null;
    return `screenshots/${encodeURIComponent(name)}`;
  }

  function scoreClass(score) {
    if (score >= 8.5) return "high";
    if (score >= 7) return "mid";
    return "low";
  }

  function formatScore(score) {
    if (score == null || Number.isNaN(Number(score))) return "—";
    return Number(score).toFixed(1);
  }

  function formatUpdated(iso) {
    if (!iso) return "";
    try {
      const d = new Date(iso);
      return d.toLocaleString("en-GB", {
        timeZone: "Asia/Saigon",
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      }) + " ICT";
    } catch {
      return iso;
    }
  }

  function sortGames(list, mode) {
    const copy = list.slice();
    if (mode === "title") {
      copy.sort((a, b) => String(a.title || "").localeCompare(String(b.title || ""), undefined, { sensitivity: "base" }));
    } else if (mode === "newest") {
      copy.sort((a, b) => String(b.first_seen || "").localeCompare(String(a.first_seen || "")));
    } else {
      copy.sort((a, b) => (Number(b.screenshot_score) || 0) - (Number(a.screenshot_score) || 0));
    }
    return copy;
  }

  function filterGames(list, query) {
    const q = query.trim().toLowerCase();
    if (!q) return list;
    return list.filter((g) => {
      const hay = [g.title, g.description, g.found_via_network, g.id, g.made_with]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();
      return hay.includes(q);
    });
  }

  function renderCard(game, rank) {
    const title = escapeHtml(game.title || "Untitled");
    const desc = escapeHtml(game.description || "");
    const score = Number(game.screenshot_score);
    const scoreLabel = formatScore(score);
    const sc = Number.isFinite(score) ? scoreClass(score) : "";
    const src = screenshotSrc(game.screenshot_path);
    const play = game.play_url ? escapeHtml(game.play_url) : "";
    const source = game.source_url ? escapeHtml(game.source_url) : "";
    const network = escapeHtml(game.found_via_network || "");
    const madeRaw = (game.made_with || "").toLowerCase();
    const made = madeRaw === "astra" ? "Astra" : madeRaw === "opus-5.5" ? "Opus 5.5" : escapeHtml(game.made_with || "");

    const media = src
      ? `<img src="${src}" alt="${title}" loading="lazy" decoding="async" onerror="this.replaceWith(Object.assign(document.createElement('div'),{className:'placeholder',textContent:'No screenshot'}))" />`
      : `<div class="placeholder">No screenshot</div>`;

    const playBtn = play
      ? `<a class="action primary" href="${play}" target="_blank" rel="noopener">Play</a>`
      : `<span class="action primary disabled">No play link</span>`;

    const sourceBtn = source
      ? `<a class="action secondary" href="${source}" target="_blank" rel="noopener">Source</a>`
      : "";

    return `
      <article class="card" role="listitem">
        <div class="card-media">
          ${media}
          <span class="rank-badge">#${rank}</span>
          <span class="score-badge ${sc}" title="Screenshot visual polish score">★ ${scoreLabel}</span>
        </div>
        <div class="card-body">
          <h2 class="card-title">${title}</h2>
          ${desc ? `<p class="card-desc">${desc}</p>` : ""}
          <div class="card-meta">
            ${network ? `<span class="chip">${network}</span>` : ""}
            ${made ? `<span class="chip chip-model">${made}</span>` : ""}
          </div>
          <div class="card-actions">
            ${playBtn}
            ${sourceBtn}
          </div>
        </div>
      </article>
    `;
  }

  function render() {
    const filtered = filterGames(games, searchInput.value);
    const sorted = sortGames(filtered, sortSelect.value);

    stats.innerHTML = `<strong>${sorted.length}</strong> of <strong>${games.length}</strong> games`;

    if (!sorted.length) {
      grid.innerHTML = "";
      empty.classList.remove("hidden");
      return;
    }

    empty.classList.add("hidden");
    grid.innerHTML = sorted.map((g, i) => renderCard(g, i + 1)).join("");
  }

  async function init() {
    try {
      const res = await fetch("data/grokgames.json", { cache: "no-cache" });
      if (!res.ok) throw new Error(`Failed to load data (${res.status})`);
      const data = await res.json();
      games = Array.isArray(data.games) ? data.games : [];
      updatedAt = data.updated_at || null;
      meta.textContent = updatedAt
        ? `Data updated ${formatUpdated(updatedAt)} · ${games.length} games`
        : `${games.length} games`;
      render();
    } catch (err) {
      stats.textContent = "Could not load games data.";
      empty.textContent = String(err.message || err);
      empty.classList.remove("hidden");
      console.error(err);
    }
  }

  searchInput.addEventListener("input", render);
  sortSelect.addEventListener("change", render);
  init();
})();
