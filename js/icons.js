/* Original high-detail SVG icons for Lumen Desktop entertainment mock.
   Approximations of modern desktop aesthetics only — not official Apple artwork.
   Entertainment only. */
const Icons = {
  svg(inner, bg) {
    return `<div class="icon" style="background:${bg || 'linear-gradient(145deg,#64748b,#334155)'}; border-radius:14px; box-shadow:0 6px 16px rgba(0,0,0,.35), inset 0 1px 0 rgba(255,255,255,.35)">${inner}</div>`;
  },
  finder() {
    return this.svg('<svg width="42" height="42" viewBox="0 0 42 42"><rect x="6" y="8" width="30" height="26" rx="6" fill="#fff"/><path d="M12 16h18M12 22h14M12 28h10" stroke="#0ea5e9" stroke-width="2.2" stroke-linecap="round"/></svg>', "linear-gradient(145deg,#38bdf8,#0284c7)");
  },
  notes() {
    return this.svg('<svg width="42" height="42" viewBox="0 0 42 42"><rect x="7" y="5" width="28" height="32" rx="6" fill="#fff"/><path d="M14 14h14M14 20h14M14 26h10" stroke="#f59e0b" stroke-width="2.2" stroke-linecap="round"/><circle cx="32" cy="10" r="4" fill="#fbbf24"/></svg>', "linear-gradient(145deg,#fef9c3,#f59e0b)");
  },
  calc() {
    return this.svg('<svg width="42" height="42" viewBox="0 0 42 42"><rect x="6" y="4" width="30" height="34" rx="7" fill="#fff"/><rect x="10" y="8" width="22" height="8" rx="3" fill="#1e293b"/><g fill="#475569"><circle cx="14" cy="22" r="2.4"/><circle cx="21" cy="22" r="2.4"/><circle cx="28" cy="22" r="2.4"/><circle cx="14" cy="29" r="2.4"/><circle cx="21" cy="29" r="2.4"/><circle cx="28" cy="29" r="2.4"/></g></svg>', "linear-gradient(145deg,#e2e8f0,#64748b)");
  },
  web() {
    return this.svg('<svg width="42" height="42" viewBox="0 0 42 42"><circle cx="21" cy="21" r="14" fill="none" stroke="#fff" stroke-width="2.6"/><path d="M21 7c5 6 5 20 0 28M7 21h28" stroke="#fff" stroke-width="2"/></svg>', "linear-gradient(145deg,#22d3ee,#0891b2)");
  },
  store() {
    return this.svg('<svg width="42" height="42" viewBox="0 0 42 42"><path d="M8 14l4-7h18l4 7v20H8z" fill="#fff"/><circle cx="21" cy="24" r="5" fill="#a855f7"/><path d="M14 14h14" stroke="#c084fc" stroke-width="1.8"/></svg>', "linear-gradient(145deg,#e9d5ff,#7c3aed)");
  },
  settings() {
    return this.svg('<svg width="42" height="42" viewBox="0 0 42 42"><circle cx="21" cy="21" r="7" fill="#fff"/><path d="M21 5v6M21 31v6M5 21h6M31 21h6M9 9l4.2 4.2M28.8 28.8l4.2 4.2M9 33l4.2-4.2M28.8 13.2l4.2-4.2" stroke="#fff" stroke-width="2.4" stroke-linecap="round"/></svg>', "linear-gradient(145deg,#d4d4d8,#52525b)");
  },
  aura() {
    return this.svg('<svg width="42" height="42" viewBox="0 0 42 42"><circle cx="21" cy="21" r="13" fill="none" stroke="#fff" stroke-width="2.6"/><circle cx="21" cy="21" r="7" fill="#fff"/><path d="M21 4v5M21 33v5M4 21h5M33 21h5" stroke="#fff" stroke-width="2" stroke-linecap="round"/></svg>', "linear-gradient(145deg,#c7d2fe,#4f46e5)");
  },
  launch() {
    return this.svg('<svg width="42" height="42" viewBox="0 0 42 42"><rect x="5" y="5" width="13" height="13" rx="3.5" fill="#fff"/><rect x="24" y="5" width="13" height="13" rx="3.5" fill="#e0e7ff"/><rect x="5" y="24" width="13" height="13" rx="3.5" fill="#e0e7ff"/><rect x="24" y="24" width="13" height="13" rx="3.5" fill="#fff"/></svg>', "linear-gradient(145deg,#a5b4fc,#6366f1)");
  },
  calendar() {
    return this.svg('<svg width="42" height="42" viewBox="0 0 42 42"><rect x="6" y="8" width="30" height="26" rx="6" fill="#fff"/><rect x="6" y="8" width="30" height="9" fill="#ef4444"/><text x="21" y="30" text-anchor="middle" fill="#1e293b" font-size="14" font-weight="700">12</text></svg>', "linear-gradient(145deg,#fecaca,#dc2626)");
  },
  music() {
    return this.svg('<svg width="42" height="42" viewBox="0 0 42 42"><path d="M14 10v20a7 7 0 11-3.5-6V10l18-3.5v18a7 7 0 11-3.5-6V6.5z" fill="#fff"/></svg>', "linear-gradient(145deg,#f9a8d4,#db2777)");
  },
  photos() {
    return this.svg('<svg width="42" height="42" viewBox="0 0 42 42"><rect x="5" y="7" width="32" height="28" rx="6" fill="#fff"/><circle cx="15" cy="16" r="5" fill="#fbbf24"/><path d="M10 28l8-8 7 7 9-9 6 10z" fill="#38bdf8"/></svg>', "linear-gradient(145deg,#86efac,#16a34a)");
  },
  terminal() {
    return this.svg('<svg width="42" height="42" viewBox="0 0 42 42"><rect x="5" y="6" width="32" height="30" rx="6" fill="#0f172a"/><path d="M12 16l7 7-7 7M22 30h12" stroke="#4ade80" stroke-width="2.2" stroke-linecap="round"/></svg>', "linear-gradient(145deg,#1e293b,#020617)");
  },
  mail() {
    return this.svg('<svg width="42" height="42" viewBox="0 0 42 42"><rect x="5" y="11" width="32" height="22" rx="5" fill="#fff"/><path d="M5 14l16 11 16-11" fill="none" stroke="#3b82f6" stroke-width="2.2"/></svg>', "linear-gradient(145deg,#93c5fd,#2563eb)");
  },
  maps() {
    return this.svg('<svg width="42" height="42" viewBox="0 0 42 42"><path d="M21 6l15 9v20l-15-9-15 9V15z" fill="#fff"/><circle cx="21" cy="19" r="3.5" fill="#ef4444"/></svg>', "linear-gradient(145deg,#4ade80,#15803d)");
  },
  trash() {
    return this.svg('<svg width="42" height="42" viewBox="0 0 42 42"><path d="M10 14h22l-2 22H12z" fill="#fff"/><path d="M14 10h14M12 14h18" stroke="#64748b" stroke-width="2.2" stroke-linecap="round"/></svg>', "linear-gradient(145deg,#e2e8f0,#94a3b8)");
  },
  reminders() {
    return this.svg('<svg width="42" height="42" viewBox="0 0 42 42"><rect x="8" y="7" width="26" height="28" rx="6" fill="#fff"/><path d="M14 16h14M14 23h10M14 30h8" stroke="#22c55e" stroke-width="2.2" stroke-linecap="round"/><circle cx="32" cy="12" r="5" fill="#22c55e"/></svg>', "linear-gradient(145deg,#bbf7d0,#16a34a)");
  },
  weather() {
    return this.svg('<svg width="42" height="42" viewBox="0 0 42 42"><circle cx="18" cy="18" r="8" fill="#fbbf24"/><path d="M12 28c0-4 3-7 7-7s7 3 7 7H12z" fill="#e2e8f0"/></svg>', "linear-gradient(145deg,#fef08a,#f59e0b)");
  }
};
Icons.settings = Icons.settings || function() { return Icons.svg('<circle cx="21" cy="21" r="10" fill="#fff"/>', '#64748b'); };
