(function lumen27() {
  const tint = document.getElementById("tint");
  function applyGlass(v) {
    const n = Number(v);
    const root = document.documentElement.style;
    root.setProperty("--glass-alpha", String(0.08 + n * 0.28));
    root.setProperty("--glass-blur", (28 + n * 24) + "px");
    root.setProperty("--glass-sat", (180 + n * 80) + "%");
    document.body.classList.toggle("tinted", n > 0.55);
  }
  if (tint) {
    applyGlass(tint.value);
    tint.addEventListener("input", (e) => applyGlass(e.target.value));
  }

  const dock = document.getElementById("dock");
  if (dock) {
    dock.addEventListener("mousemove", (e) => {
      const items = [...dock.querySelectorAll(".dock-item")];
      items.forEach((el) => {
        const r = el.getBoundingClientRect();
        const d = Math.abs(e.clientX - (r.left + r.width / 2));
        const s = Math.max(1, 1.46 - d / 190);
        const y = Math.max(0, 22 - d / 14);
        el.style.transform = "translateY(" + -y + "px) scale(" + s + ")";
      });
    });
    dock.addEventListener("mouseleave", () => {
      dock.querySelectorAll(".dock-item").forEach((el) => { el.style.transform = ""; });
    });
  }

  const drawer = document.getElementById("notify-drawer");
  if (drawer && !drawer.querySelector(".note-card")) {
    drawer.insertAdjacentHTML("beforeend",
      '<div class="note-card">Aura phrase book loaded at boot.</div>' +
      '<div class="note-card">Glass tint lives in Control Center.</div>' +
      '<div class="note-card">This is Lumen, a fan mock. Not Apple.</div>'
    );
  }

  const mode = document.getElementById("aura-mode");
  if (mode && !document.getElementById("aura-orb")) {
    const orb = document.createElement("span");
    orb.id = "aura-orb";
    mode.parentNode.insertBefore(orb, mode);
  }

  if (window.AuraModel) {
    AuraModel.facts.edition = "Lumen 27 mock";
    AuraModel.phrases.push(
      ["golden gate", "This desktop is Lumen, a browser mock. Names here are original."],
      ["opacity slider", "Drag Glass tint in Control Center for clearer or thicker panels."],
      ["dock", "Hover the dock to magnify neighbors."]
    );
  }
})();
