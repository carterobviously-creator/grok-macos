/* Lumen 75 enhancements — original entertainment mock refinements.
   Not macOS / Siri / Apple. */
(function () {
  if (typeof Desktop === "undefined") return;

  // Enhanced dock magnification with neighbor scaling
  const originalRender = Desktop.renderDock;
  Desktop.renderDock = function () {
    originalRender.call(this);
    const items = document.querySelectorAll(".dock-item");
    items.forEach((item, i) => {
      item.addEventListener("mouseenter", () => {
        items.forEach((it, j) => {
          const dist = Math.abs(i - j);
          const scale = dist === 0 ? 1.4 : dist === 1 ? 1.15 : 1;
          const y = dist === 0 ? -10 : dist === 1 ? -4 : 0;
          it.style.transform = `scale(${scale}) translateY(${y}px)`;
        });
      });
      item.addEventListener("mouseleave", () => {
        items.forEach((it) => { it.style.transform = ""; });
      });
    });
  };

  // Wallpaper cycle with original scenes
  const walls = ["", "alt", "dusk", "mint"];
  let wallIdx = 0;
  document.addEventListener("keydown", (e) => {
    if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "w") {
      e.preventDefault();
      wallIdx = (wallIdx + 1) % walls.length;
      const w = document.getElementById("wallpaper");
      w.className = walls[wallIdx];
      Desktop.toast("Wallpaper: " + (walls[wallIdx] || "default"));
    }
  });

  // Better Aura greeting on unlock already handled; add orb pulse
  const style = document.createElement("style");
  style.textContent = `
    #assistant header strong::before {
      content: "";
      display: inline-block;
      width: 10px; height: 10px;
      border-radius: 50%;
      background: radial-gradient(circle, #a5b4fc, #4f46e5);
      margin-right: 6px;
      animation: auraPulse 1.8s infinite;
    }
    @keyframes auraPulse {
      0%, 100% { transform: scale(1); opacity: 1; }
      50% { transform: scale(1.3); opacity: 0.7; }
    }
  `;
  document.head.appendChild(style);

  // Extra Aura local phrases
  const origLocal = Aura.localReply;
  Aura.localReply = function (text) {
    const q = text.toLowerCase();
    if (/weather|temp/.test(q)) return "Mock conditions: clear skies, 72°. This is not live weather.";
    if (/battery|power/.test(q)) return "Battery mock at 84%. Charging simulation available in Settings.";
    if (/screenshot|capture/.test(q)) return "Screenshot mock ready. In a real system this would capture the screen.";
    return origLocal.call(this, text);
  };

  console.log("Lumen 75 enhancements loaded — entertainment mock only.");
})();
