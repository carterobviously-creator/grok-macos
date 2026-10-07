/* Lumen 65 layer. Entertainment mock. Not Apple, not Siri. */
(function () {
  const Mind65 = { ready: false, data: null };
  async function loadMind() {
    try {
      const r = await fetch("data/mind65.json");
      Mind65.data = await r.json();
      Mind65.ready = true;
      const status = document.getElementById("boot-status");
      if (status) status.textContent = "Loaded mind 65";
    } catch (e) { /* offline file still fine */ }
  }
  loadMind();

  function orb() {
    if (document.getElementById("aura-orb")) return;
    const b = document.createElement("button");
    b.id = "aura-orb";
    b.type = "button";
    b.title = "Ask — local helper";
    b.textContent = "✦";
    b.onclick = () => {
      const panel = document.getElementById("assistant");
      if (!panel) return;
      panel.classList.remove("hidden");
      const input = document.getElementById("aura-input");
      if (input) input.focus();
      if (window.Aura && Aura.listen) {
        b.classList.add("listening");
        Aura.listen((said) => {
          b.classList.remove("listening");
          if (input) input.value = said;
          if (window.Desktop && Desktop.askAura) Desktop.askAura(said);
          else if (window.Aura) Aura.reply(said).then((ans) => {
            if (window.Desktop) Desktop.addAura("bot", ans);
            Aura.speak(ans);
          });
        });
      }
    };
    document.getElementById("desktop").appendChild(b);
  }

  const old = window.Desktop && Desktop.start;
  if (old) {
    Desktop.start = function () {
      old.apply(this, arguments);
      orb();
      const hint = document.querySelector(".wid-hint");
      if (hint) hint.textContent = "F3 Mission · F4 Launch · ⌘K Search · orb for Ask";
    };
  } else {
    document.getElementById("unlock-btn")?.addEventListener("click", () => setTimeout(orb, 400));
  }

  document.addEventListener("keydown", (e) => {
    if (e.key === " " && (e.metaKey || e.ctrlKey)) {
      e.preventDefault();
      document.getElementById("aura-orb")?.click();
    }
  });
})();
