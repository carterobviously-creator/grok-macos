/* Extra interaction polish for Lumen. Original UI only. */
(function () {
  function scaleDock(active) {
    const items = Array.from(document.querySelectorAll("#dock .dock-item"));
    items.forEach((el, i) => {
      if (active == null) {
        el.style.transform = "";
        return;
      }
      const d = Math.abs(i - active);
      const s = d === 0 ? 1.32 : d === 1 ? 1.16 : d === 2 ? 1.06 : 1;
      const y = d === 0 ? -18 : d === 1 ? -10 : d === 2 ? -4 : 0;
      el.style.transform = "translateY(" + y + "px) scale(" + s + ")";
    });
  }
  document.addEventListener("mouseover", (e) => {
    const item = e.target.closest("#dock .dock-item");
    if (!item) return;
    const items = Array.from(document.querySelectorAll("#dock .dock-item"));
    scaleDock(items.indexOf(item));
  });
  document.addEventListener("mouseout", (e) => {
    if (e.target.closest("#dock") && !e.relatedTarget?.closest("#dock")) scaleDock(null);
  });

  document.addEventListener("keydown", (e) => {
    if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "w") {
      const wall = document.getElementById("wallpaper");
      if (!wall) return;
      const modes = ["", "alt", "dusk", "mint"];
      const cur = modes.find((m) => m && wall.classList.contains(m)) || "";
      const next = modes[(modes.indexOf(cur) + 1) % modes.length];
      wall.classList.remove("alt", "dusk", "mint");
      if (next) wall.classList.add(next);
      if (typeof Desktop !== "undefined") Desktop.toast("Wallpaper scene: " + (next || "default"));
    }
  });
})();
