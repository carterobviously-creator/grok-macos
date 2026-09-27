(function () {
  const note = document.querySelector("#notify-drawer p:last-of-type");
  if (note) note.textContent = "Lumen 47: original icons, original glass. Not macOS, not Siri, not Apple Intelligence.";
  window.LumenBuild = "47";

  function tickLock() {
    const t = document.getElementById("lock-time");
    const d = document.getElementById("lock-date");
    const now = new Date();
    if (t) t.textContent = now.toLocaleTimeString([], { hour: "numeric", minute: "2-digit" });
    if (d) d.textContent = now.toLocaleDateString(undefined, { weekday: "long", month: "long", day: "numeric" });
  }
  tickLock();
  setInterval(tickLock, 15000);

  const prev = window.VistaAura && window.VistaAura.extra;
  window.VistaAura = window.VistaAura || {};
  window.VistaAura.extra = function (text) {
    if (typeof prev === "function") {
      const hit = prev(text);
      if (hit) return hit;
    }
    const q = String(text || "").toLowerCase();
    if (/lumen 47|build/.test(q)) return "You are on Lumen build 47, a browser mock with original icons and Aura.";
    if (/how (do i|to) lock/.test(q)) return "Press Control-L or Command-L to lock. Click the user chip on the lock screen to return.";
    if (/how (do i|to) search/.test(q)) return "Press Control-K or Command-K for Spotlight. F4 opens Launchpad.";
    if (/glass|tint/.test(q)) return "Open Control Center and drag Glass tint. Clearer on the left, frostier on the right.";
    return null;
  };
})();
