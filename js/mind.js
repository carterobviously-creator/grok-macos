const TinyMind = {
  ready: false,
  tokens: 0,
  next: {},
  lines: [],
  async load() {
    if (this.ready) return true;
    const res = await fetch("data/mind.json");
    if (!res.ok) throw new Error("mind");
    const data = await res.json();
    this.lines = data.lines || [];
    this.train(this.lines);
    this.ready = true;
    return true;
  },
  train(lines) {
    this.next = {};
    this.tokens = 0;
    lines.forEach((line) => {
      const words = ("<s> " + line.toLowerCase().replace(/[^a-z0-9\s]/g, "") + " </s>").split(/\s+/);
      for (let i = 0; i < words.length - 1; i += 1) {
        const a = words[i];
        const b = words[i + 1];
        if (!this.next[a]) this.next[a] = {};
        this.next[a][b] = (this.next[a][b] || 0) + 1;
        this.tokens += 1;
      }
    });
  },
  bestLine(q) {
    const words = q.toLowerCase().replace(/[^a-z0-9\s]/g, "").split(/\s+/).filter((w) => w.length > 2);
    let best = "";
    let score = 0;
    this.lines.forEach((line) => {
      const hit = words.filter((w) => line.indexOf(w) !== -1).length;
      if (hit > score) {
        score = hit;
        best = line;
      }
    });
    return score ? best : "";
  },
  continueFrom(seed) {
    let cur = seed || "<s>";
    const out = [];
    for (let i = 0; i < 14; i += 1) {
      const bag = this.next[cur];
      if (!bag) break;
      const keys = Object.keys(bag);
      let total = 0;
      keys.forEach((k) => { total += bag[k]; });
      let pick = Math.random() * total;
      let chosen = keys[0];
      for (const k of keys) {
        pick -= bag[k];
        if (pick <= 0) { chosen = k; break; }
      }
      if (chosen === "</s>") break;
      out.push(chosen);
      cur = chosen;
    }
    return out.join(" ");
  },
  reply(q) {
    const hit = this.bestLine(q);
    if (hit) return "Tiny mind: " + hit + ".";
    const gen = this.continueFrom("<s>");
    return gen
      ? "Tiny mind sketch: " + gen + "."
      : "Tiny mind is loaded, but that phrase is outside the boot book.";
  }
};
