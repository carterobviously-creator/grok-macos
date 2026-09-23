/* Lumen 40 — original mock extras. Not Siri. Not Apple Intelligence. */
(function () {
  var scenes = [
    { t: "72°", w: "Clear mock sky", n: "Soft gold wash" },
    { t: "64°", w: "High haze mock", n: "Cool blue wash" },
    { t: "58°", w: "Dusk mock", n: "Violet wash" },
    { t: "69°", w: "After-rain mock", n: "Mint wash" }
  ];

  if (window.AuraModel && Array.isArray(AuraModel.phrases)) {
    AuraModel.phrases.push(
      ["open nimbus", "Opening Nimbus."],
      ["weather", "Nimbus is a fake forecast in this tab. No live weather."],
      ["lumen 40", "Lumen 40 is a browser desktop mock. Original icons only."],
      ["forecast", "Ask Nimbus. It only cycles mock scenes."]
    );
    if (AuraModel.book && AuraModel.book.greet) {
      AuraModel.book.greet.push("Aura 40 online. Phrase book loaded at boot. Not a branded assistant.");
    }
    if (AuraModel.book && AuraModel.book.help) {
      AuraModel.book.help.push("Try: open nimbus, open quill, what is 9 times 7, lock, launchpad.");
    }
  }

  if (window.Icons) {
    Icons.nimbus = function () {
      return this.svg('<svg width="28" height="28" viewBox="0 0 28 28"><circle cx="10" cy="11" r="5" fill="#fff" opacity=".9"/><path d="M8 18c0-2 2-4 5-4 1 0 2 .3 3 .8C17 13 19 12 21 13.5 23 15 23 18 21 19H9c-1.5 0-2-1-1-1z" fill="#fff"/></svg>', "linear-gradient(#7dd3fc,#2563eb)");
    };
  }

  if (window.Desktop && Desktop.labels) {
    Desktop.labels.nimbus = "Nimbus";
  }

  if (window.Apps) {
    Apps.nimbus = function () {
      Windows.open("nimbus", "Nimbus", "<div class='lumen40-card'><div class='lumen40-sky'><div class='lumen40-temp' id='l40t'>72°</div><p id='l40w'>Clear mock sky</p><p id='l40n'>Soft gold wash</p></div><textarea id='l40note' placeholder='Sky note for this tab…'></textarea><div class='lumen40-row'><button class='lumen40-chip' id='l40next'>Next scene</button><button class='lumen40-chip' id='l40save'>Keep note</button></div><p id='l40s'>Mock weather only.</p></div>");
      var i = 0;
      try {
        i = Number(localStorage.getItem("lumen40-scene") || 0) || 0;
      } catch (e) {}
      var t = document.getElementById("l40t");
      var w = document.getElementById("l40w");
      var n = document.getElementById("l40n");
      var note = document.getElementById("l40note");
      var s = document.getElementById("l40s");
      function paint() {
        var sc = scenes[i % scenes.length];
        if (t) t.textContent = sc.t;
        if (w) w.textContent = sc.w;
        if (n) n.textContent = sc.n;
      }
      paint();
      try { if (note) note.value = localStorage.getItem("lumen40-note") || ""; } catch (e) {}
      var nx = document.getElementById("l40next");
      var sv = document.getElementById("l40save");
      if (nx) nx.onclick = function () {
        i = (i + 1) % scenes.length;
        try { localStorage.setItem("lumen40-scene", String(i)); } catch (e) {}
        paint();
        if (s) s.textContent = "Cycled mock scene.";
      };
      if (sv) sv.onclick = function () {
        try { localStorage.setItem("lumen40-note", note ? note.value : ""); } catch (e) {}
        if (s) s.textContent = "Note kept in this browser.";
      };
    };
  }

  var old = window.Aura && Aura.localReply;
  if (old) {
    Aura.localReply = function (text) {
      var q = String(text || "").toLowerCase();
      if (/open nimbus|weather|forecast/.test(q)) {
        if (window.Desktop) Desktop.openApp("nimbus");
        return "Opening Nimbus. Fake forecast only.";
      }
      if (/temperature|how hot|how cold/.test(q)) {
        return "Nimbus says 72 degrees mock. Not live weather.";
      }
      return old.call(Aura, text);
    };
  }

  var dock = document.getElementById("dock");
  if (dock) dock.classList.add("lumen40-glow");
  var asst = document.getElementById("assistant");
  if (asst) asst.classList.add("lumen40-orb");
  var wall = document.getElementById("wallpaper");
  if (wall) wall.classList.add("lumen40-wash");
  var note = document.querySelector("#notify-drawer p:last-of-type");
  if (note) note.textContent = "New in 40: Nimbus mock weather pad. Original icons only.";
})();
