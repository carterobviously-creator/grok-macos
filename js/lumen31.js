(function Lumen31() {
  function icon(name, bg, path) {
    if (typeof Icons === "undefined") return;
    Icons[name] = function () {
      return this.svg(`<svg width="28" height="28" viewBox="0 0 28 28">${path}</svg>`, bg);
    };
  }
  icon("nova", "linear-gradient(#fde68a,#f97316)", '<circle cx="14" cy="14" r="4" fill="#fff"/><path d="M14 4v4M14 20v4M4 14h4M20 14h4M7 7l3 3M18 18l3 3M21 7l-3 3M7 21l3-3" stroke="#fff" stroke-width="1.6"/>');
  icon("tide", "linear-gradient(#38bdf8,#1d4ed8)", '<path d="M4 16c3-4 6 4 9 0s6 4 11 0" fill="none" stroke="#fff" stroke-width="2"/><path d="M4 20c3-4 6 4 9 0s6 4 11 0" fill="none" stroke="#bae6fd" stroke-width="2"/>');
  icon("sparkpad", "linear-gradient(#c4b5fd,#4f46e5)", '<rect x="6" y="5" width="16" height="18" rx="2" fill="#fff"/><path d="M10 11h8M10 15h6" stroke="#6366f1"/>');

  function register() {
    if (typeof Desktop === "undefined" || !Desktop.registerApp) return false;
    Desktop.registerApp({
      id: "nova",
      title: "Nova",
      icon: "nova",
      render() {
        return `<div class="app-nova"><h3>Nova</h3><p>Local idea spark. Not a cloud product.</p>
          <button type="button" id="nova-go">Spark an idea</button>
          <p id="nova-out"></p></div>`;
      },
      afterOpen() {
        const ideas = [
          "Write a 6-word story about glass.",
          "Rename a folder after a color.",
          "Make a 2-minute focus timer.",
          "Sketch a harbor at dusk."
        ];
        const b = document.getElementById("nova-go");
        if (!b) return;
        b.onclick = () => {
          document.getElementById("nova-out").textContent = ideas[Math.floor(Math.random() * ideas.length)];
        };
      }
    });
    Desktop.registerApp({
      id: "tide",
      title: "Tide",
      icon: "tide",
      render() {
        return `<div class="app-tide"><h3>Tide</h3><p>Motion wash for the mock desktop.</p><div class="wave"></div></div>`;
      }
    });
    Desktop.registerApp({
      id: "sparkpad",
      title: "Spark Pad",
      icon: "sparkpad",
      render() {
        const saved = localStorage.getItem("lumen-sparkpad") || "";
        return `<div class="app-sparkpad"><h3>Spark Pad</h3>
          <textarea id="spark-ta" rows="8" style="width:100%">${saved.replace(/</g,"")}</textarea>
          <button type="button" id="spark-save">Save locally</button></div>`;
      },
      afterOpen() {
        const b = document.getElementById("spark-save");
        if (!b) return;
        b.onclick = () => {
          localStorage.setItem("lumen-sparkpad", document.getElementById("spark-ta").value);
          if (typeof Desktop !== "undefined") Desktop.toast("Spark Pad saved on this device.");
        };
      }
    });
    return true;
  }
  const tryReg = () => { if (!register()) setTimeout(tryReg, 200); };
  tryReg();

  if (typeof Aura !== "undefined") {
    const prev = Aura.localReply.bind(Aura);
    Aura.localReply = function (text) {
      const q = text.toLowerCase();
      if (/open nova/.test(q) && typeof Desktop !== "undefined") {
        Desktop.openApp("nova"); return "Opening Nova.";
      }
      if (/open tide/.test(q) && typeof Desktop !== "undefined") {
        Desktop.openApp("tide"); return "Opening Tide.";
      }
      if (/spark pad|sparkpad/.test(q) && typeof Desktop !== "undefined") {
        Desktop.openApp("sparkpad"); return "Opening Spark Pad.";
      }
      return prev(text);
    };
  }

  const desk = document.getElementById("desktop");
  if (desk && !document.querySelector(".lumen31-badge")) {
    const b = document.createElement("div");
    b.className = "lumen31-badge";
    b.textContent = "Lumen 31 · entertainment mock · original icons";
    desk.appendChild(b);
  }
})();
