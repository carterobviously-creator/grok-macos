/* Lumen 71 — dynamic Liquid Glass slider + boot refinements
   Entertainment mock. Aura uses local tiny model + optional public AI.
*/
(function () {
  function applyGlass() {
    const tint = document.getElementById("tint");
    if (!tint) return;
    const v = Number(tint.value);
    document.documentElement.style.setProperty("--glass-opacity", (0.08 + v * 0.22).toFixed(3));
    document.documentElement.style.setProperty("--glass-blur", (28 + v * 36).toFixed(0) + "px");
    document.documentElement.style.setProperty("--glass-saturate", (140 + v * 120).toFixed(0) + "%");
    document.documentElement.style.setProperty("--specular", (0.15 + v * 0.4).toFixed(2));
    document.documentElement.style.setProperty("--glass-tint", v.toFixed(2));
    const wall = document.getElementById("wallpaper");
    if (wall) wall.classList.toggle("liquid", v > 0.3);
  }

  function init() {
    const tint = document.getElementById("tint");
    if (tint) {
      tint.addEventListener("input", applyGlass);
      applyGlass();
      // Label update if present
      const label = tint.closest("label");
      if (label) label.firstChild.textContent = "Liquid Glass ";
    }
    // Boot status polish
    const status = document.getElementById("boot-status");
    if (status && status.textContent.includes("70")) {
      status.textContent = "Loading tiny LLM…";
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
