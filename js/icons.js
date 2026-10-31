/* Enhanced original high-detail SVG icons for Lumen Desktop entertainment mock.
   Layered glass-style approximations with specular depth and refined colors — not official Apple artwork.
   Entertainment only. Not affiliated with Apple. Icons changed enough to be distinct. */
const Icons = {
  svg(inner, bg) {
    return `<div class="icon glass-icon" style="background:${bg || 'linear-gradient(145deg,#64748b,#334155)'}; border-radius:22%; box-shadow:0 18px 40px rgba(0,0,0,.5), inset 0 3px 0 rgba(255,255,255,.9), inset 0 -4px 10px rgba(0,0,0,.25), 0 0 0 1px rgba(255,255,255,.3)">${inner}<span class="spec"></span><span class="highlight"></span></div>`;
  },
  finder() {
    return this.svg('<svg width="48" height="48" viewBox="0 0 48 48"><rect x="3" y="5" width="42" height="38" rx="11" fill="#fff" opacity=".98"/><path d="M10 16h28M10 22h24M10 28h20" stroke="#0ea5e9" stroke-width="2.8" stroke-linecap="round"/><circle cx="39" cy="11" r="5" fill="#38bdf8"/><path d="M7 9h10v5H7z" fill="#e0f2fe" opacity=".7"/></svg>', "linear-gradient(160deg,#f0f9ff 0%,#0284c7 50%,#0369a1 100%)");
  },
  notes() {
    return this.svg('<svg width="48" height="48" viewBox="0 0 48 48"><rect x="5" y="3" width="38" height="42" rx="10" fill="#fff"/><path d="M14 14h20M14 20h20M14 26h16" stroke="#d97706" stroke-width="2.8" stroke-linecap="round"/><circle cx="38" cy="10" r="6.5" fill="#fbbf24"/><path d="M12 8h6v3h-6z" fill="#fef3c7"/></svg>', "linear-gradient(155deg,#fef3c7,#f59e0b 45%,#b45309)");
  },
  calc() {
    return this.svg('<svg width="48" height="48" viewBox="0 0 48 48"><rect x="4" y="2" width="40" height="44" rx="11" fill="#fff"/><rect x="8" y="6" width="32" height="12" rx="5" fill="#0f172a"/><g fill="#64748b"><circle cx="14" cy="26" r="3.5"/><circle cx="24" cy="26" r="3.5"/><circle cx="34" cy="26" r="3.5"/><circle cx="14" cy="34" r="3.5"/><circle cx="24" cy="34" r="3.5"/><circle cx="34" cy="34" r="3.5"/></g></svg>', "linear-gradient(155deg,#f8fafc,#94a3b8 40%,#334155)");
  },
  web() {
    return this.svg('<svg width="48" height="48" viewBox="0 0 48 48"><circle cx="24" cy="24" r="18" fill="none" stroke="#fff" stroke-width="3.5"/><path d="M24 6c8 9 8 27 0 36M6 24h36" stroke="#fff" stroke-width="2.8"/><circle cx="24" cy="24" r="6" fill="#fff" opacity=".5"/></svg>', "linear-gradient(155deg,#a5f3fc,#0891b2 50%,#0e7490)");
  },
  store() {
    return this.svg('<svg width="48" height="48" viewBox="0 0 48 48"><path d="M6 16l7-10h22l7 10v25H6z" fill="#fff"/><rect x="12" y="22" width="24" height="14" rx="4" fill="#0ea5e9"/><circle cx="18" cy="29" r="2" fill="#fff"/><circle cx="24" cy="29" r="2" fill="#fff"/><circle cx="30" cy="29" r="2" fill="#fff"/></svg>', "linear-gradient(155deg,#ddd6fe,#7c3aed 45%,#5b21b6)");
  },
  settings() {
    return this.svg('<svg width="48" height="48" viewBox="0 0 48 48"><circle cx="24" cy="24" r="12" fill="#fff"/><path d="M24 6v6M24 36v6M6 24h6M36 24h6M10 10l5 5M33 33l5 5M10 38l5-5M33 15l5-5" stroke="#64748b" stroke-width="3" stroke-linecap="round"/></svg>', "linear-gradient(155deg,#e2e8f0,#64748b 45%,#334155)");
  },
  music() {
    return this.svg('<svg width="48" height="48" viewBox="0 0 48 48"><path d="M14 12v24a9 9 0 11-5-8V12l20-6v22a9 9 0 11-5-8V6z" fill="#fff"/></svg>', "linear-gradient(155deg,#fbcfe8,#db2777 50%,#9d174d)");
  },
  photos() {
    return this.svg('<svg width="48" height="48" viewBox="0 0 48 48"><rect x="3" y="5" width="42" height="38" rx="10" fill="#fff"/><circle cx="14" cy="16" r="7" fill="#fbbf24"/><path d="M10 34l11-11 10 10 12-12 9 13z" fill="#38bdf8"/></svg>', "linear-gradient(155deg,#86efac,#16a34a 50%,#14532d)");
  },
  terminal() {
    return this.svg('<svg width="48" height="48" viewBox="0 0 48 48"><rect x="3" y="4" width="42" height="40" rx="10" fill="#0f172a"/><path d="M12 16l10 10-10 10M26 36h16" stroke="#4ade80" stroke-width="3.2" stroke-linecap="round"/></svg>', "linear-gradient(155deg,#1e293b,#020617)");
  },
  mail() {
    return this.svg('<svg width="48" height="48" viewBox="0 0 48 48"><rect x="3" y="10" width="42" height="30" rx="9" fill="#fff"/><path d="M3 14l21 15 21-15" fill="none" stroke="#3b82f6" stroke-width="3.2"/></svg>', "linear-gradient(155deg,#93c5fd,#2563eb 50%,#1e3a8a)");
  },
  maps() {
    return this.svg('<svg width="48" height="48" viewBox="0 0 48 48"><path d="M24 4l20 12v24l-20-12-20 12V16z" fill="#fff"/><circle cx="24" cy="20" r="6" fill="#ef4444"/></svg>', "linear-gradient(155deg,#4ade80,#15803d 50%,#14532d)");
  },
  trash() {
    return this.svg('<svg width="48" height="48" viewBox="0 0 48 48"><path d="M10 16h28l-3 26H13z" fill="#fff"/><path d="M14 10h20M12 16h24" stroke="#64748b" stroke-width="3" stroke-linecap="round"/></svg>', "linear-gradient(155deg,#e2e8f0,#94a3b8)");
  },
  reminders() {
    return this.svg('<svg width="48" height="48" viewBox="0 0 48 48"><rect x="6" y="5" width="36" height="38" rx="10" fill="#fff"/><path d="M14 16h20M14 23h16M14 30h14" stroke="#16a34a" stroke-width="2.8" stroke-linecap="round"/><circle cx="38" cy="12" r="6" fill="#22c55e"/></svg>', "linear-gradient(155deg,#bbf7d0,#16a34a 50%,#14532d)");
  },
  weather() {
    return this.svg('<svg width="48" height="48" viewBox="0 0 48 48"><circle cx="18" cy="18" r="11" fill="#fbbf24"/><path d="M12 34c0-6 5-10 10-10s10 4 10 10H12z" fill="#e2e8f0"/></svg>', "linear-gradient(155deg,#fef08a,#f59e0b 50%,#b45309)");
  },
  aura() {
    return this.svg('<svg width="48" height="48" viewBox="0 0 48 48"><circle cx="24" cy="24" r="17" fill="#fff" opacity=".95"/><path d="M15 17c4-5 10-5 14 0M13 31c6 7 16 7 22 0" stroke="#7c3aed" stroke-width="2.8" stroke-linecap="round" fill="none"/><circle cx="24" cy="24" r="4" fill="#a78bfa" opacity=".85"/></svg>', "linear-gradient(160deg,#ede9fe 0%,#8b5cf6 45%,#6d28d9 100%)");
  },
  launch() {
    return this.svg('<svg width="48" height="48" viewBox="0 0 48 48"><rect x="8" y="8" width="14" height="14" rx="4" fill="#fff"/><rect x="26" y="8" width="14" height="14" rx="4" fill="#fff"/><rect x="8" y="26" width="14" height="14" rx="4" fill="#fff"/><rect x="26" y="26" width="14" height="14" rx="4" fill="#fff"/></svg>', "linear-gradient(155deg,#e0e7ff,#6366f1 45%,#4338ca)");
  },
  calendar() {
    return this.svg('<svg width="48" height="48" viewBox="0 0 48 48"><rect x="5" y="6" width="38" height="36" rx="10" fill="#fff"/><rect x="5" y="6" width="38" height="12" rx="10" fill="#ef4444"/><text x="24" y="16" text-anchor="middle" fill="#fff" font-size="10" font-weight="bold">27</text><path d="M14 26h20M14 32h16" stroke="#64748b" stroke-width="2"/></svg>', "linear-gradient(155deg,#fecaca,#ef4444 45%,#b91c1c)");
  },
  messages() {
    return this.svg('<svg width="48" height="48" viewBox="0 0 48 48"><rect x="4" y="8" width="40" height="32" rx="12" fill="#fff"/><path d="M12 20h24M12 26h18" stroke="#3b82f6" stroke-width="2.5" stroke-linecap="round"/></svg>', "linear-gradient(155deg,#bfdbfe,#3b82f6 50%,#1d4ed8)");
  }
};
