(function Lumen29() {
  function icon(name, bg, path) {
    Icons[name] = function () {
      return this.svg(`<svg width="28" height="28" viewBox="0 0 28 28">${path}</svg>`, bg);
    };
  }
  if (typeof Icons !== "undefined") {
    icon("beacon", "linear-gradient(#38bdf8,#0369a1)", '<circle cx="14" cy="14" r="8" fill="none" stroke="#fff" stroke-width="2"/><circle cx="14" cy="14" r="3" fill="#fff"/>');
    icon("drift", "linear-gradient(#c4b5fd,#6d28d9)", '<path d="M6 18c4-8 12-8 16 0" fill="none" stroke="#fff" stroke-width="2"/><circle cx="14" cy="10" r="3" fill="#fff"/>');
    icon("quilt", "linear-gradient(#fb7185,#be123c)", '<rect x="6" y="6" width="7" height="7" rx="1" fill="#fff"/><rect x="15" y="6" width="7" height="7" rx="1" fill="#fecdd3"/><rect x="6" y="15" width="7" height="7" rx="1" fill="#fecdd3"/><rect x="15" y="15" width="7" height="7" rx="1" fill="#fff"/>');
  }

  function register() {
    if (typeof Desktop === "undefined" || !Desktop.registerApp) return false;
    Desktop.registerApp({
      id: "beacon",
      title: "Beacon",
      icon: "beacon",
      render() {
        return `<div class="app-beacon pad"><h3>Beacon</h3><p>Local status mock.</p>
          <div class="row"><span>Network</span><strong>Online</strong></div>
          <div class="row"><span>Aura book</span><strong>Loaded</strong></div>
          <div class="row"><span>Glass tint</span><strong>Live</strong></div></div>`;
      }
    });
    Desktop.registerApp({
      id: "drift",
      title: "Drift",
      icon: "drift",
      render() {
        return `<div class="app-drift pad"><h3>Drift</h3><p>Scratch notes stay in this window only.</p><textarea placeholder="Write a thought…"></textarea></div>`;
      }
    });
    Desktop.registerApp({
      id: "quilt",
      title: "Quilt",
      icon: "quilt",
      render() {
        const cells = Array.from({ length: 8 }, (_, i) => `<div class="cell" style="filter:hue-rotate(${i * 28}deg)"></div>`).join("");
        return `<div class="app-quilt pad"><h3>Quilt</h3><p>Color tiles — original mock art.</p><div class="grid">${cells}</div></div>`;
      }
    });
    return true;
  }

  const tryReg = () => {
    if (!register()) setTimeout(tryReg, 200);
  };
  tryReg();

  document.addEventListener("click", (e) => {
    const item = e.target.closest("#dock .dock-item");
    if (item) {
      item.classList.remove("bounce");
      void item.offsetWidth;
      item.classList.add("bounce");
    }
  });

  if (typeof AuraModel !== "undefined") {
    AuraModel.phrases.push(["beacon", "Beacon shows mock system status. It is not a real monitor."]);
    AuraModel.phrases.push(["drift", "Drift is a scratch pad that lives in the window only."]);
    AuraModel.phrases.push(["quilt", "Quilt is original color tiles, not a photo library."]);
  }

  const desk = document.getElementById("desktop");
  if (desk && !document.querySelector(".lumen29-badge")) {
    const b = document.createElement("div");
    b.className = "lumen29-badge";
    b.textContent = "Lumen 29 · entertainment mock";
    desk.appendChild(b);
  }
})();
