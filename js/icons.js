/* Original SVG icons for Lumen Desktop entertainment mock.
   Inspired by modern glass desktop aesthetics — not official Apple artwork.
   Entertainment only. Approximations only. */
const Icons = {
  svg(inner, bg) {
    return `<div class="icon" style="background:${bg || 'linear-gradient(#64748b,#334155)'}">${inner}</div>`;
  },
  finder() {
    return this.svg('<svg width="40" height="40" viewBox="0 0 40 40"><rect x="7" y="9" width="26" height="22" rx="4" fill="#fff"/><path d="M11 15h18M11 20h14M11 25h10" stroke="#0ea5e9" stroke-width="2" stroke-linecap="round"/></svg>', "linear-gradient(135deg,#38bdf8,#0369a1)");
  },
  notes() {
    return this.svg('<svg width="40" height="40" viewBox="0 0 40 40"><rect x="8" y="6" width="24" height="28" rx="5" fill="#fff"/><path d="M13 13h14M13 19h14M13 25h10" stroke="#f59e0b" stroke-width="2" stroke-linecap="round"/></svg>', "linear-gradient(135deg,#fef3c7,#f59e0b)");
  },
  calc() {
    return this.svg('<svg width="40" height="40" viewBox="0 0 40 40"><rect x="7" y="5" width="26" height="30" rx="6" fill="#fff"/><rect x="10" y="8" width="20" height="7" rx="2" fill="#1e293b"/><g fill="#64748b"><circle cx="14" cy="20" r="2.2"/><circle cx="20" cy="20" r="2.2"/><circle cx="26" cy="20" r="2.2"/><circle cx="14" cy="26" r="2.2"/><circle cx="20" cy="26" r="2.2"/><circle cx="26" cy="26" r="2.2"/></g></svg>', "linear-gradient(135deg,#cbd5e1,#475569)");
  },
  web() {
    return this.svg('<svg width="40" height="40" viewBox="0 0 40 40"><circle cx="20" cy="20" r="13" fill="none" stroke="#fff" stroke-width="2.4"/><path d="M20 7c4.5 5.5 4.5 18 0 26M7 20h26" stroke="#fff" stroke-width="1.8"/></svg>', "linear-gradient(135deg,#22d3ee,#0891b2)");
  },
  store() {
    return this.svg('<svg width="40" height="40" viewBox="0 0 40 40"><path d="M9 13l3.5-6h15l3.5 6v18H9z" fill="#fff"/><circle cx="20" cy="22" r="4.5" fill="#a855f7"/><path d="M15 13h10" stroke="#c084fc" stroke-width="1.6"/></svg>', "linear-gradient(135deg,#d8b4fe,#7c3aed)");
  },
  settings() {
    return this.svg('<svg width="40" height="40" viewBox="0 0 40 40"><circle cx="20" cy="20" r="6" fill="#fff"/><path d="M20 6v5M20 29v5M6 20h5M29 20h5M10.5 10.5l3.5 3.5M26 26l3.5 3.5M10.5 29.5l3.5-3.5M26 14l3.5-3.5" stroke="#fff" stroke-width="2.2" stroke-linecap="round"/></svg>', "linear-gradient(135deg,#d4d4d8,#52525b)");
  },
  aura() {
    return this.svg('<svg width="40" height="40" viewBox="0 0 40 40"><circle cx="20" cy="20" r="12" fill="none" stroke="#fff" stroke-width="2.4"/><circle cx="20" cy="20" r="6" fill="#fff"/><path d="M20 5v4M20 31v4M5 20h4M31 20h4" stroke="#fff" stroke-width="1.8" stroke-linecap="round"/></svg>', "linear-gradient(135deg,#a5b4fc,#4f46e5)");
  },
  launch() {
    return this.svg('<svg width="40" height="40" viewBox="0 0 40 40"><rect x="6" y="6" width="11" height="11" rx="3" fill="#fff"/><rect x="23" y="6" width="11" height="11" rx="3" fill="#e0e7ff"/><rect x="6" y="23" width="11" height="11" rx="3" fill="#e0e7ff"/><rect x="23" y="23" width="11" height="11" rx="3" fill="#fff"/></svg>', "linear-gradient(135deg,#a5b4fc,#6366f1)");
  },
  calendar() {
    return this.svg('<svg width="40" height="40" viewBox="0 0 40 40"><rect x="7" y="9" width="26" height="24" rx="5" fill="#fff"/><rect x="7" y="9" width="26" height="8" fill="#ef4444"/><text x="20" y="28" text-anchor="middle" fill="#1e293b" font-size="13" font-weight="700">12</text></svg>', "linear-gradient(135deg,#fca5a5,#dc2626)");
  },
  music() {
    return this.svg('<svg width="40" height="40" viewBox="0 0 40 40"><path d="M15 9v18a6 6 0 11-3-5.2V9l16-3v16a6 6 0 11-3-5.2V6z" fill="#fff"/></svg>', "linear-gradient(135deg,#f9a8d4,#db2777)");
  },
  photos() {
    return this.svg('<svg width="40" height="40" viewBox="0 0 40 40"><rect x="6" y="8" width="28" height="24" rx="5" fill="#fff"/><circle cx="14" cy="16" r="4" fill="#fbbf24"/><path d="M10 26l7-7 6 6 8-8 5 9z" fill="#38bdf8"/></svg>', "linear-gradient(135deg,#86efac,#16a34a)");
  },
  terminal() {
    return this.svg('<svg width="40" height="40" viewBox="0 0 40 40"><rect x="6" y="7" width="28" height="26" rx="5" fill="#0f172a"/><path d="M11 15l6 6-6 6M20 27h10" stroke="#4ade80" stroke-width="2" stroke-linecap="round"/></svg>', "linear-gradient(135deg,#1e293b,#020617)");
  },
  mail() {
    return this.svg('<svg width="40" height="40" viewBox="0 0 40 40"><rect x="6" y="10" width="28" height="20" rx="4" fill="#fff"/><path d="M6 13l14 9 14-9" fill="none" stroke="#3b82f6" stroke-width="2"/></svg>', "linear-gradient(135deg,#93c5fd,#2563eb)");
  },
  maps() {
    return this.svg('<svg width="40" height="40" viewBox="0 0 40 40"><path d="M20 7l13 8v18l-13-8-13 8V15z" fill="#fff"/><circle cx="20" cy="18" r="3" fill="#ef4444"/></svg>', "linear-gradient(135deg,#4ade80,#15803d)");
  },
  trash() {
    return this.svg('<svg width="40" height="40" viewBox="0 0 40 40"><path d="M10 13h20l-1.8 20H11.8z" fill="#fff"/><path d="M14 10h12M12 13h16" stroke="#64748b" stroke-width="2" stroke-linecap="round"/></svg>', "linear-gradient(135deg,#e2e8f0,#94a3b8)");
  }
};
Icons.settings = Icons.settings || function() { return Icons.svg('<circle cx="20" cy="20" r="10" fill="#fff"/>', '#64748b'); };
