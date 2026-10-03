
(function () {
  document.body.classList.add("lumen59");

  function icon(bg, inner) {
    return '<div class="icon" style="background:' + bg + '">' + inner + "</div>";
  }
  const extraIcons = {
    messages: () => icon("linear-gradient(#34d399,#059669)", '<svg width="28" height="28" viewBox="0 0 28 28"><path d="M6 8h16v10H12l-4 4V8z" fill="#fff"/></svg>'),
    weather: () => icon("linear-gradient(#7dd3fc,#0284c7)", '<svg width="28" height="28" viewBox="0 0 28 28"><circle cx="18" cy="11" r="5" fill="#fff"/><path d="M7 18h14a4 4 0 0 0 0-8 6 6 0 0 0-11-1A4 4 0 0 0 7 18z" fill="#e0f2fe"/></svg>'),
    clock: () => icon("linear-gradient(#111,#333)", '<svg width="28" height="28" viewBox="0 0 28 28"><circle cx="14" cy="14" r="9" fill="none" stroke="#fff" stroke-width="2"/><path d="M14 9v6l4 2" stroke="#fff" stroke-width="2"/></svg>'),
    reminders: () => icon("linear-gradient(#fb7185,#e11d48)", '<svg width="28" height="28" viewBox="0 0 28 28"><circle cx="14" cy="14" r="9" fill="#fff"/><path d="M9 14l3 3 7-7" stroke="#e11d48" stroke-width="2" fill="none"/></svg>'),
    photos: () => icon("linear-gradient(#f9a8d4,#db2777)", '<svg width="28" height="28" viewBox="0 0 28 28"><rect x="5" y="7" width="18" height="14" rx="2" fill="#fff"/><circle cx="11" cy="12" r="2" fill="#db2777"/></svg>'),
    music: () => icon("linear-gradient(#f472b6,#be185d)", '<svg width="28" height="28" viewBox="0 0 28 28"><path d="M11 20V8l10-2v12" stroke="#fff" stroke-width="2" fill="none"/><circle cx="9" cy="20" r="2" fill="#fff"/><circle cx="19" cy="18" r="2" fill="#fff"/></svg>'),
    mail: () => icon("linear-gradient(#60a5fa,#1d4ed8)", '<svg width="28" height="28" viewBox="0 0 28 28"><rect x="4" y="7" width="20" height="14" rx="2" fill="#fff"/><path d="M5 8l9 7 9-7" stroke="#1d4ed8" stroke-width="1.6" fill="none"/></svg>'),
    maps: () => icon("linear-gradient(#86efac,#16a34a)", '<svg width="28" height="28" viewBox="0 0 28 28"><path d="M14 4l8 4v12l-8 4-8-4V8z" fill="#fff"/><path d="M14 4v16" stroke="#16a34a"/></svg>'),
    calendar: () => icon("linear-gradient(#fda4af,#e11d48)", '<svg width="28" height="28" viewBox="0 0 28 28"><rect x="5" y="6" width="18" height="16" rx="2" fill="#fff"/><path d="M5 11h18" stroke="#e11d48"/></svg>'),
    terminal: () => icon("linear-gradient(#111827,#374151)", '<svg width="28" height="28" viewBox="0 0 28 28"><path d="M7 9l5 5-5 5M14 19h7" stroke="#4ade80" stroke-width="2" fill="none"/></svg>'),
    harbor: () => icon("linear-gradient(#38bdf8,#2563eb)", '<svg width="28" height="28" viewBox="0 0 28 28"><path d="M7 8h14l-2 12H9z" fill="#fff"/></svg>'),
    pages: () => icon("linear-gradient(#fdba74,#ea580c)", '<svg width="28" height="28" viewBox="0 0 28 28"><rect x="7" y="4" width="14" height="20" rx="2" fill="#fff"/><path d="M10 10h8M10 14h8M10 18h5" stroke="#ea580c"/></svg>'),
    draw: () => icon("linear-gradient(#c4b5fd,#7c3aed)", '<svg width="28" height="28" viewBox="0 0 28 28"><path d="M7 19l9-9 3 3-9 9H7z" fill="#fff"/></svg>'),
    books: () => icon("linear-gradient(#fcd34d,#d97706)", '<svg width="28" height="28" viewBox="0 0 28 28"><path d="M6 7h7v14H6zM15 7h7v14h-7z" fill="#fff"/></svg>')
  };
  Object.keys(extraIcons).forEach((k) => { Icons[k] = extraIcons[k]; });

  Object.assign(Desktop.labels, {
    harbor: "Harbor",
    pages: "Pages",
    draw: "Draw",
    messages: "Messages",
    weather: "Weather",
    clock: "Clock"
  });
  if (Desktop.pinned.indexOf("messages") === -1) Desktop.pinned.splice(2, 0, "messages");
  if (Desktop.pinned.indexOf("harbor") === -1) Desktop.pinned.splice(5, 0, "harbor");

  const catalog = [
    ["notes", "Notes", "Write", "Local notes pad."],
    ["messages", "Messages", "Social", "Chat bubbles saved in this browser."],
    ["weather", "Weather", "Info", "Mock hourly forecast."],
    ["clock", "Clock", "Info", "Live local clock."],
    ["calc", "Calculator", "Tools", "Basic math."],
    ["music", "Music", "Media", "Tone player."],
    ["photos", "Photos", "Media", "Color tiles."],
    ["pages", "Pages", "Create", "Short document."],
    ["draw", "Draw", "Create", "Canvas sketch."],
    ["mail", "Mail", "Social", "Mock inbox."],
    ["maps", "Maps", "Info", "Static map pane."],
    ["calendar", "Calendar", "Info", "Month grid."],
    ["reminders", "Reminders", "Tools", "Checklist."],
    ["terminal", "Terminal", "Tools", "Fake shell."],
    ["books", "Books", "Media", "Original short text."],
    ["finder", "Files", "Tools", "Folder browser."]
  ];

  Apps.harbor = function () {
    Windows.create("harbor", "Harbor", 760, 480,
      '<div class="harbor"><aside id="h-cats"></aside><div class="harbor-main">' +
      '<input class="harbor-search" id="h-q" placeholder="Search Harbor" />' +
      '<div class="store-grid" id="h-grid"></div></div></div>');
    const cats = ["All", "Create", "Social", "Media", "Info", "Tools", "Write"];
    const aside = document.getElementById("h-cats");
    aside.innerHTML = cats.map((c) => '<button data-c="' + c + '">' + c + "</button>").join("");
    let cat = "All";
    function paint() {
      const q = (document.getElementById("h-q").value || "").toLowerCase();
      const rows = catalog.filter((r) => (cat === "All" || r[2] === cat) && r[1].toLowerCase().indexOf(q) !== -1);
      document.getElementById("h-grid").innerHTML = rows.map((r) =>
        '<div class="store-card"><div class="row">' + (Icons[r[0]] ? Icons[r[0]]() : "") +
        "<strong>" + r[1] + '</strong></div><p>' + r[3] + '</p><button class="get-btn" data-id="' + r[0] + '">Get</button></div>'
      ).join("");
      document.querySelectorAll("#h-grid .get-btn").forEach((b) => {
        b.onclick = () => {
          Desktop.install(b.dataset.id);
          b.textContent = "On dock";
          Desktop.toast("Added " + b.dataset.id + " to the dock");
        };
      });
    }
    aside.querySelectorAll("button").forEach((b) => {
      b.onclick = () => {
        cat = b.dataset.c;
        aside.querySelectorAll("button").forEach((x) => x.classList.remove("on"));
        b.classList.add("on");
        paint();
      };
    });
    aside.querySelector("button").classList.add("on");
    document.getElementById("h-q").oninput = paint;
    paint();
  };

  Apps.messages = function () {
    const saved = JSON.parse(localStorage.getItem("lumen-msgs") || '[{"who":"them","text":"Hey — this is a local mock chat."}]');
    Windows.create("messages", "Messages", 420, 420,
      '<div class="msg-log" id="msg-log"></div><form class="msg-form" id="msg-form"><input id="msg-in" placeholder="Message" /><button>Send</button></form>');
    const log = document.getElementById("msg-log");
    function render() {
      log.innerHTML = saved.map((m) => '<div class="bubble ' + (m.who === "me" ? "me" : "") + '">' + m.text + "</div>").join("");
      log.scrollTop = log.scrollHeight;
    }
    render();
    document.getElementById("msg-form").onsubmit = (e) => {
      e.preventDefault();
      const input = document.getElementById("msg-in");
      const text = input.value.trim();
      if (!text) return;
      saved.push({ who: "me", text: text });
      saved.push({ who: "them", text: MiniMind.chat(text) });
      localStorage.setItem("lumen-msgs", JSON.stringify(saved));
      input.value = "";
      render();
    };
  };

  Apps.weather = function () {
    Windows.create("weather", "Weather", 420, 300,
      '<div class="wx"><p>Ridge City · mock</p><h2>72°</h2><p>Clear glass skies</p><div class="hours">' +
      [["Now","72"],["1","71"],["2","70"],["3","68"],["4","66"]].map((h) => "<div><b>" + h[0] + "</b><div>" + h[1] + "°</div></div>").join("") +
      "</div><p>Not a live forecast.</p></div>");
  };

  Apps.pages = function () {
    const saved = localStorage.getItem("lumen-pages") || "Untitled page\n\nWrite here. Saved in this browser.";
    Windows.create("pages", "Pages", 560, 420, '<textarea id="pages-area" style="width:100%;height:340px;border:0;padding:12px">' + saved + "</textarea>");
    const area = document.getElementById("pages-area");
    area.oninput = () => localStorage.setItem("lumen-pages", area.value);
  };

  Apps.draw = function () {
    Windows.create("draw", "Draw", 560, 420, '<canvas class="draw-pad" id="draw-pad" width="520" height="320"></canvas>');
    const c = document.getElementById("draw-pad");
    const ctx = c.getContext("2d");
    ctx.lineWidth = 3;
    ctx.strokeStyle = "#111";
    let down = false;
    c.onpointerdown = (e) => { down = true; ctx.beginPath(); ctx.moveTo(e.offsetX, e.offsetY); };
    c.onpointermove = (e) => { if (!down) return; ctx.lineTo(e.offsetX, e.offsetY); ctx.stroke(); };
    c.onpointerup = () => { down = false; };
  };

  const MiniMind = {
    ready: false,
    bag: null,
    async load() {
      try {
        const res = await fetch("data/mini-mind.json");
        this.bag = await res.json();
      } catch (err) {
        this.bag = { replies: ["I am the local helper loaded at boot."] };
      }
      this.ready = true;
      const status = document.getElementById("boot-status");
      if (status && !document.getElementById("boot-screen").classList.contains("hidden")) {
        status.textContent = "Local helper weights ready";
      }
    },
    chat(text) {
      const q = text.toLowerCase();
      if (/hello|hi|hey/.test(q)) return "Hi. This chat stays in your browser.";
      if (/weather/.test(q)) return "Mock weather is 72 and clear.";
      if (/time/.test(q)) return "It is " + new Date().toLocaleTimeString() + ".";
      return "Got it: " + text;
    },
    answer(text) {
      const q = text.toLowerCase();
      if (/open harbor|app store|gallery/.test(q)) {
        Desktop.openApp("harbor");
        return "Opening Harbor, the mock catalog.";
      }
      if (/open messages/.test(q)) { Desktop.openApp("messages"); return "Opening Messages."; }
      if (/open draw/.test(q)) { Desktop.openApp("draw"); return "Opening Draw."; }
      if (/open pages/.test(q)) { Desktop.openApp("pages"); return "Opening Pages."; }
      if (/joke/.test(q)) return "Why did the dock magnify? It saw a cursor and got excited.";
      if (/who are you|what are you|siri|intelligence/.test(q)) {
        return "I am Aura, a tiny local helper loaded on the boot screen. Not a branded assistant.";
      }
      const hit = (this.bag && this.bag.replies || []).find((r) => q.indexOf(r[0]) !== -1);
      return hit ? hit[1] : "";
    }
  };
  window.MiniMind = MiniMind;
  MiniMind.load();

  if (window.Aura && Aura.reply) {
    const orig = Aura.reply.bind(Aura);
    Aura.reply = async function (text) {
      const local = MiniMind.answer(text);
      if (local) return local;
      return orig(text);
    };
  }

  const boot = document.getElementById("boot-status");
  if (boot && boot.parentElement) {
    const note = document.createElement("div");
    note.className = "mind-boot";
    note.textContent = "Loading mini-mind.json";
    boot.parentElement.appendChild(note);
  }

  setTimeout(() => {
    if (window.Desktop && document.getElementById("desktop") && !document.getElementById("desktop").classList.contains("hidden")) {
      Desktop.renderDock();
    }
  }, 1200);
  const unlock = document.getElementById("unlock-btn");
  if (unlock) unlock.addEventListener("click", () => setTimeout(() => Desktop.renderDock(), 50));
})();
