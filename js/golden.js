/* Lumen Golden layer — extra apps, dock mag, richer Aura book. Original UI only. */
(function () {
  Desktop.labels.studio = "Studio";
  Desktop.labels.journal = "Journal";
  Desktop.labels.system = "System";
  Desktop.labels.news = "Brief";

  Icons.studio = function () {
    return this.svg(
      `<svg width="28" height="28" viewBox="0 0 28 28"><rect x="5" y="8" width="18" height="12" rx="2" fill="#fff"/><path d="M12 12l6 4-6 4z" fill="#7c3aed"/></svg>`,
      "linear-gradient(#c4b5fd,#6d28d9)"
    );
  };
  Icons.journal = function () {
    return this.svg(
      `<svg width="28" height="28" viewBox="0 0 28 28"><rect x="7" y="5" width="14" height="18" rx="2" fill="#fff"/><path d="M10 9h8M10 13h8M10 17h5" stroke="#0f766e"/></svg>`,
      "linear-gradient(#99f6e4,#0f766e)"
    );
  };
  Icons.system = function () {
    return this.svg(
      `<svg width="28" height="28" viewBox="0 0 28 28"><circle cx="14" cy="14" r="8" fill="none" stroke="#fff" stroke-width="2"/><path d="M14 8v6l4 2" stroke="#fff" stroke-width="2"/></svg>`,
      "linear-gradient(#94a3b8,#1e293b)"
    );
  };
  Icons.news = function () {
    return this.svg(
      `<svg width="28" height="28" viewBox="0 0 28 28"><rect x="5" y="6" width="18" height="16" rx="2" fill="#fff"/><path d="M8 10h12M8 14h8M8 18h10" stroke="#334155"/></svg>`,
      "linear-gradient(#e2e8f0,#64748b)"
    );
  };

  Apps.studio = function () {
    Windows.open("studio", "Studio", `<div class="app-pad">
      <p>Mock clip editor. Entertainment only.</p>
      <div style="height:160px;border-radius:12px;background:linear-gradient(120deg,#1e1b4b,#312e81);display:grid;place-items:center;color:#c4b5fd">Preview lane</div>
      <p style="margin-top:10px">Timeline: intro · cut · fade</p>
    </div>`);
  };
  Apps.journal = function () {
    const saved = localStorage.getItem("lumen-journal") || "Today I opened Lumen.";
    Windows.open("journal", "Journal", `<div class="app-pad">
      <textarea id="journal-box" style="width:100%;min-height:220px;border-radius:12px;padding:10px">` + saved + `</textarea>
    </div>`);
    setTimeout(() => {
      const box = document.getElementById("journal-box");
      if (box) box.oninput = () => localStorage.setItem("lumen-journal", box.value);
    }, 0);
  };
  Apps.system = function () {
    Windows.open("system", "System", `<div class="app-pad">
      <p><strong>Lumen Desktop</strong></p>
      <p>Build: Golden mock · browser only</p>
      <p>Helper: Aura phrase book + optional demo API</p>
      <p>Not affiliated with Apple. Original icons and wallpapers.</p>
    </div>`);
  };
  Apps.news = function () {
    Windows.open("news", "Brief", `<div class="app-pad">
      <article><h3>Harbor light</h3><p>Mock headline: glass tint slider now remembers last value.</p></article>
      <article><h3>Aura notes</h3><p>Say “remind me to stretch” or “open journal”.</p></article>
    </div>`);
  };

  AuraModel.book.greet.push("Golden layer online. Ask me to open Studio, Journal, or Brief.");
  AuraModel.phrases.push(["studio journal brief", "Those extra apps live in Launchpad."]);
  AuraModel.phrases.push(["golden gate tahoe", "This mock borrows the idea of tinted glass, not the real OS."]);

  const prevLocal = Aura.localReply.bind(Aura);
  Aura.localReply = function (text) {
    const q = (text || "").toLowerCase();
    if (/open journal|show journal/.test(q)) {
      Desktop.openApp("journal");
      return "Opening Journal.";
    }
    if (/open studio|show studio/.test(q)) {
      Desktop.openApp("studio");
      return "Opening Studio.";
    }
    if (/open brief|show news|open system/.test(q)) {
      const id = /system/.test(q) ? "system" : "news";
      Desktop.openApp(id);
      return "Opening " + Desktop.labels[id] + ".";
    }
    return prevLocal(text);
  };

  function magDock(e) {
    const dock = document.getElementById("dock");
    if (!dock) return;
    const items = [...dock.querySelectorAll(".dock-item")];
    items.forEach((btn) => {
      const r = btn.getBoundingClientRect();
      const cx = r.left + r.width / 2;
      const d = Math.abs(e.clientX - cx);
      const s = Math.max(1, 1.38 - d / 140);
      btn.style.transform = "translateY(" + ((s - 1) * -36) + "px) scale(" + s + ")";
    });
  }
  function resetDock() {
    document.querySelectorAll("#dock .dock-item").forEach((b) => {
      b.style.transform = "";
    });
  }

  const prevStart = Desktop.start.bind(Desktop);
  Desktop.start = function () {
    prevStart();
    const dock = document.getElementById("dock");
    if (dock) {
      dock.addEventListener("mousemove", magDock);
      dock.addEventListener("mouseleave", resetDock);
    }
    const tint = document.getElementById("tint");
    const saved = localStorage.getItem("lumen-tint");
    if (tint && saved != null) {
      tint.value = saved;
      document.body.classList.toggle("tinted", Number(saved) > 0.45);
    }
    if (tint) {
      tint.addEventListener("input", () => localStorage.setItem("lumen-tint", tint.value));
    }
    Desktop.toast("Lumen Golden layer ready · entertainment mock");
  };
})();
