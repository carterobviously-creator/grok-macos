/* Tiny offline phrase model loaded at boot. Not a neural net. */
const AuraModel = {
  ready: false,
  facts: {
    name: "Aura",
    desktop: "Lumen",
    weather: "clear, 72 degrees (mock)",
    battery: "84 percent (mock)"
  },
  load() {
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
  }
};
