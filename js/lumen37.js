/* Lumen 37 — extra original mock apps + Aura phrases. Not Apple. */
(function () {
  if (window.AuraModel && Array.isArray(AuraModel.phrases)) {
    AuraModel.phrases.push(
      ["open lantern", "Opening Lantern."],
      ["open quarry", "Opening Quarry."],
      ["open drift", "Opening Drift."],
      ["open loom", "Opening Loom."],
      ["glass slider", "Open Control Center and drag Glass tint."],
      ["speak", "Aura can speak replies if your browser allows speech synthesis."]
    );
    if (AuraModel.book && AuraModel.book.greet) {
      AuraModel.book.greet.push("Aura 37 ready. Phrase book loaded at boot.");
    }
    if (AuraModel.book && AuraModel.book.help) {
      AuraModel.book.help.push("Try: open lantern, open notes, what is 14 times 6, remind me to stretch, tell a joke.");
    }
  }

  if (window.Icons) {
    Icons.lantern = function () {
      return this.svg('<svg width="28" height="28" viewBox="0 0 28 28"><rect x="10" y="7" width="8" height="12" rx="2" fill="#fff"/><path d="M14 5v2M12 21h4" stroke="#fff" stroke-width="2"/></svg>', "linear-gradient(#fbbf24,#b45309)");
    };
    Icons.quarry = function () {
      return this.svg('<svg width="28" height="28" viewBox="0 0 28 28"><path d="M6 18l8-10 8 10z" fill="#fff"/></svg>', "linear-gradient(#94a3b8,#334155)");
    };
    Icons.drift = function () {
      return this.svg('<svg width="28" height="28" viewBox="0 0 28 28"><circle cx="10" cy="14" r="4" fill="#fff"/><circle cx="18" cy="14" r="4" fill="rgba(255,255,255,.7)"/></svg>', "linear-gradient(#c4b5fd,#6d28d9)");
    };
    Icons.loom = function () {
      return this.svg('<svg width="28" height="28" viewBox="0 0 28 28"><path d="M7 8h14M7 14h14M7 20h14" stroke="#fff" stroke-width="2"/></svg>', "linear-gradient(#fda4af,#be123c)");
    };
  }

  if (window.Desktop && Desktop.labels) {
    Object.assign(Desktop.labels, {
      lantern: "Lantern",
      quarry: "Quarry",
      drift: "Drift",
      loom: "Loom"
    });
  }

  if (window.Apps) {
    Apps.lantern = function () {
      Windows.open("lantern", "Lantern", "<div class='lumen37-card'><p>Mock lamp for Harbor dusk. Entertainment only.</p><div class='lumen37-meter'><span></span></div><div class='lumen37-row'><button class='lumen37-chip' id='l37a'>Warm</button><button class='lumen37-chip' id='l37b'>Cool</button></div><p id='l37s'>Glow idle · mock</p></div>");
      var s = document.getElementById("l37s");
      var a = document.getElementById("l37a");
      var b = document.getElementById("l37b");
      if (a) a.onclick = function () { if (s) s.textContent = "Warm glow · mock"; };
      if (b) b.onclick = function () { if (s) s.textContent = "Cool glow · mock"; };
    };
    Apps.quarry = function () {
      Windows.open("quarry", "Quarry", "<div class='lumen37-card'><p>Mock stone log. Not a real filesystem.</p><p>slab-01 · 2.4k</p><p>dust.bin · empty</p></div>");
    };
    Apps.drift = function () {
      Windows.open("drift", "Drift", "<div class='lumen37-card'><p>Mock focus timer.</p><p>25:00 focus · 5:00 rest · entertainment only</p></div>");
    };
    Apps.loom = function () {
      Windows.open("loom", "Loom", "<div class='lumen37-card'><p>Mock thread board.</p><p>Warp: glass</p><p>Weft: dusk</p></div>");
    };
  }

  var old = window.Aura && Aura.localReply;
  if (old) {
    Aura.localReply = function (text) {
      var q = String(text || "").toLowerCase();
      if (/open lantern/.test(q)) { if (window.Desktop) Desktop.openApp("lantern"); return "Opening Lantern."; }
      if (/open quarry/.test(q)) { if (window.Desktop) Desktop.openApp("quarry"); return "Opening Quarry."; }
      if (/open drift/.test(q)) { if (window.Desktop) Desktop.openApp("drift"); return "Opening Drift."; }
      if (/open loom/.test(q)) { if (window.Desktop) Desktop.openApp("loom"); return "Opening Loom."; }
      if (/how (do i|to) (lock|search|aura)/.test(q)) {
        return "Lock with Command-L. Search with Command-K. Aura with Command-Space.";
      }
      if (/poem|haiku/.test(q)) {
        return "Glass on dusk water / dock lights count themselves twice / mock windows stay kind.";
      }
      return old.call(Aura, text);
    };
  }

  var dock = document.getElementById("dock");
  if (dock) dock.classList.add("lumen37-glow");
  var asst = document.getElementById("assistant");
  if (asst) asst.classList.add("lumen37-orb");
  var wall = document.getElementById("wallpaper");
  if (wall) wall.classList.add("lumen37-wash");
  var note = document.querySelector("#notify-drawer p:last-of-type");
  if (note) note.textContent = "New in 37: Lantern, Quarry, Drift, Loom. Original icons only.";
})();
