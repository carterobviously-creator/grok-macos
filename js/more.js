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
      Object.keys(Windows.list).length + "</p><p>Aura mode: " +
      (Aura.cloudEnabled() ? "cloud + local" : "local") + "</p></div>");
  }
});
