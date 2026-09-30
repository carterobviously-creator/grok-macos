(function () {
  const chips = [
    "what time is it",
    "open notes",
    "open calendar",
    "tell a joke",
    "help"
  ];

  function addChips() {
    const form = document.getElementById("aura-form");
    const log = document.getElementById("aura-log");
    if (!form || document.getElementById("l53-chips")) return;
    const row = document.createElement("div");
    row.id = "l53-chips";
    row.className = "l53-chip-row";
    chips.forEach((c) => {
      const b = document.createElement("button");
      b.type = "button";
      b.className = "l53-chip";
      b.textContent = c;
      b.onclick = () => {
        const input = document.getElementById("aura-input");
        if (input) input.value = c;
        form.requestSubmit();
      };
      row.appendChild(b);
    });
    form.parentNode.insertBefore(row, form);
    if (log && !log.dataset.l53) {
      log.dataset.l53 = "1";
    }
  }

  function liveCard() {
    if (document.getElementById("l53-live")) return;
    const desk = document.getElementById("desktop");
    if (!desk) return;
    const el = document.createElement("div");
    el.id = "l53-live";
    el.className = "l53-live glass";
    el.innerHTML = "<strong>Now Playing</strong><span>Lumen Radio · mock mix</span>";
    desk.appendChild(el);
  }

  const extra = {
    journal() {
      return "<div class='app-pad'><h3>Journal</h3><textarea id='l53-journal' rows='10' placeholder='Write a mock entry…'></textarea></div>";
    }
  };

  if (typeof Apps !== "undefined" && !Apps.journal) {
    Apps.journal = extra.journal;
  }

  window.Lumen53 = {
    ready: true,
    extraAura(q) {
      const t = (q || "").toLowerCase();
      if (/journal/.test(t)) {
        if (typeof Desktop !== "undefined") Desktop.openApp("journal");
        return "Opening Journal.";
      }
      if (/now playing|radio song/.test(t)) return "Mock station: Lumen Radio is playing a glass-wave mix.";
      return null;
    }
  };

  const old = window.VistaAura && window.VistaAura.extra;
  window.VistaAura = window.VistaAura || {};
  window.VistaAura.extra = function (text) {
    const hit = window.Lumen53.extraAura(text);
    if (hit) return hit;
    return old ? old(text) : null;
  };

  document.addEventListener("DOMContentLoaded", () => {
    addChips();
    liveCard();
  });
  setTimeout(() => {
    addChips();
    liveCard();
  }, 800);
})();
