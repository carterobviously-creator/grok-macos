(function boot() {
  const fill = document.getElementById("boot-fill");
  const status = document.getElementById("boot-status");
  const steps = [
    [8, "Initializing Lumen shell…"],
    [22, "Loading Liquid Glass surfaces…"],
    [38, "Preparing original icons & wallpaper…"],
    [52, "Loading tiny local LLM phrase model…"],
    [68, "Wiring offline phrase book & Aura…"],
    [82, "Mounting mock volumes & apps…"],
    [94, "Finalizing desktop…"],
    [100, "Ready"]
  ];
  let i = 0;
  const t = setInterval(() => {
    const step = steps[i];
    if (fill) fill.style.width = step[0] + "%";
    if (status) status.textContent = step[1];
    if (step[0] >= 52 && typeof AuraModel !== "undefined") AuraModel.load();
    if (step[0] >= 52 && typeof TinyMind !== "undefined") TinyMind.load().catch(() => {});
    i += 1;
    if (i >= steps.length) {
      clearInterval(t);
      setTimeout(() => {
        document.getElementById("boot-screen").classList.add("hidden");
        document.getElementById("lock-screen").classList.remove("hidden");
      }, 420);
    }
  }, 420);

  const unlock = document.getElementById("unlock-btn");
  if (unlock) unlock.onclick = () => {
    document.getElementById("lock-screen").classList.add("hidden");
    document.getElementById("desktop").classList.remove("hidden");
    if (typeof Desktop !== "undefined") Desktop.start();
    if (typeof Desktop !== "undefined" && Desktop.addAura) {
      Desktop.addAura("bot", "Aura online. Tiny mind loaded at boot. Demo AI replies are available. Press ⌘Space anytime. F3 Mission Control · F4 Launchpad · Mic for voice.");
    }
  };
})();
