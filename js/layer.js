(function layer() {
  if (!window.Desktop || !window.Apps) return;

  Object.assign(Desktop.labels, {
    journal: "Journal",
    studio: "Studio",
    tasks: "Tasks",
    scenes: "Scenes",
    vault: "Vault"
  });

  if (!Desktop.extra.includes("journal")) {
    /* available via Gallery / Launchpad */
  }

  Apps.journal = function () {
    const saved = localStorage.getItem("lumen-journal") || "Dear future me,\n\nThis journal stays in your browser.";
    Windows.create("journal", "Journal", 480, 420,
      '<div class="pad journal"><p>Private mock notebook</p><textarea id="j-area">' + saved + "</textarea></div>");
    const area = document.getElementById("j-area");
    area.oninput = () => localStorage.setItem("lumen-journal", area.value);
  };

  Apps.studio = function () {
    Windows.create("studio", "Studio", 560, 360,
      '<div class="pad studio-wrap"><canvas id="st-c" class="studio-canvas" width="360" height="280"></canvas>' +
      '<div><button id="st-blob">Blob</button><button id="st-wipe">Wipe</button><p>Original doodle toy.</p></div></div>');
    const c = document.getElementById("st-c");
    const x = c.getContext("2d");
    const blob = () => {
      x.fillStyle = "rgba(125,211,252,0.35)";
      x.beginPath();
      x.arc(40 + Math.random() * 280, 40 + Math.random() * 200, 18 + Math.random() * 40, 0, Math.PI * 2);
      x.fill();
    };
    document.getElementById("st-blob").onclick = blob;
    document.getElementById("st-wipe").onclick = () => x.clearRect(0, 0, c.width, c.height);
    blob(); blob();
  };

  Apps.tasks = function () {
    const saved = JSON.parse(localStorage.getItem("lumen-tasks") || '["Ship mock","Walk"]');
    Windows.create("tasks", "Tasks", 360, 360,
      '<div class="pad"><div id="tk-list"></div><form id="tk-form"><input id="tk-in" placeholder="Add task"><button>Add</button></form></div>');
    const list = document.getElementById("tk-list");
    const draw = () => {
      list.innerHTML = saved.map((t, i) =>
        '<div class="task-row"><label><input type="checkbox"> ' + t + '</label></div>'
      ).join("");
    };
    draw();
    document.getElementById("tk-form").onsubmit = (e) => {
      e.preventDefault();
      const v = document.getElementById("tk-in").value.trim();
      if (!v) return;
      saved.push(v);
      localStorage.setItem("lumen-tasks", JSON.stringify(saved));
      document.getElementById("tk-in").value = "";
      draw();
    };
  };

  Apps.scenes = function () {
    Windows.create("scenes", "Scenes", 400, 280,
      '<div class="pad"><p>Wallpaper scenes (original gradients)</p><div class="scene-grid">' +
      '<button data-s="harbor" style="background:linear-gradient(160deg,#0ea5e9,#0369a1)">Harbor</button>' +
      '<button data-s="dusk" style="background:linear-gradient(160deg,#7c3aed,#1e1b4b)">Dusk</button>' +
      '<button data-s="mint" style="background:linear-gradient(160deg,#34d399,#065f46)">Mint</button>' +
      '<button data-s="aurora" style="background:linear-gradient(160deg,#22d3ee,#a78bfa)">Aurora</button>' +
      '</div></div>');
    document.querySelectorAll(".scene-grid button").forEach((b) => {
      b.onclick = () => {
        document.getElementById("wallpaper").dataset.scene = b.dataset.s;
        document.getElementById("wallpaper").style.background =
          b.style.background;
        Desktop.toast("Scene: " + b.textContent);
      };
    });
  };

  Apps.vault = function () {
    Windows.create("vault", "Vault", 360, 240,
      '<div class="pad"><p>Mock vault. Nothing is encrypted for real. Entertainment only.</p><input type="password" placeholder="Passphrase toy" style="width:100%;padding:8px;border-radius:8px"></div>');
  };

  const oldStore = Apps.store;
  Apps.store = function () {
    oldStore();
    const grid = document.querySelector(".store-grid");
    if (!grid) return;
    ["journal", "studio", "tasks", "scenes", "vault"].forEach((id) => {
      const card = document.createElement("div");
      card.className = "store-card";
      card.innerHTML = "<strong>" + Desktop.labels[id] + "</strong><p>Extra Lumen toy.</p><button data-app=\"" + id + "\">Get</button>";
      grid.appendChild(card);
      card.querySelector("button").onclick = function () {
        Desktop.install(id);
        this.textContent = "Open";
      };
    });
  };

  function magnifyDock() {
    const dock = document.getElementById("dock");
    if (!dock) return;
    dock.addEventListener("mousemove", (e) => {
      const items = [...dock.querySelectorAll(".dock-item")];
      items.forEach((el) => el.classList.remove("hot", "near"));
      let best = null, bestD = 80;
      items.forEach((el) => {
        const r = el.getBoundingClientRect();
        const d = Math.abs(e.clientX - (r.left + r.width / 2));
        if (d < bestD) { bestD = d; best = el; }
      });
      if (!best) return;
      best.classList.add("hot");
      const i = items.indexOf(best);
      if (items[i - 1]) items[i - 1].classList.add("near");
      if (items[i + 1]) items[i + 1].classList.add("near");
    });
    dock.addEventListener("mouseleave", () => {
      dock.querySelectorAll(".dock-item").forEach((el) => el.classList.remove("hot", "near"));
    });
  }

  if (document.getElementById("dock")) magnifyDock();
  else setTimeout(magnifyDock, 800);
})();
