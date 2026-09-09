(function () {
  const dock = document.getElementById("dock");
  if (!dock) return;
  dock.addEventListener("mousemove", (e) => {
    const items = [...dock.querySelectorAll(".dock-item")];
    items.forEach((item) => {
      const r = item.getBoundingClientRect();
      const mid = r.left + r.width / 2;
      const d = Math.abs(e.clientX - mid);
      item.classList.toggle("near", d < 70 && d > 1);
    });
  });
  dock.addEventListener("mouseleave", () => {
    dock.querySelectorAll(".dock-item.near").forEach((el) => el.classList.remove("near"));
  });
  const scenes = ["", "alt", "dusk", "mint", "aurora"];
  let si = 0;
  window.addEventListener("keydown", (e) => {
    if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "w") {
      e.preventDefault();
      const wall = document.getElementById("wallpaper");
      if (!wall) return;
      wall.classList.remove("alt", "dusk", "mint", "aurora");
      si = (si + 1) % scenes.length;
      if (scenes[si]) wall.classList.add(scenes[si]);
      if (typeof Desktop !== "undefined") Desktop.toast("Scene: " + (scenes[si] || "harbor"));
    }
  });
})();
