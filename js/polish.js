(function polish() {
  const onReady = () => {
    window.addEventListener("keydown", (e) => {
      const meta = e.metaKey || e.ctrlKey;
      if (meta && e.code === "Space") {
        e.preventDefault();
        Desktop.openApp("aura");
        document.getElementById("aura-input")?.focus();
      }
      if (meta && e.key.toLowerCase() === "l") {
        e.preventDefault();
        document.getElementById("desktop").classList.add("hidden");
        document.getElementById("lock-screen").classList.remove("hidden");
      }
    });
  };
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", onReady);
  else onReady();
})();
