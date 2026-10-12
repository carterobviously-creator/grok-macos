/* Original SVG icons for Lumen Desktop entertainment mock.
   Inspired by modern glass desktop aesthetics — not official Apple artwork.
   Entertainment only. Approximations only. */
const Icons = {
  svg(inner, bg) {
    return `<div class="icon" style="background:${bg || 'linear-gradient(#64748b,#334155)'}">${inner}</div>`;
  },
  finder() {
    return this.svg('<svg width="36" height="36" viewBox="0 0 36 36"><rect x="6" y="8" width="24" height="20" rx="3" fill="#fff"/><path d="M10 14h16M10 18h12M10 22h8" stroke="#0ea5e9" stroke-width="1.8" stroke-linecap="round"/></svg>', "linear-gradient(135deg,#38bdf8,#0369a1)");
  },
  notes() {
    return this.svg('<svg width="36" height="36" viewBox="0 0 36 36"><rect x="7" y="5" width="22" height="26" rx="4" fill="#fff"/><path d="M12 12h12M12 17h12M12 22h9" stroke="#f59e0b" stroke-width="1.8" stroke-linecap="round"/></svg>', "linear-gradient(135deg,#fef3c7,#f59e0b)");
  },
  calc() {
    return this.svg('<svg width="36" height="36" viewBox="0 0 36 36"><rect x="6" y="4" width="24" height="28" rx="5" fill="#fff"/><rect x="9" y="7" width="18" height="6" rx="2" fill="#1e293b"/><g fill="#64748b"><circle cx="12" cy="18" r="2"/><circle cx="18" cy="18" r="2"/><circle cx="24" cy="18" r="2"/><circle cx="12" cy="24" r="2"/><circle cx="18" cy="24" r="2"/><circle cx="24" cy="24" r="2"/></g></svg>', "linear-gradient(135deg,#cbd5e1,#475569)");
  },
  web() {
    return this.svg('<svg width="36" height="36" viewBox="0 0 36 36"><circle cx="18" cy="18" r="12" fill="none" stroke="#fff" stroke-width="2.2"/><path d="M18 6c4 5 4 17 0 24M6 18h24" stroke="#fff" stroke-width="1.6"/></svg>', "linear-gradient(135deg,#22d3ee,#0891b2)");
  },
  store() {
    return this.svg('<svg width="36" height="36" viewBox="0 0 36 36"><path d="M8 12l3-5h14l3 5v16H8z" fill="#fff"/><circle cx="18" cy="20" r="4" fill="#a855f7"/><path d="M14 12h8" stroke="#c084fc" stroke-width="1.5"/></svg>', "linear-gradient(135deg,#d8b4fe,#7c3aed)");
  },
  settings() {
    return this.svg('<svg width="36" height="36" viewBox="0 0 36 36"><circle cx="18" cy="18" r="5" fill="#fff"/><path d="M18 6v4M18 26v4M6 18h4M26 18h4M9.5 9.5l2.8 2.8M23.7 23.7l2.8 2.8M9.5 26.5l2.8-2.8M23.7 12.3l2.8-2.8" stroke="#fff" stroke-width="2" stroke-linecap="round"/></svg>', "linear-gradient(135deg,#d4d4d8,#52525b)");
  },
  aura() {
    return this.svg('<svg width="36" height="36" viewBox="0 0 36 36"><circle cx="18" cy="18" r="11" fill="none" stroke="#fff" stroke-width="2.2"/><circle cx="18" cy="18" r="5" fill="#fff"/><path d="M18 5v3M18 28v3M5 18h3M28 18h3" stroke="#fff" stroke-width="1.6" stroke-linecap="round"/></svg>', "linear-gradient(135deg,#a5b4fc,#4f46e5)");
  },
  launch() {
    return this.svg('<svg width="36" height="36" viewBox="0 0 36 36"><rect x="5" y="5" width="10" height="10" rx="2.5" fill="#fff"/><rect x="21" y="5" width="10" height="10" rx="2.5" fill="#e0e7ff"/><rect x="5" y="21" width="10" height="10" rx="2.5" fill="#e0e7ff"/><rect x="21" y="21" width="10" height="10" rx="2.5" fill="#fff"/></svg>', "linear-gradient(135deg,#a5b4fc,#6366f1)");
  },
  calendar() {
    return this.svg('<svg width="36" height="36" viewBox="0 0 36 36"><rect x="6" y="8" width="24" height="22" rx="4" fill="#fff"/><rect x="6" y="8" width="24" height="7" fill="#ef4444"/><text x="18" y="26" text-anchor="middle" fill="#1e293b" font-size="12" font-weight="700">12</text></svg>', "linear-gradient(135deg,#fca5a5,#dc2626)");
  },
  music() {
    return this.svg('<svg width="36" height="36" viewBox="0 0 36 36"><path d="M14 8v16a5 5 0 11-2.5-4.3V8l14-2.5v14a5 5 0 11-2.5-4.3V5.5z" fill="#fff"/></svg>', "linear-gradient(135deg,#f9a8d4,#db2777)");
  },
  photos() {
    return this.svg('<svg width="36" height="36" viewBox="0 0 36 36"><rect x="5" y="7" width="26" height="22" rx="4" fill="#fff"/><circle cx="13" cy="15" r="3.5" fill="#fbbf24"/><path d="M9 24l6-6 5 5 7-7 4 8z" fill="#38bdf8"/></svg>', "linear-gradient(135deg,#86efac,#16a34a)");
  },
  terminal() {
    return this.svg('<svg width="36" height="36" viewBox="0 0 36 36"><rect x="5" y="6" width="26" height="24" rx="4" fill="#0f172a"/><path d="M10 14l5 5-5 5M18 24h9" stroke="#4ade80" stroke-width="1.8" stroke-linecap="round"/></svg>', "linear-gradient(135deg,#1e293b,#020617)");
  },
  mail() {
    return this.svg('<svg width="36" height="36" viewBox="0 0 36 36"><rect x="5" y="9" width="26" height="18" rx="3" fill="#fff"/><path d="M5 12l13 8 13-8" fill="none" stroke="#3b82f6" stroke-width="1.8"/></svg>', "linear-gradient(135deg,#93c5fd,#2563eb)");
  },
  maps() {
    return this.svg('<svg width="36" height="36" viewBox="0 0 36 36"><path d="M18 6l12 7v16l-12-7-12 7V13z" fill="#fff"/><circle cx="18" cy="16" r="2.5" fill="#ef4444"/></svg>', "linear-gradient(135deg,#4ade80,#15803d)");
  },
  trash() {
    return this.svg('<svg width="36" height="36" viewBox="0 0 36 36"><path d="M9 12h18l-1.5 18H10.5z" fill="#fff"/><path d="M13 9h10M11 12h14" stroke="#64748b" stroke-width="1.8" stroke-linecap="round"/></svg>', "linear-gradient(135deg,#e2e8f0,#94a3b8)");
  }
};
Icons.settings = Icons.settings || function() { return Icons.svg('<circle cx="18" cy="18" r="9" fill="#fff"/>', '#64748b'); };
