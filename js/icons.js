/* Original high-detail SVG icons for Lumen Desktop entertainment mock.
   Layered glass-style approximations with specular depth — not official Apple artwork.
   Entertainment only. Not affiliated with Apple. */
const Icons = {
  svg(inner, bg) {
    return `<div class="icon glass-icon" style="background:${bg || 'linear-gradient(145deg,#64748b,#334155)'}; border-radius:22%; box-shadow:0 16px 36px rgba(0,0,0,.55), inset 0 2px 0 rgba(255,255,255,.85), inset 0 -3px 8px rgba(0,0,0,.3)">${inner}<span class="spec"></span><span class="highlight"></span></div>`;
  },
  finder() {
    return this.svg('<svg width="48" height="48" viewBox="0 0 48 48"><rect x="4" y="6" width="40" height="36" rx="10" fill="#fff" opacity=".97"/><path d="M12 16h24M12 22h20M12 28h16" stroke="#0284c7" stroke-width="2.4" stroke-linecap="round"/><circle cx="38" cy="12" r="4.5" fill="#0ea5e9"/><path d="M8 10h8v4H8z" fill="#e0f2fe" opacity=".6"/></svg>', "linear-gradient(160deg,#f0f9ff 0%,#0284c7 42%,#0369a1 100%)");
  },
  notes() {
    return this.svg('<svg width="48" height="48" viewBox="0 0 48 48"><rect x="6" y="4" width="36" height="40" rx="9" fill="#fff"/><path d="M15 15h18M15 21h18M15 27h14" stroke="#d97706" stroke-width="2.6" stroke-linecap="round"/><circle cx="37" cy="11" r="6" fill="#fbbf24"/></svg>', "linear-gradient(155deg,#fef3c7,#f59e0b 40%,#b45309)");
  },
  calc() {
    return this.svg('<svg width="48" height="48" viewBox="0 0 48 48"><rect x="5" y="3" width="38" height="42" rx="10" fill="#fff"/><rect x="9" y="7" width="30" height="11" rx="4" fill="#0f172a"/><g fill="#64748b"><circle cx="15" cy="25" r="3.2"/><circle cx="24" cy="25" r="3.2"/><circle cx="33" cy="25" r="3.2"/><circle cx="15" cy="33" r="3.2"/><circle cx="24" cy="33" r="3.2"/><circle cx="33" cy="33" r="3.2"/></g></svg>', "linear-gradient(155deg,#f8fafc,#94a3b8 35%,#334155)");
  },
  web() {
    return this.svg('<svg width="48" height="48" viewBox="0 0 48 48"><circle cx="24" cy="24" r="17" fill="none" stroke="#fff" stroke-width="3.2"/><path d="M24 7c7 8 7 26 0 34M7 24h34" stroke="#fff" stroke-width="2.6"/><circle cx="24" cy="24" r="5.5" fill="#fff" opacity=".45"/></svg>', "linear-gradient(155deg,#a5f3fc,#0891b2 45%,#0e7490)");
  },
  store() {
    return this.svg('<svg width="48" height="48" viewBox="0 0 48 48"><path d="M7 15l6-9h22l6 9v26H7z" fill="#fff"/><rect x="13" y="21" width="22" height="13" rx="3" fill="#0ea5e9"/></svg>', "linear-gradient(155deg,#ddd6fe,#7c3aed 40%,#5b21b6)");
  },
  settings() {
    return this.svg('<svg width="48" height="48" viewBox="0 0 48 48"><circle cx="24" cy="24" r="11" fill="#fff"/><path d="M24 7v5M24 36v5M7 24h5M36 24h5M11 11l4 4M33 33l4 4M11 37l4-4M33 15l4-4" stroke="#64748b" stroke-width="2.8" stroke-linecap="round"/></svg>', "linear-gradient(155deg,#e2e8f0,#64748b 40%,#334155)");
  },
  music() {
    return this.svg('<svg width="48" height="48" viewBox="0 0 48 48"><path d="M15 11v23a8 8 0 11-4-7V11l19-5v21a8 8 0 11-4-7V7z" fill="#fff"/></svg>', "linear-gradient(155deg,#fbcfe8,#db2777 45%,#9d174d)");
  },
  photos() {
    return this.svg('<svg width="48" height="48" viewBox="0 0 48 48"><rect x="4" y="6" width="40" height="36" rx="9" fill="#fff"/><circle cx="15" cy="17" r="6" fill="#fbbf24"/><path d="M11 33l10-10 9 9 11-11 8 12z" fill="#38bdf8"/></svg>', "linear-gradient(155deg,#86efac,#16a34a 45%,#14532d)");
  },
  terminal() {
    return this.svg('<svg width="48" height="48" viewBox="0 0 48 48"><rect x="4" y="5" width="40" height="38" rx="9" fill="#0f172a"/><path d="M13 17l9 9-9 9M25 35h14" stroke="#4ade80" stroke-width="3" stroke-linecap="round"/></svg>', "linear-gradient(155deg,#1e293b,#020617)");
  },
  mail() {
    return this.svg('<svg width="48" height="48" viewBox="0 0 48 48"><rect x="4" y="11" width="40" height="28" rx="8" fill="#fff"/><path d="M4 15l20 14 20-14" fill="none" stroke="#3b82f6" stroke-width="3"/></svg>', "linear-gradient(155deg,#93c5fd,#2563eb 45%,#1e3a8a)");
  },
  maps() {
    return this.svg('<svg width="48" height="48" viewBox="0 0 48 48"><path d="M24 5l19 11v23l-19-11-19 11V16z" fill="#fff"/><circle cx="24" cy="21" r="5" fill="#ef4444"/></svg>', "linear-gradient(155deg,#4ade80,#15803d 45%,#14532d)");
  },
  trash() {
    return this.svg('<svg width="48" height="48" viewBox="0 0 48 48"><path d="M11 15h26l-2 25H13z" fill="#fff"/><path d="M15 11h18M13 15h22" stroke="#64748b" stroke-width="2.8" stroke-linecap="round"/></svg>', "linear-gradient(155deg,#e2e8f0,#94a3b8)");
  },
  reminders() {
    return this.svg('<svg width="48" height="48" viewBox="0 0 48 48"><rect x="7" y="6" width="34" height="36" rx="9" fill="#fff"/><path d="M15 17h18M15 24h14M15 31h12" stroke="#16a34a" stroke-width="2.6" stroke-linecap="round"/><circle cx="37" cy="13" r="5.5" fill="#22c55e"/></svg>', "linear-gradient(155deg,#bbf7d0,#16a34a 45%,#14532d)");
  },
  weather() {
    return this.svg('<svg width="48" height="48" viewBox="0 0 48 48"><circle cx="19" cy="19" r="10" fill="#fbbf24"/><path d="M13 33c0-5 4-9 9-9s9 4 9 9H13z" fill="#e2e8f0"/></svg>', "linear-gradient(155deg,#fef08a,#f59e0b 45%,#b45309)");
  },
  aura() {
    return this.svg('<svg width="48" height="48" viewBox="0 0 48 48"><circle cx="24" cy="24" r="16" fill="#fff" opacity=".94"/><path d="M16 18c3-4 9-4 12 0M14 30c5 6 15 6 20 0" stroke="#7c3aed" stroke-width="2.6" stroke-linecap="round" fill="none"/><circle cx="24" cy="24" r="3" fill="#a78bfa" opacity=".8"/></svg>', "linear-gradient(160deg,#ede9fe 0%,#8b5cf6 40%,#6d28d9 100%)");
  },
  launch() {
    return this.svg('<svg width="48" height="48" viewBox="0 0 48 48"><rect x="9" y="9" width="13" height="13" rx="3.5" fill="#fff"/><rect x="26" y="9" width="13" height="13" rx="3.5" fill="#fff"/><rect x="9" y="26" width="13" height="13" rx="3.5" fill="#fff"/><rect x="26" y="26" width="13" height="13" rx="3.5" fill="#fff"/></svg>', "linear-gradient(155deg,#e0e7ff,#6366f1 40%,#4338ca)");
  }
};
