const Desktop = {
  pinned: ["finder", "notes", "calc", "web", "store", "settings", "aura"],
  extra: [],
  labels: {
    finder: "Files", notes: "Notes", calc: "Calc", web: "Web",
    store: "Gallery", settings: "Settings", aura: "Aura",
    calendar: "Calendar", music: "Music", photos: "Photos", terminal: "Term",
    mail: "Mail", maps: "Maps", stickies: "Stickies"
  },
  start() {
    this.renderDock();
    this.tick();
    setInterval(() => this.tick(), 1000);
    document.getElementById("cc-toggle").onclick = () =>
      document.getElementById("control-center").classList.toggle("hidden");
    document.querySelectorAll(".cc-tile").forEach((t) => {
      t.onclick = () => t.classList.toggle("on");
    });
    document.getElementById("bright").oninput = (e) => {
      document.getElementById("wallpaper").style.filter = "brightness(" + (e.target.value / 92) + ")";
    };
    document.getElementById("tint").oninput = (e) => {
      document.body.classList.toggle("tinted", Number(e.target.value) > 0.45);
    };
    document.getElementById("close-aura").onclick = () =>
      document.getElementById("assistant").classList.add("hidden");
    document.getElementById("aura-form").onsubmit = (e) => {
      e.preventDefault();
      const input = document.getElementById("aura-input");
      const text = input.value.trim();
      if (!text) return;
      this.addAura("user", text);
      this.addAura("bot", Aura.reply(text));
      input.value = "";
    };
    window.addEventListener("keydown", (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        this.toggleSpot();
      }
      if (e.key === "Escape") {
        document.getElementById("spotlight").classList.add("hidden");
        document.getElementById("control-center").classList.add("hidden");
        document.getElementById("ctx").classList.add("hidden");
      }
    });
    document.getElementById("spot-input").addEventListener("input", (e) => this.search(e.target.value));
    document.getElementById("lumen-menu").onclick = () => this.toggleSpot();
    document.getElementById("wallpaper").addEventListener("contextmenu", (e) => {
      e.preventDefault();
      const ctx = document.getElementById("ctx");
      ctx.style.left = e.clientX + "px";
      ctx.style.top = e.clientY + "px";
      ctx.innerHTML =
        '<button data-act="notes">New note</button>' +
        '<button data-act="stickies">New sticky</button>' +
        '<button data-act="spot">Search</button>' +
        '<button data-act="settings">Settings</button>';
      ctx.classList.remove("hidden");
      ctx.querySelectorAll("button").forEach((b) => {
        b.onclick = () => {
          const act = b.dataset.act;
          if (act === "spot") this.toggleSpot();
          else this.openApp(act);
          ctx.classList.add("hidden");
        };
      });
    });
    document.addEventListener("click", () => document.getElementById("ctx").classList.add("hidden"));
    document.querySelectorAll(".menu-items button").forEach((b) => {
      b.onclick = () => this.toast(b.textContent + " menu is a mock.");
    });
  },
  tick() {
    const n = new Date();
    document.getElementById("clock").textContent = n.toLocaleString(undefined, {
      weekday: "short", hour: "numeric", minute: "2-digit"
    });
    document.getElementById("lock-time").textContent = n.toLocaleTimeString(undefined, {
      hour: "numeric", minute: "2-digit"
    });
    document.getElementById("lock-date").textContent = n.toLocaleDateString(undefined, {
      weekday: "long", month: "long", day: "numeric"
    });
  },
  renderDock() {
    const dock = document.getElementById("dock");
    const items = this.pinned.concat(this.extra.filter((x) => this.pinned.indexOf(x) === -1));
    dock.innerHTML = items.map((id) => {
      const icon = Icons[id] ? Icons[id]() : Icons.settings();
      const prefix = id === "settings" ? '<div class="dock-sep"></div>' : "";
      return prefix +
        '<button class="dock-item" data-id="' + id + '" title="' + (this.labels[id] || id) + '">' +
        icon + '<div class="dot"></div></button>';
    }).join("");
    dock.querySelectorAll(".dock-item").forEach((b) => {
      b.onclick = () => this.openApp(b.dataset.id);
    });
  },
  openApp(id) {
    if (id === "aura") {
      document.getElementById("assistant").classList.toggle("hidden");
      return;
    }
    if (Apps[id]) Apps[id]();
  },
  install(id) {
    if (this.extra.indexOf(id) === -1) this.extra.push(id);
    this.renderDock();
    this.openApp(id);
    this.toast((this.labels[id] || id) + " added to the dock.");
  },
  markOpen(id, open) {
    document.querySelectorAll('.dock-item[data-id="' + id + '"]').forEach((el) => {
      el.classList.toggle("open", open);
    });
  },
  toggleSpot() {
    const s = document.getElementById("spotlight");
    s.classList.toggle("hidden");
    if (!s.classList.contains("hidden")) {
      document.getElementById("spot-input").focus();
      this.search(document.getElementById("spot-input").value);
    }
  },
  search(q) {
    const keys = Object.keys(this.labels).filter((k) =>
      this.labels[k].toLowerCase().indexOf((q || "").toLowerCase()) !== -1
    );
    document.getElementById("spot-results").innerHTML = keys.map((k) =>
      '<li data-id="' + k + '">' + this.labels[k] + "</li>"
    ).join("");
    document.querySelectorAll("#spot-results li").forEach((li) => {
      li.onclick = () => {
        this.openApp(li.dataset.id);
        document.getElementById("spotlight").classList.add("hidden");
      };
    });
  },
  addAura(who, text) {
    const log = document.getElementById("aura-log");
    const div = document.createElement("div");
    div.className = "msg " + who;
    div.textContent = text;
    log.appendChild(div);
    log.scrollTop = log.scrollHeight;
  },
  toast(msg) {
    const t = document.getElementById("toast");
    t.textContent = msg;
    t.classList.remove("hidden");
    clearTimeout(this._tt);
    this._tt = setTimeout(() => t.classList.add("hidden"), 2200);
  }
};
