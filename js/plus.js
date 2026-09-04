/* Extra polish for the Lumen entertainment mock. Original UI only. */
(function () {
  const wait = setInterval(() => {
    if (typeof Desktop === "undefined" || typeof Apps === "undefined") return;
    clearInterval(wait);
    wire();
  }, 40);

  function wire() {
    const origSettings = Apps.settings;
    Apps.settings = function () {
      origSettings();
      const box = document.querySelector(".settings");
      if (!box || document.getElementById("aura-cloud")) return;
      const extra = document.createElement("div");
      extra.innerHTML =
        '<label><input type="checkbox" id="aura-cloud"> Enable optional third-party text demo (Pollinations). Not Apple. Not Siri.</label>' +
        '<label><input type="checkbox" id="speak-aura"> Speak Aura replies</label>' +
        '<p class="muted">Demo answers are short public-text completions. Desktop commands stay local.</p>';
      box.appendChild(extra);
      const cloud = document.getElementById("aura-cloud");
      const speak = document.getElementById("speak-aura");
      cloud.checked = localStorage.getItem("lumen-aura-cloud") === "1";
      speak.checked = localStorage.getItem("lumen-speak") === "1";
      cloud.onchange = () => {
        localStorage.setItem("lumen-aura-cloud", cloud.checked ? "1" : "0");
        Desktop.refreshAuraMode();
        const mode = document.getElementById("aura-mode");
        if (mode) mode.textContent = cloud.checked ? "Demo text on" : "Offline · loaded";
        Desktop.toast(cloud.checked ? "Demo text API on." : "Aura local only.");
      };
      speak.onchange = () => localStorage.setItem("lumen-speak", speak.checked ? "1" : "0");
    };

    const origAsk = Desktop.askAura.bind(Desktop);
    Desktop.askAura = async function (text, speak) {
      await origAsk(text, speak || localStorage.getItem("lumen-speak") === "1");
    };

    const origRefresh = Desktop.refreshAuraMode.bind(Desktop);
    Desktop.refreshAuraMode = function () {
      origRefresh();
      const el = document.getElementById("aura-mode");
      if (el && localStorage.getItem("lumen-aura-cloud") === "1") el.textContent = "Demo text on";
    };

    const origMusic = Apps.music;
    Apps.music = function () {
      origMusic();
      const wrap = document.querySelector(".music");
      if (!wrap || document.getElementById("play-tone")) return;
      const row = document.createElement("p");
      row.innerHTML = '<button id="play-tone">Play local tone</button> <button id="stop-tone">Stop</button>';
      wrap.appendChild(row);
      let ctx, osc, gain;
      document.getElementById("play-tone").onclick = () => {
        if (ctx) return;
        ctx = new (window.AudioContext || window.webkitAudioContext)();
        osc = ctx.createOscillator();
        gain = ctx.createGain();
        osc.type = "sine";
        osc.frequency.value = 392;
        gain.gain.value = (Number(document.getElementById("vol")?.value || 40) / 200);
        osc.connect(gain).connect(ctx.destination);
        osc.start();
        Desktop.toast("Local oscillator — not a licensed track.");
      };
      document.getElementById("stop-tone").onclick = () => {
        try { osc && osc.stop(); } catch (e) {}
        ctx = osc = gain = null;
      };
    };

    const origWeather = Apps.weather;
    Apps.weather = function () {
      origWeather();
      const pad = document.querySelector(".win[data-id='weather'] .pad");
      if (!pad) return;
      pad.innerHTML = "<h2>…</h2><p>Asking Open-Meteo for a demo city (Austin).</p>";
      fetch("https://api.open-meteo.com/v1/forecast?latitude=30.27&longitude=-97.74&current=temperature_2m,weather_code")
        .then((r) => r.json())
        .then((d) => {
          const t = Math.round(d.current.temperature_2m);
          pad.innerHTML = "<h2>" + t + "°C</h2><p>Austin demo via Open-Meteo</p><p>Code " + d.current.weather_code + " · not a branded weather app</p>";
          AuraModel.facts.weather = t + " C in the demo city";
        })
        .catch(() => {
          pad.innerHTML = "<h2>72°</h2><p>Offline mock forecast.</p>";
        });
    };

    const origCam = Apps.camera;
    Apps.camera = function () {
      origCam();
      const pad = document.querySelector(".win[data-id='camera'] .pad");
      if (!pad || !navigator.mediaDevices) return;
      pad.innerHTML = '<video id="cam-view" autoplay playsinline style="width:100%;height:200px;object-fit:cover;border-radius:16px;background:#111"></video><p>Optional device camera. Stays in your browser.</p><button id="cam-off">Stop</button>';
      navigator.mediaDevices.getUserMedia({ video: true, audio: false }).then((stream) => {
        const v = document.getElementById("cam-view");
        if (v) v.srcObject = stream;
        const off = document.getElementById("cam-off");
        if (off) off.onclick = () => stream.getTracks().forEach((t) => t.stop());
      }).catch(() => {
        pad.innerHTML = "<p>Camera permission declined. Decorative viewfinder only.</p>";
      });
    };

    window.addEventListener("keydown", (e) => {
      if ((e.metaKey || e.ctrlKey) && e.code === "Space") {
        e.preventDefault();
        Desktop.openApp("aura");
        document.getElementById("aura-input")?.focus();
      }
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "l") {
        e.preventDefault();
        document.getElementById("desktop").classList.add("hidden");
        document.getElementById("lock-screen").classList.remove("hidden");
      }
    });

    const dock = document.getElementById("dock");
    if (dock && !dock.dataset.mag) {
      dock.dataset.mag = "1";
      dock.addEventListener("mousemove", (e) => {
        dock.querySelectorAll(".dock-item").forEach((item) => {
          const r = item.getBoundingClientRect();
          const dx = Math.abs(e.clientX - (r.left + r.width / 2));
          const s = Math.max(1, 1.42 - dx / 140);
          item.style.transform = "translateY(" + ((s - 1) * -28) + "px) scale(" + s + ")";
        });
      });
      dock.addEventListener("mouseleave", () => {
        dock.querySelectorAll(".dock-item").forEach((item) => { item.style.transform = ""; });
      });
    }
  }
})();
