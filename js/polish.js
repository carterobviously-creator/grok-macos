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
          const lift = Math.max(0, 22 - d / 7);
          const scale = 1 + lift / 42;
          item.style.transform = "translateY(" + (-lift) + "px) scale(" + scale + ")";
        });
      });
      dock.addEventListener("mouseleave", () => {
        dock.querySelectorAll(".dock-item").forEach((item) => {
          item.style.transform = "";
        });
      });
    }
    const tint = document.getElementById("tint");
    const applyTint = (v) => {
      document.documentElement.style.setProperty("--glass-tint", String(v));
      document.documentElement.style.setProperty("--glass-blur", (28 + Number(v) * 16) + "px");
      document.body.classList.toggle("tinted", Number(v) > 0.45);
    };
    if (tint) {
      applyTint(tint.value);
      tint.addEventListener("input", (e) => applyTint(e.target.value));
    }
  };
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", onReady);
  else onReady();
})();
