(function boot() {
  const fill = document.getElementById("boot-fill");
  const status = document.getElementById("boot-status");
  const steps = [
    [8, "Initializing Lumen shell (Golden Gate 27 style)…"],
    [20, "Loading enhanced Liquid Glass surfaces…"],
    [34, "Preparing original icons & wallpaper…"],
    [48, "Loading tiny local LLM phrase model for Aura…"],
    [62, "Wiring offline phrase book & AI endpoint…"],
    [76, "Mounting mock volumes & apps…"],
    [90, "Finalizing desktop chrome…"],
    [100, "Ready — Aura Intelligence online"]
  ];
  let i = 0;
  const t = setInterval(() => {
    const step = steps[i];
    if (fill) fill.style.width = step[0] + "%";
    if (status) status.textContent = step[1];
    if (step[0] >= 48 && typeof AuraModel !== "undefined") AuraModel.load();
    if (step[0] >= 48 && typeof TinyMind !== "undefined") TinyMind.load().catch(() => {});
    i += 1;
    if (i >= steps.length) {
      clearInterval(t);
      setTimeout(() => {
        document.getElementById("boot-screen").classList.add("hidden");
        document.getElementById("lock-screen").classList.remove("hidden");
      }, 420);
    }
  }, 380);
  const unlock = document.getElementById("unlock-btn");
  if (unlock)
    unlock.onclick = () => {
      document.getElementById("lock-screen").classList.add("hidden");
      document.getElementById("desktop").classList.remove("hidden");
      if (typeof Desktop !== "undefined") Desktop.start();
      if (typeof Desktop !== "undefined" && Desktop.addAura) {
        Desktop.addAura("bot", "Aura online. Tiny local model loaded at boot + AI replies enabled. Press ⌘Space anytime. F3 Mission Control · F4 Launchpad · Mic for voice.");
      }
    };
})();