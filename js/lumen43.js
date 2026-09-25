/* Lumen 43 — entertainment mock extras. Aura is not Siri. */
(function () {
  if (window.AuraModel && Array.isArray(AuraModel.phrases)) {
    AuraModel.phrases.push(
      ["studio", "Opening Studio."],
      ["lumen 43", "Lumen 43 adds Studio and sharper local Aura replies."],
      ["glass", "Use the tint slider in Control Center. Original CSS glass only."]
    );
    if (AuraModel.book && AuraModel.book.greet) {
      AuraModel.book.greet.push("Aura 43 ready. Local phrase book loaded at boot.");
    }
  }

  if (window.Icons) {
    Icons.studio = Icons.studio || function () {
      return this.svg('<svg width="28" height="28" viewBox="0 0 28 28"><rect x="6" y="8" width="16" height="12" rx="3" fill="none" stroke="#fff" stroke-width="2"/><circle cx="14" cy="14" r="3" fill="#fff"/></svg>', "linear-gradient(#38bdf8,#6366f1)");
    };
  }
  if (window.Desktop && Desktop.labels) Desktop.labels.studio = "Studio";

  if (window.Apps) {
    Apps.studio = function () {
      Windows.open("studio", "Studio", "<div class='lumen43-card'><div class='lumen43-hero'><h3>Studio</h3><p>Local helper playground. Ask Aura to open apps, do math, or take a note. Not a branded assistant.</p></div><div class='lumen43-row'><button type='button' id='s43-aura'>Open Aura</button><button type='button' id='s43-joke'>Joke</button><button type='button' id='s43-time'>Time</button></div><div class='lumen43-log' id='s43-log'>Ready.</div></div>");
      var log = document.getElementById("s43-log");
      var openA = document.getElementById("s43-aura");
      var joke = document.getElementById("s43-joke");
      var time = document.getElementById("s43-time");
      if (openA) openA.onclick = function () {
        if (window.Desktop && Desktop.toggleAura) Desktop.toggleAura(true);
      };
      if (joke) joke.onclick = function () {
        var line = "Why did the mock dock magnify? It wanted a closer look.";
        if (log) log.textContent = line;
        if (window.Aura) Aura.speak(line);
      };
      if (time) time.onclick = function () {
        var line = "It is " + new Date().toLocaleTimeString();
        if (log) log.textContent = line;
        if (window.Aura) Aura.speak(line);
      };
    };
  }

  var old = window.Aura && Aura.localReply;
  if (old) {
    Aura.localReply = function (text) {
      var q = String(text || "").toLowerCase();
      if (/open studio|studio/.test(q) && /open|launch|show|studio/.test(q)) {
        if (window.Desktop) Desktop.openApp("studio");
        return "Opening Studio.";
      }
      if (/lock/.test(q) && window.Desktop && Desktop.lock) {
        Desktop.lock();
        return "Locking the desktop.";
      }
      if (/good ?morning|good ?night/.test(q)) {
        return "Hello. Aura is the local helper in this Lumen mock.";
      }
      return old.call(Aura, text);
    };
  }

  var dock = document.getElementById("dock");
  if (dock) dock.classList.add("lumen43-dock");
  var asst = document.getElementById("assistant");
  if (asst) asst.classList.add("lumen43-orb");
  var wall = document.getElementById("wallpaper");
  if (wall) wall.classList.add("lumen43-wash");
  var note = document.querySelector("#notify-drawer p:last-of-type");
  if (note) note.textContent = "New in 43: Studio app and sharper Aura local replies. Original icons only.";
})();
