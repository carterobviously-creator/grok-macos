(function () {
  try {
    Desktop.extra = JSON.parse(localStorage.getItem("lumen-dock") || "[]");
  } catch (e) {
    Desktop.extra = [];
  }

  const _install = Desktop.install.bind(Desktop);
  Desktop.install = function (id) {
    if (this.extra.indexOf(id) === -1) this.extra.push(id);
    localStorage.setItem("lumen-dock", JSON.stringify(this.extra));
    return _install(id);
  };

  const _refresh = Desktop.refreshAuraMode.bind(Desktop);
  Desktop.refreshAuraMode = function () {
    _refresh();
    const el = document.getElementById("aura-mode");
    if (!el) return;
    if (localStorage.getItem("lumen-aura-cloud") === "1") el.textContent = "Local + demo API";
  };

  const _renderDock = Desktop.renderDock.bind(Desktop);
  Desktop.renderDock = function () {
    _renderDock();
    const dock = document.getElementById("dock");
    if (!dock) return;
    dock.onmousemove = function (e) {
      dock.querySelectorAll(".dock-item").forEach(function (item) {
        const r = item.getBoundingClientRect();
        const d = Math.abs(e.clientX - (r.left + r.width / 2));
        const s = Math.max(1, 1.38 - d / 140);
        item.style.transform = "translateY(" + ((s - 1) * -28) + "px) scale(" + s + ")";
      });
    };
    dock.onmouseleave = function () {
      dock.querySelectorAll(".dock-item").forEach(function (item) {
        item.style.transform = "";
      });
    };
  };

  const _settings = Apps.settings;
  Apps.settings = function () {
    _settings();
    const box = document.querySelector(".settings");
    if (!box || document.getElementById("aura-cloud")) return;
    const label = document.createElement("label");
    const checked = localStorage.getItem("lumen-aura-cloud") === "1" ? " checked" : "";
    label.innerHTML = '<input type="checkbox" id="aura-cloud"' + checked + "> Use optional demo text API for longer answers";
    box.appendChild(label);
    const note = document.createElement("p");
    note.textContent = "Local helper still handles open-app, math, notes, and reminders.";
    box.appendChild(note);
    document.getElementById("aura-cloud").onchange = function (e) {
      localStorage.setItem("lumen-aura-cloud", e.target.checked ? "1" : "0");
      Desktop.refreshAuraMode();
    };
  };
})();
