/* Lumen 32 — glass polish + Loom / Hearth. Entertainment mock. */
(function Lumen32() {
  function icon(name, bg, path) {
    if (typeof Icons === "undefined") return;
    Icons[name] = function () {
      return this.svg(`<svg width="28" height="28" viewBox="0 0 28 28">${path}</svg>`, bg);
    };
  }
  icon("loom", "linear-gradient(#34d399,#065f46)",
    '<rect x="5" y="6" width="18" height="16" rx="3" fill="#ecfdf5"/><path d="M8 11h12M8 15h8" stroke="#047857" stroke-width="1.8"/>');
  icon("hearth", "linear-gradient(#fb7185,#9f1239)",
    '<path d="M14 22s-8-5.2-8-10a4 4 0 018-2 4 4 0 018 2c0 4.8-8 10-8 10z" fill="#fff"/>');

  function register() {
    if (typeof Desktop === "undefined" || !Desktop.registerApp) return false;
    Desktop.registerApp({
      id: "loom",
      title: "Loom",
      icon: "loom",
      render() {
        return `<div class="l32-card" style="margin:12px"><h4>Loom</h4>
          <p>A quiet thread list. Local only.</p>
          <ul id="loom-list"><li>Review glass tint</li><li>Write a dusk note</li></ul>
          <input id="loom-in" placeholder="Add a thread" />
          <button type="button" id="loom-add">Add</button></div>`;
      },
      afterOpen() {
        const b = document.getElementById("loom-add");
        if (!b) return;
        b.onclick = () => {
          const i = document.getElementById("loom-in");
          const list = document.getElementById("loom-list");
          if (i && list && i.value.trim()) {
            const li = document.createElement("li");
            li.textContent = i.value.trim();
            list.appendChild(li);
            i.value = "";
          }
        };
      }
    });
    Desktop.registerApp({
      id: "hearth",
      title: "Hearth",
      icon: "hearth",
      render() {
        return `<div class="l32-card" style="margin:12px"><h4>Hearth</h4>
          <p>Warm focus timer. Not a system product.</p>
          <p id="hearth-min">25:00</p>
          <button type="button" id="hearth-go">Start mock timer</button></div>`;
      },
      afterOpen() {
        const b = document.getElementById("hearth-go");
        if (!b) return;
        b.onclick = () => {
          if (typeof Desktop !== "undefined") Desktop.toast("Hearth timer started (mock 25 min).");
        };
      }
    });
    return true;
  }
  const tryReg = () => { if (!register()) setTimeout(tryReg, 200); };
  tryReg();

  if (typeof Aura !== "undefined") {
    const prev = Aura.localReply.bind(Aura);
    Aura.localReply = function (text) {
      const q = text.toLowerCase();
      if (/open loom/.test(q) && typeof Desktop !== "undefined") {
        Desktop.openApp("loom"); return "Opening Loom.";
      }
      if (/open hearth|focus timer/.test(q) && typeof Desktop !== "undefined") {
        Desktop.openApp("hearth"); return "Opening Hearth.";
      }
      return prev(text);
    };
  }

  document.addEventListener("click", (e) => {
    const win = e.target.closest && e.target.closest(".win");
    if (win) win.classList.add("l32-pop");
  }, true);
})();
