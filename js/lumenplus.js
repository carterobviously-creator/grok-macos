(function () {
  Icons.library = function () {
    return this.svg('<svg width="28" height="28" viewBox="0 0 28 28"><rect x="6" y="6" width="5" height="16" rx="1" fill="#fff"/><rect x="12" y="8" width="5" height="14" rx="1" fill="#e0f2fe"/><rect x="18" y="7" width="4" height="15" rx="1" fill="#fff"/></svg>', 'linear-gradient(#fb923c,#c2410c)');
  };
  Icons.cinema = function () {
    return this.svg('<svg width="28" height="28" viewBox="0 0 28 28"><rect x="4" y="8" width="20" height="12" rx="2" fill="#fff"/><path d="M12 11l6 3-6 3z" fill="#0f172a"/></svg>', 'linear-gradient(#818cf8,#312e81)');
  };
  Icons.cast = function () {
    return this.svg('<svg width="28" height="28" viewBox="0 0 28 28"><circle cx="9" cy="16" r="3" fill="#fff"/><circle cx="19" cy="12" r="4" fill="#fff"/></svg>', 'linear-gradient(#f472b6,#9d174d)');
  };

  Desktop.labels.library = "Library";
  Desktop.labels.cinema = "Cinema";
  Desktop.labels.cast = "Cast";

  Apps.library = function () {
    Windows.create("library", "Library", 420, 320,
      '<div class="pad"><p><b>Harbor Notes</b> — mock title</p><p><b>Glass Fields</b> — original short</p><p>Catalog is decorative.</p></div>');
  };
  Apps.cinema = function () {
    Windows.create("cinema", "Cinema", 480, 300,
      '<div class="pad"><div style="height:160px;border-radius:12px;background:linear-gradient(135deg,#1e1b4b,#312e81)"></div><p>Trailer card only. No video stream.</p></div>');
  };
  Apps.cast = function () {
    Windows.create("cast", "Cast", 360, 260,
      '<div class="pad"><strong>Lumen Cast</strong><p>Episode list is a mock.</p><p>01 Harbor dusk</p><p>02 Glass fields</p></div>');
  };

  if (AuraModel && AuraModel.book) {
    AuraModel.book.help.push("New tiles: Library, Cinema, Cast. Open Gallery or Launchpad.");
    AuraModel.phrases.push(["library cinema cast", "Those are extra Lumen tiles. Open them from Launchpad."]);
  }

  const scenes = ["", "alt", "dusk", "mint", "aurora", "lake"];
  let scene = 0;
  window.addEventListener("keydown", function (e) {
    if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "w") {
      e.preventDefault();
      const wall = document.getElementById("wallpaper");
      if (!wall) return;
      wall.classList.remove("alt", "dusk", "mint", "aurora", "lake");
      scene = (scene + 1) % scenes.length;
      if (scenes[scene]) wall.classList.add(scenes[scene]);
      Desktop.toast("Scene: " + (scenes[scene] || "harbor"));
    }
  });

  document.addEventListener("mousemove", function (e) {
    document.querySelectorAll(".glass").forEach(function (el) {
      const r = el.getBoundingClientRect();
      el.style.setProperty("--mx", ((e.clientX - r.left) / r.width * 100) + "%");
      el.style.setProperty("--my", ((e.clientY - r.top) / r.height * 100) + "%");
    });
  });
  document.body.classList.add("sheen");
})();
