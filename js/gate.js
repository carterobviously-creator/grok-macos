(function () {
  const dock = document.getElementById("dock");
  if (dock) {
    dock.addEventListener("mousemove", (e) => {
      const items = [...dock.querySelectorAll(".dock-item")];
      items.forEach((el) => {
        const r = el.getBoundingClientRect();
        const mid = r.left + r.width / 2;
        const d = Math.abs(e.clientX - mid);
        const s = Math.max(1, 1.38 - d / 220);
        const y = Math.max(0, 18 - d / 18);
        el.style.transform = "translateY(" + -y + "px) scale(" + s + ")";
      });
    });
    dock.addEventListener("mouseleave", () => {
      dock.querySelectorAll(".dock-item").forEach((el) => {
        el.style.transform = "";
      });
    });
  }

  const extra = {
    "good morning": "Morning. Aura is local unless the demo API is on in Settings.",
    "good night": "Lock with Command-L when you are done.",
    "how are you": "I am a tiny phrase helper in a browser mock. Fine, thanks.",
    "open settings": "Opening Settings.",
    "dark mode": "Use Control Center glass tint and wallpaper scenes.",
    "liquid glass": "This mock uses original blur and highlight CSS. It is not Apple Liquid Glass."
  };

  if (window.Aura && Aura.localReply) {
    const prev = Aura.localReply.bind(Aura);
    Aura.localReply = function (text) {
      const q = (text || "").toLowerCase().trim();
      if (extra[q]) {
        if (q === "open settings" && window.Desktop) Desktop.openApp("settings");
        return extra[q];
      }
      return prev(text);
    };
  }

  const clock = document.getElementById("lock-time");
  const date = document.getElementById("lock-date");
  function tickLock() {
    const n = new Date();
    if (clock) clock.textContent = n.toLocaleTimeString([], { hour: "numeric", minute: "2-digit" });
    if (date) date.textContent = n.toLocaleDateString(undefined, { weekday: "long", month: "long", day: "numeric" });
  }
  tickLock();
  setInterval(tickLock, 1000);
})();
