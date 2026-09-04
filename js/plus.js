(function () {
  const _settings = Apps.settings;
  Apps.settings = function () {
    Windows.create("settings", "Settings", 520, 420,
      '<div class="pad settings">' +
      '<h3>Appearance</h3>' +
      '<label><input type="checkbox" id="alt-wall"> Warm wallpaper</label>' +
      '<label>Dock scale <input id="dock-scale" type="range" min="0.8" max="1.3" step="0.05" value="1"></label>' +
      '<h3>Aura helper</h3>' +
      '<label><input type="checkbox" id="aura-cloud"> Use optional public text demo for longer answers</label>' +
      '<p>Off by default. When on, casual questions may go to a third-party demo API. App commands stay local.</p>' +
      '<p>Lumen is an entertainment mock. Original icons and wallpaper. Not an Apple product.</p></div>');
    const alt = document.getElementById("alt-wall");
    alt.checked = document.getElementById("wallpaper").classList.contains("alt");
    alt.onchange = (e) => document.getElementById("wallpaper").classList.toggle("alt", e.target.checked);
    document.getElementById("dock-scale").oninput = (e) => {
      document.getElementById("dock").style.transform = "translateX(-50%) scale(" + e.target.value + ")";
    };
    const cloud = document.getElementById("aura-cloud");
    cloud.checked = localStorage.getItem("lumen-aura-cloud") === "1";
    cloud.onchange = (e) => {
      localStorage.setItem("lumen-aura-cloud", e.target.checked ? "1" : "0");
      const mode = document.getElementById("aura-mode");
      if (mode) mode.textContent = e.target.checked ? "Demo API on" : (AuraModel.ready ? "Offline · loaded" : "Offline");
      Desktop.toast(e.target.checked ? "Aura demo API enabled." : "Aura is local only.");
    };
  };

  Apps.music = function () {
    Windows.create("music", "Music", 360, 400,
      '<div class="music"><div class="art"></div><strong>Night Drive</strong><p>Local tone · not a real song</p>' +
      '<input id="music-pos" type="range" min="0" max="100" value="0">' +
      '<p><button id="music-play">Play tone</button> <button id="music-stop">Stop</button></p></div>');
    let ctx, osc, gain, timer;
    const pos = document.getElementById("music-pos");
    document.getElementById("music-play").onclick = () => {
      if (osc) return;
      ctx = ctx || new (window.AudioContext || window.webkitAudioContext)();
      osc = ctx.createOscillator();
      gain = ctx.createGain();
      osc.type = "sine";
      osc.frequency.value = 220;
      const vol = document.getElementById("vol");
      gain.gain.value = vol ? Number(vol.value) / 400 : 0.08;
      osc.connect(gain).connect(ctx.destination);
      osc.start();
      let n = Number(pos.value);
      timer = setInterval(() => { n = (n + 1) % 101; pos.value = n; }, 250);
    };
    document.getElementById("music-stop").onclick = () => {
      if (osc) { try { osc.stop(); } catch (e) {} osc = null; }
      clearInterval(timer);
    };
  };

  Apps.weather = function () {
    Windows.create("weather", "Weather", 380, 300,
      '<div class="pad" id="wx"><h2>…</h2><p>Asking Open-Meteo for a demo city…</p></div>');
    const box = document.getElementById("wx");
    fetch("https://api.open-meteo.com/v1/forecast?latitude=37.77&longitude=-122.42&current=temperature_2m,weather_code")
      .then((r) => r.json())
      .then((d) => {
        const t = Math.round(d.current.temperature_2m);
        box.innerHTML = "<h2>" + t + "°</h2><p>Live Open-Meteo sample for San Francisco.</p><p>Not a system weather app.</p>";
      })
      .catch(() => {
        box.innerHTML = "<h2>72°</h2><p>Clear · offline mock</p>";
      });
  };

  const dock = document.getElementById("dock");
  if (dock) {
    dock.addEventListener("mousemove", (e) => {
      const items = [...dock.querySelectorAll(".dock-item")];
      items.forEach((item) => {
        const r = item.getBoundingClientRect();
        const dx = Math.abs(e.clientX - (r.left + r.width / 2));
        const scale = Math.max(1, 1.35 - dx / 180);
        item.style.transform = "translateY(" + ((scale - 1) * -28) + "px) scale(" + scale + ")";
      });
    });
    dock.addEventListener("mouseleave", () => {
      dock.querySelectorAll(".dock-item").forEach((item) => { item.style.transform = ""; });
    });
  }

  const _refresh = Desktop.refreshAuraMode.bind(Desktop);
  Desktop.refreshAuraMode = function () {
    _refresh();
    const el = document.getElementById("aura-mode");
    if (el && localStorage.getItem("lumen-aura-cloud") === "1") el.textContent = "Demo API on";
  };
})();
