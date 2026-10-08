/* Lumen 68: boot-loaded mini model, dock glass, Ask orb. Entertainment mock. */
const Lumen68 = {
  mind: null,
  async boot() {
    const status = document.getElementById("boot-status");
    if (status) status.textContent = "Loading mini model 68\u2026";
    try {
      const r = await fetch("data/mind68.json");
      this.mind = await r.json();
      if (status) status.textContent = "Mini model ready \u00b7 " + this.mind.docs.length + " notes";
    } catch (e) {
      if (status) status.textContent = "Mini model skipped \u00b7 local helper still works";
    }
    this.paint();
    const wall = document.getElementById("wallpaper");
    if (wall) wall.classList.add("ridge");
    const header = document.querySelector("#assistant header strong");
    if (header && !header.querySelector(".ask-orb")) {
      header.innerHTML = '<span class="ask-orb" aria-hidden="true"></span>Ask';
    }
    this.magnifyDock();
    this.watchDock();
  },
  paint() {
    const cc = document.getElementById("control-center");
    if (!cc || document.getElementById("wall-cycle")) return;
    const btn = document.createElement("button");
    btn.id = "wall-cycle";
    btn.type = "button";
    btn.textContent = "Wallpaper";
    btn.style.cssText = "margin-top:8px;width:100%;border:0;border-radius:12px;padding:8px;background:rgba(255,255,255,.55)";
    btn.onclick = () => {
      const w = document.getElementById("wallpaper");
      w.classList.toggle("ridge");
      w.classList.toggle("alt");
    };
    cc.appendChild(btn);
  },
  magnifyDock() {
    const dock = document.getElementById("dock");
    if (!dock || dock.dataset.mag) return;
    dock.dataset.mag = "1";
    dock.addEventListener("mousemove", (e) => {
      const items = [...dock.querySelectorAll(".dock-item")];
      items.forEach((el) => {
        const r = el.getBoundingClientRect();
        const dx = Math.abs(e.clientX - (r.left + r.width / 2));
        const scale = Math.max(1, 1.34 - dx / 140);
        const lift = (scale - 1) * 22;
        el.style.transform = "translateY(" + (-lift) + "px) scale(" + scale.toFixed(3) + ")";
      });
    });
    dock.addEventListener("mouseleave", () => {
      dock.querySelectorAll(".dock-item").forEach((el) => { el.style.transform = ""; });
    });
  },
  watchDock() {
    const dock = document.getElementById("dock");
    if (!dock) return;
    new MutationObserver(() => this.magnifyDock()).observe(dock, { childList: true });
  },
  nearest(q) {
    if (!this.mind) return null;
    const words = q.toLowerCase().split(/\W+/).filter(Boolean);
    let best = null;
    let score = 0;
    this.mind.docs.forEach((d) => {
      const bag = d.q.split(/\W+/);
      const hit = words.filter((w) => bag.includes(w)).length;
      if (hit > score) { score = hit; best = d; }
    });
    return score >= 2 ? best.a : null;
  }
};
const _auraReply = Aura.reply.bind(Aura);
Aura.reply = async function (text) {
  const hit = Lumen68.nearest(text);
  if (hit && !/open |launch |remind |note /.test(text.toLowerCase())) return hit;
  return _auraReply(text);
};
window.addEventListener("load", () => Lumen68.boot());
