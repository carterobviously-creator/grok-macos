(function enhanceSettings() {
  const orig = Apps.settings;
  Apps.settings = function () {
    orig();
    const body = document.querySelector('.win[data-id="settings"] .win-body .settings');
    if (!body) return;
    const wrap = document.createElement("div");
    wrap.innerHTML =
      '<label style="display:block;margin-top:12px"><input type="checkbox" id="aura-cloud"> Longer answers via public demo text API (optional)</label>' +
      '<p style="font-size:12px;opacity:.75">Off by default. Uses a third-party text endpoint. Not an Apple service.</p>';
    body.appendChild(wrap);
    const box = document.getElementById("aura-cloud");
    box.checked = localStorage.getItem("lumen-aura-cloud") === "1";
    box.onchange = () => {
      localStorage.setItem("lumen-aura-cloud", box.checked ? "1" : "0");
      Desktop.refreshAuraMode();
      document.getElementById("aura-mode").textContent = box.checked ? "Demo API on" : (AuraModel.ready ? "Offline · loaded" : "Offline");
      Desktop.toast(box.checked ? "Aura will try the demo API for longer chats." : "Aura stays local.");
    };
  };

  const origRefresh = Desktop.refreshAuraMode.bind(Desktop);
  Desktop.refreshAuraMode = function () {
    origRefresh();
    const el = document.getElementById("aura-mode");
    if (el && localStorage.getItem("lumen-aura-cloud") === "1") el.textContent = "Demo API on";
  };
})();
