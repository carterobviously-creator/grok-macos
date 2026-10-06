(function lumen63() {
  const status = document.getElementById("boot-status");
  if (status) status.textContent = "Loading mind 63…";
  const fill = document.getElementById("boot-fill");
  if (fill) fill.classList.add("mind63");

  window.Mind63 = { ready: false, lines: [], facts: {} };
  fetch("data/mind63.json")
    .then((r) => r.json())
    .then((data) => {
      Mind63.lines = data.lines || [];
      Mind63.facts = data.facts || {};
      Mind63.ready = true;
      if (status && !document.getElementById("boot-screen").classList.contains("hidden")) {
        status.textContent = "Mind 63 loaded";
      }
    })
    .catch(() => {});

  function files() {
    return JSON.parse(localStorage.getItem("lumen63-files") || '{"Documents":["Essay","Budget"],"Desktop":["Sketch"],"Downloads":["Notes export"]}');
  }
  function saveFiles(map) {
    localStorage.setItem("lumen63-files", JSON.stringify(map));
  }

  const oldFinder = Apps.finder;
  Apps.finder = function () {
    oldFinder();
    const grid = document.getElementById("finder-grid");
    if (!grid) return;
    const bar = document.createElement("div");
    bar.className = "file-tools";
    bar.innerHTML = '<input id="new-file" placeholder="New file name"><button type="button" id="add-file">Add</button>';
    grid.parentElement.insertBefore(bar, grid);
    document.getElementById("add-file").onclick = () => {
      const name = document.getElementById("new-file").value.trim();
      if (!name) return;
      const map = files();
      map.Documents = map.Documents || [];
      map.Documents.push(name);
      saveFiles(map);
      grid.insertAdjacentHTML("beforeend", '<button class="file"><div class="box"></div>' + name + "</button>");
      document.getElementById("new-file").value = "";
      Desktop.toast("Saved " + name);
    };
  };

  Apps.store = function () {
    const cards = [
      ["photos", "Photos", "Create", "Color tiles you can click."],
      ["terminal", "Terminal", "Work", "Type help, date, or aura."],
      ["calendar", "Calendar", "Plan", "This month, marked today."],
      ["music", "Music", "Play", "Play a short original tone."],
      ["mail", "Mail", "Connect", "Sample inbox."],
      ["maps", "Maps", "Explore", "Decorative map card."],
      ["weather", "Weather", "Live", "Fetches a public forecast."],
      ["messages", "Messages", "Chat", "Local thread with Aura replies."],
      ["reminders", "Reminders", "Plan", "Checklist in this browser."],
      ["sketch", "Sketch", "Create", "Draw on a canvas."],
      ["board", "Board", "Play", "Tic-tac-toe."]
    ];
    Windows.create("store", "Gallery", 640, 480,
      '<div class="store-toolbar"><input id="store-q" placeholder="Search shelf"></div>' +
      '<div class="store-cats"><button class="on" data-cat="All">All</button><button data-cat="Create">Create</button><button data-cat="Plan">Plan</button><button data-cat="Play">Play</button><button data-cat="Live">Live</button></div>' +
      '<div class="store-grid" id="store-grid"></div>');
    const draw = () => {
      const q = (document.getElementById("store-q").value || "").toLowerCase();
      const cat = document.querySelector(".store-cats button.on").dataset.cat;
      document.getElementById("store-grid").innerHTML = cards.filter((c) =>
        (cat === "All" || c[2] === cat) && c[1].toLowerCase().includes(q)
      ).map((c) =>
        '<div class="store-card"><strong>' + c[1] + '</strong><p>' + c[3] +
        '</p><button data-app="' + c[0] + '">Get</button></div>'
      ).join("");
      document.querySelectorAll(".store-card button").forEach((b) => {
        b.onclick = () => { Desktop.install(b.dataset.app); b.textContent = "Open"; };
      });
    };
    document.getElementById("store-q").oninput = draw;
    document.querySelectorAll(".store-cats button").forEach((b) => {
      b.onclick = () => {
        document.querySelectorAll(".store-cats button").forEach((x) => x.classList.remove("on"));
        b.classList.add("on");
        draw();
      };
    });
    draw();
  };

  Apps.messages = function () {
    Windows.create("messages", "Messages", 420, 420,
      '<div class="pad"><div class="msg-thread" id="thread"><div class="bubble">Aura: ask me anything in this thread.</div></div>' +
      '<form class="msg-form" id="msg-form"><input id="msg-in" placeholder="Message"><button>Send</button></form></div>');
    document.getElementById("msg-form").onsubmit = async (e) => {
      e.preventDefault();
      const input = document.getElementById("msg-in");
      const text = input.value.trim();
      if (!text) return;
      input.value = "";
      const thread = document.getElementById("thread");
      thread.insertAdjacentHTML("beforeend", '<div class="bubble me"></div>');
      thread.lastChild.textContent = text;
      const reply = await Aura.reply(text);
      thread.insertAdjacentHTML("beforeend", '<div class="bubble"></div>');
      thread.lastChild.textContent = "Aura: " + reply;
    };
  };

  Apps.music = function () {
    Windows.create("music", "Music", 360, 300,
      '<div class="music"><div class="art"></div><strong>Glass Tone</strong><p>Original oscillator, not a song</p>' +
      '<div class="tone-row"><button id="play-tone">Play</button><button id="stop-tone">Stop</button></div></div>');
    let ctx, osc;
    document.getElementById("play-tone").onclick = () => {
      ctx = new (window.AudioContext || window.webkitAudioContext)();
      osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "sine";
      osc.frequency.value = 440;
      gain.gain.value = 0.05;
      osc.connect(gain).connect(ctx.destination);
      osc.start();
      Desktop.toast("Playing a short tone");
      setTimeout(() => { try { osc.stop(); } catch (e) {} }, 1200);
    };
    document.getElementById("stop-tone").onclick = () => { try { osc.stop(); } catch (e) {} };
  };

  Apps.weather = function () {
    Windows.create("weather", "Weather", 380, 280,
      '<div class="wx-card"><h2 id="wx-temp">…</h2><p id="wx-desc">Fetching public forecast</p><p>Source: open-meteo. Not a branded weather app.</p></div>');
    fetch("https://api.open-meteo.com/v1/forecast?latitude=37.77&longitude=-122.42&current=temperature_2m,weather_code")
      .then((r) => r.json())
      .then((data) => {
        const t = data.current && data.current.temperature_2m;
        document.getElementById("wx-temp").textContent = (t != null ? Math.round(t) : "--") + "°";
        document.getElementById("wx-desc").textContent = "San Francisco sample · code " + (data.current ? data.current.weather_code : "?");
      })
      .catch(() => {
        document.getElementById("wx-temp").textContent = "72°";
        document.getElementById("wx-desc").textContent = "Offline mock forecast";
      });
  };

  const baseReply = Aura.localReply.bind(Aura);
  Aura.localReply = function (text) {
    const q = text.toLowerCase();
    if (Mind63.ready && /mind|model|loaded/.test(q)) {
      return "Mind 63 is loaded. It is a local phrase book, not a product model.";
    }
    if (/play|tone|music/.test(q) && /open|play/.test(q)) {
      Desktop.openApp("music");
      return "Opening Music. Press Play for a short tone.";
    }
    return baseReply(text);
  };

  Desktop.labels.weather = Desktop.labels.weather || "Weather";
  Desktop.labels.messages = Desktop.labels.messages || "Messages";
})();
