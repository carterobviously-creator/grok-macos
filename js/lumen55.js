(function () {
  const chips = ["open studio", "tell a joke", "what time is it", "open journal"];

  function addChips() {
    const form = document.getElementById("aura-form");
    if (!form || document.getElementById("l55-chips")) return;
    const row = document.createElement("div");
    row.id = "l55-chips";
    row.className = "l55-chip-row";
    chips.forEach((c) => {
      const b = document.createElement("button");
      b.type = "button";
      b.className = "l55-chip";
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
    if (document.getElementById("l55-stage")) return;
    const desk = document.getElementById("desktop");
    if (!desk) return;
    const el = document.createElement("div");
    el.id = "l55-stage";
    el.className = "l55-stage glass";
    el.innerHTML = "<b>Lumen 55</b><span>Studio pad · extra Aura chips</span>";
    desk.appendChild(el);
  }

  function studioHtml() {
    return "<div class='app-pad l55'><h3>Studio</h3><p>Scratch canvas. Mock only.</p><div class='l55-tools'><button type='button' data-c='#7dd3fc'>Sky</button><button type='button' data-c='#c4b5fd'>Violet</button><button type='button' data-c='#f8fafc'>Clear</button></div><canvas class='l55-canvas' width='520' height='220'></canvas></div>";
  }

  if (typeof Apps !== "undefined" && !Apps.studio) {
    Apps.studio = studioHtml;
  }
  if (typeof Icons !== "undefined" && !Icons.studio) {
    Icons.studio = function () {
      return this.svg('<svg width="28" height="28" viewBox="0 0 28 28"><rect x="5" y="6" width="18" height="16" rx="2" fill="#fff"/><circle cx="11" cy="13" r="3" fill="#7dd3fc"/><path d="M16 18l4-5 3 5z" fill="#818cf8"/></svg>', 'linear-gradient(#38bdf8,#6366f1)');
    };
  }

  window.Lumen55 = {
    extraAura(q) {
      const t = (q || "").toLowerCase();
      if (/studio|paint|draw pad/.test(t)) {
        if (typeof Desktop !== "undefined") Desktop.openApp("studio");
        return "Opening Studio.";
      }
      if (/lumen 55|what.?s new/.test(t)) {
        return "Lumen 55 adds Studio, extra chips, and more glass sheen. Fan mock with original SVG icons — not Apple.";
      }
      return null;
    }
  };

  const old = window.VistaAura && window.VistaAura.extra;
  window.VistaAura = window.VistaAura || {};
  window.VistaAura.extra = function (text) {
    const hit = window.Lumen55.extraAura(text);
    if (hit) return hit;
    return old ? old(text) : null;
  };

  document.addEventListener("click", (e) => {
    const btn = e.target.closest(".l55-tools button");
    if (!btn) return;
    const canvas = btn.closest(".app-pad")?.querySelector("canvas");
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (btn.dataset.c === "#f8fafc") {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      return;
    }
    canvas.dataset.color = btn.dataset.c;
  });

  document.addEventListener("pointerdown", (e) => {
    const canvas = e.target.closest(".l55-canvas");
    if (!canvas) return;
    canvas.dataset.draw = "1";
    const ctx = canvas.getContext("2d");
    const r = canvas.getBoundingClientRect();
    ctx.strokeStyle = canvas.dataset.color || "#7dd3fc";
    ctx.lineWidth = 3;
    ctx.lineCap = "round";
    ctx.beginPath();
    ctx.moveTo(e.clientX - r.left, e.clientY - r.top);
  });
  document.addEventListener("pointermove", (e) => {
    const canvas = document.querySelector(".l55-canvas[data-draw='1']");
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const r = canvas.getBoundingClientRect();
    ctx.lineTo(e.clientX - r.left, e.clientY - r.top);
    ctx.stroke();
  });
  document.addEventListener("pointerup", () => {
    document.querySelectorAll(".l55-canvas").forEach((c) => delete c.dataset.draw);
  });

  function boot() {
    addChips();
    stage();
    const note = document.querySelector("#notify-drawer");
    if (note && !note.dataset.l55) {
      note.dataset.l55 = "1";
      const p = document.createElement("p");
      p.textContent = "New in 55: Studio pad and extra Aura chips. Original marks only — not Apple.";
      note.appendChild(p);
    }
  }
  document.addEventListener("DOMContentLoaded", boot);
  setTimeout(boot, 900);
})();
