/* Lumen 70. Entertainment mock. Original marks only. Not Apple, not Siri, not Apple Intelligence. */
(function () {
  const Mind70 = { ready: false, data: null };

  function bag(text) {
    const counts = {};
    String(text).toLowerCase().replace(/[^a-z0-9\s]/g, " ").split(/\s+/).filter(Boolean).forEach((w) => {
      counts[w] = (counts[w] || 0) + 1;
    });
    return counts;
  }
  function score(a, b) {
    let dot = 0, na = 0, nb = 0;
    new Set([...Object.keys(a), ...Object.keys(b)]).forEach((k) => {
      const x = a[k] || 0, y = b[k] || 0;
      dot += x * y; na += x * x; nb += y * y;
    });
    return dot / (Math.sqrt(na) * Math.sqrt(nb) || 1);
  }
  async function loadMind() {
    try {
      const r = await fetch("data/mind70.json");
      Mind70.data = await r.json();
      Mind70.ready = true;
      const status = document.getElementById("boot-status");
      if (status) status.textContent = "Loaded local helper 70";
    } catch (e) {}
  }
  loadMind();

  function mathFrom(text) {
    const q = text.toLowerCase()
      .replace(/what is|what's|calculate|equals|equal to/g, "")
      .replace(/times|multiplied by/g, "*")
      .replace(/divided by/g, "/")
      .replace(/plus/g, "+")
      .replace(/minus/g, "-")
      .replace(/[^0-9+\-*/().\s]/g, "");
    if (!/[0-9]/.test(q) || !/[+\-*/]/.test(q)) return null;
    try {
      const n = Function('"use strict"; return (' + q + ")")();
      if (typeof n !== "number" || !isFinite(n)) return null;
      return "That comes to " + n + ".";
    } catch (e) { return null; }
  }

  window.Mind70 = {
    answer(text) {
      const math = mathFrom(text);
      if (math) return math;
      if (!Mind70.ready || !Mind70.data) return null;
      const q = bag(text);
      let best = null, bestScore = 0.28;
      Mind70.data.intents.forEach((item) => {
        const s = score(q, bag(item.q));
        if (s > bestScore) { bestScore = s; best = item; }
      });
      if (!best) return null;
      if (best.reply === "time") return "It is " + new Date().toLocaleTimeString() + ".";
      if (best.reply === "date") return "Today is " + new Date().toLocaleDateString(undefined, { weekday: "long", month: "long", day: "numeric" }) + ".";
      if (best.reply === "weather") return window.Lumen70 && Lumen70.weatherLine ? Lumen70.weatherLine() : "Weather is still loading.";
      if (best.reply === "lock") {
        document.getElementById("desktop")?.classList.add("hidden");
        document.getElementById("lock-screen")?.classList.remove("hidden");
        return "Locked.";
      }
      if (best.app && window.Desktop) Desktop.openApp(best.app);
      return best.reply;
    }
  };

  if (window.Aura && Aura.localReply) {
    const old = Aura.localReply;
    Aura.localReply = function (text) {
      const hit = window.Mind70.answer(text);
      if (hit) return hit;
      return old.call(this, text);
    };
  }

  const weather = { line: "Weather mock is waiting for a location." };
  async function loadWeather() {
    try {
      const loc = await fetch("https://ipapi.co/json/");
      const info = loc.ok ? await loc.json() : {};
      const lat = info.latitude || 37.77;
      const lon = info.longitude || -122.42;
      const city = info.city || "your area";
      const w = await fetch("https://api.open-meteo.com/v1/forecast?latitude=" + lat + "&longitude=" + lon + "&current=temperature_2m,weather_code&daily=temperature_2m_max,temperature_2m_min&timezone=auto");
      const data = await w.json();
      const temp = Math.round(data.current.temperature_2m);
      const hi = Math.round(data.daily.temperature_2m_max[0]);
      const lo = Math.round(data.daily.temperature_2m_min[0]);
      weather.line = city + " is about " + temp + "°. High " + hi + ", low " + lo + ".";
      weather.temp = temp;
      weather.city = city;
      const card = document.querySelector(".wid-weather");
      if (card) card.textContent = city + " · " + temp + "°";
    } catch (e) {
      weather.line = "Live weather is unavailable. The rest of the desk still works offline.";
    }
  }

  function playTone(notes) {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    let t = ctx.currentTime;
    notes.forEach((n) => {
      const o = ctx.createOscillator();
      const g = ctx.createGain();
      o.frequency.value = n.f;
      o.type = "sine";
      g.gain.setValueAtTime(0.0001, t);
      g.gain.exponentialRampToValueAtTime(0.08, t + 0.02);
      g.gain.exponentialRampToValueAtTime(0.0001, t + n.d);
      o.connect(g); g.connect(ctx.destination);
      o.start(t); o.stop(t + n.d);
      t += n.d * 0.9;
    });
  }

  function extraApps() {
    if (!window.Apps || !window.Desktop) return;
    Object.assign(Desktop.labels, {
      timer: "Timer",
      shelf: "Shelf",
      studio: "Studio"
    });
    if (window.Icons) {
      Icons.timer = () => Icons.svg('<svg width="28" height="28" viewBox="0 0 28 28"><circle cx="14" cy="15" r="8" fill="#fff"/><path d="M14 11v5l3 2" stroke="#0f172a"/><path d="M11 6h6" stroke="#fff"/></svg>', "linear-gradient(#fdba74,#ea580c)");
      Icons.shelf = () => Icons.svg('<svg width="28" height="28" viewBox="0 0 28 28"><rect x="6" y="6" width="7" height="7" rx="2" fill="#fff"/><rect x="15" y="6" width="7" height="7" rx="2" fill="#fff"/><rect x="6" y="15" width="16" height="7" rx="2" fill="#fff"/></svg>', "linear-gradient(#a5b4fc,#4f46e5)");
      Icons.studio = () => Icons.svg('<svg width="28" height="28" viewBox="0 0 28 28"><rect x="5" y="8" width="18" height="12" rx="2" fill="#fff"/><circle cx="14" cy="14" r="3" fill="#e11d48"/></svg>', "linear-gradient(#fda4af,#be123c)");
    }
    Apps.timer = function () {
      Windows.create("timer", "Timer", 320, 260, '<div class="pad"><h2 id="timer-read">00:25</h2><p><button id="timer-go" type="button">Start</button> <button id="timer-reset" type="button">Reset</button></p><p>Local countdown. It stays in this window.</p></div>');
      let left = 25 * 60, id = null;
      const read = document.getElementById("timer-read");
      const draw = () => {
        const m = String(Math.floor(left / 60)).padStart(2, "0");
        const s = String(left % 60).padStart(2, "0");
        read.textContent = m + ":" + s;
      };
      document.getElementById("timer-go").onclick = () => {
        if (id) { clearInterval(id); id = null; document.getElementById("timer-go").textContent = "Start"; return; }
        document.getElementById("timer-go").textContent = "Pause";
        id = setInterval(() => {
          left = Math.max(0, left - 1);
          draw();
          if (!left) { clearInterval(id); id = null; if (window.Desktop) Desktop.toast("Timer done"); if (window.Aura) Aura.speak("Timer done"); }
        }, 1000);
      };
      document.getElementById("timer-reset").onclick = () => { left = 25 * 60; draw(); };
    };
    Apps.shelf = function () {
      const items = [
        ["notes", "Notes", "Saved in this browser."],
        ["timer", "Timer", "Twenty-five minute focus."],
        ["studio", "Studio", "Short original tone."],
        ["weather", "Weather", "Live forecast card."],
        ["chess", "Chess", "Move pieces by clicking."],
        ["canvas", "Canvas", "Draw on a pad."]
      ];
      Windows.create("shelf", "Shelf", 560, 420, '<div class="store-grid">' + items.map((c) => '<div class="store-card"><strong>' + c[1] + '</strong><p>' + c[2] + '</p><button data-app="' + c[0] + '" type="button">Open</button></div>').join("") + '</div><p class="pad">Original catalog. Not an app store.</p>');
      document.querySelectorAll(".store-card button").forEach((b) => {
        b.onclick = () => Desktop.openApp(b.dataset.app);
      });
    };
    Apps.studio = function () {
      Windows.create("studio", "Studio", 380, 240, '<div class="pad"><strong>Ridge tone</strong><p>An original four-note loop. Not a catalog track.</p><button id="studio-play" type="button">Play</button></div>');
      document.getElementById("studio-play").onclick = () => playTone([
        { f: 392, d: 0.28 }, { f: 494, d: 0.28 }, { f: 587, d: 0.28 }, { f: 494, d: 0.4 }
      ]);
    };
    const oldWeather = Apps.weather;
    Apps.weather = function () {
      oldWeather();
      const pad = document.querySelector(".window .pad");
      if (pad) pad.innerHTML = "<h2>" + (weather.temp || "--") + "°</h2><p>" + weather.line + "</p><p>Source: Open-Meteo. Not a system weather app.</p>";
    };
  }

  function chips() {
    const panel = document.getElementById("assistant");
    if (!panel || document.getElementById("l70-chips")) return;
    const row = document.createElement("div");
    row.id = "l70-chips";
    ["weather", "open timer", "open shelf", "what is 18 times 4"].forEach((label) => {
      const b = document.createElement("button");
      b.type = "button";
      b.className = "l70-chip";
      b.textContent = label;
      b.onclick = () => { if (window.Desktop) Desktop.askAura(label, true); };
      row.appendChild(b);
    });
    const form = document.getElementById("aura-form");
    if (form) panel.insertBefore(row, form);
  }

  window.Lumen70 = { weatherLine: () => weather.line };
  const start = window.Desktop && Desktop.start;
  if (start) {
    Desktop.start = function () {
      extraApps();
      start.apply(this, arguments);
      document.getElementById("wallpaper")?.classList.add("ridge70");
      loadWeather();
      setTimeout(chips, 320);
      if (window.Desktop) Desktop.toast("Lumen 70 · helper and weather ready");
    };
  }
  const boot = document.getElementById("boot-status");
  if (boot) boot.textContent = "Loading local helper 70…";
})();
