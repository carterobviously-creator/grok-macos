Icons.messages = function () {
  return this.svg('<svg width="28" height="28" viewBox="0 0 28 28"><rect x="4" y="6" width="20" height="14" rx="7" fill="#fff"/></svg>', "linear-gradient(#4ade80,#16a34a)");
};
Icons.contacts = function () {
  return this.svg('<svg width="28" height="28" viewBox="0 0 28 28"><circle cx="14" cy="11" r="4" fill="#fff"/><path d="M7 21c1-4 4-6 7-6s6 2 7 6" fill="#fff"/></svg>', "linear-gradient(#fda4af,#fb7185)");
};
Icons.activity = function () {
  return this.svg('<svg width="28" height="28" viewBox="0 0 28 28"><path d="M4 16h4l3-8 4 14 3-6h6" fill="none" stroke="#fff" stroke-width="2"/></svg>', "linear-gradient(#a78bfa,#4f46e5)");
};
Icons.phone = function () {
  return this.svg('<svg width="28" height="28" viewBox="0 0 28 28"><rect x="9" y="4" width="10" height="20" rx="2" fill="#fff"/></svg>', "linear-gradient(#86efac,#16a34a)");
};
Icons.flows = function () {
  return this.svg('<svg width="28" height="28" viewBox="0 0 28 28"><rect x="5" y="7" width="8" height="8" rx="2" fill="#fff"/><rect x="15" y="13" width="8" height="8" rx="2" fill="#fff"/></svg>', "linear-gradient(#fde68a,#f59e0b)");
};
Icons.camera = function () {
  return this.svg('<svg width="28" height="28" viewBox="0 0 28 28"><rect x="5" y="9" width="18" height="12" rx="3" fill="#fff"/><circle cx="14" cy="15" r="4" fill="#334155"/></svg>', "linear-gradient(#94a3b8,#334155)");
};
Icons.sketch = function () {
  return this.svg('<svg width="28" height="28" viewBox="0 0 28 28"><path d="M7 20l11-11 3 3-11 11z" fill="#fff"/></svg>', "linear-gradient(#fda4af,#fb7185)");
};
Icons.radio = function () {
  return this.svg('<svg width="28" height="28" viewBox="0 0 28 28"><circle cx="14" cy="16" r="6" fill="#fff"/><path d="M8 8l12 4" stroke="#fff" stroke-width="2"/></svg>', "linear-gradient(#c4b5fd,#7c3aed)");
};
Icons.board = function () {
  return this.svg('<svg width="28" height="28" viewBox="0 0 28 28"><rect x="5" y="5" width="18" height="18" rx="2" fill="#fff"/><path d="M14 5v18M5 14h18" stroke="#334155"/></svg>', "linear-gradient(#e2e8f0,#64748b)");
};

Object.assign(Desktop.labels, {
  messages: "Messages",
  contacts: "Contacts",
  activity: "Pulse",
  phone: "Phone",
  flows: "Flows",
  camera: "Camera",
  sketch: "Sketch",
  radio: "Radio",
  board: "Board"
});

const _open = Desktop.openApp.bind(Desktop);
Desktop.openApp = function (id) {
  if (id !== "aura" && id !== "launch" && Windows.list[id]) {
    Windows.focus(id);
    return;
  }
  _open(id);
};

Object.assign(Apps, {
  messages() {
    Windows.create("messages", "Messages", 480, 380,
      '<div class="mail"><ul>' +
      '<li class="on" data-b="Hey \u2014 this thread is a mock. Aura can still open apps.">Alex</li>' +
      '<li data-b="Lunch at noon? (demo text)">Sam</li>' +
      '<li data-b="Sent you a note in Writer.">Riley</li>' +
      '</ul><article id="msg-body">Hey \u2014 this thread is a mock. Aura can still open apps.</article></div>');
    document.querySelectorAll(".mail li").forEach((li) => {
      li.onclick = () => {
        document.querySelectorAll(".mail li").forEach((x) => x.classList.remove("on"));
        li.classList.add("on");
        document.getElementById("msg-body").textContent = li.dataset.b;
      };
    });
  },
  contacts() {
    Windows.create("contacts", "Contacts", 420, 340,
      '<div class="pad"><h3>People</h3><p>Alex \u00b7 demo@lumen.local</p><p>Sam \u00b7 sam@lumen.local</p><p>Riley \u00b7 riley@lumen.local</p><p>These cards are sample data only.</p></div>');
  },
  activity() {
    Windows.create("activity", "Pulse", 440, 300,
      '<div class="pad"><h3>Pulse</h3><p>CPU mock 12%</p><p>Memory mock 4.1 GB</p><p>Windows open: ' +
      Object.keys(Windows.list).length + "</p><p>Aura mode: offline local</p></div>");
  },
  phone() {
    Windows.create("phone", "Phone", 320, 480,
      '<div class="pad" style="text-align:center"><p>Recents</p><h3>Alex</h3><p>Yesterday \u00b7 mock</p><p>This keypad does not place real calls.</p>' +
      '<div class="calc">' + ["1","2","3","4","5","6","7","8","9","*","0","#"].map((k) => '<button>' + k + '</button>').join('') + '</div></div>');
  },
  flows() {
    Windows.create("flows", "Flows", 420, 300,
      '<div class="pad"><h3>Flows</h3><p>Sample shortcut: Open Notes then speak the first line.</p><button id="run-flow">Run mock flow</button></div>');
    const btn = document.getElementById("run-flow");
    if (btn) btn.onclick = () => { Desktop.openApp("notes"); Desktop.toast("Flow ran (mock)."); };
  },
  camera() {
    Windows.create("camera", "Camera", 480, 340,
      '<div class="pad"><div style="height:200px;border-radius:16px;background:linear-gradient(135deg,#1e293b,#64748b)"></div><p>No real camera feed. Entertainment mock only.</p></div>');
  },
  sketch() {
    Windows.create("sketch", "Sketch", 520, 400,
      '<div class="pad"><canvas id="sk" width="480" height="280" style="width:100%;background:#fff;border-radius:12px;cursor:crosshair"></canvas><p><button id="sk-clear">Clear</button></p></div>');
    const c = document.getElementById("sk");
    const ctx = c.getContext("2d");
    let draw = false;
    c.onmousedown = () => { draw = true; };
    window.addEventListener("mouseup", () => { draw = false; });
    c.onmousemove = (e) => {
      if (!draw) return;
      const r = c.getBoundingClientRect();
      ctx.fillStyle = "#0f172a";
      ctx.beginPath();
      ctx.arc((e.clientX - r.left) * (c.width / r.width), (e.clientY - r.top) * (c.height / r.height), 2.2, 0, Math.PI * 2);
      ctx.fill();
    };
    document.getElementById("sk-clear").onclick = () => ctx.clearRect(0, 0, c.width, c.height);
  },
  radio() {
    Windows.create("radio", "Radio", 360, 280,
      '<div class="music"><div class="art" style="background:linear-gradient(135deg,#c4b5fd,#7c3aed)"></div><strong>Lumen FM</strong><p>Demo station \u00b7 no real audio stream</p><input type="range" min="0" max="100" value="40"></div>');
  },
  board() {
    const cells = Array.from({ length: 9 }, (_, i) => '<button data-i="' + i + '" style="height:64px;font-size:22px"></button>').join("");
    Windows.create("board", "Board", 320, 360,
      '<div class="pad"><p>Tic-tac-toe mock</p><div class="calc" id="board-grid" style="grid-template-columns:repeat(3,1fr)">' + cells + '</div></div>');
    let turn = "X";
    document.querySelectorAll("#board-grid button").forEach((b) => {
      b.onclick = () => {
        if (b.textContent) return;
        b.textContent = turn;
        turn = turn === "X" ? "O" : "X";
      };
    });
  }
});
