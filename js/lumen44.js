/* Lumen 44 extras. Aura is a local helper, not a branded assistant. */
(function () {
  if (window.AuraModel && Array.isArray(AuraModel.phrases)) {
    AuraModel.phrases.push(
      ["nexus", "Opening Nexus."],
      ["lumen 44", "Lumen 44 adds Nexus and a clearer glass wash."],
      ["who made this", "This is Lumen, an entertainment desktop mock with original icons."]
    );
    if (AuraModel.book && AuraModel.book.greet) {
      AuraModel.book.greet.push("Aura 44 ready. Phrase book loaded at boot.");
    }
  }

  if (window.Icons) {
    Icons.nexus = Icons.nexus || function () {
      return this.svg(
        '<svg width="28" height="28" viewBox="0 0 28 28"><circle cx="14" cy="14" r="4" fill="#fff"/><circle cx="14" cy="6" r="2" fill="#fff"/><circle cx="14" cy="22" r="2" fill="#fff"/><circle cx="6" cy="14" r="2" fill="#fff"/><circle cx="22" cy="14" r="2" fill="#fff"/></svg>',
        "linear-gradient(#22d3ee,#6366f1)"
      );
    };
  }
  if (window.Desktop && Desktop.labels) Desktop.labels.nexus = "Nexus";

  if (window.Apps) {
    Apps.nexus = function () {
      var now = new Date();
      Windows.open(
        "nexus",
        "Nexus",
        "<div class='lumen44-card'><div class='lumen44-hero'><h3>Nexus</h3><p>A local status pad. Not a product dashboard and not a branded assistant.</p></div><div class='lumen44-grid'><div class='lumen44-tile'>Time<small id='n44-time'></small></div><div class='lumen44-tile'>Scene<small>Glass wash 44</small></div><div class='lumen44-tile'>Helper<small>Aura offline-first</small></div><div class='lumen44-tile'>Notes<small>Saved in this browser</small></div></div><div class='lumen44-row'><button type='button' id='n44-aura'>Ask Aura</button><button type='button' id='n44-lock'>Lock</button><button type='button' id='n44-files'>Files</button></div><p class='lumen44-log' id='n44-log'>Ready.</p></div>"
      );
      var t = document.getElementById("n44-time");
      if (t) t.textContent = now.toLocaleTimeString();
      var aura = document.getElementById("n44-aura");
      var lock = document.getElementById("n44-lock");
      var files = document.getElementById("n44-files");
      var log = document.getElementById("n44-log");
      if (aura) aura.onclick = function () {
        if (window.Desktop && Desktop.toggleAura) Desktop.toggleAura(true);
      };
      if (lock) lock.onclick = function () {
        if (window.Desktop && Desktop.lock) Desktop.lock();
      };
      if (files) files.onclick = function () {
        if (window.Desktop) Desktop.openApp("finder");
        if (log) log.textContent = "Opened Files.";
      };
    };
  }

  var old = window.Aura && Aura.localReply;
  if (old) {
    Aura.localReply = function (text) {
      var q = String(text || "").toLowerCase();
      if (/nexus/.test(q)) {
        if (window.Desktop) Desktop.openApp("nexus");
        return "Opening Nexus.";
      }
      if (/what can you do|capabilities/.test(q)) {
        return "I can open mock apps, save a note, add a reminder, do simple math, lock the desktop, and speak. Demo text is optional in Settings.";
      }
      if (/how do i|shortcut/.test(q)) {
        return "F3 Mission Control, F4 Launchpad, Command or Control Space for Aura, K for search, L to lock, W to change scene.";
      }
      return old.call(Aura, text);
    };
  }

  var dock = document.getElementById("dock");
  if (dock) dock.classList.add("lumen44-dock");
  var asst = document.getElementById("assistant");
  if (asst) asst.classList.add("lumen44-orb");
  var wall = document.getElementById("wallpaper");
  if (wall) wall.classList.add("lumen44-wash");
  var note = document.querySelector("#notify-drawer p:last-of-type");
  if (note) note.textContent = "New in 44: Nexus pad and a stronger local Aura phrase book. Original icons only.";
})();
