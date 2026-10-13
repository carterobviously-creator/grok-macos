/* Lumen 75 + cleanup — fix overlaps, disable voice, keep glass polish.
   Not macOS / Siri / Apple. Entertainment mock only. */
(function () {
  if (typeof Desktop === "undefined") return;

  // ---- Disable Aura voice completely (user request) ----
  if (typeof Aura !== "undefined") {
    Aura.speak = function () {}; // no-op, never speaks
  }
  // Also never auto-speak from mic
  const origAsk = Desktop.askAura;
  Desktop.askAura = async function (text, speak) {
    return origAsk.call(this, text, false); // force no speak
  };

  // ---- Clean up overlapping version badges / floating labels ----
  function cleanupClutter() {
    // Hide common version/status badges that stack on each other
    const selectors = [
      '[class*="lumen-badge"]',
      '[class*="version-badge"]',
      '[id*="lumen-badge"]',
      '[id*="status-badge"]',
      '.lumen-toast-version',
      '.dev-badge',
      '.build-tag'
    ];
    selectors.forEach((sel) => {
      document.querySelectorAll(sel).forEach((el) => {
        el.style.display = "none";
        el.remove();
      });
    });

    // Remove any fixed/absolute elements that look like version labels
    // (small rounded pills with "Lumen XX" text that accumulate)
    document.querySelectorAll("body *").forEach((el) => {
      if (el === document.body || el === document.documentElement) return;
      const style = window.getComputedStyle(el);
      if ((style.position === "fixed" || style.position === "absolute") &&
          el.textContent &&
          /Lumen\s*\d+|original mock|Aura local|desktop mock/i.test(el.textContent) &&
          el.offsetWidth < 320 && el.offsetHeight < 60 &&
          !el.closest("#widgets") &&
          !el.closest("#menubar") &&
          !el.closest("#dock") &&
          !el.closest("#assistant") &&
          !el.closest("#toast") &&
          !el.closest("#control-center") &&
          !el.closest("#notify-drawer") &&
          !el.closest("#spotlight") &&
          !el.closest("#launchpad") &&
          !el.closest("#window-layer")) {
        el.style.display = "none";
        try { el.remove(); } catch (e) {}
      }
    });
  }

  // Run cleanup after start and periodically for a short time
  const origStart = Desktop.start;
  Desktop.start = function () {
    origStart.call(this);
    setTimeout(cleanupClutter, 200);
    setTimeout(cleanupClutter, 800);
    setTimeout(cleanupClutter, 2000);
  };

  // Also inject CSS to force-hide leftover badges
  const hideStyle = document.createElement("style");
  hideStyle.textContent = `
    /* Hide accumulated version / status pills that cause overlap */
    body > div:not(#boot-screen):not(#lock-screen):not(#desktop),
    #desktop > div[style*="position: fixed"],
    #desktop > div[style*="position: absolute"] {
      /* leave core UI alone */
    }
    .lumen-badge, .version-badge, .dev-badge, .build-tag,
    [class*="lumen-"][class*="badge"],
    [id^="lumen-"][id$="-badge"] {
      display: none !important;
      visibility: hidden !important;
      pointer-events: none !important;
    }
    /* Keep only one clean widget */
    #widgets {
      z-index: 8;
    }
    /* Prevent dock and desk icons from stacking weirdly */
    #dock { z-index: 50; }
    #desk-icons { z-index: 8; }
  `;
  document.head.appendChild(hideStyle);

  // ---- Dock magnification (kept) ----
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

  // Soft Aura indicator (no voice)
  const style = document.createElement("style");
  style.textContent = `
    #assistant header strong::before {
      content: "";
      display: inline-block;
      width: 8px; height: 8px;
      border-radius: 50%;
      background: radial-gradient(circle, #a5b4fc, #4f46e5);
      margin-right: 6px;
      vertical-align: middle;
    }
  `;
  document.head.appendChild(style);

  console.log("Lumen 75 cleanup loaded — voice disabled, clutter removed.");
})();
