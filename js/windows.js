const Windows = {
  z: 10,
  list: {},
  create(id, title, width, height, html, dark) {
    if (this.list[id]) {
      this.focus(id);
      return this.list[id];
    }
    const el = document.createElement("div");
    el.className = "win" + (dark ? " dark" : "");
    el.dataset.id = id;
    el.style.width = width + "px";
    el.style.height = height + "px";
    el.style.left = 80 + Math.random() * 120 + "px";
    el.style.top = 40 + Math.random() * 80 + "px";
    el.style.zIndex = ++this.z;
    el.innerHTML = `
      <div class="win-titlebar">
        <div class="traffic">
          <span class="t-close" data-act="close"></span>
          <span class="t-min" data-act="min"></span>
          <span class="t-max" data-act="max"></span>
        </div>
        <div class="win-title">${title}</div>
      </div>
      <div class="win-body">${html}</div>`;
    document.getElementById("window-layer").appendChild(el);
    this.list[id] = el;
    this.bind(el, id);
    this.focus(id);
    Desktop.markOpen(id, true);
    return el;
  },
  bind(el, id) {
    const bar = el.querySelector(".win-titlebar");
    let drag = false, ox = 0, oy = 0;
    bar.addEventListener("mousedown", (e) => {
      if (e.target.closest(".traffic")) return;
      drag = true;
      ox = e.clientX - el.offsetLeft;
      oy = e.clientY - el.offsetTop;
      this.focus(id);
    });
    window.addEventListener("mousemove", (e) => {
      if (!drag) return;
      el.style.left = e.clientX - ox + "px";
      el.style.top = Math.max(0, e.clientY - oy) + "px";
    });
    window.addEventListener("mouseup", () => { drag = false; });
    el.addEventListener("mousedown", () => this.focus(id));
    el.querySelector(".traffic").addEventListener("click", (e) => {
      const act = e.target.dataset.act;
      if (act === "close") this.close(id);
      if (act === "min") el.style.display = "none";
      if (act === "max") {
        el.style.left = "12px";
        el.style.top = "8px";
        el.style.width = "calc(100% - 24px)";
        el.style.height = "calc(100% - 16px)";
      }
    });
  },
  focus(id) {
    Object.values(this.list).forEach((w) => w.classList.remove("active"));
    const el = this.list[id];
    if (!el) return;
    el.style.display = "";
    el.style.zIndex = ++this.z;
    el.classList.add("active");
    document.getElementById("app-title").textContent = el.querySelector(".win-title").textContent;
  },
  close(id) {
    const el = this.list[id];
    if (!el) return;
    el.remove();
    delete this.list[id];
    Desktop.markOpen(id, false);
  }
};
