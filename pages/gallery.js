const items = [
  ["Files", "Browse sample folders"],
  ["Notes", "Local notepad"],
  ["Calculator", "Four-function pad"],
  ["Web", "Simple frame browser"],
  ["Gallery", "Install dock shortcuts"],
  ["Mail", "Sample inbox"],
  ["Music", "Player chrome"],
  ["Photos", "Color tiles"],
  ["Calendar", "This month"],
  ["Maps", "Pin card"],
  ["Markets", "Demo tape"],
  ["Brief", "Sample headlines"],
  ["Shelf", "Sample chapter"],
  ["Ask", "Voice helper with a phrase book and optional text demo"]
];
document.getElementById("grid").innerHTML = items.map((it) =>
  "<article class='card'><h3>" + it[0] + "</h3><p>" + it[1] + "</p></article>"
).join("");
