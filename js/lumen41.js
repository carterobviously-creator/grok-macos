/* Lumen 41 — original mock extras. Not Siri. Not Apple Intelligence. Not App Store. */
(function () {
  var catalog = [
    { id: "nimbus", name: "Nimbus", blurb: "Mock sky pad" },
    { id: "notes", name: "Notes", blurb: "Local notepad" },
    { id: "calc", name: "Calc", blurb: "Tiny math pad" },
    { id: "files", name: "Files", blurb: "Mock volumes" },
    { id: "gallery", name: "Gallery", blurb: "App picker" },
    { id: "settings", name: "Settings", blurb: "Tint and demo" }
  ];

  if (window.AuraModel && Array.isArray(AuraModel.phrases)) {
    AuraModel.phrases.push(
      ["open shelf", "Opening Shelf."],
      ["app store", "This mock has Shelf, not an App Store."],
      ["install", "Shelf only opens mock apps already in this tab."],
      ["lumen 41", "Lumen 41 is a browser desktop mock. Original icons only."]
    );
    if (AuraModel.book && AuraModel.book.greet) {
      AuraModel.book.greet.push("Aura 41 online. Phrase book loaded at boot. Not a branded assistant.");
    }
    if (AuraModel.book && AuraModel.book.help) {
      AuraModel.book.help.push("Try: open shelf, open nimbus, lock, launchpad, what is 12 times 8.");
    }
  }

  if (window.Icons) {
    Icons.shelf = function () {
      return this.svg('<svg width="28" height="28" viewBox="0 0 28 28"><rect x="5" y="7" width="18" height="4" rx="1.5" fill="#fff"/><rect x="5" y="13" width="18" height="4" rx="1.5" fill="#fff" opacity=".8"/><rect x="5" y="19" width="12" height="3" rx="1.2" fill="#fff" opacity=".6"/></svg>', "linear-gradient(#34d399,#059669)");
    };
  }

  if (window.Desktop && Desktop.labels) {
    Desktop.labels.shelf = "Shelf";
  }

  if (window.Apps) {
    Apps.shelf = function () {
      var tiles = catalog.map(function (c) {
        return "<button class='lumen41-tile' data-open='" + c.id + "'><b>" + c.name + "</b><span>" + c.blurb + "</span></button>";
      }).join("");
      Windows.open("shelf", "Shelf", "<div class='lumen41-card'><div class='lumen41-hero'><h3>Shelf</h3><p>Mock catalog of apps already in this tab. Nothing downloads. Not an App Store.</p></div><div class='lumen41-grid'>" + tiles + "</div><p class='lumen41-status' id='l41s'>Pick a tile to open a mock.</p></div>");
      var root = document.querySelector("#win-shelf .lumen41-card") || document.querySelector(".lumen41-card");
      if (!root) return;
      root.querySelectorAll("[data-open]").forEach(function (btn) {
        btn.onclick = function () {
          var id = btn.getAttribute("data-open");
          var s = document.getElementById("l41s");
          if (s) s.textContent = "Opening " + id + "…";
          if (window.Desktop) Desktop.openApp(id);
        };
      });
    };
  }

  var old = window.Aura && Aura.localReply;
  if (old) {
    Aura.localReply = function (text) {
      var q = String(text || "").toLowerCase();
      if (/open shelf|app store|install app/.test(q)) {
        if (window.Desktop) Desktop.openApp("shelf");
        return "Opening Shelf. Mock catalog only.";
      }
      if (/what can you do|who are you/.test(q)) {
        return "Aura is a local phrase helper in Lumen. Boot loaded a tiny book. Not Siri. Not Apple Intelligence.";
      }
      return old.call(Aura, text);
    };
  }

  var dock = document.getElementById("dock");
  if (dock) dock.classList.add("lumen41-glow");
  var asst = document.getElementById("assistant");
  if (asst) asst.classList.add("lumen41-orb");
  var wall = document.getElementById("wallpaper");
  if (wall) wall.classList.add("lumen41-wash");
  var note = document.querySelector("#notify-drawer p:last-of-type");
  if (note) note.textContent = "New in 41: Shelf mock catalog. Original icons only.";
})();
