/* Lumen 61 runtime: glass slider hook, voice orb, richer gallery, icon paint. */
(function () {
  const extraApps = {
    stocks() {
      Windows.create("stocks", "Markets", 420, 300,
        '<div class="pad"><h3>Demo tape</h3><p>LUM 128.40 +1.2%</p><p>GLS 54.10 -0.4%</p><p>Not live market data.</p></div>');
    },
    news() {
      Windows.create("news", "Brief", 480, 340,
        '<div class="pad"><h3>Ridge morning</h3><p>Glass slider lands in Settings.</p><p>Gallery adds Markets and Brief.</p><p>Sample headlines only.</p></div>');
    },
    books() {
      Windows.create("books", "Shelf", 420, 300,
        '<div class="pad"><p><b>Harbor Notes</b> — sample chapter</p><p>The dock lifted when the glass got clearer.</p></div>');
    }
  };

  function paintIcon(id) {
    const pal = {
      finder: ["#38bdf8", "#2563eb"], notes: ["#fde68a", "#f59e0b"], calc: ["#94a3b8", "#334155"],
      web: ["#60a5fa", "#1d4ed8"], settings: ["#cbd5e1", "#64748b"], store: ["#a78bfa", "#6d28d9"],
      calendar: ["#f87171", "#be123c"], music: ["#fb7185", "#e11d48"], photos: ["#f9a8d4", "#fbbf24"],
      terminal: ["#1e293b", "#0f172a"], mail: ["#38bdf8", "#0284c7"], maps: ["#4ade80", "#15803d"],
      weather: ["#7dd3fc", "#0369a1"], clock: ["#111827", "#334155"], messages: ["#4ade80", "#16a34a"],
      stocks: ["#34d399", "#047857"], news: ["#fca5a5", "#b91c1c"], books: ["#fdba74", "#c2410c"],
      ask: ["#c4b5fd", "#4f46e5"]
    };
    const [a, b] = pal[id] || ["#94a3b8", "#475569"];
    return '<svg class="icon-svg" viewBox="0 0 64 64" aria-hidden="true"><defs><linearGradient id="g-' + id + '" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="' + a + '"/><stop offset="1" stop-color="' + b + '"/></linearGradient></defs><rect width="64" height="64" rx="14" fill="url(#g-' + id + ')"/><circle cx="32" cy="32" r="10" fill="rgba(255,255,255,0.85)"/></svg>';
  }

  function bootMind() {
    const status = document.getElementById("boot-status");
    if (status) status.textContent = "Loading mind 61 phrase book…";
    fetch("data/mind61.json").then((r) => r.json()).then((data) => {
      window.LumenMind61 = data;
      if (status) status.textContent = "Helper ready";
    }).catch(() => {
      if (status) status.textContent = "Helper ready (offline book)";
    });
  }

  function ensureOrb() {
    if (document.getElementById("ask-orb")) return;
    const orb = document.createElement("button");
    orb.id = "ask-orb";
    orb.type = "button";
    orb.title = "Ask";
    orb.textContent = "";
    const panel = document.createElement("div");
    panel.id = "ask-panel";
    panel.className = "hidden";
    panel.innerHTML = "<strong>Ask</strong><p id='ask-line'>Listening…</p>";
    document.body.appendChild(orb);
    document.body.appendChild(panel);
    orb.onclick = () => panel.classList.add("hidden");
  }

  async function ask(text) {
    ensureOrb();
    const orb = document.getElementById("ask-orb");
    const panel = document.getElementById("ask-panel");
    const line = document.getElementById("ask-line");
    orb.classList.add("show");
    panel.classList.remove("hidden");
    line.textContent = "You: " + text;
    const answer = await Aura.reply(text);
    line.textContent = answer;
    Aura.speak(answer);
    setTimeout(() => orb.classList.remove("show"), 4200);
  }

  function hook() {
    Object.assign(Apps, extraApps);
    if (Desktop && Desktop.labels) {
      Desktop.labels.stocks = "Markets";
      Desktop.labels.news = "Brief";
      Desktop.labels.books = "Shelf";
    }
    const oldInstall = Desktop.install;
    if (oldInstall) {
      Desktop.install = function (id) {
        oldInstall.call(Desktop, id);
        document.querySelectorAll('.store-card button[data-app="' + id + '"]').forEach((b) => {
          b.textContent = "Open";
          b.classList.add("got");
        });
      };
    }
    const storeBtn = document.querySelector("[data-app='store']");
    document.addEventListener("click", (e) => {
      const b = e.target.closest(".store-card button");
      if (!b) return;
      if (b.textContent === "Open") Desktop.openApp(b.dataset.app);
    });
    document.addEventListener("keydown", (e) => {
      if ((e.metaKey || e.ctrlKey) && e.code === "Space") {
        e.preventDefault();
        const input = document.getElementById("aura-input");
        if (input) input.focus();
        Aura.listen((said) => ask(said));
      }
    });
    const mic = document.getElementById("aura-mic");
    if (mic) {
      mic.addEventListener("click", () => {
        Aura.listen((said) => {
          const input = document.getElementById("aura-input");
          if (input) input.value = said;
          ask(said);
        });
      });
    }
    if (window.Icons && Icons.svg) {
      const base = Icons.svg;
      Icons.svg = function (id) { return paintIcon(id) || base(id); };
    }
    document.getElementById("wallpaper")?.classList.add("ridge");
    bootMind();
    ensureOrb();
    if (storeBtn) storeBtn.title = "Gallery";
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", hook);
  else hook();
  window.Lumen61 = { ask, paintIcon };
})();
