(function refine() {
  function tickLock() {
    const t = document.getElementById("lock-time");
    const d = document.getElementById("lock-date");
    if (!t) return;
    const now = new Date();
    t.textContent = now.toLocaleTimeString([], { hour: "numeric", minute: "2-digit" });
    if (d) {
      d.textContent = now.toLocaleDateString(undefined, {
        weekday: "long", month: "long", day: "numeric"
      });
    }
  }
  tickLock();
  setInterval(tickLock, 1000);

  const scenes = ["", "alt", "dusk", "mint", "aurora", "lake"];
  let si = 0;
  document.addEventListener("keydown", (e) => {
    if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "w") {
      e.preventDefault();
      const wall = document.getElementById("wallpaper");
      if (!wall) return;
      si = (si + 1) % scenes.length;
      wall.className = scenes[si];
      if (typeof Desktop !== "undefined") Desktop.toast("Scene: " + (scenes[si] || "harbor"));
    }
  });

  const tint = document.getElementById("tint");
  if (tint) {
    tint.addEventListener("input", () => {
      document.body.classList.toggle("tinted", Number(tint.value) >= 0.5);
      document.body.classList.toggle("reduce-glass", Number(tint.value) >= 0.9);
    });
  }
})();
