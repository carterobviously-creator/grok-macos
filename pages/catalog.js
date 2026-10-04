const cards = [
  ["Files", "Browse mock folders."],
  ["Notes", "Text saved in this browser."],
  ["Calculator", "Working keypad."],
  ["Web", "Address bar and frame."],
  ["Gallery", "Install dock shortcuts."],
  ["Timer", "25 minute countdown."],
  ["Quiz", "Three local questions."],
  ["Aura", "Local helper, optional text demo."]
];
document.getElementById("cards").innerHTML = cards.map((c) =>
  '<article class="card"><h2>' + c[0] + '</h2><p>' + c[1] + '</p></article>'
).join("");
