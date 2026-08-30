Icons.messages = function () {
  return this.svg('<svg width="28" height="28" viewBox="0 0 28 28"><rect x="4" y="6" width="20" height="14" rx="7" fill="#fff"/></svg>', "linear-gradient(#4ade80,#16a34a)");
};
Icons.contacts = function () {
  return this.svg('<svg width="28" height="28" viewBox="0 0 28 28"><circle cx="14" cy="11" r="4" fill="#fff"/><path d="M7 21c1-4 4-6 7-6s6 2 7 6" fill="#fff"/></svg>', "linear-gradient(#fda4af,#fb7185)");
};
Icons.activity = function () {
  return this.svg('<svg width="28" height="28" viewBox="0 0 28 28"><path d="M4 16h4l3-8 4 14 3-6h6" fill="none" stroke="#fff" stroke-width="2"/></svg>', "linear-gradient(#a78bfa,#4f46e5)");
};

Object.assign(Desktop.labels, {
  messages: "Messages",
  contacts: "Contacts",
  activity: "Pulse"
});

const _open = Desktop.openApp.bind(Desktop);
Desktop.openApp = function (id) {
  if (id !== "aura" && id !== "launch" && Windows.list[id]) {
    Windows.focus(id);
    return;
  }
  _open(id);
};

Object.assign(Apps, {
  messages() {
    Windows.create("messages", "Messages", 480, 380,
      '<div class="mail"><ul>' +
      '<li class="on" data-b="Hey \u2014 this thread is a mock. Aura can still open apps.">Alex</li>' +
      '<li data-b="Lunch at noon? (demo text)">Sam</li>' +
      '<li data-b="Sent you a note in Writer.">Riley</li>' +
      '</ul><article id="msg-body">Hey \u2014 this thread is a mock. Aura can still open apps.</article></div>');
    document.querySelectorAll(".mail li").forEach((li) => {
      li.onclick = () => {
        document.querySelectorAll(".mail li").forEach((x) => x.classList.remove("on"));
        li.classList.add("on");
        document.getElementById("msg-body").textContent = li.dataset.b;
      };
    });
  },
  contacts() {
    Windows.create("contacts", "Contacts", 420, 340,
      '<div class="pad"><h3>People</h3><p>Alex \u00b7 demo@lumen.local</p><p>Sam \u00b7 sam@lumen.local</p><p>Riley \u00b7 riley@lumen.local</p><p>These cards are sample data only.</p></div>');
  },
  activity() {
    Windows.create("activity", "Pulse", 440, 300,
      '<div class="pad"><h3>Pulse</h3><p>CPU mock 12%</p><p>Memory mock 4.1 GB</p><p>Windows open: ' +
      Object.keys(Windows.list).length + "</p><p>Aura mode: offline local</p></div>");
  }
});
