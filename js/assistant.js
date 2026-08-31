const Aura = {
  speaking: false,
  localReply(text) {
    const q = text.toLowerCase().trim();
    if (!q) return "Say something and I will try to help.";
    if (/(hello|hi|hey)/.test(q)) {
      return "Hi. I am Aura, the offline helper in this Lumen mock. Ask me to open apps, rewrite a sentence, or tell the time.";
    }
    if (/time|clock/.test(q) && !/open/.test(q)) return "It is " + new Date().toLocaleTimeString();
    if (/date/.test(q)) {
      return "Today is " + new Date().toLocaleDateString(undefined, {
        weekday: "long", month: "long", day: "numeric"
      });
    }
    const map = [
      { re: /files|finder/, id: "finder", msg: "Opening Files." },
      { re: /notes/, id: "notes", msg: "Opening Notes." },
      { re: /calc/, id: "calc", msg: "Opening Calculator." },
      { re: /web|browser|safari/, id: "web", msg: "Opening Web." },
      { re: /settings|prefs/, id: "settings", msg: "Opening Settings." },
      { re: /store|gallery/, id: "store", msg: "Opening Gallery." },
      { re: /calendar/, id: "calendar", msg: "Opening Calendar." },
      { re: /music/, id: "music", msg: "Opening Music." },
      { re: /photo/, id: "photos", msg: "Opening Photos." },
      { re: /term/, id: "terminal", msg: "Opening Terminal." },
      { re: /mail|email/, id: "mail", msg: "Opening Mail." },
      { re: /map/, id: "maps", msg: "Opening Maps." },
      { re: /sticky/, id: "stickies", msg: "Opening Stickies." },
      { re: /weather/, id: "weather", msg: "Opening Weather." },
      { re: /clock/, id: "clock", msg: "Opening Clock." },
      { re: /writer|text/, id: "writer", msg: "Opening Writer." },
      { re: /remind/, id: "reminders", msg: "Opening Reminders." },
      { re: /message|chat/, id: "messages", msg: "Opening Messages." },
      { re: /contact|people/, id: "contacts", msg: "Opening Contacts." },
      { re: /pulse|activity/, id: "activity", msg: "Opening Pulse." },
      { re: /preview/, id: "preview", msg: "Opening Preview." },
      { re: /voice/, id: "voice", msg: "Opening Voice Pad." },
      { re: /launch/, id: "launch", msg: "Opening Launchpad." },
      { re: /mission/, id: "mission", msg: "Opening Mission Control." }
    ];
    for (const item of map) {
      if (item.re.test(q) && (/open|launch|start|show/.test(q) || q.split(" ").length < 4)) {
        if (item.id === "mission" && typeof Desktop !== "undefined") Desktop.toggleMission();
        else if (typeof Desktop !== "undefined") Desktop.openApp(item.id);
        return item.msg;
      }
    }
    if (/rewrite|shorter|summar/.test(q)) {
      const cleaned = text.replace(/^(rewrite|make shorter|summarize)\s*/i, "").trim();
      if (!cleaned) return "Paste a sentence after rewrite.";
      const words = cleaned.split(/\s+/);
      return words.slice(0, Math.max(6, Math.ceil(words.length * 0.6))).join(" ") + ".";
    }
    if (/who|what are you|siri|apple intelligence|apple|puter|cloud/.test(q)) {
      return "This is a fan-made desktop mock called Lumen. Aura is an offline local phrase helper. It is not Siri, not Apple Intelligence, and does not call the cloud.";
    }
    if (/weather/.test(q)) return "Mock forecast: clear, 72 degrees with a light breeze.";
    if (/joke/.test(q)) return "Why did the window refuse to close? It had too many tabs open.";
    if (/help|what can/.test(q)) {
      return "Try: open notes, open weather, rewrite this sentence, what time is it, tell a joke, mission control, or press Command-K / F3 / F4. You can also use the mic.";
    }
    if (/thank/.test(q)) return "You are welcome.";
    const bits = q.replace(/[^a-z0-9\s]/g, "").split(/\s+/).filter(Boolean);
    if (bits.length) {
      return "I heard \"" + bits.slice(0, 8).join(" ") + "\". Offline helper only understood part of that. Try open notes, what time is it, or help.";
    }
    return "Try asking to open an app or for the time.";
  },
  async reply(text) {
    return this.localReply(text);
  },
  speak(text) {
    if (!window.speechSynthesis) return;
    window.speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(text);
    u.rate = 1.02;
    window.speechSynthesis.speak(u);
  },
  listen(onText) {
    const Rec = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!Rec) {
      if (typeof Desktop !== "undefined") Desktop.toast("Speech recognition is not in this browser.");
      return;
    }
    const rec = new Rec();
    rec.lang = "en-US";
    rec.interimResults = false;
    rec.onresult = (e) => {
      const said = e.results[0][0].transcript;
      onText(said);
    };
    rec.start();
  }
};
