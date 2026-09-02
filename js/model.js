/* Tiny offline phrase model loaded at boot. Not a neural net and not a product AI. */
const AuraModel = {
  ready: false,
  facts: {
    name: "Aura",
    desktop: "Lumen",
    weather: "clear, 72 degrees (mock)",
    battery: "84 percent (mock)"
  },
  phrases: [],
  load() {
    this.phrases = [
      ["hello", "Hi. I am Aura, the offline helper in this Lumen mock."],
      ["help", "Try open notes, open weather, rewrite a sentence, what is 12 times 8, time, joke, mission control."],
      ["joke", "Why did the window refuse to close? It had too many tabs open."],
      ["thanks", "You are welcome."],
      ["who", "This is Lumen, a fan-made desktop mock. Aura is offline only."]
    ];
    this.ready = true;
    return Promise.resolve(true);
  },
  math(q) {
    const m = q.match(/([-+/*()0-9.\s]+)/);
    if (!m) return null;
    const expr = m[1].replace(/[^0-9+\-/*().\s]/g, "");
    if (!/[0-9]/.test(expr)) return null;
    try {
      const n = Function('"use strict"; return (' + expr + ")")();
      if (typeof n === "number" && isFinite(n)) return "That comes to " + n + ".";
    } catch (e) {}
    return null;
  },
  nearest(q) {
    const bits = q.toLowerCase().split(/\s+/);
    let best = null, score = 0;
    this.phrases.forEach((p) => {
      let s = 0;
      bits.forEach((b) => { if (p[0].indexOf(b) !== -1 || b.indexOf(p[0]) !== -1) s += 1; });
      if (s > score) { score = s; best = p[1]; }
    });
    return score ? best : null;
  }
};
