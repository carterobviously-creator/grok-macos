(function () {
  function toast(msg) {
    if (typeof Desktop !== "undefined" && Desktop.toast) Desktop.toast(msg);
  }

  const EXTRA = {
    atlas: {
      title: "Atlas",
      body: function () {
        return (
          '<div class="app-pad atlas">' +
          "<h3>Atlas</h3>" +
          "<p>Mock globe. Entertainment overlay only.</p>" +
          '<div class="atlas-orb" id="atlas-orb"></div>' +
          '<p class="hint">No live GPS</p>' +
          "</div>"
        );
      }
    },
    ledger: {
      title: "Ledger",
      body: function () {
        const rows = JSON.parse(localStorage.getItem("lumen-ledger") || "[]");
        const list = rows
          .map(function (r) {
            return "<li>" + r.note + " · " + r.amt + "</li>";
          })
          .join("");
        return (
          '<div class="app-pad">' +
          "<h3>Ledger</h3>" +
          '<form id="led-form"><input name="note" placeholder="Note" required />' +
          '<input name="amt" placeholder="12.00" required />' +
          "<button>Add</button></form>" +
          '<ul id="led-list">' +
          (list || "<li>No rows yet</li>") +
          "</ul></div>"
        );
      }
    },
    lab: {
      title: "Lab",
      body: function () {
        return (
          '<div class="app-pad">' +
          "<h3>Lab</h3>" +
          "<p>Tiny local experiments for Aura.</p>" +
          '<label>Echo test <input id="lab-echo" placeholder="Type a phrase" /></label>' +
          '<pre id="lab-out" class="term-like">Ready.</pre>' +
          "</div>"
        );
      }
    }
  };

  function hookApps() {
    if (typeof Apps === "undefined") return;
    Object.keys(EXTRA).forEach(function (id) {
      if (!Apps[id]) Apps[id] = EXTRA[id];
    });
  }

  function wireWindows() {
    const layer = document.getElementById("window-layer");
    if (!layer) return;
    layer.addEventListener("submit", function (e) {
      if (e.target && e.target.id === "led-form") {
        e.preventDefault();
        const fd = new FormData(e.target);
        const rows = JSON.parse(localStorage.getItem("lumen-ledger") || "[]");
        rows.push({ note: String(fd.get("note")), amt: String(fd.get("amt")) });
        localStorage.setItem("lumen-ledger", JSON.stringify(rows));
        toast("Ledger row saved");
        if (typeof Desktop !== "undefined") Desktop.openApp("ledger");
      }
    });
    layer.addEventListener("input", function (e) {
      if (e.target && e.target.id === "lab-echo") {
        const out = document.getElementById("lab-out");
        if (out) out.textContent = AuraModel.localReply(e.target.value);
      }
    });
  }

  if (window.VistaAura) {
    const prev = VistaAura.extra;
    VistaAura.extra = function (text) {
      const q = String(text || "").toLowerCase();
      if (/atlas|globe/.test(q)) {
        if (typeof Desktop !== "undefined") Desktop.openApp("atlas");
        return "Opening Atlas.";
      }
      if (/ledger|expense/.test(q)) {
        if (typeof Desktop !== "undefined") Desktop.openApp("ledger");
        return "Opening Ledger.";
      }
      if (/lab experiment/.test(q)) {
        if (typeof Desktop !== "undefined") Desktop.openApp("lab");
        return "Opening Lab.";
      }
      return prev ? prev(text) : null;
    };
  }

  function addDockTiles() {
    if (typeof Desktop === "undefined" || !Desktop.apps) return;
    ["atlas", "ledger", "lab"].forEach(function (id) {
      if (Desktop.apps.indexOf(id) === -1) Desktop.apps.push(id);
    });
  }

  hookApps();
  addDockTiles();
  wireWindows();
  document.documentElement.classList.add("pulse-ready");
})();
