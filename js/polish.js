(function () {
  Desktop.menus.file = ["New Window", "Close Window", "Save mock"];
  Desktop.menus.window = ["Minimize", "Cycle windows", "Lock Screen"];
  Desktop.menus.help = ["Aura help", "About Lumen"];

  const _show = Desktop.showMenu.bind(Desktop);
  Desktop.showMenu = function (key, btn) {
    _show(key, btn);
    const pop = document.getElementById("menu-pop");
    if (!pop) return;
    pop.querySelectorAll("button").forEach((item) => {
      const prev = item.onclick;
      item.onclick = () => {
        const t = item.textContent;
        if (t === "Lock Screen") {
          pop.classList.add("hidden");
          document.getElementById("desktop").classList.add("hidden");
          document.getElementById("lock-screen").classList.remove("hidden");
          return;
        }
        if (t === "Cycle windows") {
          const ids = Object.keys(Windows.list);
          if (ids.length) Windows.focus(ids[ids.length - 1]);
          pop.classList.add("hidden");
          return;
        }
        if (prev) prev();
      };
    });
  };

  const _finder = Apps.finder;
  Apps.finder = function () {
    _finder();
    const grid = document.getElementById("finder-grid");
    if (!grid) return;
    const bind = () => {
      grid.querySelectorAll(".file").forEach((b) => {
        b.ondblclick = () => {
          Desktop.openApp("preview");
          Desktop.toast("Opened " + b.textContent + " in Preview (mock)." );
        };
      });
    };
    bind();
    const mo = new MutationObserver(bind);
    mo.observe(grid, { childList: true });
  };

  document.addEventListener("keydown", (e) => {
    if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "l") {
      e.preventDefault();
      document.getElementById("desktop").classList.add("hidden");
      document.getElementById("lock-screen").classList.remove("hidden");
    }
    if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "space") {
      e.preventDefault();
      Desktop.openApp("aura");
    }
  });
})();
