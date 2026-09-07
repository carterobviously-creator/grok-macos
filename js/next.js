(function () {
  Desktop.labels.games = "Games";
  Desktop.labels.news = "Pulse News";

  Icons.games = function () {
    return this.svg('<svg width="28" height="28" viewBox="0 0 28 28"><rect x="5" y="10" width="18" height="10" rx="4" fill="#fff"/><circle cx="10" cy="15" r="1.5" fill="#0f172a"/><circle cx="18" cy="15" r="1.5" fill="#0f172a"/></svg>', "linear-gradient(#34d399,#059669)");
  };
  Icons.news = function () {
    return this.svg('<svg width="28" height="28" viewBox="0 0 28 28"><rect x="6" y="6" width="16" height="16" rx="2" fill="#fff"/><path d="M9 10h10M9 14h10M9 18h6" stroke="#0f172a"/></svg>', "linear-gradient(#fb7185,#be123c)");
  };

  Apps.games = function () {
    Windows.create("games", "Games", 320, 360,
      '<div class="pad"><p>Tic-tac-toe mock</p><div class="game-board" id="ttt"></div><p id="ttt-status">X starts</p></div>');
    const cells = Array(9).fill("");
    let turn = "X";
    const board = document.getElementById("ttt");
    const status = document.getElementById("ttt-status");
    function win() {
      const lines = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];
      for (const [a,b,c] of lines) if (cells[a] && cells[a] === cells[b] && cells[a] === cells[c]) return cells[a];
      return cells.every(Boolean) ? "draw" : null;
    }
    function draw() {
      board.innerHTML = cells.map((v,i) => "<button data-i="+i+">"+(v||"")+"</button>").join("");
      board.querySelectorAll("button").forEach((b) => {
        b.onclick = () => {
          const i = Number(b.dataset.i);
          if (cells[i] || win()) return;
          cells[i] = turn;
          const w = win();
          if (w === "draw") status.textContent = "Draw";
          else if (w) status.textContent = w + " wins";
          else { turn = turn === "X" ? "O" : "X"; status.textContent = turn + " turn"; }
          draw();
        };
      });
    }
    draw();
  };

  Apps.news = function () {
    Windows.create("news", "Pulse News", 420, 360,
      '<div class="pad"><h3>Mock headlines</h3><p>Lumen desktop updated with extra glass polish.</p><p>Aura can open apps and do local math.</p><p>Weather uses Open-Meteo when online.</p></div>');
  };

  const drawer = document.getElementById("notify-drawer");
  if (drawer && !document.getElementById("notify-list")) {
    drawer.innerHTML =
      "<h4>Notifications</h4><div id='notify-list'></div>" +
      drawer.innerHTML.replace("<h4>Notifications</h4>", "");
    const list = document.getElementById("notify-list");
    ["Gallery has extra apps for the dock.", "Hold Aura mic to speak.", "F3 Mission · F4 Launch · ⌘K Search"].forEach((t) => {
      const p = document.createElement("p");
      p.textContent = t;
      list.appendChild(p);
    });
  }

  const _settings = Apps.settings;
  Apps.settings = function () {
    _settings();
    const box = document.querySelector("#window-layer .settings");
    if (!box || document.getElementById("wall-pick")) return;
    const p = document.createElement("p");
    p.innerHTML = 'Wallpaper <select id="wall-pick"><option value="">Default dusk blue</option><option value="alt">Warm</option><option value="dusk">Ember</option><option value="mint">Mint</option></select>';
    box.insertBefore(p, box.firstChild.nextSibling);
    document.getElementById("wall-pick").onchange = (e) => {
      const w = document.getElementById("wallpaper");
      w.classList.remove("alt", "dusk", "mint");
      if (e.target.value) w.classList.add(e.target.value);
    };
  };

  const oldLocal = Aura.localReply.bind(Aura);
  Aura.localReply = function (text) {
    const q = text.toLowerCase();
    if (/game|tic/.test(q)) { Desktop.openApp("games"); return "Opening Games."; }
    if (/news|headline/.test(q)) { Desktop.openApp("news"); return "Opening Pulse News."; }
    return oldLocal(text);
  };
})();
