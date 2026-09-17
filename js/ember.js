(function Ember() {
  function tickLock() {
    const t = document.getElementById("lock-time");
    const d = document.getElementById("lock-date");
    if (!t || !d) return;
    const now = new Date();
    t.textContent = now.toLocaleTimeString([], { hour: "numeric", minute: "2-digit" });
    d.textContent = now.toLocaleDateString([], { weekday: "long", month: "long", day: "numeric" });
  }
  tickLock();
  setInterval(tickLock, 1000);

  if (typeof AuraModel !== "undefined") {
    AuraModel.book.greet.push("Aura ready. Local phrases only unless you enable the optional demo.");
    AuraModel.book.help.push("Open Gallery for mock apps. Settings can disable the demo API.");
    AuraModel.phrases.push(["calculator math", "Ask Aura something like 12 times 8."]);
    AuraModel.phrases.push(["mission control", "Press F3 for the Mission overview."]);
    AuraModel.phrases.push(["launchpad", "Press F4 or open Launch from the dock."]);
    const old = AuraModel.localReply.bind(AuraModel);
    AuraModel.localReply = function (q) {
      const t = (q || "").toLowerCase();
      if (/thank/.test(t)) return "Anytime. Still just a phrase book.";
      if (/name/.test(t)) return "I am Aura, a local helper inside Lumen.";
      if (/date|today/.test(t)) return new Date().toLocaleDateString([], { weekday: "long", month: "long", day: "numeric" });
      return old(q);
    };
  }

  const desk = document.getElementById("desktop");
  if (desk && !document.querySelector(".ember-spec")) {
    const spec = document.createElement("div");
    spec.className = "ember-spec";
    spec.setAttribute("aria-hidden", "true");
    desk.prepend(spec);
  }
})();
