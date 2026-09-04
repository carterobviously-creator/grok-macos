(function live() {
  const origWeather = Apps.weather;
  Apps.weather = function () {
    origWeather();
    const body = document.querySelector('.win[data-id="weather"] .win-body .pad');
    if (!body) return;
    const p = document.createElement("p");
    p.textContent = "Trying live mock city weather…";
    body.appendChild(p);
    fetch("https://api.open-meteo.com/v1/forecast?latitude=37.77&longitude=-122.42&current=temperature_2m,weather_code")
      .then((r) => r.json())
      .then((d) => {
        if (!d.current) return;
        p.textContent = "Open-Meteo sample: " + d.current.temperature_2m + "°C (San Francisco coords). Still a demo.";
        AuraModel.facts.weather = d.current.temperature_2m + " C sample";
      })
      .catch(() => { p.textContent = "Live weather skipped (offline)."; });
  };

  const origCam = Apps.camera;
  Apps.camera = function () {
    origCam();
    const body = document.querySelector('.win[data-id="camera"] .win-body .pad');
    if (!body || !navigator.mediaDevices) return;
    const btn = document.createElement("button");
    btn.textContent = "Use device camera (optional)";
    body.appendChild(btn);
    btn.onclick = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        const v = document.createElement("video");
        v.autoplay = true;
        v.playsInline = true;
        v.style.width = "100%";
        v.style.borderRadius = "16px";
        v.srcObject = stream;
        body.prepend(v);
      } catch (e) {
        Desktop.toast("Camera permission denied.");
      }
    };
  };

  const origMusic = Apps.music;
  Apps.music = function () {
    origMusic();
    const body = document.querySelector('.win[data-id="music"] .win-body .music');
    if (!body) return;
    const play = document.createElement("button");
    play.textContent = "Play tone";
    body.appendChild(play);
    play.onclick = () => {
      const ctx = new (window.AudioContext || window.webkitAudioContext)();
      const o = ctx.createOscillator();
      const g = ctx.createGain();
      o.frequency.value = 220;
      g.gain.value = 0.05;
      o.connect(g);
      g.connect(ctx.destination);
      o.start();
      setTimeout(() => { o.stop(); ctx.close(); }, 900);
    };
  };
})();
