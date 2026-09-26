/* Lumen 45 extras. Aura is a local helper, not a branded assistant. */
(function () {
  if (window.AuraModel && Array.isArray(AuraModel.phrases)) {
    AuraModel.phrases.push(
      ["studio", "Opening Studio."],
      ["lumen 45", "Lumen 45 adds Studio and a quieter glass wash."],
      ["who made this", "This is Lumen, an entertainment desktop mock with original icons."]
    );
    if (AuraModel.book && AuraModel.book.greet) {
      AuraModel.book.greet.push("Aura 45 ready. Phrase book loaded at boot.");
    }
  }

  if (window.Icons) {
    Icons.studio = Icons.studio || function () {
      return this.svg(
        '<svg width="28" height="28" viewBox="0 0 28 28"><rect x="5" y="7" width="18" height="14" rx="3" fill="none" stroke="#fff" stroke-width="1.8"/><path d="M9 17l3-4 3 3 3-5 3 6" fill="none" stroke="#fff" stroke-width="1.6"/></svg>',
        "linear-gradient(#fb7185,#a78bfa)"
      );
    };
  }
  if (window.Desktop && Desktop.labels) Desktop.labels.studio = "Studio";

  if (window.Apps) {
    Apps.studio = function () {
      Windows.open(
        "studio",
        "Studio",
        "<div class='lumen45-card'><div class='lumen45-hero'><h3>Studio</h3><p>A local sketch pad. Not a product suite and not a branded assistant.</p></div><div class='lumen45-grid'><div class='lumen45-tile'>Draft<small id='s45-draft'>Untitled mock</small></div><div class='lumen45-tile'>Glass<small>Wash 45</small></div><div class='lumen45-tile'>Helper<small>Aura offline-first</small></div><div class='lumen45-tile'>Export<small>This browser only</small></div></div><div class='lumen45-row'><button type='button' id='s45-aura'>Ask Aura</button><button type='button' id='s45-notes'>Notes</button><button type='button' id='s45-files'>Files</button></div><p class='lumen45-log' id='s45-log'>Ready.</p></div>"
      );
      var aura = document.getElementById("s45-aura");
      var notes = document.getElementById("s45-notes");
      var files = document.getElementById("s45-files");
      var log = document.getElementById("s45-log");
      if (aura) aura.onclick = function () {
        if (window.Desktop && Desktop.toggleAura) Desktop.toggleAura(true);
      };
      if (notes) notes.onclick = function () {
        if (window.Desktop) Desktop.openApp("notes");
        if (log) log.textContent = "Opened Notes.";
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
      if (/studio/.test(q)) {
        if (window.Desktop) Desktop.openApp("studio");
        return "Opening Studio.";
      }
      if (/what can you do|capabilities/.test(q)) {
        return "I can open mock apps, save a note, add a reminder, do simple math, lock the desktop, and speak. Demo text is optional in Settings.";
      }
      return old.call(Aura, text);
    };
  }

  var dock = document.getElementById("dock");
  if (dock) dock.classList.add("lumen45-dock");
  var asst = document.getElementById("assistant");
  if (asst) asst.classList.add("lumen45-orb");
  var wall = document.getElementById("wallpaper");
  if (wall) wall.classList.add("lumen45-wash");
  var note = document.querySelector("#notify-drawer p:last-of-type");
  if (note) note.textContent = "New in 45: Studio pad and a quieter glass wash. Original icons only.";
})();
