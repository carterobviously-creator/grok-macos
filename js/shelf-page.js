(function () {
  const items = [
    ["Notes", "Write locally"],
    ["Calculator", "Do small math"],
    ["Calendar", "See the month"],
    ["Music", "Play tones"],
    ["Terminal", "Type mock commands"],
    ["Sketch", "Draw in the browser"]
  ];
  const list = document.getElementById("list");
  items.forEach((item) => {
    const card = document.createElement("article");
    card.className = "shelf-card";
    card.innerHTML = "<strong>" + item[0] + "</strong><p>" + item[1] + "</p>";
    const btn = document.createElement("button");
    btn.type = "button";
    btn.textContent = "Pin for desktop";
    btn.addEventListener("click", () => {
      const pins = JSON.parse(localStorage.getItem("lumen-shelf-pins") || "[]");
      if (pins.indexOf(item[0]) === -1) pins.push(item[0]);
      localStorage.setItem("lumen-shelf-pins", JSON.stringify(pins));
      btn.textContent = "Pinned";
    });
    card.appendChild(btn);
    list.appendChild(card);
  });
})();
