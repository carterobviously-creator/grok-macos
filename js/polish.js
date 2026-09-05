(function polish() {
  const onReady = () => {
    const dock = document.getElementById("dock");
    if (dock) {
      dock.addEventListener("mousemove", (e) => {
        const items = [...dock.querySelectorAll(".dock-item")];
        items.forEach((item) => {
          const r = item.getBoundingClientRect();
          const cx = r.left + r.width / 2;
          const d = Math.abs(e.clientX - cx);
          const lift = Math.max(0, 18 - d / 8);
          const scale = 1 + lift / 50;
          item.style.transform = "translateY(" + (-lift) + "px) scale(" + scale + ")";
        });
      });
      dock.addEventListener("mouseleave", () => {
        dock.querySelectorAll(".dock-item").forEach((item) => {
          item.style.transform = "";
        });
      });
    }
    window.addEventListener("keydown", (e) => {
      const meta = e.metaKey || e.ctrlKey;
      if (meta && e.code === "Space") {
        e.preventDefault();
        Desktop.openApp("aura");
        document.getElementById("aura-input")?.focus();
      }
      if (meta && e.key.toLowerCase() === "l") {
        e.preventDefault();
        document.getElementById("desktop").classList.add("hidden");
        document.getElementById("lock-screen").classList.remove("hidden");
      }
    });
  };
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", onReady);
  else onReady();
})();
