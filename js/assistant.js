// Aura — mock Siri / Apple Intelligence inspired assistant for Lumen Desktop
// Entertainment mock only. Not Siri. Not Apple Intelligence.
// Uses local phrase book + optional free text endpoint for conversational replies.

const Aura = {
  ready: false,
  cloud: false,

  load() {
    this.ready = true;
    // Tiny local model "load" simulation already done at boot
    console.log("Aura tiny model ready");
  },

  cloudEnabled() {
    return localStorage.getItem("lumen-aura-cloud") === "1";
  },

  setCloud(on) {
    localStorage.setItem("lumen-aura-cloud", on ? "1" : "0");
    this.cloud = on;
  },

  async reply(text) {
    const q = (text || "").trim().toLowerCase();
    if (!q) return "How can I help?";

    // Local fast responses (tiny LLM style)
    if (q.includes("hello") || q.includes("hi ") || q === "hi") return "Hello! I'm Aura, your local helper on Lumen. What would you like to do?";
    if (q.includes("time")) return "It's " + new Date().toLocaleTimeString([], {hour: "numeric", minute: "2-digit"});
    if (q.includes("date") || q.includes("day")) return new Date().toLocaleDateString(undefined, {weekday: "long", month: "long", day: "numeric", year: "numeric"});
    if (q.includes("weather")) return "Clear skies around 72° on this mock desktop. (Weather data is simulated.)";
    if (q.includes("open ") || q.includes("launch ")) {
      const app = q.replace(/open |launch /g, "").trim();
      const map = {files: "finder", notes: "notes", calc: "calc", calculator: "calc", web: "web", browser: "web", gallery: "store", store: "store", settings: "settings", terminal: "terminal", music: "music", photos: "photos", calendar: "calendar", mail: "mail", maps: "maps"};
      const id = map[app] || app;
      if (Desktop && Desktop.openApp) {
        setTimeout(() => Desktop.openApp(id), 200);
        return "Opening " + (Desktop.labels[id] || app) + " for you.";
      }
    }
    if (q.includes("note") || q.includes("remind")) return "I can help with notes and reminders in the mock apps. Try opening Notes or Reminders.";
    if (/what is \d+ [\+\-\*\/] \d+/.test(q) || /\d+ [\+\-\*\/] \d+/.test(q)) {
      try {
        const expr = q.replace(/what is /g, "").replace(/[^0-9+\-*/(). ]/g, "");
        // Safe-ish eval for simple math
        const res = Function('"use strict";return (' + expr + ')')();
        return "That's " + res;
      } catch (e) {}
    }
    if (q.includes("help")) return "I can open apps (say 'open notes'), tell the time, do simple math, summarize ideas, or chat. Enable Demo AI in Settings for longer answers via a free endpoint.";

    // Optional cloud AI via pollinations (free public text endpoint)
    if (this.cloudEnabled() || localStorage.getItem("lumen-aura-cloud") === "1") {
      try {
        const prompt = "You are Aura, a helpful desktop assistant in an entertainment mock OS called Lumen (inspired by Liquid Glass design but not macOS or Apple). Keep replies short, friendly, and useful. User: " + text;
        const url = "https://text.pollinations.ai/" + encodeURIComponent(prompt);
        const res = await fetch(url);
        if (res.ok) {
          const answer = await res.text();
          return answer.trim() || "I couldn't generate a reply right now.";
        }
      } catch (e) {
        console.warn("Cloud AI unavailable", e);
      }
    }

    // Fallback local
    return "I'm running in local mode. Try 'open notes', 'what's the time', or enable the Demo AI toggle in Settings for fuller conversations. (Entertainment mock only.)";
  },

  speak(text) {
    if (!window.speechSynthesis) return;
    const u = new SpeechSynthesisUtterance(text);
    u.rate = 1.05;
    u.pitch = 1.05;
    speechSynthesis.speak(u);
  },

  listen(callback) {
    const Rec = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!Rec) {
      Desktop.toast && Desktop.toast("Voice input not supported in this browser.");
      return;
    }
    const rec = new Rec();
    rec.lang = "en-US";
    rec.onresult = (e) => {
      const said = e.results[0][0].transcript;
      if (callback) callback(said);
    };
    rec.onerror = () => Desktop.toast && Desktop.toast("Mic error. Try typing.");
    rec.start();
    Desktop.toast && Desktop.toast("Listening…");
  }
};

// Auto-load
if (typeof AuraModel === "undefined") {
  window.AuraModel = { load() { Aura.load(); }, ready: true };
}
