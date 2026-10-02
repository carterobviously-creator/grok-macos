(function () {
  const catalog = [
    ["notes", "Notes", "Local text pad."],
    ["calc", "Calculator", "Four-function mock."],
    ["calendar", "Calendar", "Month grid."],
    ["music", "Music", "Tone buttons."],
    ["photos", "Photos", "Color tiles."],
    ["terminal", "Terminal", "Fake shell."],
    ["mail", "Mail", "Inbox mock."],
    ["maps", "Maps", "Pan a fake map."],
    ["weather", "Weather", "Static forecast."],
    ["clock", "Clock", "Live clock."],
    ["sketch", "Sketch", "Draw on a canvas."],
    ["board", "Board", "Tic-tac-toe."]
  ];

  function shelfHtml() {
    return `<div class="shelf-grid">${catalog.map((c) =>
      `<div class="shelf-card"><strong>${c[1]}</strong><p>${c[2]}</p><button type="button" data-install="${c[0]}">Add to dock</button></div>`
    ).join("")}<p class="mind-note">Shelf is an original catalog. Install only adds a dock shortcut in this browser.</p></div>`;
  }

  function bind(root) {
    root.querySelectorAll("[data-install]").forEach((btn) => {
      btn.addEventListener("click", () => {
        const id = btn.getAttribute("data-install");
        if (typeof Desktop !== "undefined") Desktop.install(id);
        btn.textContent = "Added";
      });
    });
  }

  const prev = Desktop.openApp.bind(Desktop);
  Desktop.openApp = function (id) {
    if (id === "shelf") {
      const w = Windows.create("shelf", "Shelf", 560, 460, shelfHtml());
      bind(w);
      return w;
    }
    return prev(id);
  };
  Desktop.labels.shelf = "Shelf";

  function orb() {
    const box = document.getElementById("assistant");
    if (!box || document.getElementById("aura-orb")) return;
    const orbEl = document.createElement("div");
    orbEl.id = "aura-orb";
    orbEl.title = "Aura";
    const header = box.querySelector("header");
    if (header) header.after(orbEl);
  }

  document.addEventListener("DOMContentLoaded", orb);
  setTimeout(orb, 600);
})();
