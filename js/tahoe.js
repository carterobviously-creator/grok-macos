(function () {
  Icons.games = function () {
    return this.svg(
      '<svg width="28" height="28" viewBox="0 0 28 28"><rect x="5" y="10" width="18" height="10" rx="3" fill="#fff"/><circle cx="10" cy="15" r="1.6" fill="#111"/><circle cx="18" cy="15" r="1.6" fill="#111"/></svg>',
      "linear-gradient(#34d399,#059669)"
    );
  };

  Desktop.labels.games = "Games";

  const catalog = [
    ["Harbor Drift", "Calm mock racer"],
    ["Glass Break", "Puzzle blocks"],
    ["Night Circuit", "Neon loop"],
    ["Orbit Notes", "Rhythm taps"]
  ];

  Apps.games = function () {
    Windows.open("games", "Games", Icons.games(),
      '<div class="pad"><p>Mock catalog. Nothing installs for real.</p><div class="games-grid">' +
      catalog.map(function (g) {
        return "<button type='button'><strong>" + g[0] + "</strong><span>" + g[1] + "</span></button>";
      }).join("") +
      "</div></div>"
    );
    const body = Windows.list.games.querySelector(".win-body");
    body.querySelectorAll("button").forEach(function (b) {
      b.onclick = function () {
        Desktop.toast(b.querySelector("strong").textContent + " launched (mock).");
      };
    });
  };

  if (Desktop.pinned.indexOf("games") === -1) {
    Desktop.pinned.splice(5, 0, "games");
  }

  AuraModel.book.help.push("Try Games, open calendar, or ask for a joke.");
  AuraModel.phrases.push(["games play", "Open Games from Launchpad or the dock."]);

  const origStart = Desktop.start.bind(Desktop);
  Desktop.start = function () {
    origStart();
    const dock = document.getElementById("dock");
    dock.addEventListener("mousemove", function (e) {
      const items = Array.prototype.slice.call(dock.querySelectorAll(".dock-item"));
      items.forEach(function (item) {
        const r = item.getBoundingClientRect();
        const mid = r.left + r.width / 2;
        const dist = Math.abs(e.clientX - mid);
        const mag = Math.max(0, 1 - dist / 140);
        const s = 1 + mag * 0.42;
        const y = -mag * 16;
        item.style.transform = "translateY(" + y + "px) scale(" + s + ")";
      });
    });
    dock.addEventListener("mouseleave", function () {
      dock.querySelectorAll(".dock-item").forEach(function (item) {
        item.style.transform = "";
      });
    });
    const header = document.querySelector("#assistant header strong");
    if (header && !document.getElementById("aura-orb")) {
      const orb = document.createElement("span");
      orb.id = "aura-orb";
      header.prepend(orb);
    }
  };
})();
