/* Lumen 62: catalog, tasks, timer, canvas. Aura stays a local helper. */
(function () {
  function card(app) {
    return '<article class="cat-card"><strong>' + app.name + '</strong><p>' + app.blurb + '</p><button type="button" data-open="' + app.id + '">Open</button></article>';
  }
  const catalog = [
    { id: "tasks", name: "Tasks", blurb: "Checklist saved in this browser." },
    { id: "timer", name: "Timer", blurb: "Simple countdown." },
    { id: "canvas", name: "Canvas", blurb: "Mix two original colors." },
    { id: "notes", name: "Notes", blurb: "Existing notes pad." },
    { id: "calc", name: "Calculator", blurb: "Existing calculator." },
    { id: "settings", name: "Settings", blurb: "Glass tint and helper toggle." }
  ];
  const extra = {
    catalog() {
      Windows.create("catalog", "Catalog", 520, 380,
        '<div class="pad"><h3>Lumen Catalog</h3><p>Original apps only. Nothing here is an app store.</p><div class="cat-grid">' +
        catalog.map(card).join("") + "</div></div>");
    },
    tasks() {
      const saved = JSON.parse(localStorage.getItem("lumen-tasks") || "[]");
      const rows = saved.map((t, i) => '<label class="task-row"><input type="checkbox" data-i="' + i + '"' + (t.done ? " checked" : "") + ">" + t.text + "</label>").join("");
      Windows.create("tasks", "Tasks", 380, 320,
        '<div class="pad"><h3>Tasks</h3><div id="task-list">' + (rows || "<p>No tasks yet.</p>") + '</div><form id="task-form"><input id="task-input" placeholder="Add a task"><button>Add</button></form></div>');
      setTimeout(() => {
        const form = document.getElementById("task-form");
        if (!form) return;
        form.onsubmit = (e) => {
          e.preventDefault();
          const input = document.getElementById("task-input");
          const list = JSON.parse(localStorage.getItem("lumen-tasks") || "[]");
          if (input.value.trim()) list.push({ text: input.value.trim(), done: false });
          localStorage.setItem("lumen-tasks", JSON.stringify(list));
          extra.tasks();
        };
      }, 30);
    },
    timer() {
      Windows.create("timer", "Timer", 320, 220,
        '<div class="pad"><h3>Timer</h3><p id="timer-read">00:30</p><button type="button" id="timer-go">Start 30s</button></div>');
      setTimeout(() => {
        const btn = document.getElementById("timer-go");
        const read = document.getElementById("timer-read");
        if (!btn) return;
        btn.onclick = () => {
          let left = 30;
          const id = setInterval(() => {
            left -= 1;
            if (read) read.textContent = "00:" + String(left).padStart(2, "0");
            if (left <= 0) { clearInterval(id); if (window.Aura) Aura.speak("Timer done."); }
          }, 1000);
        };
      }, 30);
    },
    canvas() {
      Windows.create("canvas", "Canvas", 360, 240,
        '<div class="pad"><h3>Canvas</h3><input id="c1" type="color" value="#7dd3fc"><input id="c2" type="color" value="#818cf8"><div id="swatch" style="height:80px;border-radius:12px;margin-top:10px;background:linear-gradient(90deg,#7dd3fc,#818cf8)"></div></div>');
      setTimeout(() => {
        const paint = () => {
          const s = document.getElementById("swatch");
          if (s) s.style.background = "linear-gradient(90deg," + document.getElementById("c1").value + "," + document.getElementById("c2").value + ")";
        };
        document.getElementById("c1")?.addEventListener("input", paint);
        document.getElementById("c2")?.addEventListener("input", paint);
      }, 30);
    }
  };

  function loadMind() {
    const status = document.getElementById("boot-status");
    if (status) status.textContent = "Loading mind 62 phrase book…";
    fetch("data/mind62.json").then((r) => r.json()).then((data) => {
      window.LumenMind62 = data;
      if (status) status.textContent = "Helper ready";
    }).catch(() => {});
  }

  function hook() {
    if (window.Apps) Object.assign(Apps, extra);
    if (window.Desktop && Desktop.labels) {
      Desktop.labels.catalog = "Catalog";
      Desktop.labels.tasks = "Tasks";
      Desktop.labels.timer = "Timer";
      Desktop.labels.canvas = "Canvas";
    }
    document.addEventListener("click", (e) => {
      const b = e.target.closest("[data-open]");
      if (!b || !window.Desktop) return;
      Desktop.openApp(b.getAttribute("data-open"));
    });
    if (window.Aura) {
      const base = Aura.localReply.bind(Aura);
      Aura.localReply = function (text) {
        const q = text.toLowerCase();
        if (/catalog|app store|store/.test(q)) { Desktop.openApp("catalog"); return "Opening Catalog. This is not an app store."; }
        if (/tasks|todo/.test(q)) { Desktop.openApp("tasks"); return "Opening Tasks."; }
        if (/timer/.test(q)) { Desktop.openApp("timer"); return "Opening Timer."; }
        if (/canvas|draw/.test(q)) { Desktop.openApp("canvas"); return "Opening Canvas."; }
        const book = window.LumenMind62 && LumenMind62.phrases || [];
        const hit = book.find((p) => q.includes(p.k));
        if (hit) return hit.a;
        return base(text);
      };
    }
    loadMind();
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", hook);
  else hook();
  window.Lumen62 = extra;
})();
