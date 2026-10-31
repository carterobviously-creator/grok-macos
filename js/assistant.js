// Aura — enhanced mock Siri / Apple Intelligence inspired assistant for Lumen Desktop
// Entertainment mock only. Not Siri. Not Apple Intelligence.
// Uses local phrase book + free text endpoint (pollinations.ai) for conversational AI replies.
// Tiny local model simulated at boot. Improved natural responses and error handling.

const Aura = {
  ready: false,
  cloud: true,

  load() {
    this.ready = true;
    this.setCloud(true);
    console.log("Aura tiny model + cloud ready");
  },

  cloudEnabled() {
    return localStorage.getItem("lumen-aura-cloud") !== "0";
  },

  setCloud(on) {
    localStorage.setItem("lumen-aura-cloud", on ? "1" : "0");
    this.cloud = on;
  },

  async reply(text) {
    const q = (text || "").trim().toLowerCase();
    if (!q) return "How can I help you today?";

    // Enhanced local fast responses
    if (q.includes("hello") || q.includes("hi ") || q === "hi" || q.includes("hey")) return "Hello! I'm Aura, your intelligent helper on Lumen Desktop. What can I do for you today?";
    if (q.includes("time")) return "It's " + new Date().toLocaleTimeString([], {hour: "numeric", minute: "2-digit"}) + ".";
    if (q.includes("date") || q.includes("day")) return "Today is " + new Date().toLocaleDateString(undefined, {weekday: "long", month: "long", day: "numeric", year: "numeric"}) + ".";
    if (q.includes("weather")) return "Currently clear skies with a high of 72°. Perfect day to explore the desktop! (Simulated weather data for this mock.)";
    if (q.includes("open ") || q.includes("launch ") || q.includes("start ")) {
      const app = q.replace(/open |launch |start /g, "").trim();
      const map = {files: "finder", notes: "notes", calc: "calc", calculator: "calc", web: "web", browser: "web", safari: "web", gallery: "store", store: "store", "app store": "store", settings: "settings", terminal: "terminal", music: "music", photos: "photos", calendar: "calendar", mail: "mail", maps: "maps", reminders: "reminders", messages: "messages", contacts: "contacts", weather: "weather", stickies: "stickies"};
      const id = map[app] || app;
      if (typeof Desktop !== "undefined" && Desktop.openApp) {
        setTimeout(() => Desktop.openApp(id), 180);
        return "Opening " + (Desktop.labels[id] || app) + " for you.";
      }
    }
    if (q.includes("note") || q.includes("remind")) return "I can help with notes and reminders. Try saying 'open notes' or tell me what to save.";
    if (/what is \d+ [\+\-\*\/] \d+/.test(q) || /\d+ [\+\-\*\/] \d+/.test(q) || /calculate/.test(q)) {
      try {
        const expr = q.replace(/what is |calculate /g, "").replace(/[^0-9+\-*/(). ]/g, "");
        const res = Function('"use strict";return (' + expr + ')')();
        return "That's " + res + ".";
      } catch (e) {}
    }
    if (q.includes("help") || q.includes("what can you do")) return "I can open apps (say open notes or open settings), tell the time or date, do math, answer questions with AI, manage notes, control the desktop, and more. Voice input supported where available. This is an entertainment mock — not the real Siri.";

    // Cloud AI via free public text endpoint for full conversational "Intelligence"
    if (this.cloudEnabled()) {
      try {
        const prompt = "You are Aura, a helpful, witty, concise, and intelligent desktop assistant in Lumen Desktop — an entertainment mock inspired by the latest Liquid Glass desktop OS (macOS Golden Gate 27.2 / Tahoe style, but original and not affiliated with Apple). Respond naturally and helpfully. You can suggest opening apps or controlling the mock. Never claim to be the real Siri or Apple Intelligence. Keep responses under 150 words. Be engaging. User query: " + text;
        const url = "https://text.pollinations.ai/" + encodeURIComponent(prompt);
        const res = await fetch(url, { method: "GET", signal: AbortSignal.timeout(12000) });
        if (res.ok) {
          let answer = (await res.text()).trim();
          if (answer && answer.length > 5 && !answer.toLowerCase().includes("error") && !answer.toLowerCase().includes("sorry, i cannot") && !answer.toLowerCase().includes("unable to")) {
            return answer;
          }
        }
      } catch (e) {
        console.warn("Cloud AI unavailable", e);
      }
    }

    // Fallback local
    return "I'm here to help! Try 'open notes', ask a question, or 'what's the time'. (Entertainment mock with optional AI replies.)";
  },

  speak(text) {
    if (!window.speechSynthesis) return;
    const u = new SpeechSynthesisUtterance(text);
    u.rate = 1.05;
    u.pitch = 1.05;
    u.volume = 0.9;
    speechSynthesis.speak(u);
  },

  listen(callback) {
    const Rec = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!Rec) {
      if (typeof Desktop !== "undefined" && Desktop.toast) Desktop.toast("Voice input not supported in this browser.");
      return;
    }
    const rec = new Rec();
    rec.lang = "en-US";
    rec.interimResults = false;
    rec.onresult = (e) => {
      const said = e.results[0][0].transcript;
      if (callback) callback(said);
    };
    rec.onerror = () => {
      if (typeof Desktop !== "undefined" && Desktop.toast) Desktop.toast("Mic error. Try typing instead.");
    };
    rec.start();
    if (typeof Desktop !== "undefined" && Desktop.toast) Desktop.toast("Listening…");
  }
};

// Auto-load compatibility
if (typeof AuraModel === "undefined") {
  window.AuraModel = { load() { Aura.load(); }, ready: true };
}
if (typeof TinyMind === "undefined") {
  window.TinyMind = { load: () => Promise.resolve() };
}
