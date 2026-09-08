const AuraModel = {
  ready: false,
  facts: {
    weather: "clear, 72° mock",
    battery: "84% mock",
    scene: "harbor dusk"
  },
  book: {
    greet: [
      "Hey. Aura is online as a tiny local helper.",
      "Hi. I am Aura, a phrase book loaded at boot — not a product AI."
    ],
    help: [
      "Try: open notes, open files, open gallery, weather, time, lock, launchpad.",
      "Shortcuts: Command-K search, Command-Space Aura, F3 Mission, F4 Launchpad, Command-L lock, Command-W scene."
    ],
    time: ["Local clock is on the menu bar and the widget."],
    weather: ["Mock weather says clear and 72. This is not a live forecast."],
    joke: ["Why did the window float? It wanted more glass and less gravity."],
    about: ["Lumen is an entertainment desktop mock. Original icons. No Apple marks."]
  },
  phrases: [
    ["lock", "Press Command-L or Control-L to lock."],
    ["scene wallpaper", "Press Command-W or Control-W to cycle wallpaper scenes."],
    ["glass tint", "Open Control Center and drag Glass tint."],
    ["volume", "Sound slider is in Control Center."],
    ["battery", "Battery readout is a mock on the menu bar."],
    ["who made", "This is a fan recreation in the browser. Entertainment only."]
  ],
  load() {
    this.ready = true;
    return Promise.resolve(true);
  },
  pick(list) {
    return list[Math.floor(Math.random() * list.length)];
  },
  math(q) {
    const m = q.replace(/what is|whats|calculate|equals/g, " ");
    const n = m.match(/(-?\d+(?:\.\d+)?)\s*(plus|\+|minus|-|times|x|\*|divided by|\/)\s*(-?\d+(?:\.\d+)?)/);
    if (!n) return null;
    const a = Number(n[1]), b = Number(n[3]), op = n[2];
    let r = 0;
    if (op === "plus" || op === "+") r = a + b;
    else if (op === "minus" || op === "-") r = a - b;
    else if (op === "times" || op === "x" || op === "*") r = a * b;
    else r = b === 0 ? NaN : a / b;
    if (Number.isNaN(r)) return "Cannot divide by zero.";
    return a + " " + op + " " + b + " = " + (Math.round(r * 1000) / 1000);
  },
  nearest(q) {
    const t = q.toLowerCase();
    let best = null, score = 0;
    this.phrases.forEach(([k, v]) => {
      const hit = k.split(" ").filter((w) => t.indexOf(w) !== -1).length;
      if (hit > score) { score = hit; best = v; }
    });
    return score ? best : null;
  },
  localReply(q) {
    const t = (q || "").toLowerCase();
    if (/help|what can/.test(t)) return this.pick(this.book.help);
    if (/time|clock/.test(t)) return this.pick(this.book.time);
    if (/weather|temp/.test(t)) return this.pick(this.book.weather);
    if (/joke|funny/.test(t)) return this.pick(this.book.joke);
    if (/about|lumen|who are/.test(t)) return this.pick(this.book.about);
    if (/hello|hi |hey/.test(t)) return this.pick(this.book.greet);
    const m = this.math(t);
    if (m) return m;
    const n = this.nearest(t);
    if (n) return n;
    if (/open /.test(t)) return "Say the app name after open, or use Spotlight.";
    return "I only match a small local phrase book unless the optional demo API is on in Settings.";
  }
};
