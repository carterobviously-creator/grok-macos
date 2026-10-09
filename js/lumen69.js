/* Lumen 69. Entertainment mock. Not Apple, not Siri, not Apple Intelligence. */
(function () {
  const Mind69 = { ready: false, data: null };
  function bag(text) {
    const counts = {};
    String(text).toLowerCase().replace(/[^a-z0-9\s]/g, " ").split(/\s+/).filter(Boolean).forEach((w) => {
      counts[w] = (counts[w] || 0) + 1;
    });
    return counts;
  }
  function score(a, b) {
    let dot = 0, na = 0, nb = 0;
    new Set([...Object.keys(a), ...Object.keys(b)]).forEach((k) => {
      const x = a[k] || 0, y = b[k] || 0;
      dot += x * y; na += x * x; nb += y * y;
    });
    return dot / (Math.sqrt(na) * Math.sqrt(nb) || 1);
  }
  async function loadMind() {
    try {
      const r = await fetch("data/mind69.json");
      Mind69.data = await r.json();
      Mind69.ready = true;
      const status = document.getElementById("boot-status");
      if (status) status.textContent = "Loaded local helper 69";
    } catch (e) {}
  }
  loadMind();
  window.Mind69 = {
    answer(text) {
      if (!Mind69.ready || !Mind69.data) return null;
      const q = bag(text);
      let best = null, bestScore = 0.3;
      Mind69.data.intents.forEach((item) => {
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
      const hit = window.Mind69.answer(text);
      if (hit) return hit;
      return old.call(this, text);
    };
  }
  function extraApps() {
    if (!window.Apps || !window.Desktop) return;
    Object.assign(Desktop.labels, {
      news: "News", stocks: "Markets", books: "Books", podcasts: "Podcasts",
      chess: "Chess", tv: "Screen", canvas: "Canvas"
    });
    Apps.news = function () {
      Windows.create("news", "News", 520, 420, '<div class="news-list"><article><strong>Glass desk gets a new wash</strong><p>Mock headline for the entertainment desktop.</p></article><article><strong>Local helper loads at boot</strong><p>A tiny phrase table, not a cloud model.</p></article></div>');
    };
    Apps.stocks = function () {
      const rows = [["Lumen", "128.40", "up"], ["Glass", "42.10", "down"], ["Ridge", "76.55", "up"]];
      Windows.create("stocks", "Markets", 420, 300, rows.map((r) => '<div class="stock-row"><span>' + r[0] + '</span><span class="' + r[2] + '">' + r[1] + '</span></div>').join("") + '<p class="pad">Decorative numbers only.</p>');
    };
    Apps.books = function () {
      Windows.create("books", "Books", 460, 340, '<div class="book-list"><article><strong>Glass Notes</strong><p>A short mock chapter about a desktop made of blur.</p></article></div>');
    };
    Apps.podcasts = function () {
      Windows.create("podcasts", "Podcasts", 400, 260, '<div class="pad"><strong>Lumen FM</strong><p>Show notes only.</p><button id="pod-play" type="button">Play tone</button></div>');
      const btn = document.getElementById("pod-play");
      if (btn) btn.onclick = () => {
        const ctx = new (window.AudioContext || window.webkitAudioContext)();
        const o = ctx.createOscillator();
        o.frequency.value = 440;
        o.connect(ctx.destination);
        o.start();
        o.stop(ctx.currentTime + 0.25);
      };
    };
    Apps.chess = function () {
      const pieces = ["r", "n", "b", "q", "k", "b", "n", "r"];
      let html = '<div id="chess-board">';
      for (let r = 0; r < 8; r++) {
        for (let c = 0; c < 8; c++) {
          let p = "";
          if (r === 0 || r === 7) p = pieces[c];
          if (r === 1 || r === 6) p = "p";
          html += '<button class="' + ((r + c) % 2 ? "dark" : "lite") + '">' + p + "</button>";
        }
      }
      html += '</div><p class="pad">Click two squares to move.</p>';
      Windows.create("chess", "Chess", 360, 420, html);
      let from = null;
      document.querySelectorAll("#chess-board button").forEach((b) => {
        b.onclick = () => {
          if (!from) { from = b; b.style.outline = "2px solid #6366f1"; return; }
          b.textContent = from.textContent;
          from.textContent = "";
          from.style.outline = "";
          from = null;
        };
      });
    };
    Apps.tv = function () {
      Windows.create("tv", "Screen", 520, 340, '<div class="screen-stage"><span></span></div><p class="pad">Mock picture. Not a streaming catalog.</p>');
    };
    Apps.canvas = function () {
      Windows.create("canvas", "Canvas", 520, 380, '<canvas id="canvas-pad" width="480" height="280"></canvas><p class="pad">Draw with the pointer.</p>');
      const c = document.getElementById("canvas-pad");
      if (!c) return;
      const ctx = c.getContext("2d");
      let down = false;
      c.onpointerdown = (e) => { down = true; ctx.beginPath(); ctx.moveTo(e.offsetX, e.offsetY); };
      c.onpointermove = (e) => { if (!down) return; ctx.lineTo(e.offsetX, e.offsetY); ctx.stroke(); };
      c.onpointerup = () => { down = false; };
    };
  }
  function chips() {
    const panel = document.getElementById("assistant");
    if (!panel || document.getElementById("l69-orb")) return;
    const orb = document.createElement("div");
    orb.className = "l69-orb";
    orb.id = "l69-orb";
    panel.insertBefore(orb, panel.children[1] || null);
    const row = document.createElement("div");
    row.id = "l69-chips";
    ["open notes", "what time is it", "open chess", "tell a joke"].forEach((label) => {
      const b = document.createElement("button");
      b.type = "button";
      b.className = "l69-chip";
      b.textContent = label;
      b.onclick = () => {
        if (window.Desktop) Desktop.askAura(label, true);
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
    if (!dock || dock.dataset.mag69) return;
    dock.dataset.mag69 = "1";
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
      document.getElementById("wallpaper")?.classList.add("ridge69");
      setTimeout(chips, 280);
      dockMag();
      if (window.Desktop) Desktop.toast("Lumen 69 · local helper loaded");
    };
  }
  const boot = document.getElementById("boot-status");
  if (boot) boot.textContent = "Loading local helper 69…";
})();
