/* Lumen 66. Entertainment mock. Not Apple, not Siri, not Apple Intelligence. */
(function () {
  const Mind66 = { ready: false, data: null };

  function bag(text) {
    const counts = {};
    String(text).toLowerCase().replace(/[^a-z0-9\s]/g, " ").split(/\s+/).filter(Boolean).forEach((w) => {
      counts[w] = (counts[w] || 0) + 1;
    });
    return counts;
  }

  function score(a, b) {
    let dot = 0, na = 0, nb = 0;
    const keys = new Set([...Object.keys(a), ...Object.keys(b)]);
    keys.forEach((k) => {
      const x = a[k] || 0, y = b[k] || 0;
      dot += x * y; na += x * x; nb += y * y;
    });
    return dot / (Math.sqrt(na) * Math.sqrt(nb) || 1);
  }

  async function loadMind() {
    try {
      const r = await fetch("data/mind66.json");
      Mind66.data = await r.json();
      Mind66.ready = true;
      const status = document.getElementById("boot-status");
      if (status) status.textContent = "Loaded micro helper 66";
    } catch (e) { /* file may be missing offline */ }
  }
  loadMind();

  window.Mind66 = {
    answer(text) {
      if (!Mind66.ready || !Mind66.data) return null;
      const q = bag(text);
      let best = null, bestScore = 0.34;
      Mind66.data.intents.forEach((item) => {
        const s = score(q, bag(item.q));
        if (s > bestScore) { bestScore = s; best = item; }
      });
      if (!best) return null;
      if (best.reply === "time") return "It is " + new Date().toLocaleTimeString() + ".";
      if (best.app && window.Desktop) Desktop.openApp(best.app);
      return best.reply;
    }
  };

  const old = Aura && Aura.localReply;
  if (old) {
    Aura.localReply = function (text) {
      const hit = window.Mind66.answer(text);
      if (hit && !/open |launch |remind |note /.test(String(text).toLowerCase())) return hit;
      const base = old.call(this, text);
      if (base && /I heard|Try asking/.test(base) && hit) return hit;
      return base;
    };
  }

  function chips() {
    const panel = document.getElementById("assistant");
    if (!panel || document.getElementById("l66-chips")) return;
    const row = document.createElement("div");
    row.id = "l66-chips";
    ["open notes", "what time is it", "tell a joke", "open gallery"].forEach((label) => {
      const b = document.createElement("button");
      b.type = "button";
      b.className = "l66-chip";
      b.textContent = label;
      b.onclick = () => {
        const input = document.getElementById("aura-input");
        if (input) input.value = label;
        if (window.Desktop && Desktop.askAura) Desktop.askAura(label);
      };
      row.appendChild(b);
    });
    const form = document.getElementById("aura-form");
    if (form) panel.insertBefore(row, form);
  }

  const start = window.Desktop && Desktop.start;
  if (start) {
    Desktop.start = function () {
      start.apply(this, arguments);
      document.getElementById("wallpaper")?.classList.add("ridge66");
      setTimeout(chips, 200);
    };
  }
})();
