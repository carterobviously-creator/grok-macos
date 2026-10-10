const Aura = {
  speaking: false,
  cloudEnabled() {
    return localStorage.getItem("lumen-aura-cloud") !== "0";
  },
  shouldStayLocal(q) {
    return /open |launch |start |show |what time|what is [0-9]|calculate|mission|help\b|who are you|what are you|lock/.test(q.toLowerCase());
  },
  localReply(text) {
    const q = text.toLowerCase().trim();
    if (!q) return "Say something and I will try to help.";
    if (window.VistaAura && typeof VistaAura.extra === "function") {
      const extra = VistaAura.extra(text);
      if (extra) return extra;
    }
    if (/(hello|hi|hey|good morning|good evening)/.test(q)) {
      return "Hi! I'm Aura, your helper in this Lumen desktop mock. I can open apps, take notes, set reminders, do math, tell the time, or chat with a tiny local model plus optional AI.";
    }
    if (/time|clock/.test(q) && !/open/.test(q)) return "It is " + new Date().toLocaleTimeString([], { hour: "numeric", minute: "2-digit" });
    if (/date|today/.test(q)) {
      return "Today is " + new Date().toLocaleDateString(undefined, { weekday: "long", month: "long", day: "numeric", year: "numeric" });
    }
    if (/battery/.test(q)) return "Battery is " + (AuraModel.facts.battery || "84% mock") + ".";
    const remind = q.match(/remind me to (.+)/);
    if (remind && typeof Apps !== "undefined") {
      const list = JSON.parse(localStorage.getItem("lumen-reminders") || "[]");
      list.push(remind[1]);
      localStorage.setItem("lumen-reminders", JSON.stringify(list));
      if (typeof Desktop !== "undefined") Desktop.openApp("reminders");
      return "Added reminder: " + remind[1];
    }
    const note = q.match(/(?:note|write down|save)\s+(.+)/);
    if (note) {
      const prev = localStorage.getItem("lumen-note") || "";
      localStorage.setItem("lumen-note", prev + (prev ? "\n" : "") + note[1]);
      if (typeof Desktop !== "undefined") Desktop.openApp("notes");
      return "Saved that in Notes.";
    }
    const math = AuraModel.math(q);
    if (math && /(what is|whats|calculate|plus|minus|times|divided|how much)/.test(q)) return math;
    const map = [
      { re: /files|finder/, id: "finder", msg: "Opening Files." },
      { re: /notes/, id: "notes", msg: "Opening Notes." },
      { re: /calc|calculator/, id: "calc", msg: "Opening Calculator." },
      { re: /web|browser|safari/, id: "web", msg: "Opening Web." },
      { re: /settings|prefs|preferences/, id: "settings", msg: "Opening Settings." },
      { re: /store|gallery|app store/, id: "store", msg: "Opening Gallery." },
      { re: /calendar/, id: "calendar", msg: "Opening Calendar." },
      { re: /music/, id: "music", msg: "Opening Music." },
      { re: /photo/, id: "photos", msg: "Opening Photos." },
      { re: /term|terminal/, id: "terminal", msg: "Opening Terminal." },
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
      { re: /phone|call/, id: "phone", msg: "Opening Phone." },
      { re: /flow|shortcut/, id: "flows", msg: "Opening Flows." },
      { re: /camera/, id: "camera", msg: "Opening Camera." },
      { re: /sketch|draw/, id: "sketch", msg: "Opening Sketch." },
      { re: /radio/, id: "radio", msg: "Opening Radio." },
      { re: /board|tic/, id: "board", msg: "Opening Board." },
      { re: /launch/, id: "launch", msg: "Opening Launchpad." },
      { re: /mission/, id: "mission", msg: "Opening Mission Control." }
    ];
    for (const item of map) {
      if (item.re.test(q) && (/open|launch|start|show|go to/.test(q) || q.split(" ").length < 5)) {
        if (item.id === "mission" && typeof Desktop !== "undefined") Desktop.toggleMission();
        else if (typeof Desktop !== "undefined") Desktop.openApp(item.id);
        return item.msg;
      }
    }
    if (/rewrite|shorter|summar|summarize/.test(q)) {
      const cleaned = text.replace(/^(rewrite|make shorter|summarize)\s*/i, "").trim();
      if (!cleaned) return "Paste a sentence after rewrite.";
      const words = cleaned.split(/\s+/);
      return words.slice(0, Math.max(6, Math.ceil(words.length * 0.55))).join(" ") + ".";
    }
    if (/who|what are you|siri|apple intelligence|apple|macos/.test(q)) {
      return "This is Lumen, a fan-made browser desktop mock for entertainment. Aura is a local phrase helper plus optional public AI demo. It is not Siri, not Apple Intelligence, and not affiliated with Apple.";
    }
    if (/weather|forecast|temperature/.test(q)) return "Mock forecast: " + (AuraModel.facts.weather || "clear, 72°") + ".";
    if (/joke|funny/.test(q)) return "Why did the desktop go to therapy? It had too many unresolved windows.";
    if (/help|what can|commands/.test(q)) {
      return "Try: open notes, open files, remind me to stretch, note buy milk, what is 15 times 7, what time is it, tell a joke, or just chat. Press ⌘Space anytime. Demo AI replies stay on unless turned off in Settings.";
    }
    if (/thank/.test(q)) return "You're welcome! Anything else?";
    const near = AuraModel.nearest(q);
    if (near) return near;
    if (window.TinyMind && TinyMind.ready) return TinyMind.reply(q);
    const bits = q.replace(/[^a-z0-9\s]/g, "").split(/\s+/).filter(Boolean);
    if (bits.length) {
      return "I heard \"" + bits.slice(0, 8).join(" ") + "\". Try open notes, remind me to…, what time is it, or help.";
    }
    return "Try asking to open an app, the time, or help.";
  },
  async cloudReply(text) {
    const prompt = "You are Aura, a concise, friendly assistant inside Lumen, a fan-made browser desktop mock (entertainment only, not affiliated with Apple). Do not claim to be Siri, Apple Intelligence, or macOS. Answer in 1-3 short sentences. Be helpful and light.\nUser: " + text;
    const url = "https://text.pollinations.ai/" + encodeURIComponent(prompt);
    const ctrl = new AbortController();
    const t = setTimeout(() => ctrl.abort(), 12000);
    try {
      const r = await fetch(url, { signal: ctrl.signal });
      clearTimeout(t);
      if (!r.ok) return null;
      const out = (await r.text()).trim();
      return out ? out.slice(0, 700) : null;
    } catch (e) {
      clearTimeout(t);
      return null;
    }
  },
  async reply(text) {
    if (!AuraModel.ready) await AuraModel.load();
    if (window.TinyMind && !TinyMind.ready) {
      try { await TinyMind.load(); } catch (e) {}
    }
    const local = this.localReply(text);
    if (this.shouldStayLocal(text) || !this.cloudEnabled()) return local;
    const cloud = await this.cloudReply(text);
    return cloud || local;
  },
  speak(text) {
    if (!window.speechSynthesis) return;
    const vol = document.getElementById("vol");
    if (vol && Number(vol.value) === 0) return;
    window.speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(text);
    u.rate = 1.0;
    u.pitch = 1.05;
    if (vol) u.volume = Number(vol.value) / 100;
    window.speechSynthesis.speak(u);
  },
  listen(onText) {
    const Rec = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!Rec) {
      if (typeof Desktop !== "undefined") Desktop.toast("Speech recognition is not available in this browser.");
      return;
    }
    const rec = new Rec();
    rec.lang = "en-US";
    rec.interimResults = false;
    const mic = document.getElementById("aura-mic");
    if (mic) mic.classList.add("listening");
    rec.onresult = (e) => {
      const said = e.results[0][0].transcript;
      onText(said);
    };
    rec.onend = () => { if (mic) mic.classList.remove("listening"); };
    rec.start();
  }
};
