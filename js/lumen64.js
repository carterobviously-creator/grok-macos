/* Lumen 64: extra mock apps and a boot phrase book. Not Siri. Not Apple. */
(function () {
  const extra = {
    shelf() {
      const apps = [
        ["notes", "Notes", "#fbbf24"],
        ["calc", "Calc", "#64748b"],
        ["calendar", "Days", "#ef4444"],
        ["music", "Tune", "#ec4899"],
        ["mail", "Mail", "#3b82f6"],
        ["maps", "Map", "#22c55e"],
        ["weather", "Sky", "#38bdf8"],
        ["dice", "Dice", "#8b5cf6"],
        ["compass", "North", "#0ea5e9"],
        ["tasks", "Tasks", "#14b8a6"],
        ["timer", "Timer", "#f97316"],
        ["settings", "Prefs", "#94a3b8"]
      ];
      Windows.create("shelf", "Shelf", 560, 420,
        '<div class="pad"><h3>Shelf</h3><p>Original marks only. Not official app icons.</p><div class="shelf-grid">' +
        apps.map((a) => '<button class="shelf-card" data-open="' + a[0] + '"><div class="shelf-mark" style="background:' + a[2] + '">' + a[1][0] + '</div>' + a[1] + '</button>').join("") +
        "</div></div>");
    },
    dice() {
      Windows.create("dice", "Dice", 280, 220,
        '<div class="pad"><div class="dice-face" id="dice-face">⚀</div><button type="button" id="dice-roll">Roll</button></div>');
      setTimeout(() => {
        const faces = ["⚀", "⚁", "⚂", "⚃", "⚄", "⚅"];
        const btn = document.getElementById("dice-roll");
        if (!btn) return;
        btn.onclick = () => {
          const n = Math.floor(Math.random() * 6);
          document.getElementById("dice-face").textContent = faces[n];
          if (window.Desktop) Desktop.toast("Rolled " + (n + 1));
        };
      }, 20);
    },
    compass() {
      Windows.create("compass", "Compass", 320, 280,
        '<div class="pad"><div class="compass-ring" id="compass-ring">N</div><p id="compass-read">Decorative heading</p><button type="button" id="compass-spin">Spin</button></div>');
      setTimeout(() => {
        const dirs = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"];
        document.getElementById("compass-spin").onclick = () => {
          const d = dirs[Math.floor(Math.random() * dirs.length)];
          document.getElementById("compass-ring").textContent = d;
          document.getElementById("compass-read").textContent = "Mock heading " + d;
        };
      }, 20);
    }
  };

  function loadMind() {
    const status = document.getElementById("boot-status");
    if (status && !status.dataset.done) status.textContent = "Loading mind 64 phrase book…";
    fetch("data/mind64.json").then((r) => r.json()).then((data) => {
      window.LumenMind64 = data;
      if (status) status.textContent = "Helper ready";
    }).catch(() => {});
  }

  function hook() {
    if (typeof Apps !== "undefined") Object.assign(Apps, extra);
    if (window.Desktop && Desktop.labels) {
      Desktop.labels.shelf = "Shelf";
      Desktop.labels.dice = "Dice";
      Desktop.labels.compass = "Compass";
    }
    if (window.Aura && !Aura._l64) {
      Aura._l64 = true;
      const base = Aura.localReply.bind(Aura);
      Aura.localReply = function (text) {
        const q = String(text || "").toLowerCase();
        if (/shelf|icons/.test(q)) { Desktop.openApp("shelf"); return "Opening Shelf. Icons here are original."; }
        if (/dice|roll/.test(q)) { Desktop.openApp("dice"); return "Opening Dice."; }
        if (/compass|direction/.test(q)) { Desktop.openApp("compass"); return "Opening Compass."; }
        const book = (window.LumenMind64 && LumenMind64.phrases) || [];
        const hit = book.find((p) => q.includes(p.k));
        if (hit) {
          if (hit.k === "weather") Desktop.openApp("weather");
          return hit.a;
        }
        return base(text);
      };
    }
    loadMind();
  }
  function boot() { try { hook(); } catch (e) { console.error(e); } }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", boot);
  else boot();
  setTimeout(boot, 500);
  window.Lumen64 = extra;
})();
