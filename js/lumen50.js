/* Lumen 50 polish — original mock helpers */
(function () {
  const chips = [
    ["Open Notes", "open notes"],
    ["What time is it", "what time is it"],
    ["Tell a joke", "tell a joke"],
    ["Mission Control", "mission control"],
    ["Open Gallery", "open gallery"]
  ];

  function mountRail() {
    if (document.querySelector(".stage-rail")) return;
    const rail = document.createElement("div");
    rail.className = "stage-rail";
    rail.innerHTML =
      '<button type="button" data-a="notes">Notes</button>' +
      '<button type="button" data-a="calc">Calc</button>' +
      '<button type="button" data-a="store">Gallery</button>' +
      '<button type="button" id="rail-aura">Aura</button>';
    document.getElementById("desktop").appendChild(rail);
    rail.querySelectorAll("[data-a]").forEach((b) => {
      b.onclick = () => Desktop.openApp(b.dataset.a);
    });
    document.getElementById("rail-aura").onclick = () => {
      document.getElementById("assistant").classList.remove("hidden");
      document.getElementById("aura-input").focus();
    };
  }

  function mountChips() {
    const form = document.getElementById("aura-form");
    if (!form || document.querySelector(".quick-chips")) return;
    const wrap = document.createElement("div");
    wrap.className = "quick-chips";
    wrap.innerHTML = chips.map((c) =>
      '<button type="button" data-q="' + c[1] + '">' + c[0] + "</button>"
    ).join("");
    form.parentNode.insertBefore(wrap, form);
    wrap.querySelectorAll("button").forEach((b) => {
      b.onclick = async () => {
        const q = b.dataset.q;
        Desktop.addAura("me", q);
        Desktop.addAura("bot", await Aura.reply(q));
      };
    });
  }

  const extra = Aura.localReply.bind(Aura);
  Aura.localReply = function (text) {
    const q = text.toLowerCase();
    if (/lumen 50|what's new|whats new/.test(q)) {
      return "Lumen 50 adds a stage rail, Aura chips, and a Journal pad. Still a fan mock with original icons.";
    }
    if (/journal/.test(q)) {
      if (typeof Desktop !== "undefined") Desktop.openApp("journal");
      return "Opening Journal.";
    }
    return extra(text);
  };

  Apps.journal = function () {
    const saved = localStorage.getItem("lumen-journal") || new Date().toDateString() + "\n\nToday in Lumen…";
    Windows.create("journal", "Journal", 480, 380,
      '<textarea id="journal-area" style="width:100%;height:100%;border:0;resize:none;padding:16px">' + saved + "</textarea>");
    const area = document.getElementById("journal-area");
    area.oninput = () => localStorage.setItem("lumen-journal", area.value);
  };

  const start = Desktop.start.bind(Desktop);
  Desktop.start = function () {
    start();
    mountRail();
    mountChips();
    Desktop.toast("Lumen 50 ready · original mock");
  };
})();
