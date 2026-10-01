(function () {
  const extraPhrases = {
    "good morning": "Morning. Aura is local first. Ask to open Files, Notes, or Orbit.",
    "good night": "Lock with ⌘L when you are done. Sleep well.",
    "what is lumen": "Lumen is a fan-made glass desktop mock in the browser. Original icons and CSS only.",
    "open orbit": "Opening Orbit.",
    "who made this": "This is an entertainment mock on GitHub Pages. Not an Apple product."
  };

  const prevExtra = window.VistaAura && window.VistaAura.extra;
  window.VistaAura = window.VistaAura || {};
  window.VistaAura.extra = function (text) {
    if (typeof prevExtra === "function") {
      const hit = prevExtra(text);
      if (hit) return hit;
    }
    const q = String(text || "").toLowerCase().trim();
    if (extraPhrases[q]) return extraPhrases[q];
    if (/open orbit|launch orbit|start orbit/.test(q)) {
      if (typeof Desktop !== "undefined") Desktop.openApp("orbit");
      return extraPhrases["open orbit"];
    }
    if (/golden gate|tahoe|sequoia|macos 27/.test(q)) {
      return "Those are Apple OS names. This page is Lumen, a mock with original chrome.";
    }
    return null;
  };

  function orbitHtml() {
    return `<div class="orbit-pad">
      <p>Orbit is a local scratch pad. Nothing leaves this browser unless you turn on Aura demo replies.</p>
      <div class="row">
        <button type="button" data-orbit="time">Stamp time</button>
        <button type="button" data-orbit="clear">Clear</button>
        <button type="button" data-orbit="aura">Ask Aura</button>
      </div>
      <div class="orbit-log" id="orbit-log"></div>
    </div>`;
  }

  function ensureApp() {
    if (typeof Apps === "undefined") return;
    if (Apps.orbit) return;
    Apps.orbit = {
      title: "Orbit",
      icon: Icons.aura ? Icons.aura() : "",
      width: 420,
      height: 360,
      html: orbitHtml
    };
  }

  function bindOrbit(root) {
    const log = root.querySelector("#orbit-log");
    if (!log) return;
    const saved = localStorage.getItem("lumen-orbit") || "Orbit ready.\n";
    log.textContent = saved;
    root.querySelectorAll("[data-orbit]").forEach((btn) => {
      btn.addEventListener("click", () => {
        const act = btn.getAttribute("data-orbit");
        if (act === "clear") {
          log.textContent = "";
        } else if (act === "time") {
          log.textContent += new Date().toLocaleString() + "\n";
        } else if (act === "aura" && typeof Desktop !== "undefined") {
          const input = document.getElementById("aura-input");
          const form = document.getElementById("aura-form");
          document.getElementById("assistant")?.classList.remove("hidden");
          if (input) input.value = "what is lumen";
          if (form) form.dispatchEvent(new Event("submit", { cancelable: true }));
        }
        localStorage.setItem("lumen-orbit", log.textContent);
      });
    });
  }

  function addChips() {
    const box = document.getElementById("assistant");
    if (!box || document.getElementById("aura-chips")) return;
    const chips = document.createElement("div");
    chips.id = "aura-chips";
    ["open notes", "what time is it", "open orbit", "tell a joke", "help"].forEach((t) => {
      const b = document.createElement("button");
      b.type = "button";
      b.textContent = t;
      b.addEventListener("click", () => {
        const input = document.getElementById("aura-input");
        const form = document.getElementById("aura-form");
        if (input) input.value = t;
        if (form) form.dispatchEvent(new Event("submit", { cancelable: true }));
      });
      chips.appendChild(b);
    });
    const log = document.getElementById("aura-log");
    if (log) box.insertBefore(chips, log);
    else box.appendChild(chips);
  }

  const oldOpen = window.Desktop && Desktop.openApp;
  if (oldOpen) {
    Desktop.openApp = function (id) {
      ensureApp();
      const w = oldOpen.call(Desktop, id);
      if (id === "orbit") {
        const layer = document.getElementById("window-layer");
        const last = layer && layer.lastElementChild;
        if (last) bindOrbit(last);
      }
      return w;
    };
  }

  function addDeskShortcut() {
    const desk = document.getElementById("desk-icons");
    if (!desk || desk.querySelector("[data-app='orbit']")) return;
    const btn = document.createElement("button");
    btn.type = "button";
    btn.setAttribute("data-app", "orbit");
    btn.innerHTML = (Icons.aura ? Icons.aura() : "") + "<span>Orbit</span>";
    btn.addEventListener("click", () => Desktop.openApp("orbit"));
    desk.appendChild(btn);
  }

  document.addEventListener("DOMContentLoaded", () => {
    ensureApp();
    addChips();
    addDeskShortcut();
  });
  setTimeout(() => {
    ensureApp();
    addChips();
    addDeskShortcut();
  }, 800);
})();
