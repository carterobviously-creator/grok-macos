/* Extra Aura shortcuts and wallpaper bloom. Original Lumen mock only. */
(function () {
  const chips = ["open notes", "what time is it", "tell a joke", "help"];

  function enhanceAura() {
    const log = document.getElementById("aura-log");
    if (!log || log.dataset.lumen33) return;
    log.dataset.lumen33 = "1";
    const row = document.createElement("div");
    chips.forEach((c) => {
      const b = document.createElement("button");
      b.type = "button";
      b.className = "lumen33-chip";
      b.textContent = c;
      b.addEventListener("click", () => {
        const input = document.getElementById("aura-input");
        const form = document.getElementById("aura-form");
        if (input) input.value = c;
        if (form) form.dispatchEvent(new Event("submit", { cancelable: true }));
      });
      row.appendChild(b);
    });
    log.prepend(row);
  }

  document.addEventListener("click", (e) => {
    if (e.target && (e.target.id === "lumen-menu" || e.target.closest("#assistant"))) {
      setTimeout(enhanceAura, 50);
    }
  });

  const wall = document.getElementById("wallpaper");
  if (wall && !wall.classList.contains("alt") && !wall.classList.contains("dusk")) {
    wall.classList.add("bloom");
  }

  const oldLocal = Aura && Aura.localReply;
  if (oldLocal) {
    Aura.localReply = function (text) {
      const q = String(text || "").toLowerCase();
      if (/bloom|scene|wallpaper/.test(q) && /open|show|change/.test(q)) {
        if (wall) {
          wall.classList.toggle("bloom");
          return "Toggled the bloom wallpaper scene.";
        }
      }
      return oldLocal.call(Aura, text);
    };
  }
})();
