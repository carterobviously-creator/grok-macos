/* Original high-detail SVG icons for Lumen Desktop entertainment mock.
   Layered glass-style approximations of modern desktop aesthetics only — not official Apple artwork.
   Entertainment only. Not affiliated with Apple. Refined for better depth and highlights. */
const Icons = {
  svg(inner, bg) {
    return `<div class="icon glass-icon" style="background:${bg || 'linear-gradient(145deg,#64748b,#334155)'}; border-radius:22%; box-shadow:0 12px 28px rgba(0,0,0,.5), inset 0 1px 0 rgba(255,255,255,.75), inset 0 -2px 6px rgba(0,0,0,.25), 0 0 0 1px rgba(255,255,255,.12)">${inner}<span class="spec"></span><span class="highlight"></span></div>`;
  },
  finder() {
    return this.svg('<svg width="48" height="48" viewBox="0 0 48 48"><rect x="6" y="8" width="36" height="32" rx="8" fill="#fff" opacity="0.98"/><path d="M14 18h20M14 24h16M14 30h12" stroke="#0ea5e9" stroke-width="2.8" stroke-linecap="round"/><circle cx="36" cy="14" r="4.5" fill="#38bdf8"/><circle cx="36" cy="14" r="2.2" fill="#fff" opacity="0.8"/></svg>', "linear-gradient(155deg,#bae6fd,#0284c7 50%,#075985)");
  },
  notes() {
    return this.svg('<svg width="48" height="48" viewBox="0 0 48 48"><rect x="7" y="5" width="34" height="38" rx="8" fill="#fff"/><path d="M16 16h16M16 22h16M16 28h12" stroke="#f59e0b" stroke-width="2.6" stroke-linecap="round"/><circle cx="36" cy="12" r="5.5" fill="#fbbf24"/><path d="M33 9l2.5 2.5 5-5" stroke="#fff" stroke-width="2" fill="none"/></svg>', "linear-gradient(155deg,#fef9c3,#f59e0b 48%,#b45309)");
  },
  calc() {
    return this.svg('<svg width="48" height="48" viewBox="0 0 48 48"><rect x="6" y="4" width="36" height="40" rx="9" fill="#fff"/><rect x="10" y="8" width="28" height="10" rx="4" fill="#1e293b"/><g fill="#64748b"><circle cx="16" cy="26" r="3.2"/><circle cx="24" cy="26" r="3.2"/><circle cx="32" cy="26" r="3.2"/><circle cx="16" cy="34" r="3.2"/><circle cx="24" cy="34" r="3.2"/><circle cx="32" cy="34" r="3.2"/></g></svg>', "linear-gradient(155deg,#f8fafc,#94a3b8 45%,#475569)");
  },
  web() {
    return this.svg('<svg width="48" height="48" viewBox="0 0 48 48"><circle cx="24" cy="24" r="16" fill="none" stroke="#fff" stroke-width="3.2"/><path d="M24 8c6 7 6 22 0 32M8 24h32" stroke="#fff" stroke-width="2.6"/><circle cx="24" cy="24" r="5.5" fill="#fff" opacity="0.3"/></svg>', "linear-gradient(155deg,#a5f3fc,#0891b2 55%,#155e75)");
  },
  store() {
    return this.svg('<svg width="48" height="48" viewBox="0 0 48 48"><path d="M8 16l5-8h22l5 8v24H8z" fill="#fff"/><circle cx="24" cy="28" r="6.5" fill="#a855f7"/><path d="M16 16h16" stroke="#c084fc" stroke-width="2.4"/><path d="M20 25l3.5 3.5 6-6" stroke="#fff" stroke-width="2.2" fill="none"/></svg>', "linear-gradient(155deg,#f3e8ff,#7c3aed 50%,#5b21b6)");
  },
  settings() {
    return this.svg('<svg width="48" height="48" viewBox="0 0 48 48"><circle cx="24" cy="24" r="9" fill="#fff"/><path d="M24 4v8M24 36v8M4 24h8M36 24h8M10 10l6 6M32 32l6 6M10 38l6-6M32 16l6-6" stroke="#fff" stroke-width="3" stroke-linecap="round"/></svg>', "linear-gradient(155deg,#e4e4e7,#52525b 45%,#27272a)");
  },
  aura() {
    return this.svg('<svg width="48" height="48" viewBox="0 0 48 48"><circle cx="24" cy="24" r="15.5" fill="none" stroke="#fff" stroke-width="3.2"/><circle cx="24" cy="24" r="8.5" fill="#fff"/><path d="M24 3v7M24 38v7M3 24h7M38 24h7" stroke="#fff" stroke-width="2.6" stroke-linecap="round"/><circle cx="24" cy="24" r="4" fill="#a78bfa"/></svg>', "linear-gradient(155deg,#c7d2fe,#4f46e5 50%,#3730a3)");
  },
  launch() {
    return this.svg('<svg width="48" height="48" viewBox="0 0 48 48"><rect x="5" y="5" width="15" height="15" rx="5" fill="#fff"/><rect x="28" y="5" width="15" height="15" rx="5" fill="#e0e7ff"/><rect x="5" y="28" width="15" height="15" rx="5" fill="#e0e7ff"/><rect x="28" y="28" width="15" height="15" rx="5" fill="#fff"/></svg>', "linear-gradient(155deg,#a5b4fc,#6366f1 45%,#4338ca)");
  },
  calendar() {
    return this.svg('<svg width="48" height="48" viewBox="0 0 48 48"><rect x="6" y="8" width="36" height="32" rx="8" fill="#fff"/><rect x="6" y="8" width="36" height="12" fill="#ef4444"/><text x="24" y="34" text-anchor="middle" fill="#1e293b" font-size="16" font-weight="700">12</text></svg>', "linear-gradient(155deg,#fecaca,#dc2626 50%,#991b1b)");
  },
  music() {
    return this.svg('<svg width="48" height="48" viewBox="0 0 48 48"><path d="M16 12v22a8 8 0 11-4-7V12l20-4v20a8 8 0 11-4-7V8z" fill="#fff"/></svg>', "linear-gradient(155deg,#f9a8d4,#db2777 50%,#9d174d)");
  },
  photos() {
    return this.svg('<svg width="48" height="48" viewBox="0 0 48 48"><rect x="5" y="7" width="38" height="34" rx="8" fill="#fff"/><circle cx="17" cy="18" r="6" fill="#fbbf24"/><path d="M12 32l9-9 8 8 10-10 7 11z" fill="#38bdf8"/></svg>', "linear-gradient(155deg,#86efac,#16a34a 50%,#14532d)");
  },
  terminal() {
    return this.svg('<svg width="48" height="48" viewBox="0 0 48 48"><rect x="5" y="6" width="38" height="36" rx="8" fill="#0f172a"/><path d="M14 18l8 8-8 8M26 34h14" stroke="#4ade80" stroke-width="2.8" stroke-linecap="round"/></svg>', "linear-gradient(155deg,#1e293b,#020617)");
  },
  mail() {
    return this.svg('<svg width="48" height="48" viewBox="0 0 48 48"><rect x="5" y="12" width="38" height="26" rx="7" fill="#fff"/><path d="M5 16l19 13 19-13" fill="none" stroke="#3b82f6" stroke-width="2.8"/></svg>', "linear-gradient(155deg,#93c5fd,#2563eb 50%,#1e40af)");
  },
  maps() {
    return this.svg('<svg width="48" height="48" viewBox="0 0 48 48"><path d="M24 6l18 10v22l-18-10-18 10V16z" fill="#fff"/><circle cx="24" cy="22" r="4.5" fill="#ef4444"/></svg>', "linear-gradient(155deg,#4ade80,#15803d 50%,#14532d)");
  },
  trash() {
    return this.svg('<svg width="48" height="48" viewBox="0 0 48 48"><path d="M12 16h24l-2.5 24H14.5z" fill="#fff"/><path d="M16 12h16M14 16h20" stroke="#64748b" stroke-width="2.8" stroke-linecap="round"/></svg>', "linear-gradient(155deg,#e2e8f0,#94a3b8)");
  },
  reminders() {
    return this.svg('<svg width="48" height="48" viewBox="0 0 48 48"><rect x="8" y="7" width="32" height="34" rx="8" fill="#fff"/><path d="M16 18h16M16 26h12M16 34h10" stroke="#22c55e" stroke-width="2.6" stroke-linecap="round"/><circle cx="36" cy="14" r="5.5" fill="#22c55e"/></svg>', "linear-gradient(155deg,#bbf7d0,#16a34a 50%,#14532d)");
  },
  weather() {
    return this.svg('<svg width="48" height="48" viewBox="0 0 48 48"><circle cx="20" cy="20" r="9" fill="#fbbf24"/><path d="M14 32c0-4.5 3.5-8 8-8s8 3.5 8 8H14z" fill="#e2e8f0"/></svg>', "linear-gradient(155deg,#fef08a,#f59e0b 50%,#b45309)");
  }
};
Icons.settings = Icons.settings || function() { return Icons.svg('<circle cx="24" cy="24" r="11" fill="#fff"/>', '#64748b'); };
