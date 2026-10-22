/* Original high-detail SVG icons for Lumen Desktop entertainment mock.
   Layered glass-style approximations only — not official Apple artwork.
   Entertainment only. Not affiliated with Apple. */
const Icons = {
  svg(inner, bg) {
    return `<div class="icon glass-icon" style="background:${bg || 'linear-gradient(145deg,#64748b,#334155)'}; border-radius:22%; box-shadow:0 12px 28px rgba(0,0,0,.5), inset 0 1px 0 rgba(255,255,255,.75), inset 0 -2px 6px rgba(0,0,0,.25)">${inner}<span class="spec"></span><span class="highlight"></span></div>`;
  },
  finder() {
    return this.svg('<svg width="48" height="48" viewBox="0 0 48 48"><rect x="6" y="8" width="36" height="32" rx="8" fill="#fff" opacity=".95"/><path d="M14 18h20M14 24h16M14 30h12" stroke="#0ea5e9" stroke-width="2.6" stroke-linecap="round"/><circle cx="36" cy="14" r="4.5" fill="#38bdf8"/></svg>', "linear-gradient(155deg,#e0f2fe,#0284c7 50%,#0369a1)");
  },
  notes() {
    return this.svg('<svg width="48" height="48" viewBox="0 0 48 48"><rect x="7" y="5" width="34" height="38" rx="8" fill="#fff"/><path d="M16 16h16M16 22h16M16 28h12" stroke="#d97706" stroke-width="2.5" stroke-linecap="round"/><circle cx="36" cy="12" r="5.5" fill="#fbbf24"/></svg>', "linear-gradient(155deg,#fef3c7,#f59e0b 45%,#b45309)");
  },
  calc() {
    return this.svg('<svg width="48" height="48" viewBox="0 0 48 48"><rect x="6" y="4" width="36" height="40" rx="9" fill="#fff"/><rect x="10" y="8" width="28" height="10" rx="3" fill="#0f172a"/><g fill="#64748b"><circle cx="16" cy="26" r="3"/><circle cx="24" cy="26" r="3"/><circle cx="32" cy="26" r="3"/><circle cx="16" cy="34" r="3"/><circle cx="24" cy="34" r="3"/><circle cx="32" cy="34" r="3"/></g></svg>', "linear-gradient(155deg,#f8fafc,#94a3b8 40%,#334155)");
  },
  web() {
    return this.svg('<svg width="48" height="48" viewBox="0 0 48 48"><circle cx="24" cy="24" r="16" fill="none" stroke="#fff" stroke-width="3"/><path d="M24 8c6 7 6 25 0 32M8 24h32" stroke="#fff" stroke-width="2.5"/><circle cx="24" cy="24" r="5" fill="#fff" opacity=".4"/></svg>', "linear-gradient(155deg,#a5f3fc,#0891b2 50%,#0e7490)");
  },
  store() {
    return this.svg('<svg width="48" height="48" viewBox="0 0 48 48"><path d="M8 16l5-8h22l5 8v24H8z" fill="#fff"/><rect x="14" y="22" width="20" height="12" rx="2" fill="#0ea5e9"/></svg>', "linear-gradient(155deg,#ddd6fe,#7c3aed 45%,#5b21b6)");
  },
  settings() {
    return this.svg('<svg width="48" height="48" viewBox="0 0 48 48"><circle cx="24" cy="24" r="10" fill="#fff"/><path d="M24 8v4M24 36v4M8 24h4M36 24h4M12 12l3 3M33 33l3 3M12 36l3-3M33 15l3-3" stroke="#64748b" stroke-width="2.5" stroke-linecap="round"/></svg>', "linear-gradient(155deg,#e2e8f0,#64748b 45%,#334155)");
  },
  music() {
    return this.svg('<svg width="48" height="48" viewBox="0 0 48 48"><path d="M16 12v22a7 7 0 11-3.5-6V12l18-4v20a7 7 0 11-3.5-6V8z" fill="#fff"/></svg>', "linear-gradient(155deg,#fbcfe8,#db2777 48%,#9d174d)");
  },
  photos() {
    return this.svg('<svg width="48" height="48" viewBox="0 0 48 48"><rect x="5" y="7" width="38" height="34" rx="8" fill="#fff"/><circle cx="16" cy="18" r="5.5" fill="#fbbf24"/><path d="M12 32l9-9 8 8 10-10 7 11z" fill="#38bdf8"/></svg>', "linear-gradient(155deg,#86efac,#16a34a 48%,#14532d)");
  },
  terminal() {
    return this.svg('<svg width="48" height="48" viewBox="0 0 48 48"><rect x="5" y="6" width="38" height="36" rx="8" fill="#0f172a"/><path d="M14 18l8 8-8 8M26 34h12" stroke="#4ade80" stroke-width="2.8" stroke-linecap="round"/></svg>', "linear-gradient(155deg,#1e293b,#020617)");
  },
  mail() {
    return this.svg('<svg width="48" height="48" viewBox="0 0 48 48"><rect x="5" y="12" width="38" height="26" rx="7" fill="#fff"/><path d="M5 16l19 13 19-13" fill="none" stroke="#3b82f6" stroke-width="2.8"/></svg>', "linear-gradient(155deg,#93c5fd,#2563eb 48%,#1e3a8a)");
  },
  maps() {
    return this.svg('<svg width="48" height="48" viewBox="0 0 48 48"><path d="M24 6l18 10v22l-18-10-18 10V16z" fill="#fff"/><circle cx="24" cy="22" r="4.5" fill="#ef4444"/></svg>', "linear-gradient(155deg,#4ade80,#15803d 48%,#14532d)");
  },
  trash() {
    return this.svg('<svg width="48" height="48" viewBox="0 0 48 48"><path d="M12 16h24l-2 24H14z" fill="#fff"/><path d="M16 12h16M14 16h20" stroke="#64748b" stroke-width="2.6" stroke-linecap="round"/></svg>', "linear-gradient(155deg,#e2e8f0,#94a3b8)");
  },
  reminders() {
    return this.svg('<svg width="48" height="48" viewBox="0 0 48 48"><rect x="8" y="7" width="32" height="34" rx="8" fill="#fff"/><path d="M16 18h16M16 25h12M16 32h10" stroke="#16a34a" stroke-width="2.5" stroke-linecap="round"/><circle cx="36" cy="14" r="5" fill="#22c55e"/></svg>', "linear-gradient(155deg,#bbf7d0,#16a34a 48%,#14532d)");
  },
  weather() {
    return this.svg('<svg width="48" height="48" viewBox="0 0 48 48"><circle cx="20" cy="20" r="9" fill="#fbbf24"/><path d="M14 32c0-4.5 3.5-8 8-8s8 3.5 8 8H14z" fill="#e2e8f0"/></svg>', "linear-gradient(155deg,#fef08a,#f59e0b 48%,#b45309)");
  },
  aura() {
    return this.svg('<svg width="48" height="48" viewBox="0 0 48 48"><circle cx="24" cy="24" r="14" fill="#fff" opacity=".9"/><path d="M18 20c2-3 6-3 8 0M16 28c4 4 12 4 16 0" stroke="#8b5cf6" stroke-width="2.5" stroke-linecap="round" fill="none"/></svg>', "linear-gradient(155deg,#ddd6fe,#8b5cf6 45%,#6d28d9)");
  },
  launch() {
    return this.svg('<svg width="48" height="48" viewBox="0 0 48 48"><rect x="10" y="10" width="12" height="12" rx="3" fill="#fff"/><rect x="26" y="10" width="12" height="12" rx="3" fill="#fff"/><rect x="10" y="26" width="12" height="12" rx="3" fill="#fff"/><rect x="26" y="26" width="12" height="12" rx="3" fill="#fff"/></svg>', "linear-gradient(155deg,#e0e7ff,#6366f1 45%,#4338ca)");
  }
};
