(function spark() {
  function scaleDock(hover) {
    const items = Array.from(document.querySelectorAll("#dock .dock-item"));
    items.forEach((el, i) => {
      if (hover < 0) {
        el.style.transform = "";
        return;
      }
      const d = Math.abs(i - hover);
      const s = d === 0 ? 1.28 : d === 1 ? 1.12 : d === 2 ? 1.04 : 1;
      const y = d === 0 ? -16 : d === 1 ? -8 : d === 2 ? -3 : 0;
      el.style.transform = "translateY(" + y + "px) scale(" + s + ")";
      el.style.zIndex = String(10 - d);
    });
  }
  function bindDock() {
    const dock = document.getElementById("dock");
    if (!dock) return;
    dock.addEventListener("mousemove", (e) => {
      const items = Array.from(dock.querySelectorAll(".dock-item"));
      const i = items.findIndex((el) => el.contains(e.target) || el === e.target);
      scaleDock(i);
    });
    dock.addEventListener("mouseleave", () => scaleDock(-1));
  }
  const scenes = ["", "alt", "dusk", "mint", "aurora"];
  let si = 0;
  window.addEventListener("keydown", (e) => {
    if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "w") {
      e.preventDefault();
      const w = document.getElementById("wallpaper");
      if (!w) return;
      w.classList.remove("alt", "dusk", "mint", "aurora");
      si = (si + 1) % scenes.length;
      if (scenes[si]) w.classList.add(scenes[si]);
      if (typeof Desktop !== "undefined") Desktop.toast("Scene: " + (scenes[si] || "harbor"));
    }
  });
  const start = setInterval(() => {
    if (document.getElementById("dock")) {
      bindDock();
      clearInterval(start);
    }
  }, 400);
})();
