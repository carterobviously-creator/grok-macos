/* Lumen 73 — further refinements for glass desktop mock. Original only. Not macOS/Apple/Siri. */
(function () {
  // Smoother dock magnification with better falloff
  const dock = document.getElementById("dock");
  if (dock) {
    dock.addEventListener("mousemove", (e) => {
      const items = [...dock.querySelectorAll(".dock-item")];
      const rect = dock.getBoundingClientRect();
      const x = e.clientX - rect.left;
      items.forEach((item) => {
        const itemRect = item.getBoundingClientRect();
        const itemX = itemRect.left + itemRect.width / 2 - rect.left;
        const dist = Math.abs(x - itemX);
        const scale = Math.max(1, 1.6 - Math.pow(dist / 100, 1.2));
        const lift = (scale - 1) * 22;
        item.style.transform = `translateY(-${lift}px) scale(${scale})`;
        item.style.transition = "transform 0.08s ease-out";
      });
    });
    dock.addEventListener("mouseleave", () => {
      dock.querySelectorAll(".dock-item").forEach((item) => {
        item.style.transform = "";
        item.style.transition = "transform 0.25s ease";
      });
    });
  }

  // Dynamic liquid glass with specular highlight simulation
  const style = document.createElement("style");
  style.textContent = `
    .glass {
      position: relative;
      overflow: hidden;
    }
    .glass::before {
      content: "";
      position: absolute;
      inset: 0;
      background: linear-gradient(135deg, rgba(255,255,255,0.25) 0%, transparent 40%, rgba(255,255,255,0.08) 100%);
      pointer-events: none;
      border-radius: inherit;
      opacity: var(--specular, 0.6);
    }
  `;
  document.head.appendChild(style);

  const tint = document.getElementById("tint");
  if (tint) {
    tint.addEventListener("input", (e) => {
      const v = Number(e.target.value);
      document.documentElement.style.setProperty("--glass-opacity", (0.1 + v * 0.4).toFixed(2));
      document.documentElement.style.setProperty("--glass-blur", (24 + v * 36) + "px");
      document.documentElement.style.setProperty("--specular", (0.3 + v * 0.7).toFixed(2));
      document.body.classList.toggle("tinted", v > 0.35);
    });
  }

  // Enhance Aura for more natural local responses + better AI fallback
  if (window.Aura) {
    const origLocal = Aura.localReply;
    Aura.localReply = function (text) {
      const base = origLocal.call(this, text);
      const q = text.toLowerCase();
      if (/weather|temperature|forecast/.test(q)) return "Mock weather: clear skies around 72°. For live data use a real weather app.";
      if (/battery|power/.test(q)) return "Battery mock shows " + (AuraModel.facts.battery || "84%") + ". This is not a real system.";
      if (/volume|sound|mute/.test(q)) return "Adjust sound in Control Center. Volume slider is mock.";
      return base;
    };

    // Prefer cloud for open-ended questions
    Aura.shouldStayLocal = function (q) {
      return /open |launch |start |show |what time|calculate|mission|help\\b|lock|remind|note /.test(q.toLowerCase());
    };
  }

  // Add more phrases
  if (window.AuraModel && AuraModel.phrases) {
    AuraModel.phrases.push(
      ["macos", "This is Lumen, an original browser desktop mock for entertainment. Not macOS."],
      ["liquid glass", "Liquid Glass slider in Control Center adjusts blur, opacity, and specular highlight on original CSS."],
      ["siri", "Aura is the local + optional demo helper here. Not Siri."],
      ["app store", "Open Gallery for the mock catalog. Install adds dock shortcuts."],
      ["intelligence", "Tiny local phrase model loads at boot. Optional public text demo for longer answers."]
    );
  }

  // Better window dragging feel (if windows exist)
  document.addEventListener("mousedown", (e) => {
    const title = e.target.closest(".window-title, .win-title");
    if (!title) return;
    const win = title.closest(".window, .win");
    if (!win) return;
    const startX = e.clientX - win.offsetLeft;
    const startY = e.clientY - win.offsetTop;
    function move(ev) {
      win.style.left = (ev.clientX - startX) + "px";
      win.style.top = (ev.clientY - startY) + "px";
    }
    function up() {
      document.removeEventListener("mousemove", move);
      document.removeEventListener("mouseup", up);
    }
    document.addEventListener("mousemove", move);
    document.addEventListener("mouseup", up);
  });

  console.log("Lumen 73 refinements loaded — original mock only.");
})();
