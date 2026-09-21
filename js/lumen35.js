/* Lumen 35 — extra mock apps + Aura phrases. Original icons only. */
(function () {
  if (window.AuraModel && Array.isArray(AuraModel.phrases)) {
    AuraModel.phrases.push(
      ["open compass", "Opening Compass."],
      ["open palette", "Opening Palette."],
      ["focus mode", "Focus toggle lives in Control Center."],
      ["glass slider", "Drag Glass tint in Control Center."]
    );
    if (AuraModel.book && AuraModel.book.greet) {
      AuraModel.book.greet.push("Aura 35 loaded. Local phrase book plus optional demo replies.");
    }
  }

  if (window.Icons) {
    Icons.compass = function () {
      return this.svg('<svg width="28" height="28" viewBox="0 0 28 28"><circle cx="14" cy="14" r="9" fill="#fff"/><path d="M14 7l3 7-3 7-3-7z" fill="#0ea5e9"/></svg>', "linear-gradient(#7dd3fc,#0369a1)");
    };
    Icons.palette = function () {
      return this.svg('<svg width="28" height="28" viewBox="0 0 28 28"><circle cx="10" cy="12" r="3" fill="#fb7185"/><circle cx="18" cy="12" r="3" fill="#34d399"/><circle cx="14" cy="18" r="3" fill="#60a5fa"/></svg>', "linear-gradient(#fde68a,#f97316)");
    };
    Icons.stage = function () {
      return this.svg('<svg width="28" height="28" viewBox="0 0 28 28"><rect x="5" y="8" width="18" height="12" rx="2" fill="#fff"/><path d="M8 16h12" stroke="#111827"/></svg>', "linear-gradient(#c4b5fd,#4c1d95)");
    };
  }

  if (window.Desktop && Desktop.labels) {
    Object.assign(Desktop.labels, { compass: "Compass", palette: "Palette", stage: "Stage" });
  }

  if (window.Apps) {
    Apps.compass = function () {
      Windows.open("compass", "Compass", "<div class='lumen35-card'><p>Mock heading 312° NW</p><p>Not GPS. Entertainment only.</p></div>");
    };
    Apps.palette = function () {
      Windows.open("palette", "Palette", "<div class='lumen35-grid'><button class='lumen35-tile' style='background:#67e8f9'>Cyan</button><button class='lumen35-tile' style='background:#c4b5fd'>Violet</button><button class='lumen35-tile' style='background:#fda4af'>Rose</button><button class='lumen35-tile' style='background:#86efac'>Mint</button></div>");
    };
    Apps.stage = function () {
      Windows.open("stage", "Stage", "<div class='lumen35-card'><p>Mock presentation deck.</p><button class='lumen35-tile' id='st35'>Next slide</button><p id='st35n'>Slide 1 · Harbor dusk</p></div>");
      let n = 1;
      const b = document.getElementById("st35");
      if (b) b.onclick = function () {
        n += 1;
        const p = document.getElementById("st35n");
        if (p) p.textContent = "Slide " + n + " · mock only";
      };
    };
  }

  const old = window.Aura && Aura.localReply;
  if (old) {
    Aura.localReply = function (text) {
      const q = String(text || "").toLowerCase();
      if (/open compass/.test(q)) { Desktop.openApp("compass"); return "Opening Compass."; }
      if (/open palette/.test(q)) { Desktop.openApp("palette"); return "Opening Palette."; }
      if (/open stage/.test(q)) { Desktop.openApp("stage"); return "Opening Stage."; }
      if (/who are you|what is aura/.test(q)) {
        return "Aura is a tiny phrase helper inside Lumen. Optional demo replies can be turned off in Settings. Not a branded assistant.";
      }
      return old.call(Aura, text);
    };
  }

  const dock = document.getElementById("dock");
  if (dock) dock.classList.add("lumen35-glow");
  const asst = document.getElementById("assistant");
  if (asst) {
    asst.classList.add("lumen35-orb");
    const h = asst.querySelector("header strong");
    if (h && !h.querySelector(".lumen35-dot")) {
      const d = document.createElement("span");
      d.className = "lumen35-dot";
      h.prepend(d);
    }
  }
})();
