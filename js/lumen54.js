(function () {
  const chips = ["open files", "what is 9 times 7", "remind me to stretch", "open weather"];

  function addChips() {
    const form = document.getElementById("aura-form");
    if (!form || document.getElementById("l54-chips")) return;
    const row = document.createElement("div");
    row.id = "l54-chips";
    row.className = "l54-chip-row";
    chips.forEach((c) => {
      const b = document.createElement("button");
      b.type = "button";
      b.className = "l54-chip";
      b.textContent = c;
      b.onclick = () => {
        const input = document.getElementById("aura-input");
        if (input) input.value = c;
        form.requestSubmit();
      };
      row.appendChild(b);
    });
    form.parentNode.insertBefore(row, form);
  }

  function stage() {
    if (document.getElementById("l54-stage")) return;
    const desk = document.getElementById("desktop");
    if (!desk) return;
    const el = document.createElement("div");
    el.id = "l54-stage";
    el.className = "l54-stage glass";
    el.innerHTML = "<b>Lumen 54</b><span>Glass mock · Aura phrase helper</span>";
    desk.appendChild(el);
  }

  const extraApps = {
    planner() {
      return "<div class='app-pad l54'><h3>Planner</h3><div class='l54-grid'><div class='l54-card'>Morning · mock focus block</div><div class='l54-card'>Afternoon · notes pass</div><div class='l54-card'>Evening · stretch reminder</div><div class='l54-card'>Weekend · gallery tidy</div></div></div>";
    },
    lab() {
      return "<div class='app-pad l54'><h3>Voice Lab</h3><p>Speak to Aura with the mic. Local phrases first; optional demo text is off if you disable it in Settings.</p><textarea rows='6' placeholder='Scratch pad…'></textarea></div>";
    },
    vault() {
      const list = JSON.parse(localStorage.getItem("lumen-vault") || '["wifi-guest","library-pin"]');
      return "<div class='app-pad l54'><h3>Vault</h3><p>Mock labels only — no real secrets.</p><ul>" +
        list.map((x) => "<li>" + x + "</li>").join("") + "</ul></div>";
    }
  };

  if (typeof Apps !== "undefined") {
    if (!Apps.planner) Apps.planner = extraApps.planner;
    if (!Apps.lab) Apps.lab = extraApps.lab;
    if (!Apps.vault) Apps.vault = extraApps.vault;
  }

  window.Lumen54 = {
    extraAura(q) {
      const t = (q || "").toLowerCase();
      if (/planner|schedule/.test(t)) {
        if (typeof Desktop !== "undefined") Desktop.openApp("planner");
        return "Opening Planner.";
      }
      if (/vault|password/.test(t)) {
        if (typeof Desktop !== "undefined") Desktop.openApp("vault");
        return "Opening Vault. Labels only.";
      }
      if (/voice lab|lab/.test(t)) {
        if (typeof Desktop !== "undefined") Desktop.openApp("lab");
        return "Opening Voice Lab.";
      }
      if (/lumen 54|what.?s new/.test(t)) {
        return "Lumen 54 adds Planner, Vault, Voice Lab, extra glass sheen, and more Aura chips. Still a fan mock with original SVG icons.";
      }
      return null;
    }
  };

  const old = window.VistaAura && window.VistaAura.extra;
  window.VistaAura = window.VistaAura || {};
  window.VistaAura.extra = function (text) {
    const hit = window.Lumen54.extraAura(text);
    if (hit) return hit;
    return old ? old(text) : null;
  };

  function boot() {
    addChips();
    stage();
    const note = document.querySelector("#notify-drawer");
    if (note && !note.dataset.l54) {
      note.dataset.l54 = "1";
      const p = document.createElement("p");
      p.textContent = "New in 54: Planner, Vault, Voice Lab. Original marks only — not Apple.";
      note.appendChild(p);
    }
  }

  document.addEventListener("DOMContentLoaded", boot);
  setTimeout(boot, 900);
})();
