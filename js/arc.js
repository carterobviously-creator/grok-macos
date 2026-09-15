/* Lumen Arc — extra desktop polish. Entertainment mock. */
(function () {
  if (typeof Desktop === "undefined") return;

  Desktop.labels.stage = "Stage";
  Desktop.labels.bridge = "Bridge";

  if (typeof Icons !== "undefined") {
    Icons.stage = function () {
      return '<svg viewBox="0 0 64 64" width="44" height="44"><rect x="8" y="14" width="28" height="36" rx="6" fill="#6366f1"/><rect x="40" y="18" width="16" height="12" rx="4" fill="#a5b4fc"/><rect x="40" y="34" width="16" height="12" rx="4" fill="#c7d2fe"/></svg>';
    };
    Icons.bridge = function () {
      return '<svg viewBox="0 0 64 64" width="44" height="44"><rect x="6" y="30" width="52" height="8" rx="4" fill="#38bdf8"/><path d="M10 30c8-16 36-16 44 0" fill="none" stroke="#e0f2fe" stroke-width="4"/></svg>';
    };
  }

  if (typeof Apps !== "undefined") {
    Apps.stage = function () {
      document.body.classList.toggle("stage-on");
      const layer = document.getElementById("stage-view");
      if (!layer) return;
      const ids = Object.keys(Windows.list || {});
      layer.innerHTML = ids.length
        ? ids.map(function (id) {
            const title = Windows.list[id].querySelector(".win-title").textContent;
            return '<button class="stage-card glass" data-id="' + id + '"><h3>' + title + '</h3><p>Bring forward</p></button>';
          }).join("")
        : '<div class="stage-card glass"><h3>Stage</h3><p>Open a window first.</p></div>';
      layer.querySelectorAll("[data-id]").forEach(function (b) {
        b.onclick = function () {
          document.body.classList.remove("stage-on");
          Windows.focus(b.dataset.id);
        };
      });
      Desktop.toast(document.body.classList.contains("stage-on") ? "Stage view on" : "Stage view off");
    };
    Apps.bridge = function () {
      Windows.open("bridge", "Bridge",
        "<div style='padding:16px'><p><strong>Lumen Bridge</strong> is a status board for this mock.</p><ul><li>Aura phrase book: " + (AuraModel.ready ? "loaded" : "pending") + "</li><li>Demo replies: " + (Aura.cloudEnabled() ? "on" : "off") + "</li><li>Windows: " + Object.keys(Windows.list || {}).length + "</li></ul><p class='muted'>Not a real operating system. Not affiliated with Apple.</p></div>");
    };
  }

  if (!document.getElementById("stage-view")) {
    const sv = document.createElement("div");
    sv.id = "stage-view";
    document.getElementById("desktop").appendChild(sv);
  }
  if (!document.getElementById("aura-orb")) {
    const orb = document.createElement("button");
    orb.id = "aura-orb";
    orb.title = "Aura";
    orb.onclick = function () { Desktop.openApp("aura"); };
    document.getElementById("desktop").appendChild(orb);
  }

  if (typeof AuraModel !== "undefined") {
    AuraModel.phrases.push(
      ["stage view", "Open Stage or say open stage to tile mock windows."],
      ["bridge status", "Bridge shows whether the local helper is loaded."],
      ["orb aura", "The glowing orb opens Aura. Command-Space also works."]
    );
  }

  window.addEventListener("keydown", function (e) {
    if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "j") {
      e.preventDefault();
      Desktop.openApp("aura");
    }
    if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "d") {
      e.preventDefault();
      document.body.classList.toggle("arc-dusk");
      Desktop.toast(document.body.classList.contains("arc-dusk") ? "Dusk wash" : "Default wash");
    }
  });
})();
