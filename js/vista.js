/* Lumen Vista extras — original mock apps + Aura helpers */
(function () {
  const extraApps = [
    { id: "journal", name: "Journal", icon: "writer", open: openJournal },
    { id: "lab", name: "Lab", icon: "activity", open: openLab },
    { id: "vault", name: "Vault", icon: "settings", open: openVault }
  ];

  function waitDesktop() {
    if (typeof Desktop === "undefined" || !Desktop.openApp) {
      setTimeout(waitDesktop, 200);
      return;
    }
    extraApps.forEach((app) => {
      if (!Desktop.apps) return;
      if (!Desktop.apps.find((a) => a.id === app.id)) {
        Desktop.apps.push({
          id: app.id,
          name: app.name,
          icon: Icons[app.icon] ? Icons[app.icon]() : Icons.notes(),
          open: app.open
        });
      }
    });
    hookAura();
    sceneHint();
  }

  function pane(title, html) {
    if (typeof Windows !== "undefined" && Windows.open) {
      Windows.open(title, html);
      return;
    }
    if (Desktop.openWindow) Desktop.openWindow(title, html);
  }

  function openJournal() {
    pane(
      "Journal",
      `<div class="app-pad">
        <p class="vista-chip">Local only</p>
        <textarea id="journal-box" style="width:100%;min-height:220px;border-radius:12px;padding:12px;border:0;background:rgba(255,255,255,.55)">Today in Lumen…</textarea>
      </div>`
    );
  }

  function openLab() {
    pane(
      "Lab",
      `<div class="app-pad">
        <p>Glass lab. Drag the tint in Control Center. Scene keys: Ctrl/Cmd+W.</p>
        <button type="button" id="lab-pulse">Pulse wallpaper</button>
      </div>`
    );
    setTimeout(() => {
      const b = document.getElementById("lab-pulse");
      if (b) b.onclick = () => {
        const w = document.getElementById("wallpaper");
        if (w) w.style.filter = w.style.filter ? "" : "saturate(1.3) contrast(1.08)";
      };
    }, 50);
  }

  function openVault() {
    pane(
      "Vault",
      `<div class="app-pad">
        <p>Mock password cards. Nothing is stored remotely.</p>
        <ul><li>Harbor Wi-Fi · ••••••••</li><li>Notes lock · ••••</li></ul>
      </div>`
    );
  }

  function hookAura() {
    window.VistaAura = {
      extra(q) {
        const s = String(q || "").toLowerCase();
        if (s.includes("journal")) {
          if (typeof Desktop !== "undefined") Desktop.openApp("journal");
          return "Opening Journal.";
        }
        if (s.includes("lab")) {
          if (typeof Desktop !== "undefined") Desktop.openApp("lab");
          return "Lab is a glass playground. Try pulsing the wallpaper.";
        }
        if (s.includes("vault")) {
          if (typeof Desktop !== "undefined") Desktop.openApp("vault");
          return "Opening Vault.";
        }
        if (s.includes("who are you") || s.includes("siri"))
          return "I am Aura, a local Lumen helper. Not Siri and not an Apple product.";
        if (s.includes("weather")) return "Mock forecast: clear, 72, light breeze over the harbor scene.";
        if (s.includes("time")) return "Local clock is in the menu bar and lock screen.";
        return null;
      }
    };
  }

  function sceneHint() {
    const n = document.getElementById("notify-drawer");
    if (n && !n.dataset.vista) {
      n.dataset.vista = "1";
      n.insertAdjacentHTML(
        "beforeend",
        "<p>Vista extras: Journal, Lab, Vault. Aura stays a local phrase helper.</p>"
      );
    }
  }

  waitDesktop();
})();
