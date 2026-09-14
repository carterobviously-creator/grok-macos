(function () {
  const wall = document.getElementById("wallpaper");
  const dock = document.getElementById("dock");
  if (dock) {
    dock.addEventListener("mousemove", (e) => {
      const items = [...dock.querySelectorAll(".dock-item")];
      items.forEach((item) => {
        const r = item.getBoundingClientRect();
        const mid = r.left + r.width / 2;
        const dist = Math.abs(e.clientX - mid);
        const s = Math.max(1, 1.38 - dist / 140);
        const y = Math.max(0, (s - 1) * 28);
        item.style.transform = "translateY(" + -y + "px) scale(" + s + ")";
      });
    });
    dock.addEventListener("mouseleave", () => {
      dock.querySelectorAll(".dock-item").forEach((item) => {
        item.style.transform = "";
      });
    });
  }
  const unlock = document.getElementById("unlock-btn");
  if (unlock) {
    unlock.addEventListener("click", () => {
      document.getElementById("lock-screen").classList.add("hidden");
      const d = document.getElementById("desktop");
      d.classList.remove("hidden");
      d.classList.add("desktop-enter");
    });
  }
  window.addEventListener("keydown", (e) => {
    if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "w") {
      e.preventDefault();
      if (!wall) return;
      const scenes = ["", "alt", "dusk", "mint"];
      const cur = scenes.find((s) => s && wall.classList.contains(s)) || "";
      wall.classList.remove("alt", "dusk", "mint");
      const next = scenes[(scenes.indexOf(cur) + 1) % scenes.length];
      if (next) wall.classList.add(next);
      if (typeof Desktop !== "undefined") Desktop.toast("Scene: " + (next || "default"));
    }
    if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "j") {
      e.preventDefault();
      if (typeof Desktop !== "undefined") Desktop.openApp("aura");
    }
  });
  if (typeof Aura !== "undefined") {
    const old = Aura.localReply.bind(Aura);
    Aura.localReply = function (text) {
      const q = text.toLowerCase();
      if (/dark|night mode/.test(q)) {
        document.body.classList.add("tinted");
        return "Switched glass tint on.";
      }
      if (/light mode/.test(q)) {
        document.body.classList.remove("tinted");
        return "Switched glass tint off.";
      }
      if (/lock/.test(q) && typeof Desktop !== "undefined") {
        document.getElementById("desktop").classList.add("hidden");
        document.getElementById("lock-screen").classList.remove("hidden");
        return "Locked the desktop.";
      }
      return old(text);
    };
  }
})();
