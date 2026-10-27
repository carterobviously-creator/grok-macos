// Aura — mock Siri / Apple Intelligence inspired assistant for Lumen Desktop
// Entertainment mock only. Not Siri. Not Apple Intelligence.
// Uses local phrase book + free text endpoint (pollinations.ai) for conversational AI replies.
// Tiny local model simulated at boot.

const Aura = {
  ready: false,
  cloud: true, // Default on for better "Intelligence" mock

  load() {
    this.ready = true;
    this.setCloud(true); // Ensure default enabled
    console.log("Aura tiny model + cloud ready");
  },

  cloudEnabled() {
    return localStorage.getItem("lumen-aura-cloud") !== "0"; // Default true
  },

  setCloud(on) {
    localStorage.setItem("lumen-aura-cloud", on ? "1" : "0");
    this.cloud = on;
  },

  async reply(text) {
    const q = (text || "").trim().toLowerCase();
    if (!q) return "How can I help you today?";

    // Local fast responses (tiny LLM style)
    if (q.includes("hello") || q.includes("hi ") || q === "hi" || q.includes("hey")) return "Hello! I'm Aura, your intelligent helper on Lumen Desktop. What can I do for you?";
    if (q.includes("time")) return "It's " + new Date().toLocaleTimeString([], {hour: "numeric", minute: "2-digit"});
    if (q.includes("date") || q.includes("day")) return new Date().toLocaleDateString(undefined, {weekday: "long", month: "long", day: "numeric", year: "numeric"});
    if (q.includes("weather")) return "Clear skies around 72° on this mock desktop. (Simulated weather data.)";
    if (q.includes("open ") || q.includes("launch ") || q.includes("start ")) {
      const app = q.replace(/open |launch |start /g, "").trim();
      const map = {files: "finder", notes: "notes", calc: "calc", calculator: "calc", web: "web", browser: "web", safari: "web", gallery: "store", store: "store", "app store": "store", settings: "settings", terminal: "terminal", music: "music", photos: "photos", calendar: "calendar", mail: "mail", maps: "maps", reminders: "reminders"};
      const id = map[app] || app;
      if (Desktop && Desktop.openApp) {
        setTimeout(() => Desktop.openApp(id), 200);
        return "Opening " + (Desktop.labels[id] || app) + " for you.";
      }
    }
    if (q.includes("note") || q.includes("remind")) return "I can help with notes and reminders. Try opening Notes or Reminders, or just tell me what to save.";
    if (/what is \d+ [\+\-\*\/] \d+/.test(q) || /\d+ [\+\-\*\/] \d+/.test(q) || /calculate/.test(q)) {
      try {
        const expr = q.replace(/what is |calculate /g, "").replace(/[^0-9+\-*/(). ]/g, "");
        const res = Function('"use strict";return (' + expr + ')')();
        return "That's " + res + ".";
      } catch (e) {}
    }
    if (q.includes("help")) return "I can open apps (say 'open notes'), tell the time/date, do math, answer questions, summarize, generate ideas, and more. Voice input available via the mic. This is an entertainment mock with AI assistance.";

    // Cloud AI via free public text endpoint for full "Intelligence"
    if (this.cloudEnabled()) {
      try {
        const prompt = "You are Aura, a smart, friendly desktop assistant in Lumen Desktop, an entertainment mock OS inspired by modern Liquid Glass design (not the real macOS or Apple). You help with apps, notes, calculations, questions, ideas, and general conversation. Keep replies concise (1-3 sentences), helpful, and natural. Do not claim to be Siri or Apple. User query: " + text;
        const url = "https://text.pollinations.ai/" + encodeURIComponent(prompt);
        const res = await fetch(url, { method: "GET" });
        if (res.ok) {
          const answer = (await res.text()).trim();
          if (answer && answer.length > 5) return answer;
        }
      } catch (e) {
        console.warn("Cloud AI unavailable", e);
      }
    }

    // Fallback local
    return "I'm here to help! Try 'open notes', ask a question, or 'what's the time'. (Entertainment mock with optional AI.)";
  },

  speak(text) {
    if (!window.speechSynthesis) return;
    const u = new SpeechSynthesisUtterance(text);
    u.rate = 1.02;
    u.pitch = 1.0;
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