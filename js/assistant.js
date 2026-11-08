// Aura — enhanced mock Siri / Apple Intelligence inspired assistant for Lumen Desktop
// Entertainment mock only. Not Siri. Not Apple Intelligence.
// Uses local phrase book + free text endpoint (pollinations.ai) for conversational AI replies.
// Tiny local model simulated at boot. Improved natural responses, reliability, and error handling for Lumen 114 (27.3 / Golden Gate inspired).

const Aura = {
  ready: false,
  cloud: true,

  load() {
    this.ready = true;
    this.setCloud(true);
    console.log("Aura tiny model + cloud ready (Lumen 114)");
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
    if (q.includes("hello") || q.includes("hi ") || q === "hi" || q.includes("hey") || q.includes("good morning") || q.includes("good evening")) 
      return "Hello! I'm Aura, your intelligent helper on Lumen Desktop. What can I do for you today?";
    if (q.includes("time")) return "It's " + new Date().toLocaleTimeString([], {hour: "numeric", minute: "2-digit"}) + ".";
    if (q.includes("date") || q.includes("day")) return "Today is " + new Date().toLocaleDateString(undefined, {weekday: "long", month: "long", day: "numeric", year: "numeric"}) + ".";
    if (q.includes("weather")) return "Currently clear skies with a high of 72°. Perfect day to explore the desktop! (Simulated weather data for this mock.)";
    if (q.includes("open ") || q.includes("launch ") || q.includes("start ")) {
      const app = q.replace(/open |launch |start /g, "").trim();
      const map = {files: "finder", notes: "notes", calc: "calc", calculator: "calc", web: "web", browser: "web", safari: "web", gallery: "store", store: "store", "app store": "store", settings: "settings", terminal: "terminal", music: "music", photos: "photos", calendar: "calendar", mail: "mail", maps: "maps", reminders: "reminders", messages: "messages", contacts: "contacts", weather: "weather", stickies: "stickies", clock: "clock", writer: "writer", trash: "trash", aura: "aura"};
      const id = map[app] || app;
      if (typeof Desktop !== "undefined" && Desktop.openApp) {
        setTimeout(() => Desktop.openApp(id), 180);
        return "Opening " + (Desktop.labels[id] || app) + " for you.";
      }
    }
    if (q.includes("volume up") || q.includes("louder")) {
      const vol = document.getElementById("vol");
      if (vol) { vol.value = Math.min(100, parseInt(vol.value) + 10); vol.dispatchEvent(new Event("input")); }
      return "Volume increased.";
    }
    if (q.includes("volume down") || q.includes("quieter")) {
      const vol = document.getElementById("vol");
      if (vol) { vol.value = Math.max(0, parseInt(vol.value) - 10); vol.dispatchEvent(new Event("input")); }
      return "Volume decreased.";
    }
    if (q.includes("glass more") || q.includes("more glass")) {
      const tint = document.getElementById("tint");
      if (tint) { tint.value = Math.min(1, parseFloat(tint.value) + 0.1); tint.dispatchEvent(new Event("input")); }
      return "Liquid Glass intensity increased.";
    }
    if (q.includes("volume") || q.includes("sound")) {
      return "You can adjust volume in Control Center. Current mock volume is around 70%. Try the slider there!";
    }
    if (q.includes("glass") || q.includes("tint") || q.includes("opacity")) {
      if (typeof Desktop !== "undefined" && Desktop.setGlass) {
        const intensity = q.includes("more") || q.includes("higher") ? 0.8 : q.includes("less") || q.includes("lower") ? 0.3 : 0.55;
        Desktop.setGlass(intensity);
        return "Adjusted Liquid Glass intensity. Check Control Center for fine control.";
      }
      return "Adjust Liquid Glass intensity in Control Center with the slider. It affects the refraction and specular highlights.";
    }
    if (q.includes("note") || q.includes("remind")) return "I can help with notes and reminders. Try saying 'open notes' or tell me what to save.";
    if (/what is \d+ [\+\-\*\/] \d+/.test(q) || /\d+ [\+\-\*\/] \d+/.test(q) || /calculate/.test(q)) {
      try {
        const expr = q.replace(/what is |calculate /g, "").replace(/[^0-9+\-*/(). ]/g, "");
        const res = Function('"use strict";return (' + expr + ')')();
        return "That's " + res + ".";
      } catch (e) {}
    }
    if (q.includes("help") || q.includes("what can you do")) return "I can open apps (say open notes or open settings), tell the time or date, do math, answer questions with AI, manage notes, control the desktop, adjust glass effects, and more. Voice input supported where available. This is an entertainment mock — not the real Siri.";

    // Cloud AI via free public text endpoint for full conversational "Intelligence"
    if (this.cloudEnabled()) {
      try {
        const prompt = "You are Aura, the intelligent AI helper built into Lumen Desktop (an entertainment-only browser mock inspired by modern Liquid Glass desktop design, not affiliated with Apple). Act like a modern, helpful voice assistant: concise when possible, proactive with suggestions, able to open apps or adjust settings. Never claim to be Siri or Apple Intelligence. Be friendly, practical, slightly witty. Keep replies under 80 words. User: " + text;
        const url = "https://text.pollinations.ai/" + encodeURIComponent(prompt);
        const res = await fetch(url, { method: "GET", signal: AbortSignal.timeout(20000) });
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
    // Prefer a natural voice if available
    const voices = speechSynthesis.getVoices();
    const preferred = voices.find(v => v.lang.startsWith("en") && (v.name.includes("Samantha") || v.name.includes("Google") || v.name.includes("Natural") || v.name.includes("Alex")));
    if (preferred) u.voice = preferred;
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
