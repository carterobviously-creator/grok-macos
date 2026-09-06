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
      const s = d === 0 ? 1.28 : d === 1 ? 1.12 : d === 2 ? 1.04 : 1;
      const y = d === 0 ? -16 : d === 1 ? -8 : d === 2 ? -3 : 0;
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
})();
