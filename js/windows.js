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
    el.style.left = 70 + Math.random() * 160 + "px";
    el.style.top = 36 + Math.random() * 70 + "px";
    el.style.zIndex = ++this.z;
    el.innerHTML =
      '<div class="win-titlebar">' +
      '<div class="traffic">' +
      '<span class="t-close" data-act="close" title="Close"></span>' +
      '<span class="t-min" data-act="min" title="Minimize"></span>' +
      '<span class="t-max" data-act="max" title="Zoom"></span>' +
      "</div>" +
      '<div class="win-title">' + title + "</div></div>" +
      '<div class="win-body">' + html + "</div>" +
      '<div class="win-resize"></div>';
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
      el.style.left = Math.max(-40, e.clientX - ox) + "px";
      el.style.top = Math.max(0, e.clientY - oy) + "px";
    });
    window.addEventListener("mouseup", () => { drag = false; });
    el.addEventListener("mousedown", () => this.focus(id));
    el.querySelector(".traffic").addEventListener("click", (e) => {
      const act = e.target.dataset.act;
      if (act === "close") this.close(id);
      if (act === "min") {
        el.classList.add("minned");
        el.style.display = "none";
      }
      if (act === "max") {
        if (el.dataset.max === "1") {
          el.style.left = el.dataset.ox;
          el.style.top = el.dataset.oy;
          el.style.width = el.dataset.ow;
          el.style.height = el.dataset.oh;
          el.dataset.max = "0";
        } else {
          el.dataset.ox = el.style.left;
          el.dataset.oy = el.style.top;
          el.dataset.ow = el.style.width;
          el.dataset.oh = el.style.height;
          el.style.left = "12px";
          el.style.top = "8px";
          el.style.width = "calc(100% - 24px)";
          el.style.height = "calc(100% - 16px)";
          el.dataset.max = "1";
        }
      }
    });
    const handle = el.querySelector(".win-resize");
    let rs = false, sx, sy, sw, sh;
    handle.addEventListener("mousedown", (e) => {
      e.stopPropagation();
      rs = true;
      sx = e.clientX;
      sy = e.clientY;
      sw = el.offsetWidth;
      sh = el.offsetHeight;
    });
    window.addEventListener("mousemove", (e) => {
      if (!rs) return;
      el.style.width = Math.max(280, sw + (e.clientX - sx)) + "px";
      el.style.height = Math.max(180, sh + (e.clientY - sy)) + "px";
    });
    window.addEventListener("mouseup", () => { rs = false; });
  },
  focus(id) {
    Object.values(this.list).forEach((w) => w.classList.remove("active"));
    const el = this.list[id];
    if (!el) return;
    el.classList.remove("minned");
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
