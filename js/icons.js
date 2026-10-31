/* Enhanced original high-detail SVG icons for Lumen Desktop entertainment mock.
   Layered glass-style approximations with specular depth and refined colors — not official Apple artwork.
   Entertainment only. Not affiliated with Apple. Icons changed enough to be distinct. */
const Icons = {
  svg(inner, bg) {
    return `<div class="icon glass-icon" style="background:${bg || 'linear-gradient(145deg,#64748b,#334155)'}; border-radius:22%; box-shadow:0 20px 45px rgba(0,0,0,.55), inset 0 4px 0 rgba(255,255,255,.95), inset 0 -5px 12px rgba(0,0,0,.28), 0 0 0 1.2px rgba(255,255,255,.35)">${inner}<span class="spec"></span><span class="highlight"></span></div>`;
  },
  finder() {
    return this.svg('<svg width="48" height="48" viewBox="0 0 48 48"><rect x="2" y="4" width="44" height="40" rx="12" fill="#fff" opacity=".99"/><path d="M9 15h30M9 21h26M9 27h22" stroke="#0ea5e9" stroke-width="3" stroke-linecap="round"/><circle cx="40" cy="10" r="5.5" fill="#38bdf8"/><path d="M6 8h12v6H6z" fill="#e0f2fe" opacity=".8"/></svg>', "linear-gradient(160deg,#f0f9ff 0%,#0284c7 50%,#0369a1 100%)");
  },
  notes() {
    return this.svg('<svg width="48" height="48" viewBox="0 0 48 48"><rect x="4" y="2" width="40" height="44" rx="11" fill="#fff"/><path d="M13 13h22M13 19h22M13 25h18" stroke="#d97706" stroke-width="3" stroke-linecap="round"/><circle cx="39" cy="9" r="7" fill="#fbbf24"/><path d="M11 7h8v4h-8z" fill="#fef3c7"/></svg>', "linear-gradient(155deg,#fef3c7,#f59e0b 45%,#b45309)");
  },
  calc() {
    return this.svg('<svg width="48" height="48" viewBox="0 0 48 48"><rect x="3" y="1" width="42" height="46" rx="12" fill="#fff"/><rect x="7" y="5" width="34" height="13" rx="6" fill="#0f172a"/><g fill="#64748b"><circle cx="13" cy="25" r="3.8"/><circle cx="24" cy="25" r="3.8"/><circle cx="35" cy="25" r="3.8"/><circle cx="13" cy="34" r="3.8"/><circle cx="24" cy="34" r="3.8"/><circle cx="35" cy="34" r="3.8"/></g></svg>', "linear-gradient(155deg,#f8fafc,#94a3b8 40%,#334155)");
  },
  web() {
    return this.svg('<svg width="48" height="48" viewBox="0 0 48 48"><circle cx="24" cy="24" r="19" fill="none" stroke="#fff" stroke-width="3.8"/><path d="M24 5c9 10 9 28 0 38M5 24h38" stroke="#fff" stroke-width="3"/><circle cx="24" cy="24" r="7" fill="#fff" opacity=".55"/></svg>', "linear-gradient(155deg,#a5f3fc,#0891b2 50%,#0e7490)");
  },
  store() {
    return this.svg('<svg width="48" height="48" viewBox="0 0 48 48"><path d="M5 15l8-11h22l8 11v26H5z" fill="#fff"/><rect x="11" y="21" width="26" height="15" rx="5" fill="#0ea5e9"/><circle cx="17" cy="28.5" r="2.2" fill="#fff"/><circle cx="24" cy="28.5" r="2.2" fill="#fff"/><circle cx="31" cy="28.5" r="2.2" fill="#fff"/></svg>', "linear-gradient(155deg,#ddd6fe,#7c3aed 45%,#5b21b6)");
  },
  settings() {
    return this.svg('<svg width="48" height="48" viewBox="0 0 48 48"><circle cx="24" cy="24" r="13" fill="#fff"/><path d="M24 5v7M24 36v7M5 24h7M36 24h7M9 9l6 6M33 33l6 6M9 39l6-6M33 15l6-6" stroke="#64748b" stroke-width="3.2" stroke-linecap="round"/></svg>', "linear-gradient(155deg,#e2e8f0,#64748b 45%,#334155)");
  },
  music() {
    return this.svg('<svg width="48" height="48" viewBox="0 0 48 48"><path d="M13 11v25a10 10 0 11-6-9V11l21-7v23a10 10 0 11-6-9V5z" fill="#fff"/></svg>', "linear-gradient(155deg,#fbcfe8,#db2777 50%,#9d174d)");
  },
  photos() {
    return this.svg('<svg width="48" height="48" viewBox="0 0 48 48"><rect x="2" y="4" width="44" height="40" rx="11" fill="#fff"/><circle cx="13" cy="15" r="8" fill="#fbbf24"/><path d="M9 35l12-12 11 11 13-13 10 14z" fill="#38bdf8"/></svg>', "linear-gradient(155deg,#86efac,#16a34a 50%,#14532d)");
  },
  terminal() {
    return this.svg('<svg width="48" height="48" viewBox="0 0 48 48"><rect x="2" y="3" width="44" height="42" rx="11" fill="#0f172a"/><path d="M11 15l11 11-11 11M25 37h18" stroke="#4ade80" stroke-width="3.5" stroke-linecap="round"/></svg>', "linear-gradient(155deg,#1e293b,#020617)");
  },
  mail() {
    return this.svg('<svg width="48" height="48" viewBox="0 0 48 48"><rect x="2" y="9" width="44" height="32" rx="10" fill="#fff"/><path d="M2 13l22 16 22-16" fill="none" stroke="#3b82f6" stroke-width="3.5"/></svg>', "linear-gradient(155deg,#93c5fd,#2563eb 50%,#1e3a8a)");
  },
  maps() {
    return this.svg('<svg width="48" height="48" viewBox="0 0 48 48"><path d="M24 3l21 13v25l-21-13-21 13V16z" fill="#fff"/><circle cx="24" cy="19" r="7" fill="#ef4444"/></svg>', "linear-gradient(155deg,#4ade80,#15803d 50%,#14532d)");
  },
  trash() {
    return this.svg('<svg width="48" height="48" viewBox="0 0 48 48"><path d="M9 15h30l-3 27H12z" fill="#fff"/><path d="M13 9h22M11 15h26" stroke="#64748b" stroke-width="3.2" stroke-linecap="round"/></svg>', "linear-gradient(155deg,#e2e8f0,#94a3b8)");
  },
  reminders() {
    return this.svg('<svg width="48" height="48" viewBox="0 0 48 48"><rect x="5" y="4" width="38" height="40" rx="11" fill="#fff"/><path d="M13 15h22M13 22h18M13 29h16" stroke="#16a34a" stroke-width="3" stroke-linecap="round"/><circle cx="39" cy="11" r="7" fill="#22c55e"/></svg>', "linear-gradient(155deg,#bbf7d0,#16a34a 50%,#14532d)");
  },
  weather() {
    return this.svg('<svg width="48" height="48" viewBox="0 0 48 48"><circle cx="17" cy="17" r="12" fill="#fbbf24"/><path d="M11 35c0-7 6-11 11-11s11 4 11 11H11z" fill="#e2e8f0"/></svg>', "linear-gradient(155deg,#fef08a,#f59e0b 50%,#b45309)");
  },
  aura() {
    return this.svg('<svg width="48" height="48" viewBox="0 0 48 48"><circle cx="24" cy="24" r="18" fill="#fff" opacity=".96"/><path d="M14 16c5-6 11-6 16 0M12 32c7 8 17 8 24 0" stroke="#7c3aed" stroke-width="3" stroke-linecap="round" fill="none"/><circle cx="24" cy="24" r="5" fill="#a78bfa" opacity=".9"/></svg>', "linear-gradient(160deg,#ede9fe 0%,#8b5cf6 45%,#6d28d9 100%)");
  },
  launch() {
    return this.svg('<svg width="48" height="48" viewBox="0 0 48 48"><rect x="7" y="7" width="15" height="15" rx="4.5" fill="#fff"/><rect x="26" y="7" width="15" height="15" rx="4.5" fill="#fff"/><rect x="7" y="26" width="15" height="15" rx="4.5" fill="#fff"/><rect x="26" y="26" width="15" height="15" rx="4.5" fill="#fff"/></svg>', "linear-gradient(155deg,#e0e7ff,#6366f1 45%,#4338ca)");
  },
  calendar() {
    return this.svg('<svg width="48" height="48" viewBox="0 0 48 48"><rect x="4" y="5" width="40" height="38" rx="11" fill="#fff"/><rect x="4" y="5" width="40" height="13" rx="11" fill="#ef4444"/><text x="24" y="15" text-anchor="middle" fill="#fff" font-size="11" font-weight="bold">27</text><path d="M13 25h22M13 32h18" stroke="#64748b" stroke-width="2.2"/></svg>', "linear-gradient(155deg,#fecaca,#ef4444 45%,#b91c1c)");
  },
  messages() {
    return this.svg('<svg width="48" height="48" viewBox="0 0 48 48"><rect x="3" y="7" width="42" height="34" rx="13" fill="#fff"/><path d="M11 19h26M11 26h20" stroke="#3b82f6" stroke-width="2.8" stroke-linecap="round"/></svg>', "linear-gradient(155deg,#bfdbfe,#3b82f6 50%,#1d4ed8)");
  }
};
