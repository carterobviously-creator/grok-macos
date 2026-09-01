(function boot() {
  const fill = document.getElementById("boot-fill");
  const status = document.getElementById("boot-status");
  const steps = [
    [10, "Loading shell…"],
    [28, "Preparing glass surfaces…"],
    [46, "Loading tiny Aura helper…"],
    [67, "Wiring offline phrase book…"],
    [84, "Mounting mock volumes…"],
    [100, "Ready"]
  ];
  let i = 0;
  const t = setInterval(() => {
    const step = steps[i];
    fill.style.width = step[0] + "%";
    status.textContent = step[1];
    if (step[0] >= 46 && typeof AuraModel !== "undefined") AuraModel.load();
    i += 1;
    if (i >= steps.length) {
      clearInterval(t);
      setTimeout(() => {
        document.getElementById("boot-screen").classList.add("hidden");
        document.getElementById("lock-screen").classList.remove("hidden");
      }, 380);
    }
  }, 380);

  document.getElementById("unlock-btn").onclick = () => {
    document.getElementById("lock-screen").classList.add("hidden");
    document.getElementById("desktop").classList.remove("hidden");
    Desktop.start();
    Desktop.addAura("bot", "Aura online. Offline local helper only — no cloud. Press Command-K or Ctrl-K to search. F3 Mission Control. F4 Launchpad. Mic to speak.");
  };
})();
