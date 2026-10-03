/* Harbor upgrade: glass dock, speaking orb, local phrase mind on boot. */
(function () {
  const phrases = [
    "open files", "open notes", "open gallery", "what time is it",
    "remind me to stretch", "note call later", "tell a joke", "help"
  ];

  function bootLine(text) {
    const status = document.getElementById("boot-status");
    if (status) status.textContent = text;
    let line = document.querySelector(".llm-line");
    if (!line) {
      line = document.createElement("p");
      line.className = "llm-line";
      const note = document.querySelector(".boot-note");
      if (note) note.before(line);
    }
    line.textContent = "Local phrase mind · " + phrases.length + " starters · not a product model";
  }

  bootLine("Loading local phrase mind…");
  let step = 0;
  const timer = setInterval(() => {
    step += 1;
    bootLine(step < 3 ? "Indexing local replies…" : "Phrase mind ready");
    if (step > 4) clearInterval(timer);
  }, 280);

  function magnify(e) {
    const dock = document.getElementById("dock");
    if (!dock) return;
    const items = [...dock.querySelectorAll(".dock-item")];
    items.forEach((item) => {
      const r = item.getBoundingClientRect();
      const cx = r.left + r.width / 2;
      const dist = Math.abs(e.clientX - cx);
      const scale = dist < 140 ? 1 + (1 - dist / 140) * 0.55 : 1;
      item.style.transform = "translateY(" + (1 - scale) * 18 + "px) scale(" + scale.toFixed(3) + ")";
    });
  }

  function resetDock() {
    document.querySelectorAll("#dock .dock-item").forEach((item) => {
      item.style.transform = "";
    });
  }

  function ensureOrb() {
    if (document.getElementById("siri-orb")) return;
    const btn = document.createElement("button");
    btn.id = "siri-orb";
    btn.type = "button";
    btn.title = "Aura orb — hold or click to ask";
    btn.setAttribute("aria-label", "Ask Aura");
    document.getElementById("desktop").appendChild(btn);

    const panel = document.createElement("div");
    panel.id = "siri-panel";
    panel.className = "glass hidden";
    panel.innerHTML = '<p id="siri-say">Ask me to open an app, set a reminder, or do a little math.</p><input id="siri-q" placeholder="Ask Aura…" />';
    document.getElementById("desktop").appendChild(panel);

    btn.onclick = () => {
      panel.classList.toggle("hidden");
      if (!panel.classList.contains("hidden")) document.getElementById("siri-q").focus();
    };
    panel.querySelector("#siri-q").addEventListener("keydown", async (e) => {
      if (e.key !== "Enter") return;
      const q = e.target.value.trim();
      if (!q) return;
      e.target.value = "";
      await ask(q);
    });
  }

  async function ask(text) {
    const say = document.getElementById("siri-say");
    const orb = document.getElementById("siri-orb");
    if (say) say.textContent = "Thinking…";
    if (orb) orb.classList.add("live");
    try {
      const answer = await Aura.reply(text);
      if (say) say.textContent = answer;
      Aura.speak(answer);
      if (typeof Desktop !== "undefined") Desktop.addAura("user", text), Desktop.addAura("bot", answer);
    } catch (err) {
      if (say) say.textContent = "Aura could not answer just now.";
    } finally {
      if (orb) orb.classList.remove("live");
    }
  }

  function listen() {
    if (typeof Aura === "undefined") return;
    const orb = document.getElementById("siri-orb");
    if (orb) orb.classList.add("live");
    Aura.listen(async (said) => {
      const panel = document.getElementById("siri-panel");
      if (panel) panel.classList.remove("hidden");
      await ask(said);
    });
  }

  function start() {
    const dock = document.getElementById("dock");
    if (dock) {
      dock.addEventListener("mousemove", magnify);
      dock.addEventListener("mouseleave", resetDock);
    }
    ensureOrb();
    document.addEventListener("keydown", (e) => {
      if (e.code === "Space" && e.altKey) {
        e.preventDefault();
        listen();
      }
    });
    const orb = document.getElementById("siri-orb");
    if (orb) {
      let hold;
      orb.addEventListener("pointerdown", () => {
        hold = setTimeout(listen, 280);
      });
      orb.addEventListener("pointerup", () => clearTimeout(hold));
    }
    const tint = document.getElementById("tint");
    if (tint) {
      tint.addEventListener("input", () => {
        document.documentElement.style.setProperty("--orb", tint.value);
        document.body.style.setProperty("--glass-alpha", String(0.28 + Number(tint.value) * 0.45));
      });
    }
  }

  const ready = setInterval(() => {
    if (document.getElementById("desktop") && !document.getElementById("desktop").classList.contains("hidden")) {
      clearInterval(ready);
      start();
    }
  }, 200);
})();
