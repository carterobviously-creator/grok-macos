/* Lumen 38 — extra original mock apps + Aura phrases. Not Apple. */
(function () {
  if (window.AuraModel && Array.isArray(AuraModel.phrases)) {
    AuraModel.phrases.push(
      ["open kiln", "Opening Kiln."],
      ["open rivulet", "Opening Rivulet."],
      ["open atlas pad", "Opening Atlas Pad."],
      ["open emberbox", "Opening Ember Box."],
      ["glass polish", "Control Center has a Glass tint slider."],
      ["lumen 38", "Lumen 38 is a browser mock. Original icons only."]
    );
    if (AuraModel.book && AuraModel.book.greet) {
      AuraModel.book.greet.push("Aura 38 ready. Tiny phrase book loaded at boot.");
    }
    if (AuraModel.book && AuraModel.book.help) {
      AuraModel.book.help.push("Try: open kiln, open notes, what is 9 times 7, remind me to breathe, tell a joke.");
    }
  }

  if (window.Icons) {
    Icons.kiln = function () {
      return this.svg('<svg width="28" height="28" viewBox="0 0 28 28"><rect x="8" y="10" width="12" height="10" rx="2" fill="#fff"/><path d="M10 10c2-4 6-4 8 0" stroke="#fff" stroke-width="2" fill="none"/></svg>', "linear-gradient(#fb7185,#9f1239)");
    };
    Icons.rivulet = function () {
      return this.svg('<svg width="28" height="28" viewBox="0 0 28 28"><path d="M8 8c4 4 4 8 0 12M14 6c4 5 4 11 0 16M20 8c4 4 4 8 0 12" stroke="#fff" stroke-width="2" fill="none"/></svg>', "linear-gradient(#67e8f9,#0e7490)");
    };
    Icons.atlaspad = function () {
      return this.svg('<svg width="28" height="28" viewBox="0 0 28 28"><circle cx="14" cy="14" r="8" fill="none" stroke="#fff" stroke-width="2"/><path d="M6 14h16M14 6c3 4 3 12 0 16" stroke="#fff" stroke-width="1.6" fill="none"/></svg>', "linear-gradient(#86efac,#166534)");
    };
    Icons.emberbox = function () {
      return this.svg('<svg width="28" height="28" viewBox="0 0 28 28"><rect x="7" y="9" width="14" height="11" rx="2" fill="#fff"/><path d="M11 9V7h6v2" stroke="#fff" stroke-width="2"/></svg>', "linear-gradient(#fdba74,#c2410c)");
    };
  }

  if (window.Desktop && Desktop.labels) {
    Object.assign(Desktop.labels, {
      kiln: "Kiln",
      rivulet: "Rivulet",
      atlaspad: "Atlas Pad",
      emberbox: "Ember Box"
    });
  }

  if (window.Apps) {
    Apps.kiln = function () {
      Windows.open("kiln", "Kiln", "<div class='lumen38-card'><p>Mock heat bench. Entertainment only.</p><div class='lumen38-meter'><span></span></div><div class='lumen38-row'><button class='lumen38-chip' id='l38a'>Low</button><button class='lumen38-chip' id='l38b'>High</button></div><p id='l38s'>Idle flame · mock</p></div>");
      var s = document.getElementById("l38s");
      var a = document.getElementById("l38a");
      var b = document.getElementById("l38b");
      if (a) a.onclick = function () { if (s) s.textContent = "Low heat · mock"; };
      if (b) b.onclick = function () { if (s) s.textContent = "High heat · mock"; };
    };
    Apps.rivulet = function () {
      Windows.open("rivulet", "Rivulet", "<div class='lumen38-card'><p>Mock flow notes.</p><div class='lumen38-grid'><div class='lumen38-tile'>inlet</div><div class='lumen38-tile'>eddy</div><div class='lumen38-tile'>pool</div><div class='lumen38-tile'>out</div></div></div>");
    };
    Apps.atlaspad = function () {
      Windows.open("atlaspad", "Atlas Pad", "<div class='lumen38-card'><p>Mock sketch map. Not a real globe.</p><p>Harbor · Dusk ridge · Glass bay</p></div>");
    };
    Apps.emberbox = function () {
      Windows.open("emberbox", "Ember Box", "<div class='lumen38-card'><p>Mock stash of notes.</p><p>spark-01 · saved</p><p>ash.bin · empty</p></div>");
    };
  }

  var old = window.Aura && Aura.localReply;
  if (old) {
    Aura.localReply = function (text) {
      var q = String(text || "").toLowerCase();
      if (/open kiln/.test(q)) { if (window.Desktop) Desktop.openApp("kiln"); return "Opening Kiln."; }
      if (/open rivulet/.test(q)) { if (window.Desktop) Desktop.openApp("rivulet"); return "Opening Rivulet."; }
      if (/open atlas/.test(q)) { if (window.Desktop) Desktop.openApp("atlaspad"); return "Opening Atlas Pad."; }
      if (/open ember/.test(q)) { if (window.Desktop) Desktop.openApp("emberbox"); return "Opening Ember Box."; }
      if (/how (do i|to) (lock|search|aura|tint)/.test(q)) {
        return "Lock with Command-L. Search with Command-K. Aura with Command-Space. Tint lives in Control Center.";
      }
      if (/poem|haiku/.test(q)) {
        return "Kiln hums under glass / rivulet counts dusk minutes / mock windows stay kind.";
      }
      return old.call(Aura, text);
    };
  }

  var dock = document.getElementById("dock");
  if (dock) dock.classList.add("lumen38-glow");
  var asst = document.getElementById("assistant");
  if (asst) asst.classList.add("lumen38-orb");
  var wall = document.getElementById("wallpaper");
  if (wall) wall.classList.add("lumen38-wash");
  var note = document.querySelector("#notify-drawer p:last-of-type");
  if (note) note.textContent = "New in 38: Kiln, Rivulet, Atlas Pad, Ember Box. Original icons only.";
})();
