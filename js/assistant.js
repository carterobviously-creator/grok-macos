const Aura = {
  reply(text) {
    const q = text.toLowerCase().trim();
    if (!q) return "Say something and I’ll try to help.";
    if (/(hello|hi|hey)/.test(q)) return "Hi. I’m Aura, the on-device helper in this Lumen mock. Ask me to open apps or tell the time.";
    if (/time|clock/.test(q)) return "It’s " + new Date().toLocaleTimeString();
    if (/date/.test(q)) return "Today is " + new Date().toLocaleDateString(undefined, { weekday: "long", month: "long", day: "numeric" });
    const opens = [
      [/finder|files/, "finder", "Opening Files."],
      [/notes/, "notes", "Opening Notes."],
      [/calc/, "calc", "Opening Calculator."],
      [/(browser|web|safari)/, "web", "Opening Web."],
      [/settings|prefs/, "settings", "Opening Settings."],
      [/store|gallery|apps/, "store", "Opening Gallery."],
      [/calendar/, "calendar", "Opening Calendar."],
      [/music/, "music", "Opening Music."],
      [/photo/, "photos", "Opening Photos."],
      [/term/, "terminal", "Opening Terminal."],
      [/mail|email/, "mail", "Opening Mail."],
      [/map/, "maps", "Opening Maps."],
      [/sticky/, "stickies", "Opening Stickies."]
    ];
    for (const [re, id, msg] of opens) {
      if (re.test(q) && /open|launch|start|show/.test(q) || (re.test(q) && q.split(" ").length <= 3 && /open|files|notes|calc|web|settings|gallery|calendar|music|photos|terminal|mail|maps|stickies/.test(q))) {
        if (typeof Desktop !== "undefined") Desktop.openApp(id);
        return msg;
      }
    }
    if (/who|what are you|siri|apple intelligence/.test(q))
      return "This is a fan-made desktop mock called Lumen. Aura is a tiny scripted helper, not Apple Siri or Apple Intelligence.";
    if (/weather/.test(q)) return "Mock forecast: clear, 72° with a light breeze.";
    if (/joke/.test(q)) return "Why did the window refuse to close? It had too many tabs open.";
    if (/help|what can/.test(q))
      return "Try: open notes, open files, what time is it, tell a joke, or search with ⌘K.";
    if (/thank/.test(q)) return "You’re welcome.";
    const bits = q.replace(/[^a-z0-9\s]/g, "").split(/\s+/).filter(Boolean);
    if (bits.length) {
      return "I heard “" + bits.slice(0, 8).join(" ") + 