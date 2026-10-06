(function load63() {
  if (!document.querySelector('link[href="css/lumen63.css"]')) {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "css/lumen63.css";
    document.head.appendChild(link);
  }
  if (!document.querySelector('script[src="js/lumen63.js"]')) {
    const s = document.createElement("script");
    s.src = "js/lumen63.js";
    document.body.appendChild(s);
  }
  if (!document.querySelector('script[src="js/load64.js"]')) {
    const n = document.createElement("script");
    n.src = "js/load64.js";
    document.body.appendChild(n);
  }
  const status = document.getElementById("boot-status");
  if (status) status.textContent = "Loading mind 63…";
})();
