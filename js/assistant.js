const Aura = {
  reply(text) {
    const q = text.toLowerCase().trim();
    if (!q) return "Say something and I will try to help.";
    if (/(hello|hi|hey)/.test(q)) {
      return "Hi. I am Aura, the on-device helper in this Lumen mock. Ask me to open apps or tell the time.";
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
      { re: /sticky/, id: "stickies", msg: "Opening Stickies." }
    ];
    for (const item of map) {
      if (item.re.test(q) && (/open|launch|start|show/.test(q) || q.split(" ").length < 4)) {
        if (typeof Desktop !== "undefined") Desktop.openApp(item.id);
        return item.msg;
      }
    }
    if (/who|what are you|siri|apple/.test(q)) {
      return "This is a fan-made desktop mock called Lumen. Aura is a tiny scripted helper, not Apple Siri or Apple Intelligence.";
    }
    if (/weather/.test(q)) return "Mock forecast: clear, 72 degrees with a light breeze.";
    if (/joke/.test(q)) return "Why did the window refuse to close? It had too many tabs open.";
    if (/help|what can/.test(q)) {
      return "Try: open notes, open files, what time is it, tell a joke, or search with Command-K.";
    }
    if (/thank/.test(q)) return "You are welcome.";
    const bits = q.replace(/[^a-z0-9\s]/g, "").split(/\s+/).filter(Boolean);
    if (bits.length) {
      return "I heard \"" + bits.slice(0, 8).join(" ") + "\". I only have a small on-device phrase book in this demo.";
    }
    return "I only have a small on-device phrase book in this demo. Try asking to open an app or for the time.";
  }
};
