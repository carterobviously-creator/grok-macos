/* Lumen Prism layer — extra mock apps + Aura phrases. Original work. */
(function () {
  if (typeof Desktop === "undefined") return;

  Desktop.labels.compass = "Compass";
  Desktop.labels.ledger = "Ledger";
  Desktop.labels.timer = "Timer";
  Desktop.labels.palette = "Palette";

  if (typeof Icons !== "undefined") {
    Icons.compass = function () {
      return '<svg viewBox="0 0 64 64" width="44" height="44"><circle cx="32" cy="32" r="26" fill="#0ea5e9"/><circle cx="32" cy="32" r="16" fill="#e0f2fe"/><path d="M32 16l4 16-4 16-4-16z" fill="#0369a1"/></svg>';
    };
    Icons.ledger = function () {
      return '<svg viewBox="0 0 64 64" width="44" height="44"><rect x="12" y="10" width="40" height="44" rx="8" fill="#22c55e"/><rect x="20" y="20" width="24" height="4" fill="#ecfdf5"/><rect x="20" y="30" width="18" height="4" fill="#bbf7d0"/><rect x="20" y="40" width="20" height="4" fill="#bbf7d0"/></svg>';
    };
    Icons.timer = function () {
      return '<svg viewBox="0 0 64 64" width="44" height="44"><circle cx="32" cy="34" r="22" fill="#f97316"/><circle cx="32" cy="34" r="14" fill="#ffedd5"/><path d="M32 22v12l8 4" stroke="#9a3412" stroke-width="3" fill="none"/></svg>';
    };
    Icons.palette = function () {
      return '<svg viewBox="0 0 64 64" width="44" height="44"><ellipse cx="32" cy="32" rx="24" ry="20" fill="#a855f7"/><circle cx="22" cy="26" r="5" fill="#fde68a"/><circle cx="34" cy="22" r="5" fill="#67e8f9"/><circle cx="42" cy="32" r="5" fill="#fb7185"/></svg>';
    };
  }

  if (typeof Apps !== "undefined") {
    Apps.compass = function () {
      Windows.open("compass", "Compass", "<p style='padding:16px'>Heading mock: 42° NE.<br>This is a decorative compass, not GPS.</p>");
    };
    Apps.ledger = function () {
      const rows = JSON.parse(localStorage.getItem("lumen-ledger") || '[{"n":"Coffee","a":-4},{"n":"Pay","a":20}]');
      const sum = rows.reduce((s, r) => s + r.a, 0);
      Windows.open("ledger", "Ledger",
        "<div style='padding:16px'><p>Balance mock: " + sum +
        "</p><ul>" + rows.map((r) => "<li>" + r.n + " · " + r.a + "</li>").join("") +
        "</ul><p class='muted'>LocalStorage only.</p></div>");
    };
    Apps.timer = function () {
      Windows.open("timer", "Timer",
        "<div style='padding:16px'><p id='prism-timer'>25:00</p><button id='prism-timer-go'>Start 25 min mock</button></div>");
      setTimeout(function () {
        const btn = document.getElementById("prism-timer-go");
        if (!btn) return;
        btn.onclick = function () {
          let left = 25 * 60;
          clearInterval(window._prismT);
          window._prismT = setInterval(function () {
            left -= 1;
            const el = document.getElementById("prism-timer");
            if (!el || left < 0) { clearInterval(window._prismT); return; }
            const m = String(Math.floor(left / 60)).padStart(2, "0");
            const s = String(left % 60).padStart(2, "0");
            el.textContent = m + ":" + s;
          }, 1000);
        };
      }, 50);
    };
    Apps.palette = function () {
      const colors = ["#7dd3fc", "#818cf8", "#c4b5fd", "#fda4af", "#86efac"];
      Windows.open("palette", "Palette",
        "<div style='padding:16px'>" + colors.map(function (c) {
          return "<button class='prism-chip' data-c='" + c + "' style='background:" + c + "'>" + c + "</button>";
        }).join("") + "<p>Click a chip to tint the wallpaper wash.</p></div>");
      setTimeout(function () {
        document.querySelectorAll("#window-layer [data-c]").forEach(function (b) {
          b.onclick = function () {
            document.getElementById("wallpaper").style.boxShadow = "inset 0 0 180px " + b.dataset.c;
          };
        });
      }, 50);
    };
  }

  if (typeof AuraModel !== "undefined") {
    AuraModel.phrases.push(
      ["compass heading", "Compass is a mock heading tile."],
      ["timer pomodoro", "Open Timer for a 25 minute mock countdown."],
      ["ledger money", "Ledger stores tiny mock rows in this browser."],
      ["palette color", "Palette lets you wash the wallpaper with a tint."]
    );
  }

  const scenes = ["", "scene-dawn", "scene-mist"];
  let si = 0;
  window.addEventListener("keydown", function (e) {
    if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "w") {
      e.preventDefault();
      document.body.classList.remove("scene-dawn", "scene-mist");
      si = (si + 1) % scenes.length;
      if (scenes[si]) document.body.classList.add(scenes[si]);
      if (typeof Desktop !== "undefined") Desktop.toast("Scene " + (si + 1));
    }
  });
})();
