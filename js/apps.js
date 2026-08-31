const Apps = {
  finder() {
    Windows.create("finder", "Files", 720, 460,
      '<div class="finder"><aside>' +
      '<button class="on" data-place="recents">Recents</button>' +
      '<button data-place="docs">Documents</button>' +
      '<button data-place="desk">Desktop</button>' +
      '<button data-place="down">Downloads</button>' +
      '</aside><div class="grid" id="finder-grid"></div></div>');
    const files = {
      recents: ["Readme", "Sketch", "Budget"],
      docs: ["Essay", "Notes backup", "Resume"],
      desk: ["Screenshot", "Project"],
      down: ["Archive.zip", "Song.mp3"]
    };
    const grid = document.getElementById("finder-grid");
    const render = (key) => {
      grid.innerHTML = files[key].map((n) =>
        '<button class="file"><div class="box"></div>' + n + "</button>"
      ).join("");
    };
    render("recents");
    document.querySelectorAll(".finder aside button").forEach((b) => {
      b.onclick = () => {
        document.querySelectorAll(".finder aside button").forEach((x) => x.classList.remove("on"));
        b.classList.add("on");
        render(b.dataset.place);
      };
    });
  },
  notes() {
    const saved = localStorage.getItem("lumen-note") || "Welcome to Lumen Notes.\nThis mock stores text in your browser.";
    Windows.create("notes", "Notes", 520, 420, '<textarea id="note-area">' + saved + "</textarea>");
    const area = document.getElementById("note-area");
    area.oninput = () => localStorage.setItem("lumen-note", area.value);
  },
  calc() {
    const keys = ["C", "+/-", "%", "/", "7", "8", "9", "*", "4", "5", "6", "-", "1", "2", "3", "+", "0", ".", "="];
    Windows.create("calc", "Calculator", 280, 360,
      '<div class="calc"><div class="display" id="cdisp">0</div>' +
      keys.map((k) => '<button data-k="' + k + '">' + k + "</button>").join("") +
      "</div>");
    let cur = "0";
    const disp = document.getElementById("cdisp");
    document.querySelectorAll(".calc button").forEach((b) => {
      b.onclick = () => {
        const k = b.dataset.k;
        if (k === "C") cur = "0";
        else if (k === "=") {
          try { cur = String(Function('"use strict"; return (' + cur + ")")()); } catch (err) { cur = "Err"; }
        } else if (k === "+/-") cur = String(-parseFloat(cur));
        else cur = cur === "0" && /[0-9]/.test(k) ? k : cur + k;
        disp.textContent = cur;
      };
    });
  },
  web() {
    Windows.create("web", "Web", 800, 520,
      '<div class="browser-bar"><input id="urlbar" value="https://example.com" /><button id="go-url">Go</button></div>' +
      '<iframe class="app-frame" id="webframe" src="https://example.com" style="height:calc(100% - 42px)"></iframe>');
    const go = () => {
      let u = document.getElementById("urlbar").value.trim();
      if (!/^https?:\/\//.test(u)) u = "https://" + u;
      document.getElementById("webframe").src = u;
    };
    document.getElementById("go-url").onclick = go;
    document.getElementById("urlbar").addEventListener("keydown", (e) => { if (e.key === "Enter") go(); });
  },
  settings() {
    Windows.create("settings", "Settings", 500, 360,
      '<div class="pad settings"><h3>Appearance</h3>' +
      '<label><input type="checkbox" id="alt-wall"> Warm wallpaper</label>' +
      '<label>Dock scale <input id="dock-scale" type="range" min="0.8" max="1.3" step="0.05" value="1"></label>' +
      '<h3>Aura</h3>' +
      '<p>Offline local phrase helper only. No cloud services.</p>' +
      '<p>Lumen mock. Entertainment only. Original UI, not an Apple product.</p></div>');
    document.getElementById("alt-wall").onchange = (e) => {
      document.getElementById("wallpaper").classList.toggle("alt", e.target.checked);
    };
    document.getElementById("dock-scale").oninput = (e) => {
      document.getElementById("dock").style.transform = "translateX(-50%) scale(" + e.target.value + ")";
    };
  },
  store() {
    const cards = [
      ["photos", "Photos", "Look through color tiles."],
      ["terminal", "Terminal", "Tiny command toy."],
      ["calendar", "Calendar", "This month at a glance."],
      ["music", "Music", "Fake player chrome."],
      ["mail", "Mail", "Sample inbox."],
      ["maps", "Maps", "A decorative map."],
      ["stickies", "Stickies", "Yellow note pad."],
      ["weather", "Weather", "Mock forecast card."],
      ["clock", "Clock", "World clocks."],
      ["writer", "Writer", "Plain text pad."],
      ["reminders", "Reminders", "Checklist stored locally."],
      ["preview", "Preview", "Look at a sample image card."],
      ["voice", "Voice Pad", "Type a line and hear it."],
      ["messages", "Messages", "Demo threads."],
      ["contacts", "Contacts", "Sample people list."],
      ["activity", "Pulse", "Fake system meters."]
    ];
    Windows.create("store", "Gallery", 560, 440,
      '<div class="store-grid">' +
      cards.map((c) =>
        '<div class="store-card"><strong>' + c[1] + "</strong><p>" + c[2] +
        '</p><button data-app="' + c[0] + '">Get</button></div>'
      ).join("") +
      "</div>");
    document.querySelectorAll(".store-card button").forEach((b) => {
      b.onclick = () => { Desktop.install(b.dataset.app); b.textContent = "Open"; };
    });
  },
  calendar() {
    const now = new Date();
    const y = now.getFullYear(), m = now.getMonth();
    const first = new Date(y, m, 1).getDay();
    const days = new Date(y, m + 1, 0).getDate();
    let cells = ["S", "M", "T", "W", "T", "F", "S"].map((d) => "<b>" + d + "</b>").join("");
    for (let i = 0; i < first; i++) cells += "<span></span>";
    for (let d = 1; d <= days; d++) {
      cells += '<span class="' + (d === now.getDate() ? "today" : "") + '">' + d + "</span>";
    }
    Windows.create("calendar", "Calendar", 420, 380, '<div class="cal-grid">' + cells + "</div>");
  },
  music() {
    Windows.create("music", "Music", 360, 380,
      '<div class="music"><div class="art"></div><strong>Night Drive</strong><p>Demo track · Lumen Radio</p><input type="range" min="0" max="100" value="22"></div>');
  },
  photos() {
    const tiles = ["#fb7185", "#60a5fa", "#34d399", "#fbbf24", "#a78bfa", "#f472b6"]
      .map((c) => '<div style="height:90px;border-radius:10px;background:' + c + '"></div>').join("");
    Windows.create("photos", "Photos", 480, 360, '<div class="grid">' + tiles + "</div>");
  },
  terminal() {
    Windows.create("terminal", "Terminal", 560, 320,
      '<div class="term" id="term"><div id="tout">Lumen shell 0.5 — type help</div><div>$ <input id="tin"></div></div>', true);
    const out = document.getElementById("tout");
    const tin = document.getElementById("tin");
    tin.focus();
    tin.addEventListener("keydown", async (e) => {
      if (e.key !== "Enter") return;
      const cmd = tin.value.trim();
      let res = "";
      if (cmd === "help") res = "help, date, whoami, clear, aura, apps";
      else if (cmd === "date") res = new Date().toString();
      else if (cmd === "whoami") res = "user";
      else if (cmd === "apps") res = Object.keys(Desktop.labels).join(", ");
      else if (cmd === "clear") out.textContent = "";
      else if (cmd.startsWith("aura ")) res = await Aura.reply(cmd.slice(5));
      else if (cmd === "aura") res = await Aura.reply("hello");
      else res = "command not found";
      if (cmd !== "clear") out.textContent += "\n$ " + cmd + "\n" + res;
      tin.value = "";
    });
  },
  mail() {
    Windows.create("mail", "Mail", 640, 400,
      '<div class="mail"><ul>' +
      '<li class="on" data-b="Welcome to Lumen Mail. This inbox is fake.">Welcome</li>' +
      '<li data-b="Your mock Gallery receipt is attached (it is not).">Gallery</li>' +
      '<li data-b="Team lunch Friday? Reply in your real mail client.">Lunch</li>' +
      '</ul><article id="mail-body">Welcome to Lumen Mail. This inbox is fake.</article></div>');
    document.querySelectorAll(".mail li").forEach((li) => {
      li.onclick = () => {
        document.querySelectorAll(".mail li").forEach((x) => x.classList.remove("on"));
        li.classList.add("on");
        document.getElementById("mail-body").textContent = li.dataset.b;
      };
    });
  },
  maps() {
    Windows.create("maps", "Maps", 520, 380, '<div class="maps"><div class="pin">You are here (mock)</div></div>');
  },
  stickies() {
    const saved = localStorage.getItem("lumen-sticky") || "Write a reminder...";
    Windows.create("stickies", "Stickies", 280, 240, '<div class="stickies"><textarea id="sticky-area">' + saved + "</textarea></div>");
    const area = document.getElementById("sticky-area");
    area.oninput = () => localStorage.setItem("lumen-sticky", area.value);
  },
  weather() {
    Windows.create("weather", "Weather", 360, 280,
      '<div class="pad"><h2>72°</h2><p>Clear · mock city</p><p>High 76 · Low 58</p><p>This is not live weather data.</p></div>');
  },
  clock() {
    Windows.create("clock", "Clock", 360, 240,
      '<div class="pad"><p>Local</p><h2 id="clock-app">--</h2><p>UTC offset shown by your browser.</p></div>');
    const el = document.getElementById("clock-app");
    const tick = () => { el.textContent = new Date().toLocaleTimeString(); };
    tick();
  },
  writer() {
    const saved = localStorage.getItem("lumen-writer") || "Untitled draft";
    Windows.create("writer", "Writer", 560, 400, '<textarea id="writer-area" class="pad" style="width:100%;height:100%;border:0;outline:none;resize:none">' + saved + "</textarea>");
    const area = document.getElementById("writer-area");
    area.oninput = () => localStorage.setItem("lumen-writer", area.value);
  },
  reminders() {
    const saved = JSON.parse(localStorage.getItem("lumen-reminders") || '["Water plants","Ship Lumen mock"]');
    Windows.create("reminders", "Reminders", 360, 360,
      '<div class="pad"><ul id="rem-list"></ul><form id="rem-form"><input id="rem-in" placeholder="Add reminder"><button>Add</button></form></div>');
    const list = document.getElementById("rem-list");
    const draw = () => {
      list.innerHTML = saved.map((t, i) => '<li><label><input type="checkbox" data-i="' + i + '"> ' + t + "</label></li>").join("");
    };
    draw();
    document.getElementById("rem-form").onsubmit = (e) => {
      e.preventDefault();
      const v = document.getElementById("rem-in").value.trim();
      if (!v) return;
      saved.push(v);
      localStorage.setItem("lumen-reminders", JSON.stringify(saved));
      document.getElementById("rem-in").value = "";
      draw();
    };
  },
  preview() {
    Windows.create("preview", "Preview", 420, 320,
      '<div class="pad"><div style="height:180px;border-radius:16px;background:linear-gradient(135deg,#7dd3fc,#c4b5fd,#fb7185)"></div><p>Sample preview card. Original gradient only.</p></div>');
  },
  voice() {
    Windows.create("voice", "Voice Pad", 400, 240,
      '<div class="pad"><p>Type a line. Aura will speak it if speech synthesis exists.</p><input id="voice-line" placeholder="Hello from Lumen" style="width:100%;padding:8px;border-radius:8px;border:1px solid #cbd5e1"><p><button id="voice-go">Speak</button></p></div>');
    document.getElementById("voice-go").onclick = () => {
      Aura.speak(document.getElementById("voice-line").value || "Hello from Lumen");
    };
  }
};
