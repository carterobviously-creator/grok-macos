const Aura = {
  reply(text) {
    const q = text.toLowerCase().trim();
    if (!q) return "Say something and I’ll try to help.";
    if (/(hello|hi|hey)/.test(q)) return "Hi. I’m Aura, the on-device helper in this Lumen mock. Ask me to open apps or tell the time.";
    if (/time|clock/.test(q)) return "It’s " + new Date().toLocaleTimeString();
    if (/date/.test(q)) return "Today is " + new Date().toLocaleDateString(undefined, { weekday: "long", month: "long", day: "numeric" });
    if (/open finder|files/.test(q)) { Desktop.openApp("finder"); return "Opening Files."; }
    if (/open notes/.test(q)) { Desktop.openApp("notes"); return "Opening Notes."; }
    if (/open calc/.test(q)) { Desktop.openApp("calc"); return "Opening Calculator."; }
    if (/open (browser|web|safari)/.test(q)) { Desktop.openApp("web"); return "Opening Web."; }
    if (/open settings|prefs/.test(q)) { Desktop.openApp("settings"); return "Opening Settings."; }
    if (/store|gallery|apps/.test(q)) { Desktop.openApp("store"); return "Opening Gallery."; }
    if (/who|what are you|siri|apple/.test(q))
      return "This is a fan-made desktop mock called Lumen. Aura is a tiny scripted helper, not Apple Siri or Apple Intelligence.";
    if (/weather/.test(q)) return "Mock forecast: clear, 72° with a light breeze.";
    if (/joke/.test(q)) return "Why did the window refuse to close? It had too many tabs open.";
    if (/help|what can/.test(q))
      return "Try: open notes, open files, what time is it, tell a joke, or search with ⌘K.";
    return "I only have a small on-device phrase book in this demo. Try asking to open an app or for the time.";
  }
};
