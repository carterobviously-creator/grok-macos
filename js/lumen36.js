/* Lumen 36 — more original mock apps + Aura phrases. Not Apple. */
(function () {
  if (window.AuraModel && Array.isArray(AuraModel.phrases)) {
    AuraModel.phrases.push(
      ["open beacon", "Opening Beacon."],
      ["open ledger", "Opening Ledger."],
      ["open tide", "Opening Tide."],
      ["open spark", "Opening Spark Pad."],
      ["dark mode", "Use Control Center tiles and the glass tint slider."],
      ["lock screen", "Press Command-L or Control-L to lock."]
    );
    if (AuraModel.book && AuraModel.book.greet) {
      AuraModel.book.greet.push("Aura 36 ready. Local phrase book loaded at boot.");
    }
    if (AuraModel.book && AuraModel.book.help) {
      AuraModel.book.help.push("Try: open beacon, open notes, what time is it, remind me to stretch, what is 9 times 7.");
    }
  }

  if (window.Icons) {
    Icons.beacon = function () {
      return this.svg('<svg width="28" height="28" viewBox="0 0 28 28"><circle cx="14" cy="14" r="4" fill="#fff"/><path d="M14 6v3M14 19v3M6 14h3M19 14h3" stroke="#fff" stroke-width="2"/></svg>', "linear-gradient(#38bdf8,#1d4ed8)");
    };
    Icons.ledger = function () {
      return this.svg('<svg width="28" height="28" viewBox="0 0 28 28"><rect x="7" y="6" width="14" height="16" rx="2" fill="#fff"/><path d="M10 11h8M10 15h6" stroke="#0f172a"/></svg>', "linear-gradient(#86efac,#047857)");
    };
    Icons.tide = function () {
      return this.svg('<svg width="28" height="28" viewBox="0 0 28 28"><path d="M5 17c3-4 6-4 9 0s6 4 9 0" fill="none" stroke="#fff" stroke-width="2"/></svg>', "linear-gradient(#67e8f9,#0e7490)");
    };
  }

  if (window.Desktop && Desktop.labels) {
    Object.assign(Desktop.labels, { beacon: "Beacon", ledger: "Ledger", tide: "Tide" });
  }

  if (window.Apps) {
    Apps.beacon = function () {
      Windows.open("beacon", "Beacon", "<div class='lumen36-card'><p>Mock status pulse for this entertainment desktop.</p><div class='lumen36-meter'><span></span></div><div class='lumen36-row'><button class='lumen36-chip' id='b36a'>Ping</button><button class='lumen36-chip' id='b36b'>Quiet</button></div><p id='b36s'>Idle · mock only</p></div>");
      const s = document.getElementById("b36s");
      const a = document.getElementById("b36a");
      const b = document.getElementById("b36b");
      if (a) a.onclick = function () { if (s) s.textContent = "Ping sent · mock"; };
      if (b) b.onclick = function () { if (s) s.textContent = "Quiet mode · mock"; };
    };
    Apps.ledger = function () {
      Windows.open("ledger", "Ledger", "<div class='lumen36-card'><p>Mock balances. Not real money.</p><p>Harbor fund · 128.40</p><p>Studio pad · 42.00</p></div>");
    };
    Apps.tide = function () {
      Windows.open("tide", "Tide", "<div class='lumen36-card'><p>Mock tide chart for Harbor dusk.</p><p>High 6:14 · Low 12:02 · entertainment only</p></div>");
    };
  }

  const old = window.Aura && Aura.localReply;
  if (old) {
    Aura.localReply = function (text) {
      const q = String(text || "").toLowerCase();
      if (/open beacon/.test(q)) { if (window.Desktop) Desktop.openApp("beacon"); return "Opening Beacon."; }
      if (/open ledger/.test(q)) { if (window.Desktop) Desktop.openApp("ledger"); return "Opening Ledger."; }
      if (/open tide/.test(q)) { if (window.Desktop) Desktop.openApp("tide"); return "Opening Tide."; }
      if (/how do i (lock|search)/.test(q)) {
        return "Lock with Command-L. Search with Command-K. Aura with Command-Space.";
      }
      if (/tell me a story|story/.test(q)) {
        return "A glass window drifted over Harbor dusk, counted the dock lights, and decided mock desktops still count as rest.";
      }
      return old.call(Aura, text);
    };
  }

  const dock = document.getElementById("dock");
  if (dock) dock.classList.add("lumen36-glow");
  const asst = document.getElementById("assistant");
  if (asst) asst.classList.add("lumen36-orb");
})();
