/* Lumen 39 — original mock extras. Not Siri. Not Apple Intelligence. */
(function () {
  if (window.AuraModel && Array.isArray(AuraModel.phrases)) {
    AuraModel.phrases.push(
      ["open quill", "Opening Quill."],
      ["write note", "Open Quill or Notes and type. This is a mock."],
      ["lumen 39", "Lumen 39 is a browser desktop mock. Original icons only."],
      ["what can you do", "Open apps, do tiny math, tell a joke, cycle scenes. Local phrases only unless Settings enables the demo API."]
    );
    if (AuraModel.book && AuraModel.book.greet) {
      AuraModel.book.greet.push("Aura 39 online. Phrase book loaded at boot. Not a branded assistant.");
    }
    if (AuraModel.book && AuraModel.book.help) {
      AuraModel.book.help.push("Try: open quill, open kiln, what is 12 times 8, lock, launchpad.");
    }
  }

  if (window.Icons) {
    Icons.quill = function () {
      return this.svg('<svg width="28" height="28" viewBox="0 0 28 28"><path d="M7 21l3-1 11-11-2-2L8 18z" fill="#fff"/><path d="M18 7l3 3" stroke="#fff" stroke-width="1.6"/></svg>', "linear-gradient(#c4b5fd,#5b21b6)");
    };
  }

  if (window.Desktop && Desktop.labels) {
    Desktop.labels.quill = "Quill";
  }

  if (window.Apps) {
    Apps.quill = function () {
      Windows.open("quill", "Quill", "<div class='lumen39-card'><p>Mock scratch pad. Saved only in this tab.</p><textarea id='l39q' placeholder='Write a line…'></textarea><div class='lumen39-row'><button class='lumen39-chip' id='l39save'>Keep</button><button class='lumen39-chip' id='l39clear'>Clear</button></div><p id='l39s'>Ready</p></div>");
      var t = document.getElementById("l39q");
      var s = document.getElementById("l39s");
      try { if (t) t.value = localStorage.getItem("lumen39-quill") || ""; } catch (e) {}
      var save = document.getElementById("l39save");
      var clr = document.getElementById("l39clear");
      if (save) save.onclick = function () {
        try { localStorage.setItem("lumen39-quill", t ? t.value : ""); } catch (e) {}
        if (s) s.textContent = "Kept in this browser.";
      };
      if (clr) clr.onclick = function () {
        if (t) t.value = "";
        try { localStorage.removeItem("lumen39-quill"); } catch (e) {}
        if (s) s.textContent = "Cleared.";
      };
    };
  }

  var old = window.Aura && Aura.localReply;
  if (old) {
    Aura.localReply = function (text) {
      var q = String(text || "").toLowerCase();
      if (/open quill|write/.test(q)) {
        if (window.Desktop) Desktop.openApp("quill");
        return "Opening Quill.";
      }
      if (/remind/.test(q)) {
        return "I can pretend to remember that in this tab. No real notifications leave the mock.";
      }
      if (/thank/.test(q)) return "You are welcome. Aura is still just a phrase helper.";
      return old.call(Aura, text);
    };
  }

  var dock = document.getElementById("dock");
  if (dock) dock.classList.add("lumen39-glow");
  var asst = document.getElementById("assistant");
  if (asst) asst.classList.add("lumen39-orb");
  var wall = document.getElementById("wallpaper");
  if (wall) wall.classList.add("lumen39-wash");
  var note = document.querySelector("#notify-drawer p:last-of-type");
  if (note) note.textContent = "New in 39: Quill pad + richer Aura phrases. Original icons only.";
})();
