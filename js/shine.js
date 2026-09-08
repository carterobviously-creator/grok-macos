(function () {
  const scenes = ["default", "dusk", "night", "meadow"];
  let i = 0;
  function apply() {
    if (i === 0) document.body.removeAttribute("data-scene");
    else document.body.setAttribute("data-scene", scenes[i]);
    if (window.Desktop) Desktop.toast("Scene: " + scenes[i]);
  }
  window.addEventListener("keydown", (e) => {
    if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "w") {
      e.preventDefault();
      i = (i + 1) % scenes.length;
      apply();
    }
  });
  if (window.AuraModel && AuraModel.book) {
    AuraModel.book.extra = [
      "Lumen is a fan desktop mock. Aura is a local phrase helper.",
      "Press Command-W or Ctrl-W to cycle wallpaper scenes.",
      "Glass tint lives in Control Center. It is not Apple Liquid Glass.",
      "Gallery installs mock apps to the dock. Nothing is purchased."
    ];
  }
})();
