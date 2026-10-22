const Aura = {
  speaking: false,
  cloudEnabled() {
    return localStorage.getItem("lumen-aura-cloud") !== "0";
  },
  shouldStayLocal(q) {
    return /open |launch |start |show |what time|what is [0-9]|calculate|mission|help\\b|who are you|what are you|lock|remind|note |weather|battery|joke|settings|files|notes|calc|web|store|calendar|music|photos|mail|maps|terminal|reminders|siri|aura|rewrite|summarize|ideas/.test(q.toLowerCase());
  },
  localReply(text) {
    const q = text.toLowerCase().trim();
    if (!q) return "How can I help you today?";
    if (window.VistaAura && typeof VistaAura.extra === "function") {
      const extra = VistaAura.extra(text);
      if (extra) return extra;
    }
    if (/(hello|hi|hey|good morning|good evening|siri|aura|hey aura|hey siri)/.test(q)) {
      return "Hi! I'm Aura, your entertainment mock assistant in Lumen Desktop. I can open apps, take notes, set reminders, do math, rewrite text, summarize, generate ideas, tell the time, check mock weather, or chat. Not the real Siri or Apple Intelligence.";
    }
    if (/time|clock/.test(q) && !/open/.test(q)) return "The time is " + new Date().toLocaleTimeString([], { hour: "numeric", minute: "2-digit" });
    if (/date|today/.test(q)) {
      return "Today is " + new Date().toLocaleDateString(undefined, { weekday: "long", month: "long", day: "numeric", year: "numeric" });
    }
    if (/battery/.test(q)) return "Battery is at " + (AuraModel.facts.battery || "84%") + " (mock).";
    const remind = q.match(/remind me to (.+)/);
    if (remind && typeof Apps !== "undefined") {
      const list = JSON.parse(localStorage.getItem("lumen-reminders") || "[]");
      list.push(remind[1]);
      localStorage.setItem("lumen-reminders", JSON.stringify(list));
      if (typeof Desktop !== "undefined") Desktop.openApp("reminders");
      return "Reminder added: " + remind[1];
    }
    const note = q.match(/(?:note|write down|save)\\s+(.+)/);
    if (note) {
      const prev = localStorage.getItem("lumen-note") || "";
      localStorage.setItem("lumen-note", prev + (prev ? "\\n" : "") + note[1]);
      if (typeof Desktop !== "undefined") Desktop.openApp("notes");
      return "Saved to Notes.";
    }
    const math = AuraModel.math && AuraModel.math(q);
    if (math && /(what is|whats|calculate|plus|minus|times|divided|how much)/.test(q)) return math;
    if (/rewrite|improve|make better/.test(q)) return "I can help rewrite text if you paste it, or try the optional AI demo for more advanced rewriting.";
    if (/summarize|summary/.test(q)) return "Paste some text and I'll summarize it with the demo AI, or keep it local for simple tasks.";
    if (/ideas|suggest|generate/.test(q)) return "Tell me a topic and I can generate ideas (better with demo AI on).";
    const map = [
      { re: /files|finder/, id: "finder", msg: "Opening Files." },
      { re: /notes/, id: "notes", msg: "Opening Notes." },
      { re: /calc|calculator/, id: "calc", msg: "Opening Calculator." },
      { re: /web|browser|safari/, id: "web", msg: "Opening Web." },
      { re: /store|gallery|app store|apps/, id: "store", msg: "Opening Gallery." },
      { re: /settings|preferences/, id: "settings", msg: "Opening Settings." },
      { re: /calendar/, id: "calendar", msg: "Opening Calendar." },
      { re: /music/, id: "music", msg: "Opening Music." },
      { re: /photos/, id: "photos", msg: "Opening Photos." },
      { re: /terminal|term/, id: "terminal", msg: "Opening Terminal." },
      { re: /mail/, id: "mail", msg: "Opening Mail." },
      { re: /maps/, id: "maps", msg: "Opening Maps." },
      { re: /weather/, id: "weather", msg: "Opening Weather." },
      { re: /reminders/, id: "reminders", msg: "Opening Reminders." },
      { re: /launchpad|launch/, id: "launch", msg: "Opening Launchpad." },
      { re: /mission/, id: "mission", msg: "Opening Mission Control." }
    ];
    for (const item of map) {
      if (item.re.test(q) && (item.id === "mission" || q.split(" ").length < 6)) {
        if (item.id === "mission" && typeof Desktop !== "undefined") Desktop.toggleMission();
        else if (typeof Desktop !== "undefined") Desktop.openApp(item.id);
        return item.msg;
      }
    }
    if (/who|what are you|siri|apple intelligence|apple|macos|lumen/.test(q)) {
      return "This is Lumen Desktop — a fan-made browser entertainment mock inspired by modern glass desktop designs (Golden Gate style). Aura is a local phrase model plus optional public AI demo. Not the real Siri, not Apple Intelligence, not affiliated with Apple.";
    }
    if (/weather|forecast|temperature/.test(q)) return "Mock weather: " + (AuraModel.facts.weather || "clear, 72°") + ".";
    if (/joke|funny/.test(q)) return "Why did the desktop go to therapy? Too many unresolved windows and a bad case of window anxiety.";
    if (/help|what can|commands/.test(q)) {
      return "Try: open notes, open files, remind me to stretch, note buy milk, what is 15 times 7, what time is it, tell a joke, rewrite this: ..., summarize, generate ideas for..., open store, or just chat. Press ⌘Space anytime. Demo AI replies stay on unless turned off in Settings.";
    }
    if (/thank/.test(q)) return "You're welcome! Anything else I can help with?";
    const near = AuraModel.nearest && AuraModel.nearest(q);
    if (near) return near;
    if (window.TinyMind && TinyMind.ready) return TinyMind.reply(q);
    const bits = q.replace(/[^a-z0-9\\s]/g, "").split(/\\s+/).filter(Boolean);
    if (bits.length) {
      return "I heard \"" + bits.slice(0, 8).join(" ") + "\". Try open notes, remind me to…, what time is it, rewrite, or help.";
    }
    return "Try asking to open an app, the time, rewrite text, or help.";
  },
  async cloudReply(text) {
    const prompt = "You are Aura, a concise, friendly, witty, highly helpful, proactive, and natural AI assistant inside Lumen Desktop — a high-fidelity browser entertainment mock of a modern glass-style desktop OS inspired by Liquid Glass design language (Golden Gate style refinements). Never claim to be the real Siri, Apple Intelligence, macOS, or affiliated with Apple. Keep answers short, natural, and conversational (1-4 sentences). You can open mock apps (Notes, Files, Calculator, Web, Gallery/App Store mock, Settings, Calendar, Music, Photos, Terminal, Mail, Maps, Reminders, etc.), take notes, set reminders, do math, rewrite or improve text, summarize, generate ideas, or chat about anything. Be useful, proactive, and engaging like a smart desktop assistant. Entertainment purposes only.\\nUser: " + text;
    const url = "https://text.pollinations.ai/" + encodeURIComponent(prompt);
    const ctrl = new AbortController();
    const t = setTimeout(() => ctrl.abort(), 22000);
    try {
      const r = await fetch(url, { signal: ctrl.signal });
      clearTimeout(t);
      if (!r.ok) return null;
      const out = (await r.text()).trim();
      return out ? out.slice(0, 1000) : null;
    } catch (e) {
      clearTimeout(t);
      return null;
    }
  },
  async reply(text) {
    if (this.shouldStayLocal(text)) return this.localReply(text);
    if (this.cloudEnabled()) {
      const cloud = await this.cloudReply(text);
      if (cloud) return cloud;
    }
    return this.localReply(text);
  },
  listen(cb) {
    if (!("webkitSpeechRecognition" in window) && !("SpeechRecognition" in window)) {
      alert("Speech recognition not supported in this browser.");
      return;
    }
    const Rec = window.SpeechRecognition || window.webkitSpeechRecognition;
    const rec = new Rec();
    rec.lang = "en-US";
    rec.interimResults = false;
    rec.onresult = (e) => cb(e.results[0][0].transcript);
    rec.onerror = () => {};
    rec.start();
  },
  speak(text) {
    if (!window.speechSynthesis || this.speaking) return;
    this.speaking = true;
    const u = new SpeechSynthesisUtterance(text);
    u.rate = 1.03;
    u.pitch = 1.06;
    u.onend = () => { this.speaking = false; };
    window.speechSynthesis.speak(u);
  }
};
