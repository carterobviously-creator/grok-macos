(function () {
  const wallpaper = document.getElementById("wallpaper");
  if (wallpaper) wallpaper.classList.add("horizon");

  const phrases = {
    hello: "Hey. Aura is a local helper in this mock desktop. Ask me to open Files, Notes, Calculator, Harbor, or Settings.",
    time: () => "It is " + new Date().toLocaleTimeString() + ".",
    weather: "Mock weather: clear, 72 degrees. This is not live weather.",
    help: "Shortcuts: F3 Mission Control, F4 Launchpad, Ctrl/Cmd K search, Ctrl/Cmd L lock, Ctrl/Cmd Space Aura, Ctrl/Cmd W wallpaper.",
    open: "Tell me which mock app to open.",
    joke: "Why did the glass UI blush? Because someone turned the tint slider up.",
    default: "I only know a tiny local phrase book. Try hello, time, weather, joke, help, or open notes."
  };

  window.HorizonAura = {
    reply(text) {
      const t = (text || "").toLowerCase();
      if (/hello|hi|hey/.test(t)) return phrases.hello;
      if (/time|clock/.test(t)) return phrases.time();
      if (/weather/.test(t)) return phrases.weather;
      if (/help|shortcut/.test(t)) return phrases.help;
      if (/joke/.test(t)) return phrases.joke;
      if (/open\s+(\w+)/.test(t)) {
        const name = t.match(/open\s+(\w+)/)[1];
        if (window.Desktop && Desktop.openApp) {
          try { Desktop.openApp(name); } catch (e) {}
        }
        return "Opening mock " + name + " if it exists.";
      }
      return phrases.default;
    }
  };

  const orig = window.AuraModel && AuraModel.reply;
  if (window.AuraModel) {
    AuraModel.reply = function (q) {
      const local = HorizonAura.reply(q);
      if (local && local !== phrases.default) return Promise.resolve(local);
      if (typeof orig === "function") return orig.call(AuraModel, q);
      return Promise.resolve(local);
    };
  }

  function harborHtml() {
    const apps = [
      ["Harbor Notes", "Scratch pad with autosave in this tab."],
      ["Pulse Radio", "Mock stations and a fake now-playing bar."],
      ["Sketch Pad", "Draw on a canvas. Nothing leaves the browser."],
      ["Brief", "Daily mock briefing cards."],
      ["Flows", "Tiny kanban columns."],
      ["Studio", "Placeholder media mixer."]
    ];
    return '<div id="harbor-grid">' + apps.map(function (a) {
      return "<article><div class='aura-orb'></div><h4>" + a[0] + "</h4><p>" + a[1] + "</p></article>";
    }).join("") + "</div>";
  }

  if (window.Desktop && Desktop.registerApp) {
    Desktop.registerApp("harbor", {
      title: "Harbor",
      width: 720,
      height: 480,
      html: harborHtml()
    });
  } else {
    window.addEventListener("load", function () {
      if (window.Desktop && Desktop.registerApp) {
        Desktop.registerApp("harbor", { title: "Harbor", width: 720, height: 480, html: harborHtml() });
      }
    });
  }
})();
