(function () {
  const _unlock = document.getElementById("unlock-btn");
  if (_unlock) {
    document.getElementById("lock-screen").addEventListener("click", (e) => {
      if (e.target.closest("#unlock-btn") || e.target === _unlock) return;
    });
  }

  const _camera = Apps.camera;
  Apps.camera = function () {
    Windows.create("camera", "Camera", 520, 400,
      '<div class="pad"><video id="cam-live" autoplay playsinline muted style="width:100%;height:220px;object-fit:cover;border-radius:16px;background:#0f172a"></video><p><button id="cam-start">Use this device camera (optional)</button> <button id="cam-stop">Stop</button></p><p>Permission stays in your browser. Nothing is uploaded.</p></div>');
    const vid = document.getElementById("cam-live");
    let stream = null;
    document.getElementById("cam-start").onclick = async () => {
      try {
        stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: false });
        vid.srcObject = stream;
      } catch (err) {
        Desktop.toast("Camera blocked or unavailable.");
      }
    };
    document.getElementById("cam-stop").onclick = () => {
      if (stream) stream.getTracks().forEach((t) => t.stop());
      vid.srcObject = null;
    };
  };

  const _music = Apps.music;
  Apps.music = function () {
    _music();
    const box = document.querySelector(".music");
    if (!box || document.getElementById("music-play")) return;
    const row = document.createElement("p");
    row.innerHTML = '<button id="music-play">Play tone</button> <button id="music-stop">Stop</button>';
    box.appendChild(row);
    let ctx, osc, gain;
    document.getElementById("music-play").onclick = () => {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return Desktop.toast("No Web Audio in this browser.");
      ctx = ctx || new AudioCtx();
      if (osc) osc.stop();
      osc = ctx.createOscillator();
      gain = ctx.createGain();
      const vol = document.getElementById("vol");
      gain.gain.value = vol ? Number(vol.value) / 200 : 0.2;
      osc.type = "sine";
      osc.frequency.value = 220;
      osc.connect(gain).connect(ctx.destination);
      osc.start();
    };
    document.getElementById("music-stop").onclick = () => {
      if (osc) { try { osc.stop(); } catch (e) {} osc = null; }
    };
  };

  const _weather = Apps.weather;
  Apps.weather = function () {
    Windows.create("weather", "Weather", 380, 300,
      '<div class="pad"><h2 id="wx-temp">72°</h2><p id="wx-line">Clear · mock city</p><p>High 76 · Low 58</p><p id="wx-note">Offline mock. Optional live lookup uses Open-Meteo.</p><p><button id="wx-live">Try live (approx)</button></p></div>');
    document.getElementById("wx-live").onclick = async () => {
      try {
        const pos = await new Promise((res, rej) => {
          if (!navigator.geolocation) return rej();
          navigator.geolocation.getCurrentPosition(res, rej, { timeout: 5000 });
        });
        const lat = pos.coords.latitude.toFixed(2);
        const lon = pos.coords.longitude.toFixed(2);
        const r = await fetch("https://api.open-meteo.com/v1/forecast?latitude=" + lat + "&longitude=" + lon + "&current=temperature_2m,weather_code");
        const j = await r.json();
        const t = Math.round(j.current.temperature_2m);
        document.getElementById("wx-temp").textContent = t + "°";
        document.getElementById("wx-line").textContent = "Near you · Open-Meteo";
        document.getElementById("wx-note").textContent = "Live sample, not a product forecast.";
        AuraModel.facts.weather = t + " degrees near you (live sample)";
      } catch (e) {
        Desktop.toast("Live weather skipped. Using mock.");
      }
    };
  };

  const _settings = Apps.settings;
  Apps.settings = function () {
    _settings();
    const box = document.querySelector(".settings");
    if (!box || document.getElementById("aura-hint")) return;
    const p = document.createElement("p");
    p.id = "aura-hint";
    p.textContent = "Turn on the demo API checkbox for longer Aura replies. Local commands still work offline.";
    box.appendChild(p);
  };
})();
