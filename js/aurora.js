(function () {
  const extraPhrases = [
    ["open calculator", "Opening Calculator."],
    ["open notes", "Opening Notes."],
    ["open files", "Opening Files."],
    ["open terminal", "Opening Terminal."],
    ["open music", "Opening Music."],
    ["open maps", "Opening Maps."],
    ["open mail", "Opening Mail."],
    ["mission", "Press F3 for Mission Control."],
    ["launchpad", "Press F4 for Launchpad."],
    ["spotlight", "Press Command-K or Control-K."],
    ["remind", "Open Reminders and add a mock task."],
    ["write", "Writer and Journal keep local text in this browser."],
    ["camera", "Camera is a mock preview using your webcam if allowed."],
    ["radio", "Radio is a mock station list."],
    ["harbor", "Harbor is the mock catalog, not a store."],
    ["aura", "Aura is a local phrase helper loaded at boot. Optional demo API lives in Settings."],
    ["hello", "Hey. What should we open?"],
    ["thanks", "Anytime."],
    ["good morning", "Morning. Clock widget is on the desktop."],
    ["good night", "Lock with Command-L when you are done."]
  ];

  if (window.AuraModel && Array.isArray(AuraModel.phrases)) {
    extraPhrases.forEach((p) => AuraModel.phrases.push(p));
    const old = AuraModel.localReply.bind(AuraModel);
    AuraModel.localReply = function (q) {
      const t = (q || "").toLowerCase();
      const open = t.match(/open\s+([a-z0-9 ]{2,24})/);
      if (open && window.Desktop && typeof Desktop.openApp === "function") {
        const name = open[1].trim();
        try { Desktop.openApp(name); } catch (e) {}
        return "Tried to open “" + name + "”.";
      }
      if (/what time|current time/.test(t)) {
        return "Local time is " + new Date().toLocaleTimeString() + ".";
      }
      if (/date|today/.test(t)) {
        return "Today is " + new Date().toLocaleDateString(undefined, { weekday: "long", month: "long", day: "numeric" }) + ".";
      }
      return old(q);
    };
  }

  function panel(title, html) {
    if (!window.Desktop || typeof Desktop.openWindow !== "function") return;
    Desktop.openWindow(title, html);
  }

  window.AuroraApps = {
    compass() {
      panel("Compass",
        '<div class="aurora-card"><strong>Mock heading</strong><p>342° NNW · not a real magnetometer</p><div class="aurora-meter"><span style="width:68%"></span></div></div>');
    },
    timer() {
      panel("Timer",
        '<div class="aurora-card"><p>25:00 focus mock</p><div class="aurora-chip"><button type="button">Start</button><button type="button">Reset</button></div></div>');
    },
    palette() {
      panel("Palette",
        '<div class="aurora-card">Original swatches used by Lumen glass.<div class="aurora-chip"><button>#7dd3fc</button><button>#818cf8</button><button>#c4b5fd</button></div></div>');
    }
  };

  document.addEventListener("keydown", (e) => {
    if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "j") {
      e.preventDefault();
      const a = document.getElementById("assistant");
      if (a) a.classList.toggle("hidden");
    }
  });
})();
