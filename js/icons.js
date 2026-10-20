/* Original high-detail SVG icons for Lumen Desktop entertainment mock.
   Layered glass-style approximations of modern desktop aesthetics only — not official Apple artwork.
   Entertainment only. Not affiliated with Apple. Refined for deeper depth, better gradients, and highlights. */
const Icons = {
  svg(inner, bg) {
    return `<div class="icon glass-icon" style="background:${bg || 'linear-gradient(145deg,#64748b,#334155)'}; border-radius:22%; box-shadow:0 14px 32px rgba(0,0,0,.55), inset 0 1.5px 0 rgba(255,255,255,.8), inset 0 -3px 8px rgba(0,0,0,.3), 0 0 0 1px rgba(255,255,255,.18)">${inner}<span class="spec"></span><span class="highlight"></span></div>`;
  },
  finder() {
    return this.svg('<svg width="48" height="48" viewBox="0 0 48 48"><rect x="5" y="7" width="38" height="34" rx="9" fill="#fff" opacity="0.97"/><path d="M13 17h22M13 23h18M13 29h14" stroke="#0284c7" stroke-width="3" stroke-linecap="round"/><circle cx="37" cy="13" r="5" fill="#0ea5e9"/><circle cx="37" cy="13" r="2.4" fill="#fff"/></svg>', "linear-gradient(160deg,#e0f2fe,#0284c7 45%,#0369a1)");
  },
  notes() {
    return this.svg('<svg width="48" height="48" viewBox="0 0 48 48"><rect x="6" y="4" width="36" height="40" rx="9" fill="#fff"/><path d="M15 15h18M15 21h18M15 27h14" stroke="#d97706" stroke-width="2.8" stroke-linecap="round"/><circle cx="37" cy="11" r="6" fill="#fbbf24"/><path d="M34 8l2.8 2.8 5.5-5.5" stroke="#fff" stroke-width="2.2" fill="none"/></svg>', "linear-gradient(160deg,#fef3c7,#f59e0b 42%,#b45309)");
  },
  calc() {
    return this.svg('<svg width="48" height="48" viewBox="0 0 48 48"><rect x="5" y="3" width="38" height="42" rx="10" fill="#fff"/><rect x="9" y="7" width="30" height="11" rx="4" fill="#0f172a"/><g fill="#64748b"><circle cx="15.5" cy="25.5" r="3.4"/><circle cx="24" cy="25.5" r="3.4"/><circle cx="32.5" cy="25.5" r="3.4"/><circle cx="15.5" cy="34" r="3.4"/><circle cx="24" cy="34" r="3.4"/><circle cx="32.5" cy="34" r="3.4"/></g></svg>', "linear-gradient(160deg,#f1f5f9,#94a3b8 40%,#334155)");
  },
  web() {
    return this.svg('<svg width="48" height="48" viewBox="0 0 48 48"><circle cx="24" cy="24" r="17" fill="none" stroke="#fff" stroke-width="3.4"/><path d="M24 7c7 8 7 26 0 34M7 24h34" stroke="#fff" stroke-width="2.8"/><circle cx="24" cy="24" r="6" fill="#fff" opacity="0.35"/></svg>', "linear-gradient(160deg,#a5f3fc,#0891b2 50%,#0e7490)");
  },
  store() {
    return this.svg('<svg width="48" height="48" viewBox="0 0 48 48"><path d="M7 15l6-9h22l6 9v26H7z" fill="#fff"/><circle cx="24" cy="29" r="7" fill="#7c3aed"/><path d="M15 15h18" stroke="#c4b5fd" stroke-width="2.6"/><path d="M19 26l4 4 7-7" stroke="#fff" stroke-width="2.4" fill="none"/></svg>', "linear-gradient(160deg,#ede9fe,#7c3aed 48%,#5b21b6)");
  },
  settings() {
    return this.svg('<svg width="48" height="48" viewBox="0 0 48 48"><circle cx="24" cy="24" r="10" fill="#fff"/><path d="M24 3v9M24 36v9M3 24h9M36 24h9M9 9l7 7M32 32l7 7M9 39l7-7M32 16l7-7" stroke="#fff" stroke-width="3.2" stroke-linecap="round"/></svg>', "linear-gradient(160deg,#e4e4e7,#52525b 42%,#18181b)");
  },
  aura() {
    return this.svg('<svg width="48" height="48" viewBox="0 0 48 48"><circle cx="24" cy="24" r="16" fill="none" stroke="#fff" stroke-width="3.4"/><circle cx="24" cy="24" r="9" fill="#fff"/><path d="M24 2v8M24 38v8M2 24h8M38 24h8" stroke="#fff" stroke-width="2.8" stroke-linecap="round"/><circle cx="24" cy="24" r="4.5" fill="#818cf8"/></svg>', "linear-gradient(160deg,#c7d2fe,#4f46e5 48%,#312e81)");
  },
  launch() {
    return this.svg('<svg width="48" height="48" viewBox="0 0 48 48"><rect x="4" y="4" width="16" height="16" rx="5.5" fill="#fff"/><rect x="28" y="4" width="16" height="16" rx="5.5" fill="#e0e7ff"/><rect x="4" y="28" width="16" height="16" rx="5.5" fill="#e0e7ff"/><rect x="28" y="28" width="16" height="16" rx="5.5" fill="#fff"/></svg>', "linear-gradient(160deg,#a5b4fc,#6366f1 42%,#3730a3)");
  },
  calendar() {
    return this.svg('<svg width="48" height="48" viewBox="0 0 48 48"><rect x="5" y="7" width="38" height="34" rx="9" fill="#fff"/><rect x="5" y="7" width="38" height="13" fill="#ef4444"/><text x="24" y="35" text-anchor="middle" fill="#1e293b" font-size="17" font-weight="700">12</text></svg>', "linear-gradient(160deg,#fecaca,#dc2626 48%,#991b1b)");
  },
  music() {
    return this.svg('<svg width="48" height="48" viewBox="0 0 48 48"><path d="M15 11v23a8.5 8.5 0 11-4.5-7.5V11l21-4.5v21a8.5 8.5 0 11-4.5-7.5V7z" fill="#fff"/></svg>', "linear-gradient(160deg,#fbcfe8,#db2777 48%,#9d174d)");
  },
  photos() {
    return this.svg('<svg width="48" height="48" viewBox="0 0 48 48"><rect x="4" y="6" width="40" height="36" rx="9" fill="#fff"/><circle cx="16" cy="17" r="6.5" fill="#fbbf24"/><path d="M11 33l10-10 9 9 11-11 8 12z" fill="#38bdf8"/></svg>', "linear-gradient(160deg,#86efac,#16a34a 48%,#14532d)");
  },
  terminal() {
    return this.svg('<svg width="48" height="48" viewBox="0 0 48 48"><rect x="4" y="5" width="40" height="38" rx="9" fill="#0f172a"/><path d="M13 17l9 9-9 9M27 35h15" stroke="#4ade80" stroke-width="3" stroke-linecap="round"/></svg>', "linear-gradient(160deg,#1e293b,#020617)");
  },
  mail() {
    return this.svg('<svg width="48" height="48" viewBox="0 0 48 48"><rect x="4" y="11" width="40" height="28" rx="8" fill="#fff"/><path d="M4 15l20 14 20-14" fill="none" stroke="#3b82f6" stroke-width="3"/></svg>', "linear-gradient(160deg,#93c5fd,#2563eb 48%,#1e3a8a)");
  },
  maps() {
    return this.svg('<svg width="48" height="48" viewBox="0 0 48 48"><path d="M24 5l19 11v23l-19-11-19 11V16z" fill="#fff"/><circle cx="24" cy="21" r="5" fill="#ef4444"/></svg>', "linear-gradient(160deg,#4ade80,#15803d 48%,#14532d)");
  },
  trash() {
    return this.svg('<svg width="48" height="48" viewBox="0 0 48 48"><path d="M11 15h26l-3 26H14z" fill="#fff"/><path d="M15 11h18M13 15h22" stroke="#64748b" stroke-width="3" stroke-linecap="round"/></svg>', "linear-gradient(160deg,#e2e8f0,#94a3b8)");
  },
  reminders() {
    return this.svg('<svg width="48" height="48" viewBox="0 0 48 48"><rect x="7" y="6" width="34" height="36" rx="9" fill="#fff"/><path d="M15 17h18M15 25h14M15 33h12" stroke="#16a34a" stroke-width="2.8" stroke-linecap="round"/><circle cx="37" cy="13" r="6" fill="#22c55e"/></svg>', "linear-gradient(160deg,#bbf7d0,#16a34a 48%,#14532d)");
  },
  weather() {
    return this.svg('<svg width="48" height="48" viewBox="0 0 48 48"><circle cx="19" cy="19" r="10" fill="#fbbf24"/><path d="M13 33c0-5 4-9 9-9s9 4 9 9H13z" fill="#e2e8f0"/></svg>', "linear-gradient(160deg,#fef08a,#f59e0b 48%,#b45309)");
  }
};
Icons.settings = Icons.settings || function() { return Icons.svg('<circle cx="24" cy="24" r="12" fill="#fff"/>', '#64748b'); };
