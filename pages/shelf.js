const items = ["Files", "Notes", "Gallery", "Weather", "Messages", "Music", "Calendar", "Terminal"];
document.getElementById("list").innerHTML = items.map((n) =>
  '<div class="card"><strong>' + n + '</strong><p>Opens inside the Lumen desktop mock.</p></div>'
).join("");
