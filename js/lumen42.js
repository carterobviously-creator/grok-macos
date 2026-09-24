/* Lumen 42 — original mock extras. Not Siri. Not Apple Intelligence. */
(function () {
  if (window.AuraModel && Array.isArray(AuraModel.phrases)) {
    AuraModel.phrases.push(
      ["voice lab", "Opening Voice Lab."],
      ["speak", "Use the mic in Aura or Voice Lab. Browser speech only."],
      ["glass slider", "Control Center has a glass tint slider with clear, mid, and frost notches."],
      ["lumen 42", "Lumen 42 adds Voice Lab and stronger local Aura replies."]
    );
    if (AuraModel.book && AuraModel.book.greet) {
      AuraModel.book.greet.push("Aura 42 online. Local phrase book plus optional demo text.");
    }
    if (AuraModel.book && AuraModel.book.help) {
      AuraModel.book.help.push("Try: open voice, tell a joke, what is 9 times 7, lock, launchpad.");
    }
  }

  if (window.Icons) {
    Icons.voice = Icons.voice || function () {
      return this.svg('<svg width="28" height="28" viewBox="0 0 28 28"><rect x="12" y="6" width="4" height="12" rx="2" fill="#fff"/><path d="M8 14a6 6 0 0012 0" fill="none" stroke="#fff" stroke-width="2"/><path d="M14 20v3" stroke="#fff" stroke-width="2"/></svg>', "linear-gradient(#818cf8,#4f46e5)");
    };
  }
  if (window.Desktop && Desktop.labels) Desktop.labels.voice = "Voice Lab";

  if (window.Apps) {
    Apps.voice = function () {
      Windows.open("voice", "Voice Lab", "<div class='lumen42-card'><div class='lumen42-hero'><h3>Voice Lab</h3><p>Browser speech in and out. Aura stays a local helper. Not a branded assistant.</p></div><div class='lumen42-row'><button type='button' id='v42-listen'>Listen</button><button type='button' id='v42-say'>Speak greeting</button><button type='button' id='v42-aura'>Open Aura</button></div><div class='lumen42-log' id='v42-log'>Ready.</div></div>");
      var log = document.getElementById("v42-log");
      var listen = document.getElementById("v42-listen");
      var say = document.getElementById("v42-say");
      var openA = document.getElementById("v42-aura");
      if (listen) listen.onclick = function () {
        if (!window.Aura) return;
        if (log) log.textContent = "Listening…";
        Aura.listen(function (said) {
          if (log) log.textContent = "Heard: " + said;
          Aura.reply(said).then(function (r) {
            if (log) log.textContent += "\nAura: " + r;
            Aura.speak(r);
          });
        });
      };
      if (say) say.onclick = function () {
        var line = "Aura is a local phrase helper in Lumen. Entertainment mock only.";
        if (log) log.textContent = line;
        if (window.Aura) Aura.speak(line);
      };
      if (openA) openA.onclick = function () {
        if (window.Desktop && Desktop.toggleAura) Desktop.toggleAura(true);
        else {
          var a = document.getElementById("assistant");
          if (a) a.classList.remove("hidden");
        }
      };
    };
  }

  var old = window.Aura && Aura.localReply;
  if (old) {
    Aura.localReply = function (text) {
      var q = String(text || "").toLowerCase();
      if (/open voice|voice lab/.test(q)) {
        if (window.Desktop) Desktop.openApp("voice");
        return "Opening Voice Lab.";
      }
      if (/clear glass|frost glass|tint/.test(q)) {
        return "Drag Glass tint in Control Center. Left is clearer, right is frostier.";
      }
      if (/who are you|what is aura/.test(q)) {
        return "Aura is a tiny phrase book loaded at boot, with an optional public text demo you can turn off in Settings.";
      }
      return old.call(Aura, text);
    };
  }

  var cc = document.getElementById("control-center");
  if (cc && !document.getElementById("l42-notches")) {
    var tintLabel = cc.querySelector("#tint") && cc.querySelector("#tint").closest("label");
    if (tintLabel) {
      var n = document.createElement("div");
      n.id = "l42-notches";
      n.className = "lumen42-notches";
      n.innerHTML = "<span>Clear</span><span>Mid</span><span>Frost</span>";
      tintLabel.after(n);
    }
  }

  var dock = document.getElementById("dock");
  if (dock) dock.classList.add("lumen42-glow");
  var asst = document.getElementById("assistant");
  if (asst) asst.classList.add("lumen42-orb");
  var wall = document.getElementById("wallpaper");
  if (wall) wall.classList.add("lumen42-wash");
  var note = document.querySelector("#notify-drawer p:last-of-type");
  if (note) note.textContent = "New in 42: Voice Lab and glass tint notches. Original icons only.";
})();
