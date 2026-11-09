/* Enhanced original high-detail SVG icons for Lumen Desktop entertainment mock.
   Layered glass-style approximations with specular depth and refined colors — not official Apple artwork.
   Entertainment only. Not affiliated with Apple. Icons changed enough to be distinct. */
const Icons = {
  svg(inner, bg) {
    return `<div class=\"icon glass-icon\" style=\"background:${bg || 'linear-gradient(145deg,#64748b,#334155)'}; border-radius:22%; box-shadow:0 22px 50px rgba(0,0,0,.58), inset 0 5px 0 rgba(255,255,255,.97), inset 0 -6px 14px rgba(0,0,0,.3), 0 0 0 1.4px rgba(255,255,255,.38)\">${inner}<span class=\"spec\"></span><span class=\"highlight\"></span></div>`;
  },
  finder() {
    return this.svg('<svg width=\"48\" height=\"48\" viewBox=\"0 0 48 48\"><rect x=\"2\" y=\"3\" width=\"44\" height=\"42\" rx=\"13\" fill=\"#fff\" opacity=\".99\"/><path d=\"M8 14h32M8 20h28M8 26h24\" stroke=\"#0ea5e9\" stroke-width=\"3.2\" stroke-linecap=\"round\"/><circle cx=\"39\" cy=\"9\" r=\"6\" fill=\"#38bdf8\"/><path d=\"M5 7h14v7H5z\" fill=\"#e0f2fe\" opacity=\".85\"/></svg>', \"linear-gradient(165deg,#f0f9ff 0%,#0284c7 55%,#0369a1 100%)\");
  },
  notes() {
    return this.svg('<svg width=\"48\" height=\"48\" viewBox=\"0 0 48 48\"><rect x=\"3\" y=\"1\" width=\"42\" height=\"46\" rx=\"12\" fill=\"#fff\"/><path d=\"M12 12h24M12 18h24M12 24h20\" stroke=\"#d97706\" stroke-width=\"3.2\" stroke-linecap=\"round\"/><circle cx=\"40\" cy=\"8\" r=\"7.5\" fill=\"#fbbf24\"/><path d=\"M10 6h9v5h-9z\" fill=\"#fef3c7\"/></svg>', \"linear-gradient(160deg,#fef3c7,#f59e0b 48%,#b45309)\");
  },
  calc() {
    return this.svg('<svg width=\"48\" height=\"48\" viewBox=\"0 0 48 48\"><rect x=\"2\" y=\"0\" width=\"44\" height=\"48\" rx=\"13\" fill=\"#fff\"/><rect x=\"6\" y=\"4\" width=\"36\" height=\"14\" rx=\"7\" fill=\"#0f172a\"/><g fill=\"#64748b\"><circle cx=\"12\" cy=\"24\" r=\"4\"/><circle cx=\"24\" cy=\"24\" r=\"4\"/><circle cx=\"36\" cy=\"24\" r=\"4\"/><circle cx=\"12\" cy=\"34\" r=\"4\"/><circle cx=\"24\" cy=\"34\" r=\"4\"/><circle cx=\"36\" cy=\"34\" r=\"4\"/></g></svg>', \"linear-gradient(160deg,#f8fafc,#94a3b8 42%,#334155)\");
  },
  web() {
    return this.svg('<svg width=\"48\" height=\"48\" viewBox=\"0 0 48 48\"><circle cx=\"24\" cy=\"24\" r=\"20\" fill=\"none\" stroke=\"#fff\" stroke-width=\"4\"/><path d=\"M24 4c10 11 10 29 0 40M4 24h40\" stroke=\"#fff\" stroke-width=\"3.2\"/><circle cx=\"24\" cy=\"24\" r=\"7.5\" fill=\"#fff\" opacity=\".6\"/></svg>', \"linear-gradient(160deg,#a5f3fc,#0891b2 52%,#0e7490)\");
  },
  store() {
    return this.svg('<svg width=\"48\" height=\"48\" viewBox=\"0 0 48 48\"><path d=\"M4 14l9-12h22l9 12v28H4z\" fill=\"#fff\"/><rect x=\"10\" y=\"20\" width=\"28\" height=\"16\" rx=\"6\" fill=\"#0ea5e9\"/><circle cx=\"16\" cy=\"28\" r=\"2.5\" fill=\"#fff\"/><circle cx=\"24\" cy=\"28\" r=\"2.5\" fill=\"#fff\"/><circle cx=\"32\" cy=\"28\" r=\"2.5\" fill=\"#fff\"/></svg>', \"linear-gradient(160deg,#ddd6fe,#7c3aed 48%,#5b21b6)\");
  },
  settings() {
    return this.svg('<svg width=\"48\" height=\"48\" viewBox=\"0 0 48 48\"><circle cx=\"24\" cy=\"24\" r=\"14\" fill=\"#fff\"/><path d=\"M24 4v8M24 36v8M4 24h8M36 24h8M8 8l7 7M33 33l7 7M8 40l7-7M33 15l7-7\" stroke=\"#64748b\" stroke-width=\"3.4\" stroke-linecap=\"round\"/></svg>', \"linear-gradient(160deg,#e2e8f0,#64748b 48%,#334155)\");
  },
  music() {
    return this.svg('<svg width=\"48\" height=\"48\" viewBox=\"0 0 48 48\"><path d=\"M12 10v26a11 11 0 11-7-10V10l22-8v24a11 11 0 11-7-10V4z\" fill=\"#fff\"/></svg>', \"linear-gradient(160deg,#fbcfe8,#db2777 52%,#9d174d)\");
  },
  photos() {
    return this.svg('<svg width=\"48\" height=\"48\" viewBox=\"0 0 48 48\"><rect x=\"1\" y=\"3\" width=\"46\" height=\"42\" rx=\"12\" fill=\"#fff\"/><circle cx=\"12\" cy=\"14\" r=\"8.5\" fill=\"#fbbf24\"/><path d=\"M8 36l13-13 12 12 14-14 11 15z\" fill=\"#38bdf8\"/></svg>', \"linear-gradient(160deg,#86efac,#16a34a 52%,#14532d)\");
  },
  terminal() {
    return this.svg('<svg width=\"48\" height=\"48\" viewBox=\"0 0 48 48\"><rect x=\"1\" y=\"2\" width=\"46\" height=\"44\" rx=\"12\" fill=\"#0f172a\"/><path d=\"M10 14l12 12-12 12M24 38h20\" stroke=\"#4ade80\" stroke-width=\"3.8\" stroke-linecap=\"round\"/></svg>', \"linear-gradient(160deg,#1e293b,#020617)\");
  },
  mail() {
    return this.svg('<svg width=\"48\" height=\"48\" viewBox=\"0 0 48 48\"><rect x=\"1\" y=\"8\" width=\"46\" height=\"34\" rx=\"11\" fill=\"#fff\"/><path d=\"M1 12l23 17 23-17\" fill=\"none\" stroke=\"#3b82f6\" stroke-width=\"3.8\"/></svg>', \"linear-gradient(160deg,#93c5fd,#2563eb 52%,#1e3a8a)\");
  },
  maps() {
    return this.svg('<svg width=\"48\" height=\"48\" viewBox=\"0 0 48 48\"><path d=\"M24 2l22 14v26l-22-14-22 14V16z\" fill=\"#fff\"/><circle cx=\"24\" cy=\"18\" r=\"7.5\" fill=\"#ef4444\"/></svg>', \"linear-gradient(160deg,#4ade80,#15803d 52%,#14532d)\");
  },
  trash() {
    return this.svg('<svg width=\"48\" height=\"48\" viewBox=\"0 0 48 48\"><path d=\"M8 14h32l-4 28H12z\" fill=\"#fff\"/><path d=\"M12 8h24M10 14h28\" stroke=\"#64748b\" stroke-width=\"3.4\" stroke-linecap=\"round\"/></svg>', \"linear-gradient(160deg,#e2e8f0,#94a3b8)\");
  },
  reminders() {
    return this.svg('<svg width=\"48\" height=\"48\" viewBox=\"0 0 48 48\"><rect x=\"4\" y=\"3\" width=\"40\" height=\"42\" rx=\"12\" fill=\"#fff\"/><path d=\"M12 14h24M12 21h20M12 28h18\" stroke=\"#16a34a\" stroke-width=\"3.2\" stroke-linecap=\"round\"/><circle cx=\"40\" cy=\"10\" r=\"7.5\" fill=\"#22c55e\"/></svg>', \"linear-gradient(160deg,#bbf7d0,#16a34a 52%,#14532d)\");
  },
  weather() {
    return this.svg('<svg width=\"48\" height=\"48\" viewBox=\"0 0 48 48\"><circle cx=\"16\" cy=\"16\" r=\"13\" fill=\"#fbbf24\"/><path d=\"M10 36c0-8 7-12 12-12s12 4 12 12H10z\" fill=\"#e2e8f0\"/></svg>', \"linear-gradient(160deg,#fef08a,#f59e0b 52%,#b45309)\");
  },
  aura() {
    return this.svg('<svg width=\"48\" height=\"48\" viewBox=\"0 0 48 48\"><circle cx=\"24\" cy=\"24\" r=\"19\" fill=\"#fff\" opacity=\".97\"/><path d=\"M13 15c6-7 12-7 18 0M11 33c8 9 18 9 26 0\" stroke=\"#7c3aed\" stroke-width=\"3.2\" stroke-linecap=\"round\" fill=\"none\"/><circle cx=\"24\" cy=\"24\" r=\"5.5\" fill=\"#a78bfa\" opacity=\".92\"/></svg>', \"linear-gradient(165deg,#ede9fe 0%,#8b5cf6 48%,#6d28d9 100%)\");
  },
  launch() {
    return this.svg('<svg width=\"48\" height=\"48\" viewBox=\"0 0 48 48\"><rect x=\"6\" y=\"6\" width=\"16\" height=\"16\" rx=\"5\" fill=\"#fff\"/><rect x=\"26\" y=\"6\" width=\"16\" height=\"16\" rx=\"5\" fill=\"#fff\"/><rect x=\"6\" y=\"26\" width=\"16\" height=\"16\" rx=\"5\" fill=\"#fff\"/><rect x=\"26\" y=\"26\" width=\"16\" height=\"16\" rx=\"5\" fill=\"#fff\"/></svg>', \"linear-gradient(160deg,#e0e7ff,#6366f1 48%,#4338ca)\");
  },
  calendar() {
    return this.svg('<svg width=\"48\" height=\"48\" viewBox=\"0 0 48 48\"><rect x=\"3\" y=\"4\" width=\"42\" height=\"40\" rx=\"12\" fill=\"#fff\"/><rect x=\"3\" y=\"4\" width=\"42\" height=\"14\" rx=\"12\" fill=\"#ef4444\"/><text x=\"24\" y=\"15\" text-anchor=\"middle\" fill=\"#fff\" font-size=\"12\" font-weight=\"bold\">27</text><path d=\"M12 24h24M12 31h20\" stroke=\"#64748b\" stroke-width=\"2.4\"/></svg>', \"linear-gradient(160deg,#fecaca,#ef4444 48%,#b91c1c)\");
  },
  messages() {
    return this.svg('<svg width=\"48\" height=\"48\" viewBox=\"0 0 48 48\"><rect x=\"2\" y=\"6\" width=\"44\" height=\"36\" rx=\"14\" fill=\"#fff\"/><path d=\"M10 18h28M10 25h22\" stroke=\"#3b82f6\" stroke-width=\"3\" stroke-linecap=\"round\"/></svg>', \"linear-gradient(160deg,#bfdbfe,#3b82f6 52%,#1d4ed8)\");
  }
};
