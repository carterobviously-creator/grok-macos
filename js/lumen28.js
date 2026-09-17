(function Lumen28() {
  if (typeof AuraModel !== "undefined") {
    AuraModel.book.help.push("Shortcuts: Command-Space Aura, Command-K search, F3 Mission, F4 Launchpad.");
    AuraModel.phrases.push(["how to use", "Click Unlock, then the dock. Aura is Command or Control plus Space."]);
    AuraModel.phrases.push(["glass", "Control Center has a Glass tint slider."]);
  }
  if (typeof Aura !== "undefined") {
    const extra = Aura.localReply.bind(Aura);
    Aura.localReply = function (text) {
      const q = (text || "").toLowerCase();
      if (/good morning|good night|good evening/.test(q)) {
        return "Hello from Lumen. Aura is a local helper in this entertainment mock.";
      }
      if (/what can you do|capabilities/.test(q)) {
        return "Open apps, do simple math, take notes, set reminders, tell time, and optional demo replies in Settings.";
      }
      return extra(text);
    };
  }
  const desk = document.getElementById("desktop");
  if (desk && !document.querySelector(".lumen28-badge")) {
    const b = document.createElement("div");
    b.className = "lumen28-badge";
    b.textContent = "Lumen mock · original glass";
    desk.appendChild(b);
  }
})();
