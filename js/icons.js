/* Original high-detail SVG icons for Lumen Desktop entertainment mock.
   Layered glass-style approximations of modern desktop aesthetics only — not official Apple artwork.
   Entertainment only. Not affiliated with Apple. */
const Icons = {
  svg(inner, bg) {
    return `<div class="icon glass-icon" style="background:${bg || 'linear-gradient(145deg,#64748b,#334155)'}; border-radius:22%; box-shadow:0 8px 20px rgba(0,0,0,.4), inset 0 1px 0 rgba(255,255,255,.55), inset 0 -1px 0 rgba(0,0,0,.15)">${inner}<span class="spec"></span></div>`;
  },
  finder() {
    return this.svg('<svg width="44" height="44" viewBox="0 0 44 44"><rect x="7" y="9" width="30" height="26" rx="7" fill="#fff" opacity="0.95"/><path d="M13 17h18M13 23h14M13 29h10" stroke="#0ea5e9" stroke-width="2.4" stroke-linecap="round"/></svg>', "linear-gradient(160deg,#7dd3fc,#0284c7 60%,#0369a1)");
  },
  notes() {
    return this.svg('<svg width="44" height="44" viewBox="0 0 44 44"><rect x="8" y="6" width="28" height="32" rx="7" fill="#fff"/><path d="M15 15h14M15 21h14M15 27h10" stroke="#f59e0b" stroke-width="2.3" stroke-linecap="round"/><circle cx="33" cy="11" r="4.5" fill="#fbbf24"/></svg>', "linear-gradient(160deg,#fef9c3,#f59e0b 55%,#d97706)");
  },
  calc() {
    return this.svg('<svg width="44" height="44" viewBox="0 0 44 44"><rect x="7" y="5" width="30" height="34" rx="8" fill="#fff"/><rect x="11" y="9" width="22" height="8" rx="3" fill="#1e293b"/><g fill="#475569"><circle cx="15" cy="23" r="2.6"/><circle cx="22" cy="23" r="2.6"/><circle cx="29" cy="23" r="2.6"/><circle cx="15" cy="30" r="2.6"/><circle cx="22" cy="30" r="2.6"/><circle cx="29" cy="30" r="2.6"/></g></svg>', "linear-gradient(160deg,#f1f5f9,#94a3b8 50%,#64748b)");
  },
  web() {
    return this.svg('<svg width="44" height="44" viewBox="0 0 44 44"><circle cx="22" cy="22" r="15" fill="none" stroke="#fff" stroke-width="2.8"/><path d="M22 7c5.5 6.5 5.5 21 0 30M7 22h30" stroke="#fff" stroke-width="2.2"/></svg>', "linear-gradient(160deg,#67e8f9,#0891b2 60%,#0e7490)");
  },
  store() {
    return this.svg('<svg width="44" height="44" viewBox="0 0 44 44"><path d="M9 15l4-7h18l4 7v20H9z" fill="#fff"/><circle cx="22" cy="25" r="5.5" fill="#a855f7"/><path d="M15 15h14" stroke="#c084fc" stroke-width="2"/></svg>', "linear-gradient(160deg,#e9d5ff,#7c3aed 55%,#6d28d9)");
  },
  settings() {
    return this.svg('<svg width="44" height="44" viewBox="0 0 44 44"><circle cx="22" cy="22" r="7.5" fill="#fff"/><path d="M22 5v6.5M22 32.5v6.5M5 22h6.5M32.5 22h6.5M9.5 9.5l4.6 4.6M30 30l4.6 4.6M9.5 34.5l4.6-4.6M30 14l4.6-4.6" stroke="#fff" stroke-width="2.6" stroke-linecap="round"/></svg>', "linear-gradient(160deg,#e4e4e7,#52525b 50%,#3f3f46)");
  },
  aura() {
    return this.svg('<svg width="44" height="44" viewBox="0 0 44 44"><circle cx="22" cy="22" r="14" fill="none" stroke="#fff" stroke-width="2.8"/><circle cx="22" cy="22" r="7.5" fill="#fff"/><path d="M22 4v6M22 34v6M4 22h6M34 22h6" stroke="#fff" stroke-width="2.2" stroke-linecap="round"/></svg>', "linear-gradient(160deg,#c7d2fe,#4f46e5 55%,#4338ca)");
  },
  launch() {
    return this.svg('<svg width="44" height="44" viewBox="0 0 44 44"><rect x="6" y="6" width="13" height="13" rx="4" fill="#fff"/><rect x="25" y="6" width="13" height="13" rx="4" fill="#e0e7ff"/><rect x="6" y="25" width="13" height="13" rx="4" fill="#e0e7ff"/><rect x="25" y="25" width="13" height="13" rx="4" fill="#fff"/></svg>', "linear-gradient(160deg,#a5b4fc,#6366f1 50%,#4f46e5)");
  },
  calendar() {
    return this.svg('<svg width="44" height="44" viewBox="0 0 44 44"><rect x="7" y="9" width="30" height="26" rx="7" fill="#fff"/><rect x="7" y="9" width="30" height="10" fill="#ef4444"/><text x="22" y="31" text-anchor="middle" fill="#1e293b" font-size="15" font-weight="700">12</text></svg>', "linear-gradient(160deg,#fecaca,#dc2626 55%,#b91c1c)");
  },
  music() {
    return this.svg('<svg width="44" height="44" viewBox="0 0 44 44"><path d="M15 11v20a7 7 0 11-3.5-6V11l18-3.5v18a7 7 0 11-3.5-6V7z" fill="#fff"/></svg>', "linear-gradient(160deg,#f9a8d4,#db2777 55%,#be185d)");
  },
  photos() {
    return this.svg('<svg width="44" height="44" viewBox="0 0 44 44"><rect x="6" y="8" width="32" height="28" rx="7" fill="#fff"/><circle cx="16" cy="17" r="5.5" fill="#fbbf24"/><path d="M11 29l8-8 7 7 9-9 6 10z" fill="#38bdf8"/></svg>', "linear-gradient(160deg,#86efac,#16a34a 55%,#15803d)");
  },
  terminal() {
    return this.svg('<svg width="44" height="44" viewBox="0 0 44 44"><rect x="6" y="7" width="32" height="30" rx="7" fill="#0f172a"/><path d="M13 17l7 7-7 7M23 31h12" stroke="#4ade80" stroke-width="2.4" stroke-linecap="round"/></svg>', "linear-gradient(160deg,#1e293b,#020617)");
  },
  mail() {
    return this.svg('<svg width="44" height="44" viewBox="0 0 44 44"><rect x="6" y="12" width="32" height="22" rx="6" fill="#fff"/><path d="M6 15l16 11 16-11" fill="none" stroke="#3b82f6" stroke-width="2.4"/></svg>', "linear-gradient(160deg,#93c5fd,#2563eb 55%,#1d4ed8)");
  },
  maps() {
    return this.svg('<svg width="44" height="44" viewBox="0 0 44 44"><path d="M22 7l15 9v20l-15-9-15 9V16z" fill="#fff"/><circle cx="22" cy="20" r="3.8" fill="#ef4444"/></svg>', "linear-gradient(160deg,#4ade80,#15803d 55%,#166534)");
  },
  trash() {
    return this.svg('<svg width="44" height="44" viewBox="0 0 44 44"><path d="M11 15h22l-2 22H13z" fill="#fff"/><path d="M15 11h14M13 15h18" stroke="#64748b" stroke-width="2.4" stroke-linecap="round"/></svg>', "linear-gradient(160deg,#e2e8f0,#94a3b8)");
  },
  reminders() {
    return this.svg('<svg width="44" height="44" viewBox="0 0 44 44"><rect x="9" y="8" width="26" height="28" rx="7" fill="#fff"/><path d="M15 17h14M15 24h10M15 31h8" stroke="#22c55e" stroke-width="2.3" stroke-linecap="round"/><circle cx="33" cy="13" r="5.2" fill="#22c55e"/></svg>', "linear-gradient(160deg,#bbf7d0,#16a34a 55%,#15803d)");
  },
  weather() {
    return this.svg('<svg width="44" height="44" viewBox="0 0 44 44"><circle cx="19" cy="19" r="8.5" fill="#fbbf24"/><path d="M13 29c0-4.2 3.2-7.5 7.2-7.5s7.2 3.3 7.2 7.5H13z" fill="#e2e8f0"/></svg>', "linear-gradient(160deg,#fef08a,#f59e0b 55%,#d97706)");
  }
};
Icons.settings = Icons.settings || function() { return Icons.svg('<circle cx="22" cy="22" r="10" fill="#fff"/>', '#64748b'); };
