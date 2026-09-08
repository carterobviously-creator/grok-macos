const AuraModel = {
  ready: false,
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
  load() {
    this.ready = true;
    return Promise.resolve(true);
  },
  pick(list) {
    return list[Math.floor(Math.random() * list.length)];
  },
  localReply(q) {
    const t = (q || "").toLowerCase();
    if (/help|what can/.test(t)) return this.pick(this.book.help);
    if (/time|clock/.test(t)) return this.pick(this.book.time);
    if (/weather|temp/.test(t)) return this.pick(this.book.weather);
    if (/joke|funny/.test(t)) return this.pick(this.book.joke);
    if (/about|lumen|who are/.test(t)) return this.pick(this.book.about);
    if (/hello|hi |hey/.test(t)) return this.pick(this.book.greet);
    if (/open /.test(t)) return "Say the app name after open, or use Spotlight.";
    return "I only match a small local phrase book unless the optional demo API is on in Settings.";
  }
};
