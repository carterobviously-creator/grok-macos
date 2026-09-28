(function Lumen49() {
  const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const SKY = [
    { t: "Clear", lo: 64, hi: 76 },
    { t: "Soft haze", lo: 61, hi: 73 },
    { t: "Breezy", lo: 58, hi: 70 },
    { t: "Cool dusk", lo: 55, hi: 68 },
    { t: "Bright", lo: 66, hi: 78 }
  ];

  function mockSky() {
    const h = new Date().getHours();
    const idx = h % SKY.length;
    const base = 68 + Math.round(Math.sin(h / 3) * 6);
    return { label: SKY[idx].t, temp: base, forecast: SKY };
  }

  function paintWidget() {
    const el = document.querySelector(".wid-weather");
    if (!el) return;
    const s = mockSky();
    el.textContent = s.label + " · " + s.temp + "° mock";
  }

  function skyHtml() {
    const s = mockSky();
    const cards = s.forecast.map((d, i) => {
      const day = DAYS[(new Date().getDay() + i) % 7];
      return `<div class="sky-card"><div>${day}</div><div>${d.t}</div><div>${d.lo}–${d.hi}°</div></div>`;
    }).join("");
    return `<div class="sky-app"><div class="sky-now"><div class="sky-temp">${s.temp}°</div><div class="sky-meta">${s.label}<br>Mock valley · original scene</div></div><div class="sky-row">${cards}</div></div>`;
  }

  function clockHtml() {
    return `<div class="clock-app"><div class="clock-big" id="l49-clock">--:--:--</div><div class="clock-sub" id="l49-date"></div></div>`;
  }

  function tickClock() {
    const c = document.getElementById("l49-clock");
    const d = document.getElementById("l49-date");
    if (!c) return;
    const now = new Date();
    c.textContent = now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" });
    if (d) d.textContent = now.toLocaleDateString([], { weekday: "long", month: "long", day: "numeric" });
  }

  const extra = {
    sky: { id: "sky", name: "Sky", kind: "app", html: skyHtml },
    clock: { id: "clockpad", name: "Clock", kind: "app", html: clockHtml }
  };

  function register() {
    if (typeof Apps === "undefined") return;
    if (Apps.register) {
      Apps.register(extra.sky);
      Apps.register(extra.clock);
    } else if (Apps.catalog) {
      Apps.catalog.sky = extra.sky;
      Apps.catalog.clockpad = extra.clock;
    }
    if (typeof Desktop !== "undefined" && Desktop.addDockApp) {
      Desktop.addDockApp("sky");
      Desktop.addDockApp("clockpad");
    }
  }

  const phrases = {
    hello: "Aura here. Local phrase book, not a product assistant.",
    weather: () => { const s = mockSky(); return s.label + " around " + s.temp + " degrees in the mock valley."; },
    time: () => "Local time is " + new Date().toLocaleTimeString() + ".",
    open: "Say open notes, files, gallery, sky, or clock.",
    help: "Shortcuts: F3 Mission, F4 Launchpad, Command-K search, Command-Space Aura."
  };

  if (typeof AuraModel !== "undefined" && AuraModel.add) {
    Object.keys(phrases).forEach((k) => AuraModel.add(k, phrases[k]));
  } else {
    window.Lumen49Phrases = phrases;
  }

  const origAsk = window.Aura && Aura.ask;
  if (typeof Aura !== "undefined") {
    const wrap = Aura.reply || Aura.respond || Aura.local;
    document.addEventListener("lumen:aura", (e) => {
      const q = String(e.detail || "").toLowerCase();
      if (q.includes("weather") || q.includes("sky")) Desktop && Desktop.addAura && Desktop.addAura("bot", phrases.weather());
      if (q.includes("time") || q.includes("clock")) Desktop && Desktop.addAura && Desktop.addAura("bot", phrases.time());
    });
  }

  setInterval(paintWidget, 20000);
  setInterval(tickClock, 1000);
  paintWidget();

  window.Lumen49 = { skyHtml, clockHtml, mockSky, register };
  if (document.readyState === "complete") register();
  else window.addEventListener("load", register);
})();
