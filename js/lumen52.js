/* Lumen 52 extras. Original mock only. */
(function () {
  function toast(msg) {
    if (window.Desktop && Desktop.toast) Desktop.toast(msg);
  }

  function addAuraChips() {
    const form = document.getElementById("aura-form");
    if (!form || form.querySelector(".l52-chips")) return;
    const row = document.createElement("div");
    row.className = "l52-chips";
    row.style.cssText = "display:flex;flex-wrap:wrap;gap:6px;padding:6px 10px;";
    ["open notes", "what time is it", "tell a joke", "help"].forEach((q) => {
      const b = document.createElement("button");
      b.type = "button";
      b.className = "l52-chip";
      b.textContent = q;
      b.onclick = () => {
        const input = document.getElementById("aura-input");
        if (input) input.value = q;
        form.requestSubmit();
      };
      row.appendChild(b);
    });
    form.parentNode.insertBefore(row, form);
  }

  function wireNotify() {
    const drawer = document.getElementById("notify-drawer");
    if (!drawer) return;
    if (drawer.dataset.l52) return;
    drawer.dataset.l52 = "1";
    const p = document.createElement("p");
    p.textContent = "Lumen 52: Aura chips, glass glow, original SVG marks only.";
    drawer.appendChild(p);
  }

  document.addEventListener("DOMContentLoaded", () => {
    addAuraChips();
    wireNotify();
  });

  window.Lumen52 = { toast, addAuraChips };
})();
