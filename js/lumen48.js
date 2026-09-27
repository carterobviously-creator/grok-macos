(function lumen48() {
  const phrases = {
    hello: "Aura here. Local phrase book only — not a product assistant.",
    time: () => "Local clock reads " + new Date().toLocaleTimeString() + ".",
    weather: "Nimbus pad says clear and 72°. That number is invented for the mock.",
    open: "Say an app name after open: Notes, Files, Calculator, Journal, Terminal.",
    help: "Shortcuts: F3 Mission, F4 Launchpad, Ctrl/Cmd+K search, Ctrl/Cmd+Space Aura, Ctrl/Cmd+L lock.",
    who: "This is Lumen Desktop, an entertainment mock. Original SVG icons. No official system chrome.",
    joke: "Why did the window float? It wanted a little more glass.",
    journal: "Opening Journal so you can jot a mock note."
  };

  function reply(text) {
    const t = (text || "").toLowerCase();
    if (/hello|hi|hey/.test(t)) return phrases.hello;
    if (/time|clock/.test(t)) return phrases.time();
    if (/weather|nimbus/.test(t)) return phrases.weather;
    if (/open/.test(t)) return phrases.open;
    if (/help|shortcut/.test(t)) return phrases.help;
    if (/who|what is this|apple|siri|macos/.test(t)) return phrases.who;
    if (/joke/.test(t)) return phrases.joke;
    if (/journal|diary/.test(t)) {
      if (window.Desktop && Desktop.openApp) Desktop.openApp("journal");
      return phrases.journal;
    }
    return "I only match a tiny local phrase book. Try hello, time, weather, help, joke, or journal.";
  }

  if (window.AuraModel) {
    const prev = AuraModel.reply;
    AuraModel.reply = function (q) {
      const extra = reply(q);
      if (typeof prev === "function") {
        const base = prev.call(AuraModel, q);
        if (base && !/i only |not sure|try /i.test(String(base))) return base;
      }
      return extra;
    };
  }

  function ensureJournal() {
    if (!window.Apps) return;
    if (Apps.journal) return;
    Apps.journal = {
      title: "Journal",
      w: 520,
      h: 420,
      render(root) {
        root.innerHTML = '<div class="journal"><div class="journal-toolbar"><button type="button" id="j-save">Save</button><button type="button" id="j-clear">Clear</button></div><textarea id="j-pad" placeholder="Write a mock entry…"></textarea><p class="muted">Saved only in this browser.</p></div>';
        const pad = root.querySelector("#j-pad");
        pad.value = localStorage.getItem("lumen-journal") || "";
        root.querySelector("#j-save").onclick = () => {
          localStorage.setItem("lumen-journal", pad.value);
          if (Desktop.toast) Desktop.toast("Journal saved");
        };
        root.querySelector("#j-clear").onclick = () => { pad.value = ""; };
      }
    };
    if (Desktop.registerApp) Desktop.registerApp("journal", { name: "Journal", id: "journal" });
  }

  function stageRail() {
    if (document.getElementById("stage-rail")) return;
    const rail = document.createElement("aside");
    rail.id = "stage-rail";
    rail.className = "glass";
    document.getElementById("desktop").appendChild(rail);
    const btn = document.createElement("button");
    btn.type = "button";
    btn.textContent = "Stage";
    btn.title = "Toggle stage rail (mock)";
    btn.style.cssText = "margin-left:8px;background:transparent;border:0;color:inherit;cursor:pointer";
    const right = document.querySelector("#menubar .right");
    if (right) right.prepend(btn);
    btn.onclick = () => {
      document.body.classList.toggle("stage-on");
      refreshRail();
    };
    function refreshRail() {
      rail.innerHTML = "";
      const wins = document.querySelectorAll("#window-layer .win");
      wins.forEach((w) => {
        const t = document.createElement("button");
        t.className = "stage-thumb";
        t.textContent = (w.dataset.title || "Win").slice(0, 8);
        t.onclick = () => w.classList.toggle("min");
        rail.appendChild(t);
      });
    }
    setInterval(refreshRail, 1500);
  }

  const boot = setInterval(() => {
    if (!document.getElementById("desktop") || document.getElementById("desktop").classList.contains("hidden")) return;
    clearInterval(boot);
    try { ensureJournal(); } catch (e) {}
    try { stageRail(); } catch (e) {}
  }, 400);
})();
