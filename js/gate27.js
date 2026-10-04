
/* Gate 27 layer: separate app pages + boot mind + Ask helper. Entertainment mock. */
(function () {
  const pages = {
    finder: ["Files", "pages/files.html", 760, 480],
    notes: ["Notes", "pages/notes.html", 640, 460],
    calc: ["Calculator", "pages/calc.html", 320, 420],
    web: ["Web", "pages/web.html", 860, 540],
    settings: ["Settings", "pages/settings.html", 560, 420],
    store: ["Gallery", "pages/store.html", 640, 480],
    calendar: ["Calendar", "pages/calendar.html", 520, 420],
    music: ["Music", "pages/music.html", 420, 280],
    photos: ["Photos", "pages/photos.html", 560, 400],
    mail: ["Mail", "pages/mail.html", 560, 380],
    maps: ["Maps", "pages/maps.html", 640, 420],
    terminal: ["Terminal", "pages/terminal.html", 640, 400],
    weather: ["Weather", "pages/weather.html", 360, 280],
    reminders: ["Reminders", "pages/reminders.html", 420, 380]
  };

  function frame(src) {
    return '<iframe class="app-frame" src="' + src + '" title="app"></iframe>';
  }

  function hijack() {
    if (!window.Apps || !window.Windows || Windows.__gatePages) return;
    Windows.__gatePages = true;
    const orig = Windows.create.bind(Windows);
    Windows.create = function (id, title, w, h, html, dark) {
      if (pages[id]) {
        if (Windows.list[id] && Windows.close) Windows.close(id);
        const spec = pages[id];
        return orig(id, spec[0], spec[2], spec[3], frame(spec[1]), dark);
      }
      return orig(id, title, w, h, html, dark);
    };
    Object.keys(pages).forEach((id) => {
      Apps[id] = function () {
        Windows.create(id);
      };
    });
  }

  window.addEventListener("message", (e) => {
    const msg = e.data || {};
    if (msg.type === "install" && window.Desktop) {
      Desktop.extra = Desktop.extra || [];
      if (!Desktop.extra.includes(msg.id) && !Desktop.pinned.includes(msg.id)) Desktop.extra.push(msg.id);
      Desktop.renderDock();
      Desktop.toast(msg.id + " added to the dock");
    }
    if (msg.type === "open" && window.Desktop) Desktop.openApp(msg.id);
    if (msg.type === "warm") {
      const wall = document.getElementById("wallpaper");
      if (wall) wall.style.filter = "sepia(" + (Number(msg.value) / 140) + ")";
    }
  });

  async function loadMind() {
    const status = document.getElementById("boot-status");
    const fill = document.getElementById("boot-fill");
    try {
      const res = await fetch("data/tiny-mind.json");
      const mind = await res.json();
      window.LumenMind = mind;
      if (status) status.textContent = "Helper ready · " + mind.name;
      if (fill) fill.style.width = "100%";
    } catch (err) {
      if (status) status.textContent = "Helper ready offline";
    }
  }

  function showOrb(on) {
    let orb = document.getElementById("gate-orb");
    if (on) {
      if (!orb) {
        orb = document.createElement("div");
        orb.id = "gate-orb";
        orb.className = "gate-orb";
        document.body.appendChild(orb);
      }
    } else if (orb) orb.remove();
  }

  const origAsk = () => {};
  function patchAsk() {
    if (!window.Desktop || Desktop.__gate) return;
    Desktop.__gate = true;
    const base = Desktop.askAura.bind(Desktop);
    Desktop.askAura = async function (text, spoken) {
      const q = String(text || "").replace(/^(hey\s+)?(siri|aura|ask)[, ]*/i, "").trim();
      showOrb(true);
      setTimeout(() => showOrb(false), 1600);
      return base(q || text, spoken);
    };
  }

  function bootLayer() {
    loadMind();
    hijack();
    patchAsk();
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", bootLayer);
  else bootLayer();
  let n = 0;
  const timer = setInterval(() => {
    hijack();
    patchAsk();
    n += 1;
    if (n > 20) clearInterval(timer);
  }, 300);
})();
