const Desktop = {
  pinned: ["finder", "notes", "calc", "web", "store", "launch", "settings", "aura"],
  extra: [],
  labels: {
    finder: "Files", notes: "Notes", calc: "Calc", web: "Web",
    store: "Gallery", settings: "Settings", aura: "Aura", launch: "Launch",
    calendar: "Calendar", music: "Music", photos: "Photos", terminal: "Term",
    mail: "Mail", maps: "Maps", stickies: "Stickies", weather: "Weather",
    clock: "Clock", writer: "Writer", reminders: "Reminders",
    preview: "Preview", voice: "Voice"
  },
  menus: {
    file: ["New Window", "Close Window", "Save mock"],
    edit: ["Undo", "Copy", "Paste"],
    view: ["Show Launchpad", "Mission Control", "Toggle widgets"],
    go: ["Files", "Notes", "Gallery", "Settings"],
    window: ["Minimize", "Cycle windows"],
    help: ["Aura help", "About Lumen"]
  },
  start() {
    this.renderDock();
    this.renderDeskIcons();
    this.tick();
    setInterval(() => this.tick(), 1000);
    document.getElementById("cc-toggle").onclick = () =>
      document.getElementById("control-center").classList.toggle("hidden");
    document.getElementById("notify-toggle").onclick = () =>
      document.getElementById("notify-drawer").classList.toggle("hidden");
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
    document.getElementById("aura-form").onsubmit = async (e) => {
      e.preventDefault();
      const input = document.getElementById("aura-input");
      const text = input.value.trim();
      if (!text) return;
      input.value = "";
      await this.askAura(text);
    };
    document.getElementById("aura-mic").onclick = () => {
      Aura.listen(async (said) => {
        document.getElementById("aura-input").value = said;
        await this.askAura(said, true);
      });
    };
    this.refreshAuraMode();
    window.addEventListener("keydown", (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        this.toggleSpot();
      }
      if (e.key === "F4") {
        e.preventDefault();
        this.toggleLaunch();
      }
      if (e.key === "F3") {
        e.preventDefault();
        this.toggleMission();
      }
      if (e.key === "Escape") {
        ["spotlight","control-center","notify-drawer","launchpad","mission","ctx","menu-pop"].forEach((id) => {
          const el = document.getElementById(id);
          if (el) el.classList.add("hidden");
        });
      }
    });
    document.getElementById("spot-input").addEventListener("input", (e) => this.search(e.target.value));
    document.getElementById("lp-search").addEventListener("input", (e) => this.fillLaunch(e.target.value));
    document.getElementById("lumen-menu").onclick = () => this.toggleSpot();
    document.getElementById("wallpaper").addEventListener("contextmenu", (e) => {
      e.preventDefault();
      const ctx = document.getElementById("ctx");
      ctx.style.left = e.clientX + "px";
      ctx.style.top = e.clientY + "px";
      ctx.innerHTML =
        '<button data-act="notes">New note</button>' +
        '<button data-act="stickies">New sticky</button>' +
        '<button data-act="reminders">Reminders</button>' +
        '<button data-act="launch">Launchpad</button>' +
        '<button data-act="mission">Mission Control</button>' +
        '<button data-act="spot">Search</button>' +
        '<button data-act="settings">Settings</button>';
      ctx.classList.remove("hidden");
      ctx.querySelectorAll("button").forEach((b) => {
        b.onclick = () => {
          const act = b.dataset.act;
          if (act === "spot") this.toggleSpot();
          else if (act === "mission") this.toggleMission();
          else this.openApp(act);
          ctx.classList.add("hidden");
        };
      });
    });
    document.addEventListener("click", (e) => {
      if (!e.target.closest("#ctx")) document.getElementById("ctx").classList.add("hidden");
      if (!e.target.closest(".menu-items") && !e.target.closest("#menu-pop")) {
        const pop = document.getElementById("menu-pop");
        if (pop) pop.classList.add("hidden");
      }
    });
    document.querySelectorAll(".menu-items button").forEach((b) => {
      b.onclick = (e) => {
        e.stopPropagation();
        this.showMenu(b.dataset.menu, b);
      };
    });
  },
  showMenu(key, btn) {
    let pop = document.getElementById("menu-pop");
    if (!pop) {
      pop = document.createElement("div");
      pop.id = "menu-pop";
      pop.className = "glass";
      document.getElementById("desktop").appendChild(pop);
    }
    const items = this.menus[key] || ["Mock item"];
    const r = btn.getBoundingClientRect();
    pop.style.position = "absolute";
    pop.style.left = r.left + "px";
    pop.style.top = "30px";
    pop.style.zIndex = "95";
    pop.style.minWidth = "180px";
    pop.style.padding = "6px";
    pop.style.borderRadius = "12px";
    pop.style.color = "#0f172a";
    pop.innerHTML = items.map((t) => "<button style='display:block;width:100%;text-align:left;border:0;background:none;padding:8px 10px;border-radius:8px'>" + t + "</button>").join("");
    pop.classList.remove("hidden");
    pop.querySelectorAll("button").forEach((item) => {
      item.onclick = () => {
        const t = item.textContent;
        pop.classList.add("hidden");
        if (t === "Show Launchpad") this.toggleLaunch();
        else if (t === "Mission Control") this.toggleMission();
        else if (t === "Files") this.openApp("finder");
        else if (t === "Notes") this.openApp("notes");
        else if (t === "Gallery") this.openApp("store");
        else if (t === "Settings") this.openApp("settings");
        else if (t === "Aura help") { this.openApp("aura"); this.askAura("help"); }
        else if (t === "About Lumen") this.toast("Lumen mock · entertainment only · not Apple.");
        else if (t === "New Window") this.openApp("finder");
        else if (t === "Close Window") {
          const ids = Object.keys(Windows.list);
          if (ids.length) Windows.close(ids[ids.length - 1]);
        } else if (t === "Minimize") {
          const ids = Object.keys(Windows.list);
          if (ids.length) Windows.list[ids[ids.length - 1]].style.display = "none";
        } else if (t === "Toggle widgets") document.getElementById("widgets").classList.toggle("hidden");
        else this.toast(t + " (mock)");
      };
    });
  },
  renderDeskIcons() {
    const box = document.getElementById("desk-icons");
    if (!box) return;
    const ids = ["finder", "notes", "photos", "trash"];
    this.labels.trash = this.labels.trash || "Bin";
    box.innerHTML = ids.map((id) => {
      const icon = Icons[id] ? Icons[id]() : Icons.settings();
      return '<button data-id="' + id + '">' + icon + (this.labels[id] || id) + "</button>";
    }).join("");
    box.querySelectorAll("button").forEach((b) => {
      b.ondblclick = () => {
        if (b.dataset.id === "trash") {
          this.toast("Bin is empty (mock).");
          return;
        }
        this.openApp(b.dataset.id);
      };
    });
  },
  toggleMission() {
    const layer = document.getElementById("mission");
    if (!layer.classList.contains("hidden")) {
      layer.classList.add("hidden");
      layer.innerHTML = "";
      return;
    }
    const ids = Object.keys(Windows.list);
    if (!ids.length) {
      this.toast("No windows open.");
      return;
    }
    layer.innerHTML = ids.map((id) => {
      const title = Windows.list[id].querySelector(".win-title").textContent;
      return '<button data-id="' + id + '"><span>' + title + "</span></button>";
    }).join("");
    layer.classList.remove("hidden");
    layer.querySelectorAll("button").forEach((b) => {
      b.onclick = () => {
        Windows.focus(b.dataset.id);
        layer.classList.add("hidden");
      };
    });
  },
  async askAura(text, speak) {
    this.addAura("user", text);
    this.addAura("bot", "…");
    const log = document.getElementById("aura-log");
    const pending = log.lastChild;
    const answer = await Aura.reply(text);
    pending.textContent = answer;
    if (speak) Aura.speak(answer);
  },
  refreshAuraMode() {
    const el = document.getElementById("aura-mode");
    if (!el) return;
    el.textContent = AuraModel && AuraModel.ready ? "Offline · loaded" : "Offline";
  },
  tick() {
    const n = new Date();
    const clock = n.toLocaleString(undefined, {
      weekday: "short", hour: "numeric", minute: "2-digit"
    });
    document.getElementById("clock").textContent = clock;
    document.getElementById("wid-clock").textContent = n.toLocaleTimeString(undefined, {
      hour: "numeric", minute: "2-digit"
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
  fillLaunch(q) {
    const keys = Object.keys(this.labels).filter((k) => k !== "launch" && k !== "trash" &&
      this.labels[k].toLowerCase().indexOf((q || "").toLowerCase()) !== -1);
    document.getElementById("lp-grid").innerHTML = keys.map((id) => {
      const icon = Icons[id] ? Icons[id]() : Icons.settings();
      return '<button data-id="' + id + '">' + icon + this.labels[id] + "</button>";
    }).join("");
    document.querySelectorAll("#lp-grid button").forEach((b) => {
      b.onclick = () => {
        this.openApp(b.dataset.id);
        document.getElementById("launchpad").classList.add("hidden");
      };
    });
  },
  toggleLaunch() {
    const lp = document.getElementById("launchpad");
    lp.classList.toggle("hidden");
    if (!lp.classList.contains("hidden")) {
      this.fillLaunch("");
      document.getElementById("lp-search").focus();
    }
  },
  openApp(id) {
    if (id === "aura") {
      document.getElementById("assistant").classList.toggle("hidden");
      this.refreshAuraMode();
      return;
    }
    if (id === "launch") {
      this.toggleLaunch();
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
    const keys = Object.keys(this.labels).filter((k) => k !== "trash" &&
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
