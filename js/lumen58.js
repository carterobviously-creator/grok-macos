(function () {
  const extra = [
    ["books", "Books", "Short original stories."],
    ["news", "Brief", "Mock headlines."],
    ["stocks", "Markets", "Fake tickers."],
    ["podcasts", "Shows", "Episode list."],
    ["shelf", "Shelf", "Install mock apps."]
  ];

  function appBody(id) {
    if (id === "books") {
      return `<article class="pad"><h3>Ridge Light</h3><p>An original short: the lake kept the last of the sun, and the dock lights blinked on one by one.</p><p>This is not a bookstore. It is a reading pane in the mock.</p></article>`;
    }
    if (id === "news") {
      return `<ul class="pad"><li>Glass slider now defaults to medium in this mock.</li><li>Aura still answers locally if the demo link is off.</li><li>Wallpaper scene Ridge is an original render, not a system image.</li></ul>`;
    }
    if (id === "stocks") {
      return `<table class="pad"><tr><td>LUMEN</td><td>+1.2</td></tr><tr><td>GLASS</td><td>-0.4</td></tr><tr><td>AURA</td><td>+0.8</td></tr></table>`;
    }
    if (id === "podcasts") {
      return `<div class="pad"><p><strong>Desk Notes</strong> — episode 3</p><button type="button" id="pod-play">Play tone</button></div>`;
    }
    return "";
  }

  function shelfHtml() {
    const rows = extra.concat([
      ["notes", "Notes", "Text pad."],
      ["calc", "Calculator", "Math."],
      ["music", "Music", "Tones."],
      ["photos", "Photos", "Tiles."],
      ["terminal", "Terminal", "Shell."],
      ["mail", "Mail", "Inbox."]
    ]);
    return `<div class="shelf-grid">${rows.map((c) =>
      `<div class="shelf-card"><strong>${c[1]}</strong><p>${c[2]}</p><button type="button" class="get-btn" data-install="${c[0]}">Get</button></div>`
    ).join("")}<p class="mind-note">Get adds a dock shortcut in this browser. Icons are original SVGs.</p></div>`;
  }

  function bind(root) {
    root.querySelectorAll("[data-install]").forEach((btn) => {
      btn.addEventListener("click", () => {
        const id = btn.getAttribute("data-install");
        btn.textContent = "Adding…";
        setTimeout(() => {
          if (typeof Desktop !== "undefined") Desktop.install(id);
          btn.textContent = "Open";
          btn.onclick = () => Desktop.openApp(id);
        }, 500);
      });
    });
    const play = root.querySelector("#pod-play");
    if (play) play.onclick = () => {
      const ctx = new (window.AudioContext || window.webkitAudioContext)();
      const o = ctx.createOscillator();
      const g = ctx.createGain();
      o.frequency.value = 440;
      o.connect(g); g.connect(ctx.destination);
      g.gain.setValueAtTime(0.05, ctx.currentTime);
      o.start(); o.stop(ctx.currentTime + 0.35);
    };
  }

  const prev = Desktop.openApp.bind(Desktop);
  Desktop.openApp = function (id) {
    if (id === "shelf") {
      const w = Windows.create("shelf", "Shelf", 620, 480, shelfHtml());
      bind(w); return w;
    }
    const body = appBody(id);
    if (body) {
      const titles = { books: "Books", news: "Brief", stocks: "Markets", podcasts: "Shows" };
      const w = Windows.create(id, titles[id] || id, 520, 380, body);
      bind(w); return w;
    }
    return prev(id);
  };
  extra.forEach((c) => { Desktop.labels[c[0]] = c[1]; });

  function ensureLayer() {
    if (document.getElementById("speak-layer")) return;
    const layer = document.createElement("div");
    layer.id = "speak-layer";
    layer.innerHTML = `<div class="panel glass"><div id="speak-orb"></div><strong>Aura</strong><p id="speak-text">Hold and ask. Local helper, not a system assistant.</p></div>`;
    document.getElementById("desktop").appendChild(layer);
    layer.addEventListener("click", (e) => {
      if (e.target === layer) layer.classList.remove("on");
    });
  }

  async function ask(text) {
    const out = document.getElementById("speak-text");
    if (out) out.textContent = "Thinking…";
    const reply = await Aura.reply(text);
    if (out) out.textContent = reply;
    Aura.speak(reply);
    if (typeof Desktop !== "undefined") Desktop.addAura("bot", reply);
    return reply;
  }

  window.LumenSpeak = {
    open() {
      ensureLayer();
      document.getElementById("speak-layer").classList.add("on");
      document.getElementById("speak-orb").classList.add("listening-orb");
      Aura.listen((said) => ask(said));
    }
  };

  document.addEventListener("keydown", (e) => {
    if (e.code === "Space" && (e.metaKey || e.ctrlKey) && !e.repeat) {
      e.preventDefault();
      window.LumenSpeak.open();
    }
  });

  function wallpaper() {
    const wall = document.getElementById("wallpaper");
    if (wall) wall.classList.add("scene-ridge");
  }
  setTimeout(wallpaper, 400);
  document.addEventListener("DOMContentLoaded", wallpaper);
})();
