/* Lumen 67. Entertainment mock. Not Apple, not Siri, not Apple Intelligence. */
(function () {
  const Mind67 = { ready: false, data: null };
  function bag(text) {
    const counts = {};
    String(text).toLowerCase().replace(/[^a-z0-9\s]/g, " ").split(/\s+/).filter(Boolean).forEach((w) => {
      counts[w] = (counts[w] || 0) + 1;
    });
    return counts;
  }
  function score(a, b) {
    let dot = 0, na = 0, nb = 0;
    const keys = new Set([...Object.keys(a), ...Object.keys(b)]);
    keys.forEach((k) => {
      const x = a[k] || 0, y = b[k] || 0;
      dot += x * y; na += x * x; nb += y * y;
    });
    return dot / (Math.sqrt(na) * Math.sqrt(nb) || 1);
  }
  async function loadMind() {
    try {
      const r = await fetch("data/mind67.json");
      Mind67.data = await r.json();
      Mind67.ready = true;
      const status = document.getElementById("boot-status");
      if (status) status.textContent = "Loaded micro helper 67";
    } catch (e) {}
  }
  loadMind();
  window.Mind67 = {
    answer(text) {
      if (!Mind67.ready || !Mind67.data) return null;
      const q = bag(text);
      let best = null, bestScore = 0.28;
      Mind67.data.intents.forEach((item) => {
        const s = score(q, bag(item.q));
        if (s > bestScore) { bestScore = s; best = item; }
      });
      if (!best) return null;
      if (best.reply === "time") return "It is " + new Date().toLocaleTimeString() + ".";
      if (best.reply === "date") return "Today is " + new Date().toLocaleDateString() + ".";
      if (best.reply === "lock") {
        document.getElementById("desktop")?.classList.add("hidden");
        document.getElementById("lock-screen")?.classList.remove("hidden");
        return "Locked.";
      }
      if (best.app && window.Desktop) Desktop.openApp(best.app);
      return best.reply;
    }
  };
  if (window.Aura && Aura.localReply) {
    const old = Aura.localReply;
    Aura.localReply = function (text) {
      const hit = window.Mind67.answer(text);
      if (hit) return hit;
      return old.call(this, text);
    };
  }
  function extraApps() {
    if (!window.Apps || !window.Desktop) return;
    Object.assign(Desktop.labels, { news: "News", stocks: "Markets", books: "Books", podcasts: "Podcasts", chess: "Chess" });
    Apps.news = function () {
      Windows.create("news", "News", 520, 420, '<div class="news-list"><article><strong>Ridge desk ships a glass pass</strong><p>Mock headline.</p></article><article><strong>Local helper loads at boot</strong><p>A tiny phrase table, not a cloud model.</p></article></div>');
    };
    Apps.stocks = function () {
      const rows = [["Lumen", "128.40", "up"], ["Glass", "42.10", "down"], ["Ridge", "76.55", "up"]];
      Windows.create("stocks", "Markets", 420, 300, rows.map((r) => '<div class="stock-row"><span>' + r[0] + '</span><span class="' + r[2] + '">' + r[1] + '</span></div>').join("") + '<p class="pad">Decorative numbers only.</p>');
    };
    Apps.books = function () {
      Windows.create("books", "Books", 460, 360, '<div class="book-list"><article><strong>Glass Notes</strong><p>A short mock chapter.</p></article></div>');
    };
    Apps.podcasts = function () {
      Windows.create("podcasts", "Podcasts", 400, 280, '<div class="pad"><strong>Lumen FM</strong><p>Show notes only.</p><button id="pod-play" type="button">Play tone</button></div>');
      const btn = document.getElementById("pod-play");
      if (btn) btn.onclick = () => {
        const ctx = new (window.AudioContext || window.webkitAudioContext)();
        const o = ctx.createOscillator();
        o.frequency.value = 440; o.connect(ctx.destination); o.start(); o.stop(ctx.currentTime + 0.25);
      };
    };
    Apps.chess = function () {
      const pieces = ["r","n","b","q","k","b","n","r"];
      let html = '<div id="chess-board">';
      for (let r = 0; r < 8; r++) {
        for (let c = 0; c < 8; c++) {
          const dark = (r + c) % 2;
          let p = "";
          if (r === 0 || r === 7) p = pieces[c];
          if (r === 1 || r === 6) p = "p";
          html += '<button class="' + (dark ? "dark" : "lite") + '">' + p + '</button>';
        }
      }
      html += '</div><p class="pad">Click two squares to move.</p>';
      Windows.create("chess", "Chess", 360, 420, html);
      let from = null;
      document.querySelectorAll("#chess-board button").forEach((b) => {
        b.onclick = () => {
          if (from == null) { from = b; b.style.outline = "2px solid #6366f1"; return; }
          b.textContent = from.textContent; from.textContent = ""; from.style.outline = ""; from = null;
        };
      });
    };
  }
  function inject() {
    if (document.getElementById("l67-style")) return;
    const s = document.createElement("style");
    s.id = "l67-style";
    s.textContent = ".ridge67{background:radial-gradient(900px 520px at 18% 80%, rgba(251,191,36,.35), transparent 60%),radial-gradient(700px 480px at 78% 22%, rgba(125,211,252,.35), transparent 55%),linear-gradient(160deg,#1e3a5f,#7c5c8a 42%,#e7b07a)!important}.l67-orb{width:72px;height:72px;border-radius:50%;margin:8px auto;background:radial-gradient(circle at 35% 30%,#fff,#93c5fd 40%,#6366f1 72%,#1e1b4b);box-shadow:0 10px 30px rgba(99,102,241,.45);animation:l67pulse 2.4s ease-in-out infinite}.l67-orb.talk{animation-duration:.6s}@keyframes l67pulse{50%{transform:scale(1.06)}}.l67-chip{border:0;border-radius:999px;padding:4px 10px;font-size:12px;background:rgba(255,255,255,.55);cursor:pointer}.dock-item{transition:transform .12s}.dock-item.mag{transform:translateY(-10px) scale(1.28)}#l67-chips{display:flex;gap:6px;flex-wrap:wrap;padding:0 10px 8px}.news-list article,.book-list article{background:rgba(255,255,255,.55);border-radius:12px;padding:10px;margin:8px}.stock-row{display:flex;justify-content:space-between;padding:8px 12px}.up{color:#059669}.down{color:#e11d48}#chess-board{display:grid;grid-template-columns:repeat(8,36px);margin:12px}#chess-board button{width:36px;height:36px;border:0}#chess-board .dark{background:#94a3b8}#chess-board .lite{background:#f8fafc}";
    document.head.appendChild(s);
  }
  function chips() {
    const panel = document.getElementById("assistant");
    if (!panel || document.getElementById("l67-orb")) return;
    const orb = document.createElement("div");
    orb.className = "l67-orb"; orb.id = "l67-orb";
    panel.insertBefore(orb, panel.children[1] || null);
    const row = document.createElement("div");
    row.id = "l67-chips";
    ["open notes", "what time is it", "open chess", "tell a joke"].forEach((label) => {
      const b = document.createElement("button");
      b.type = "button"; b.className = "l67-chip"; b.textContent = label;
      b.onclick = () => {
        if (window.Desktop && Desktop.askAura) Desktop.askAura(label, true);
        orb.classList.add("talk");
        setTimeout(() => orb.classList.remove("talk"), 900);
      };
      row.appendChild(b);
    });
    const form = document.getElementById("aura-form");
    if (form) panel.insertBefore(row, form);
  }
  function dockMag() {
    const dock = document.getElementById("dock");
    if (!dock || dock.dataset.mag) return;
    dock.dataset.mag = "1";
    dock.addEventListener("mousemove", (e) => {
      dock.querySelectorAll(".dock-item").forEach((item) => {
        const r = item.getBoundingClientRect();
        item.classList.toggle("mag", Math.abs(e.clientX - (r.left + r.width / 2)) < 36);
      });
    });
    dock.addEventListener("mouseleave", () => dock.querySelectorAll(".dock-item").forEach((item) => item.classList.remove("mag")));
  }
  const start = window.Desktop && Desktop.start;
  if (start) {
    Desktop.start = function () {
      extraApps();
      start.apply(this, arguments);
      inject();
      document.getElementById("wallpaper")?.classList.add("ridge67");
      setTimeout(chips, 240);
      dockMag();
      if (window.Desktop) Desktop.toast("Lumen 67 · local helper loaded");
    };
  }
  const boot = document.getElementById("boot-status");
  if (boot && /67|66|model|phrase/i.test(boot.textContent)) boot.textContent = "Loading micro helper 67…";
})();
