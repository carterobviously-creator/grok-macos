const Aura = {
  history: [],
  speaking: false,
  localReply(text) {
    const q = text.toLowerCase().trim();
    if (!q) return "Say something and I will try to help.";
    if (/(hello|hi|hey)/.test(q)) {
      return "Hi. I am Aura, the helper in this Lumen mock. Ask me to open apps, rewrite a sentence, or tell the time.";
    }
    if (/time|clock/.test(q)) return "It is " + new Date().toLocaleTimeString();
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
      { re: /launch/, id: "launch", msg: "Opening Launchpad." }
    ];
    for (const item of map) {
      if (item.re.test(q) && (/open|launch|start|show/.test(q) || q.split(" ").length < 4)) {
        if (typeof Desktop !== "undefined") Desktop.openApp(item.id);
        return item.msg;
      }
    }
    if (/rewrite|shorter|summar/.test(q)) {
      const cleaned = text.replace(/^(rewrite|make shorter|summarize)\s*/i, "").trim();
      if (!cleaned) return "Paste a sentence after rewrite.";
      const words = cleaned.split(/\s+/);
      return words.slice(0, Math.max(6, Math.ceil(words.length * 0.6))).join(" ") + ".";
    }
    if (/who|what are you|siri|apple intelligence|apple/.test(q)) {
      return "This is a fan-made desktop mock called Lumen. Aura is not Siri or Apple Intelligence. When the cloud helper is available it uses Puter AI; otherwise it uses a local phrase book.";
    }
    if (/weather/.test(q)) return "Mock forecast: clear, 72 degrees with a light breeze.";
    if (/joke/.test(q)) return "Why did the window refuse to close? It had too many tabs open.";
    if (/help|what can/.test(q)) {
      return "Try: open notes, open weather, rewrite this sentence, what time is it, tell a joke, or press Command-K / F4. You can also use the mic.";
    }
    if (/thank/.test(q)) return "You are welcome.";
    const bits = q.replace(/[^a-z0-9\s]/g, "").split(/\s+/).filter(Boolean);
    if (bits.length) {
      return "I heard \"" + bits.slice(0, 8).join(" ") + "\". Local helper only understood part of that. Enable cloud Aura in Settings if you want fuller answers.";
    }
    return "Try asking to open an app or for the time.";
  },
  cloudEnabled() {
    return localStorage.getItem("lumen-cloud-aura") !== "off";
  },
  async reply(text) {
    const local = this.localReply(text);
    if (/Opening |It is |Today is /.test(local) && /open|launch|time|date|clock/i.test(text)) {
      return local;
    }
    if (this.cloudEnabled() && typeof puter !== "undefined" && puter.ai && puter.ai.chat) {
      try {
        const system = "You are Aura, a short helpful assistant inside Lumen, a fan-made desktop mock. You are not Siri and not affiliated with Apple. Keep answers under 80 words. If the user asks to open an app, say you will and name it.";
        this.history.push({ role: "user", content: text });
        const res = await puter.ai.chat([
          { role: "system", content: system },
          ...this.history.slice(-8)
        ]);
        const out = typeof res === "string" ? res : (res.message && res.message.content) || String(res);
        this.history.push({ role: "assistant", content: out });
        if (/open /i.test(text)) this.localReply(text);
        return out;
      } catch (err) {
        return local + " (cloud helper unavailable just now)";
      }
    }
    return local;
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
