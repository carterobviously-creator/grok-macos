/* Lumen 72 — entertainment refinements. Original assets only. Not macOS / Apple / Siri. */
(function () {
  // Stronger neighbor dock magnification (macOS-like feel, original implementation)
  const dock = document.getElementById("dock");
  if (dock) {
    dock.addEventListener("mousemove", (e) => {
      const items = [...dock.querySelectorAll(".dock-item")];
      const rect = dock.getBoundingClientRect();
      const x = e.clientX - rect.left;
      items.forEach((item, i) => {
        const itemRect = item.getBoundingClientRect();
        const itemX = itemRect.left + itemRect.width / 2 - rect.left;
        const dist = Math.abs(x - itemX);
        const scale = Math.max(1, 1.45 - dist / 120);
        item.style.transform = `translateY(${(1 - scale) * 18}px) scale(${scale})`;
      });
    });
    dock.addEventListener("mouseleave", () => {
      dock.querySelectorAll(".dock-item").forEach((item) => {
        item.style.transform = "";
      });
    });
  }

  // Enhanced liquid glass specular + dynamic opacity from slider
  const tint = document.getElementById("tint");
  if (tint) {
    tint.addEventListener("input", (e) => {
      const v = Number(e.target.value);
      document.documentElement.style.setProperty("--glass-opacity", (0.12 + v * 0.35).toFixed(2));
      document.documentElement.style.setProperty("--glass-blur", (28 + v * 30) + "px");
      document.body.classList.toggle("tinted", v > 0.4);
    });
  }

  // Patch Aura cloud prompt for more helpful, contextual replies (still mock)
  if (window.Aura && Aura.cloudReply) {
    const orig = Aura.cloudReply;
    Aura.cloudReply = async function (text) {
      const prompt = "You are Aura, a concise friendly assistant in Lumen (browser desktop entertainment mock, not affiliated with Apple). Never claim to be Siri, Apple Intelligence, or macOS. Answer helpfully in 1-3 short sentences. If asked about the system, remind the user it is a fan mock with original icons. User: " + text;
      const url = "https://text.pollinations.ai/" + encodeURIComponent(prompt);
      const ctrl = new AbortController();
      const t = setTimeout(() => ctrl.abort(), 14000);
      try {
        const r = await fetch(url, { signal: ctrl.signal });
        clearTimeout(t);
        if (!r.ok) return null;
        const out = (await r.text()).trim();
        return out ? out.slice(0, 800) : null;
      } catch (e) {
        clearTimeout(t);
        return null;
      }
    };
  }

  // Extra local intelligence phrases
  if (window.AuraModel && AuraModel.phrases) {
    AuraModel.phrases.push(
      ["apple intelligence", "Aura uses a tiny local phrase book plus an optional public text demo. It is not Apple Intelligence."],
      ["liquid glass", "Control Center has a Liquid Glass slider that adjusts blur and specular highlight on original CSS surfaces."],
      ["boot model", "A tiny local phrase model loads during the boot screen for offline replies."],
      ["app store", "Gallery is the mock catalog. Get buttons install shortcuts on the dock."],
      ["siri", "This uses Aura, a local + optional demo helper. Not Siri."]
    );
  }

  // Make App Store / Gallery cards more complete on open
  const origStore = window.Apps && Apps.store;
  if (origStore) {
    Apps.store = function () {
      origStore();
      setTimeout(() => {
        const grid = document.querySelector(".store-grid");
        if (grid) {
          grid.innerHTML += '<div class="store-card"><strong>Aura</strong><p>Helper with local model + optional AI demo.</p><button data-app="aura">Open</button></div>';
          grid.querySelectorAll("button[data-app]").forEach((b) => {
            if (!b.onclick) b.onclick = () => Desktop.openApp(b.dataset.app);
          });
        }
      }, 50);
    };
  }

  // Boot status more detailed
  const status = document.getElementById("boot-status");
  if (status) {
    const extra = ["Indexing original icons…", "Warming specular highlights…", "Ready · Aura model loaded"];
    let i = 0;
    const iv = setInterval(() => {
      if (i < extra.length && status.textContent.includes("Ready") === false) {
        // already handled by boot.js
      }
      i++;
      if (i > 8) clearInterval(iv);
    }, 400);
  }

  console.log("Lumen 72 enhancements loaded — entertainment mock, original assets only.");
})();