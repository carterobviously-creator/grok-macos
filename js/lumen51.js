/* Lumen 51 polish — original mock helpers */
(function () {
  function mountStrip() {
    if (document.getElementById("status-strip")) return;
    const s = document.createElement("div");
    s.id = "status-strip";
    s.className = "glass";
    s.textContent = "Lumen 51 · Aura local · original icons";
    document.getElementById("desktop").appendChild(s);
  }

  Apps.voicelab = function () {
    Windows.create("voicelab", "Voice Lab", 420, 320,
      '<div class="voice-lab"><div class="wave"></div>' +
      '<p>Local speech demo. Uses the browser SpeechRecognition API if present. Not Siri.</p>' +
      '<button type="button" id="vl-listen">Listen</button>' +
      '<p id="vl-out">Ready.</p></div>');
    const out = document.getElementById("vl-out");
    document.getElementById("vl-listen").onclick = () => {
      const Rec = window.SpeechRecognition || window.webkitSpeechRecognition;
      if (!Rec) {
        out.textContent = "Speech API not in this browser. Type in Aura instead.";
        return;
      }
      const r = new Rec();
      r.lang = "en-US";
      r.onresult = async (e) => {
        const t = e.results[0][0].transcript;
        out.textContent = t;
        Desktop.addAura("me", t);
        Desktop.addAura("bot", await Aura.reply(t));
      };
      r.onerror = () => { out.textContent = "Mic blocked or unavailable."; };
      r.start();
      out.textContent = "Listening…";
    };
  };

  const extra = Aura.localReply.bind(Aura);
  Aura.localReply = function (text) {
    const q = text.toLowerCase();
    if (/lumen 51|what's new|whats new/.test(q)) {
      return "Lumen 51 adds Voice Lab, a status strip, and extra Aura replies. Fan mock. Original icons. Not Apple.";
    }
    if (/voice lab|listen/.test(q)) {
      if (typeof Desktop !== "undefined") Desktop.openApp("voicelab");
      return "Opening Voice Lab.";
    }
    if (/who are you|what are you/.test(q)) {
      return "I am Aura, a tiny local phrase helper that loads at boot. I am not Siri and not Apple Intelligence.";
    }
    if (/open (files|notes|calc|calculator|gallery|settings|calendar|music|photos|terminal|mail|maps|stickies|journal)/.test(q)) {
      const map = { calculator: "calc", calc: "calc" };
      const raw = q.match(/open (files|notes|calc|calculator|gallery|settings|calendar|music|photos|terminal|mail|maps|stickies|journal)/)[1];
      const id = map[raw] || raw;
      if (typeof Desktop !== "undefined") Desktop.openApp(id);
      return "Opening " + raw + ".";
    }
    return extra(text);
  };

  const start = Desktop.start.bind(Desktop);
  Desktop.start = function () {
    start();
    mountStrip();
    Desktop.toast("Lumen 51 ready · original mock");
  };
})();
