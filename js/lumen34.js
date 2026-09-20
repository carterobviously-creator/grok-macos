/* Lumen 34 — extra local helper, original icons only */
(function () {
  const extraPhrases = [
    ["lock screen", "Press Command-L or Control-L to lock."],
    ["control center", "Click the Control Center button in the menu bar."],
    ["spotlight search", "Press Command-K or Control-K."],
    ["launchpad apps", "Press F4 or open Launch from the dock."],
    ["mission control", "Press F3 to peek open windows."],
    ["write note", "Say note plus your text, or open Notes."],
    ["play music", "Opening Music."],
    ["dark glass", "Glass tint lives in Control Center."]
  ];

  if (window.AuraModel && Array.isArray(AuraModel.phrases)) {
    extraPhrases.forEach((p) => AuraModel.phrases.push(p));
    AuraModel.book.greet.push("Aura 34 phrase book loaded. Still a local helper, not a product AI.");
  }

  const extraLabels = {
    studio: "Studio",
    journal: "Journal",
    timer: "Timer",
    ledger: "Ledger"
  };
  if (window.Desktop && Desktop.labels) {
    Object.assign(Desktop.labels, extraLabels);
  }

  if (window.Icons) {
    Icons.studio = function () {
      return this.svg('<svg width="28" height="28" viewBox="0 0 28 28"><rect x="6" y="8" width="16" height="12" rx="2" fill="#fff"/><circle cx="14" cy="14" r="3" fill="#7c3aed"/></svg>', "linear-gradient(#c4b5fd,#6d28d9)");
    };
    Icons.journal = function () {
      return this.svg('<svg width="28" height="28" viewBox="0 0 28 28"><rect x="7" y="5" width="14" height="18" rx="2" fill="#fff"/><path d="M10 9h8M10 13h8" stroke="#64748b"/></svg>', "linear-gradient(#fda4af,#fb7185)");
    };
    Icons.timer = function () {
      return this.svg('<svg width="28" height="28" viewBox="0 0 28 28"><circle cx="14" cy="15" r="8" fill="#fff"/><path d="M14 15V10" stroke="#0f172a"/></svg>', "linear-gradient(#fdba74,#ea580c)");
    };
    Icons.ledger = function () {
      return this.svg('<svg width="28" height="28" viewBox="0 0 28 28"><rect x="6" y="6" width="16" height="16" rx="2" fill="#fff"/><path d="M9 12h10M9 16h7" stroke="#16a34a"/></svg>', "linear-gradient(#86efac,#15803d)");
    };
  }

  if (window.Apps) {
    Apps.studio = function () {
      Windows.open("studio", "Studio", "<div class='lumen34-card'><p>Mock clip board. Drag is pretend. Entertainment only.</p><button id='st-ping'>Mark take</button><p id='st-log'></p></div>");
      const b = document.getElementById("st-ping");
      if (b) b.onclick = () => {
        const log = document.getElementById("st-log");
        if (log) log.textContent = "Take marked at " + new Date().toLocaleTimeString();
      };
    };
    Apps.journal = function () {
      const prev = localStorage.getItem("lumen-journal") || "";
      Windows.open("journal", "Journal", "<textarea id='jr-box' style='width:100%;height:220px;border:0;background:transparent;color:inherit'>" + prev.replace(/</g, "&lt;") + "</textarea>");
      const box = document.getElementById("jr-box");
      if (box) box.oninput = () => localStorage.setItem("lumen-journal", box.value);
    };
    Apps.timer = function () {
      Windows.open("timer", "Timer", "<div class='lumen34-card'><strong id='tm-n'>25:00</strong><br><button id='tm-go'>Start 25 min mock</button></div>");
      let left = 25 * 60, h;
      const go = document.getElementById("tm-go");
      if (go) go.onclick = () => {
        clearInterval(h);
        h = setInterval(() => {
          left = Math.max(0, left - 1);
          const n = document.getElementById("tm-n");
          if (n) n.textContent = String(Math.floor(left / 60)).padStart(2, "0") + ":" + String(left % 60).padStart(2, "0");
          if (!left) clearInterval(h);
        }, 1000);
      };
    };
    Apps.ledger = function () {
      Windows.open("ledger", "Ledger", "<div class='lumen34-card'><p>Mock balances. Not real money.</p><p>Harbor checking · 1,240</p><p>Spark savings · 860</p></div>");
    };
  }

  const oldLocal = window.Aura && Aura.localReply;
  if (oldLocal) {
    Aura.localReply = function (text) {
      const q = String(text || "").toLowerCase();
      if (/open studio/.test(q)) { Desktop.openApp("studio"); return "Opening Studio."; }
      if (/open journal/.test(q)) { Desktop.openApp("journal"); return "Opening Journal."; }
      if (/open timer|start timer/.test(q)) { Desktop.openApp("timer"); return "Opening Timer."; }
      if (/open ledger/.test(q)) { Desktop.openApp("ledger"); return "Opening Ledger."; }
      if (/who made lumen|who built/.test(q)) return "Lumen is a fan-made browser mock. Aura is a local phrase helper with an optional public text demo.";
      return oldLocal.call(Aura, text);
    };
  }

  function chips() {
    const log = document.getElementById("aura-log");
    if (!log || log.dataset.lumen34) return;
    log.dataset.lumen34 = "1";
    const row = document.createElement("div");
    row.className = "lumen34-chiprow";
    ["open notes", "open timer", "what time is it", "help", "tell a joke"].forEach((c) => {
      const b = document.createElement("button");
      b.type = "button";
      b.className = "lumen34-chip";
      b.textContent = c;
      b.onclick = () => {
        const input = document.getElementById("aura-input");
        const form = document.getElementById("aura-form");
        if (input) input.value = c;
        if (form) form.dispatchEvent(new Event("submit", { cancelable: true }));
      };
      row.appendChild(b);
    });
    log.prepend(row);
  }

  const dock = document.getElementById("dock");
  if (dock) dock.classList.add("lumen34-glow");
  const asst = document.getElementById("assistant");
  if (asst) {
    asst.classList.add("lumen34-pulse");
    const h = asst.querySelector("header strong");
    if (h && !h.querySelector(".lumen34-orb")) {
      const orb = document.createElement("span");
      orb.className = "lumen34-orb";
      h.prepend(orb);
    }
  }

  document.addEventListener("click", () => setTimeout(chips, 40));
  setTimeout(chips, 800);
})();
