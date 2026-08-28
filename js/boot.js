(function boot() {
  const fill = document.getElementById("boot-fill");
  const status = document.getElementById("boot-status");
  const steps = [
    [12, "Loading shell…"],
    [34, "Preparing glass surfaces…"],
    [58, "Warming Aura helper…"],
    [81, "Mounting mock volumes…"],
    [100, "Ready"]
  ];
  let i = 0;
  const t = setInterval(() => {
    const [pct, msg] = steps[i];
    fill.style.width = pct + "%";
    status.textContent = msg;
    i += 1;
    if (i >= steps.length) {
      clearInterval(t);
      setTimeout(() => {
        document.getElementById("boot-screen").classList.add("hidden");
        document.getElementById("lock-screen").classList.remove("hidden");
      }, 400);
    }
  }, 420);

  document.getElementById("unlock-btn").onclick = () => {
    document.getElementById("lock-screen").classList.add("hidden");
    document.getElementById("desktop").classList.remove("hidden");
    Desktop.start();
    Desktop.addAura("bot", "Aura online. This is a tiny on-device helper. Press ⌘K / Ctrl+K to search.");
  };
})();
