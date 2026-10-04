/* Lumen 60 apps, catalog, and local helper. Original marks only. */
const Lumen60 = {
  phrases: [],
  apps: [
    ["timer", "Timer", "Countdown that actually ticks."],
    ["quiz", "Quiz", "Short local quiz."],
    ["palette", "Palette", "Original color chips."],
    ["ledger", "Ledger", "Add mock expenses."]
  ],
  async boot() {
    try {
      const r = await fetch("data/mind60.json");
      if (r.ok) {
        const data = await r.json();
        this.phrases = data.phrases || [];
      }
    } catch (e) { /* offline file open */ }
    this.phrases = this.phrases.concat([
      { q: "catalog", a: "Opening the shelf. Get adds an app to the dock." },
      { q: "timer", a: "Opening Timer." }
    ]);
    if (window.Desktop) {
      this.apps.forEach((a) => { Desktop.labels[a[0]] = a[1]; });
    }
    if (window.Icons) {
      this.apps.forEach((a) => {
        if (!Icons[a[0]]) Icons[a[0]] = () => this.icon(a[0]);
      });
    }
    if (window.Apps) {
      Apps.timer = () => this.timer();
      Apps.quiz = () => this.quiz();
      Apps.palette = () => this.palette();
      Apps.ledger = () => this.ledger();
      const prev = Apps.store;
      Apps.store = () => { prev(); this.injectShelf(); };
    }
    if (window.Aura) {
      const orig = Aura.localReply.bind(Aura);
      Aura.localReply = (text) => this.answer(text) || orig(text);
    }
    const status = document.getElementById("boot-status");
    if (status && /helper|phrase|mind/i.test(status.textContent || "")) {
      status.textContent = "Phrase book ready \u00b7 " + (this.phrases.length || 4) + " lines";
    }
  },
  icon(id) {
    const colors = { timer: "#38bdf8", quiz: "#a78bfa", palette: "#fb7185", ledger: "#34d399" };
    const c = colors[id] || "#818cf8";
    return '<svg viewBox="0 0 64 64" width="48" height="48"><rect rx="14" width="64" height="64" fill="' + c + '"/><circle cx="32" cy="32" r="14" fill="none" stroke="#fff" stroke-width="4"/></svg>';
  },
  answer(text) {
    const q = (text || "").toLowerCase();
    if (/open (timer|quiz|palette|ledger|shelf|catalog)/.test(q)) {
      const id = (q.match(/timer|quiz|palette|ledger/) || ["store"])[0];
      if (window.Desktop) Desktop.openApp(id);
      return "Opening " + ((window.Desktop && Desktop.labels[id]) || "Gallery") + ".";
    }
    const hit = this.phrases.find((p) => q.includes(p.q));
    return hit ? hit.a : null;
  },
  injectShelf() {
    const grid = document.querySelector(".store-grid");
    if (!grid || grid.dataset.l60) return;
    grid.dataset.l60 = "1";
    this.apps.forEach((c) => {
      const card = document.createElement("div");
      card.className = "store-card";
      card.innerHTML = "<strong>" + c[1] + "</strong><p>" + c[2] + "</p><button>Get</button>";
      card.querySelector("button").onclick = () => {
        Desktop.install(c[0]);
        card.querySelector("button").textContent = "Open";
      };
      grid.appendChild(card);
    });
  },
  timer() {
    Windows.create("timer", "Timer", 320, 240,
      '<div class="pad"><h2 id="t60">25:00</h2><button id="t60go">Start</button> <button id="t60stop">Reset</button></div>');
    let left = 25 * 60, handle = null;
    const draw = () => {
      const m = String(Math.floor(left / 60)).padStart(2, "0");
      const s = String(left % 60).padStart(2, "0");
      document.getElementById("t60").textContent = m + ":" + s;
    };
    document.getElementById("t60go").onclick = () => {
      if (handle) return;
      handle = setInterval(() => {
        left = Math.max(0, left - 1);
        draw();
        if (!left) { clearInterval(handle); handle = null; Desktop.toast("Timer done"); }
      }, 1000);
    };
    document.getElementById("t60stop").onclick = () => {
      clearInterval(handle); handle = null; left = 25 * 60; draw();
    };
  },
  quiz() {
    const qs = [
      ["Which helper loads at boot?", "Aura"],
      ["Where do notes save?", "This browser"],
      ["Is this macOS?", "No"]
    ];
    Windows.create("quiz", "Quiz", 380, 260,
      '<div class="pad"><p id="q60"></p><input id="a60" placeholder="Answer"><button id="s60">Check</button><p id="r60"></p></div>');
    let i = 0;
    const show = () => { document.getElementById("q60").textContent = qs[i][0]; };
    show();
    document.getElementById("s60").onclick = () => {
      const ok = document.getElementById("a60").value.toLowerCase().includes(qs[i][1].toLowerCase().slice(0, 3));
      document.getElementById("r60").textContent = ok ? "Correct." : "Try: " + qs[i][1];
      i = (i + 1) % qs.length;
      document.getElementById("a60").value = "";
      show();
    };
  },
  palette() {
    const colors = ["#0ea5e9", "#6366f1", "#a78bfa", "#fb7185", "#34d399", "#fbbf24"];
    Windows.create("palette", "Palette", 420, 280,
      '<div class="pad l60-shelf">' + colors.map((c) =>
        '<button class="l60-chip" data-c="' + c + '" style="background:' + c + ';color:#fff">' + c + "</button>"
      ).join("") + "</div>");
    document.querySelectorAll(".l60-chip").forEach((b) => {
      b.onclick = () => Desktop.toast("Chip " + b.dataset.c);
    });
  },
  ledger() {
    const saved = JSON.parse(localStorage.getItem("lumen-ledger") || "[]");
    Windows.create("ledger", "Ledger", 420, 320,
      '<div class="pad"><ul id="led"></ul><form id="ledf"><input id="ledi" placeholder="Coffee 4"><button>Add</button></form><p id="ledt"></p></div>');
    const draw = () => {
      document.getElementById("led").innerHTML = saved.map((x) => "<li>" + x + "</li>").join("");
      const sum = saved.reduce((n, x) => n + (parseFloat(x.split(" ").pop()) || 0), 0);
      document.getElementById("ledt").textContent = "Total mock: " + sum.toFixed(2);
    };
    draw();
    document.getElementById("ledf").onsubmit = (e) => {
      e.preventDefault();
      const v = document.getElementById("ledi").value.trim();
      if (!v) return;
      saved.push(v);
      localStorage.setItem("lumen-ledger", JSON.stringify(saved));
      document.getElementById("ledi").value = "";
      draw();
    };
  }
};
document.addEventListener("DOMContentLoaded", () => Lumen60.boot());
