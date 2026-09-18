(function Lumen30() {
  function icon(name, bg, path) {
    if (typeof Icons === "undefined") return;
    Icons[name] = function () {
      return this.svg(`<svg width="28" height="28" viewBox="0 0 28 28">${path}</svg>`, bg);
    };
  }
  icon("atlas", "linear-gradient(#34d399,#047857)", '<circle cx="14" cy="14" r="9" fill="none" stroke="#fff" stroke-width="2"/><path d="M5 14h18M14 5c3 3 3 15 0 18M14 5c-3 3-3 15 0 18" fill="none" stroke="#fff"/>');
  icon("orbit", "linear-gradient(#818cf8,#312e81)", '<ellipse cx="14" cy="14" rx="10" ry="5" fill="none" stroke="#fff"/><circle cx="22" cy="14" r="2" fill="#fff"/><circle cx="14" cy="14" r="3" fill="#c7d2fe"/>');
  icon("echo", "linear-gradient(#fb923c,#9a3412)", '<path d="M8 18V10l8-4v8" fill="none" stroke="#fff" stroke-width="2"/><circle cx="10" cy="19" r="2" fill="#fff"/><circle cx="18" cy="15" r="2" fill="#fff"/>');

  function register() {
    if (typeof Desktop === "undefined" || !Desktop.registerApp) return false;
    Desktop.registerApp({
      id: "atlas",
      title: "Atlas",
      icon: "atlas",
      render() {
        return `<div class="app-atlas pad"><h3>Atlas</h3><p>Mock places. Not a mapping product.</p>
          <div class="grid">
            <div class="tile"><strong>Harbor</strong><div>42.3 N</div></div>
            <div class="tile"><strong>Ridge</strong><div>39.1 N</div></div>
            <div class="tile"><strong>Delta</strong><div>29.8 N</div></div>
            <div class="tile"><strong>Basin</strong><div>36.2 N</div></div>
          </div></div>`;
      }
    });
    Desktop.registerApp({
      id: "orbit",
      title: "Orbit",
      icon: "orbit",
      render() {
        return `<div class="app-orbit pad"><h3>Orbit</h3><p>Tiny motion sketch.</p><canvas id="orbit-cv" width="320" height="180"></canvas></div>`;
      },
      afterOpen() {
        const c = document.getElementById("orbit-cv");
        if (!c) return;
        const ctx = c.getContext("2d");
        let a = 0;
        const tick = () => {
          if (!c.isConnected) return;
          ctx.fillStyle = "#0b1220";
          ctx.fillRect(0, 0, c.width, c.height);
          ctx.strokeStyle = "rgba(199,210,254,.4)";
          ctx.beginPath(); ctx.ellipse(160, 90, 110, 36, 0, 0, Math.PI * 2); ctx.stroke();
          const x = 160 + Math.cos(a) * 110;
          const y = 90 + Math.sin(a) * 36;
          ctx.fillStyle = "#a5b4fc";
          ctx.beginPath(); ctx.arc(160, 90, 8, 0, Math.PI * 2); ctx.fill();
          ctx.fillStyle = "#fff";
          ctx.beginPath(); ctx.arc(x, y, 5, 0, Math.PI * 2); ctx.fill();
          a += 0.03;
          requestAnimationFrame(tick);
        };
        tick();
      }
    });
    Desktop.registerApp({
      id: "echo",
      title: "Echo",
      icon: "echo",
      render() {
        return `<div class="app-echo pad"><h3>Echo</h3><p>Repeat a line locally.</p>
          <input id="echo-in" placeholder="Type a line" />
          <button type="button" id="echo-go">Repeat</button>
          <div class="log" id="echo-log"></div></div>`;
      },
      afterOpen() {
        const go = document.getElementById("echo-go");
        if (!go) return;
        go.onclick = () => {
          const v = (document.getElementById("echo-in").value || "").trim();
          document.getElementById("echo-log").textContent = v ? v + " — echoed locally" : "Nothing to echo.";
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
      if (/open atlas|show atlas/.test(q) && typeof Desktop !== "undefined") {
        Desktop.openApp("atlas"); return "Opening Atlas.";
      }
      if (/open orbit/.test(q) && typeof Desktop !== "undefined") {
        Desktop.openApp("orbit"); return "Opening Orbit.";
      }
      if (/open echo/.test(q) && typeof Desktop !== "undefined") {
        Desktop.openApp("echo"); return "Opening Echo.";
      }
      if (/golden gate|tahoe|macos|siri/.test(q)) {
        return "Lumen is an original entertainment mock. Aura is not Siri and this is not macOS.";
      }
      return prev(text);
    };
  }

  if (typeof AuraModel !== "undefined" && AuraModel.phrases) {
    AuraModel.phrases.push(["atlas", "Atlas lists mock places only."]);
    AuraModel.phrases.push(["orbit", "Orbit is a tiny canvas animation."]);
    AuraModel.phrases.push(["echo", "Echo repeats text on this device."]);
  }

  const desk = document.getElementById("desktop");
  if (desk && !document.querySelector(".lumen30-badge")) {
    const b = document.createElement("div");
    b.className = "lumen30-badge";
    b.textContent = "Lumen 30 · original glass mock";
    desk.appendChild(b);
  }
})();
