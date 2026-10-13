/* Lumen 76 polish — entertainment mock only */
(function() {
  // Enhanced dock magnification with neighbors
  const dock = document.getElementById("dock");
  if (dock) {
    dock.addEventListener("mousemove", (e) => {
      const items = [...dock.querySelectorAll(".dock-item")];
      const rect = dock.getBoundingClientRect();
      const x = e.clientX - rect.left;
      items.forEach((item, i) => {
        const itemX = (i + 0.5) * (rect.width / items.length);
        const dist = Math.abs(x - itemX);
        const scale = Math.max(1, 1.35 - dist / 120);
        item.style.transform = `scale(${scale}) translateY(${- (scale - 1) * 12}px)`;
      });
    });
    dock.addEventListener("mouseleave", () => {
      dock.querySelectorAll(".dock-item").forEach(item => {
        item.style.transform = "";
      });
    });
  }

  // Liquid glass intensity slider already exists; ensure it works
  const tint = document.getElementById("tint");
  if (tint) {
    tint.addEventListener("input", () => {
      document.documentElement.style.setProperty("--glass-opacity", tint.value);
      document.documentElement.style.setProperty("--specular", 0.6 + tint.value * 0.6);
    });
  }

  console.log("Lumen 76 glass refinements loaded — entertainment mock");
})();
