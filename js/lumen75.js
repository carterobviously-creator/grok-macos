/* Lumen 75 cleanup — remove overlapping badges, disable voice.
   Entertainment mock only. Not macOS. */
(function () {
  if (typeof Desktop === "undefined") return;

  // ---- Voice completely disabled ----
  if (typeof Aura !== "undefined") {
    Aura.speak = function () {};
  }
  const origAsk = Desktop.askAura;
  Desktop.askAura = async function (text) {
    return origAsk.call(this, text, false);
  };

  // ---- Aggressive clutter remover ----
  function isClutter(el) {
    if (!el || !el.textContent) return false;
    if (el.closest("#widgets") || el.closest("#menubar") || el.closest("#dock") ||
        el.closest("#assistant") || el.closest("#toast") || el.closest("#control-center") ||
        el.closest("#notify-drawer") || el.closest("#spotlight") || el.closest("#launchpad") ||
        el.closest("#window-layer") || el.closest("#desk-icons") || el.closest("#mission") ||
        el.closest("#ctx") || el.id === "wallpaper" || el.id === "desktop") {
      return false;
    }
    const t = el.textContent.trim();
    if (t.length > 80) return false;
    return /Lumen\s*\d+|original mock|Aura local|Glass mock|phrase helper|ready ·|desktop mock|original icons/i.test(t);
  }

  function cleanupClutter() {
    // Walk all elements and remove clutter pills
    const all = document.querySelectorAll("#desktop *");
    all.forEach((el) => {
      if (isClutter(el)) {
        el.style.display = "none";
        el.style.visibility = "hidden";
        el.style.opacity = "0";
        el.style.pointerEvents = "none";
        try { el.remove(); } catch (e) {}
      }
    });
    // Also check direct children of body
    document.querySelectorAll("body > div").forEach((el) => {
      if (el.id !== "boot-screen" && el.id !== "lock-screen" && el.id !== "desktop") {
        el.style.display = "none";
        try { el.remove(); } catch (e) {}
      }
    });
  }

  const origStart = Desktop.start;
  Desktop.start = function () {
    origStart.call(this);
    setTimeout(cleanupClutter, 100);
    setTimeout(cleanupClutter, 500);
    setTimeout(cleanupClutter, 1500);
    setTimeout(cleanupClutter, 3000);
    // Keep cleaning for a bit in case late scripts inject more
    let n = 0;
    const iv = setInterval(() => {
      cleanupClutter();
      n++;
      if (n > 8) clearInterval(iv);
    }, 800);
  };

  // CSS hammer
  const hideStyle = document.createElement("style");
  hideStyle.textContent = `
    /* Force-hide version / status floating pills */
    .lumen-badge, .version-badge, .dev-badge, .build-tag,
    [class*="lumen-"][class*="badge"],
    [id*="lumen-"][id*="badge"],
    [class*="status-pill"], [class*="ready-badge"] {
      display: none !important;
      visibility: hidden !important;
      opacity: 0 !important;
      pointer-events: none !important;
      height: 0 !important; width: 0 !important; overflow: hidden !important;
    }
    #widgets { z-index: 8; }
    #dock { z-index: 50; }
    #desk-icons { z-index: 8; }
    #assistant { z-index: 60; }
  `;
  document.head.appendChild(hideStyle);

  // Dock magnification
  const originalRender = Desktop.renderDock;
  Desktop.renderDock = function () {
    originalRender.call(this);
    const items = document.querySelectorAll(".dock-item");
    items.forEach((item, i) => {
      item.addEventListener("mouseenter", () => {
        items.forEach((it, j) => {
          const dist = Math.abs(i - j);
          const scale = dist === 0 ? 1.35 : dist === 1 ? 1.12 : 1;
          const y = dist === 0 ? -8 : dist === 1 ? -3 : 0;
          it.style.transform = `scale(${scale}) translateY(${y}px)`;
        });
      });
      item.addEventListener("mouseleave", () => {
        items.forEach((it) => { it.style.transform = ""; });
      });
    });
  };

  // Wallpaper cycle
  const walls = ["", "alt", "dusk", "mint"];
  let wallIdx = 0;
  document.addEventListener("keydown", (e) => {
    if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "w") {
      e.preventDefault();
      wallIdx = (wallIdx + 1) % walls.length;
      const w = document.getElementById("wallpaper");
      if (w) {
        w.className = walls[wallIdx];
        Desktop.toast("Wallpaper: " + (walls[wallIdx] || "default"));
      }
    }
  });

  console.log("Lumen 75 cleanup — voice off, clutter removed.");
})();
