/* Original SVG icons for Lumen Desktop entertainment mock.
   Inspired by modern glass desktop aesthetics — not official Apple artwork.
   Entertainment only. */
const Icons = {
  svg(inner, bg) {
    return `<div class="icon" style="background:${bg || 'linear-gradient(#64748b,#334155)'}">${inner}</div>`;
  },
  finder() {
    return this.svg('<svg width="32" height="32" viewBox="0 0 32 32"><path d="M8 10h16v14H8z" fill="#fff" rx="2"/><path d="M12 14h8M12 18h6" stroke="#0ea5e9" stroke-width="1.5"/></svg>', "linear-gradient(135deg,#38bdf8,#0284c7)");
  },
  notes() {
    return this.svg('<svg width="32" height="32" viewBox="0 0 32 32"><rect x="7" y="6" width="18" height="20" rx="3" fill="#fff"/><path d="M11 12h10M11 16h10M11 20h7" stroke="#f59e0b" stroke-width="1.5"/></svg>', "linear-gradient(135deg,#fde68a,#f59e0b)");
  },
  calc() {
    return this.svg('<svg width="32" height="32" viewBox="0 0 32 32"><rect x="6" y="5" width="20" height="22" rx="4" fill="#fff"/><rect x="9" y="8" width="14" height="5" rx="1" fill="#334155"/><circle cx="11" cy="17" r="1.5" fill="#64748b"/><circle cx="16" cy="17" r="1.5" fill="#64748b"/><circle cx="21" cy="17" r="1.5" fill="#64748b"/></svg>', "linear-gradient(135deg,#94a3b8,#475569)");
  },
  web() {
    return this.svg('<svg width="32" height="32" viewBox="0 0 32 32"><circle cx="16" cy="16" r="11" fill="none" stroke="#fff" stroke-width="2"/><path d="M16 5c3 4 3 18 0 22M5 16h22" stroke="#fff" stroke-width="1.5"/></svg>', "linear-gradient(135deg,#67e8f9,#06b6d4)");
  },
  store() {
    return this.svg('<svg width="32" height="32" viewBox="0 0 32 32"><path d="M8 12l2-4h12l2 4v14H8z" fill="#fff"/><circle cx="16" cy="18" r="3" fill="#a855f7"/></svg>', "linear-gradient(135deg,#c084fc,#7c3aed)");
  },
  settings() {
    return this.svg('<svg width="32" height="32" viewBox="0 0 32 32"><circle cx="16" cy="16" r="4" fill="#fff"/><path d="M16 6v3M16 23v3M6 16h3M23 16h3M9 9l2 2M21 21l2 2M9 23l2-2M21 11l2-2" stroke="#fff" stroke-width="1.8"/></svg>', "linear-gradient(135deg,#a3a3a3,#525252)");
  },
  aura() {
    return this.svg('<svg width="32" height="32" viewBox="0 0 32 32"><circle cx="16" cy="16" r="10" fill="none" stroke="#fff" stroke-width="2"/><circle cx="16" cy="16" r="4" fill="#fff"/><path d="M16 6v2M16 24v2M6 16h2M24 16h2" stroke="#fff" stroke-width="1.5"/></svg>', "linear-gradient(135deg,#818cf8,#4f46e5)");
  },
  launch() {
    return this.svg('<svg width="32" height="32" viewBox="0 0 32 32"><rect x="6" y="6" width="8" height="8" rx="2" fill="#fff"/><rect x="18" y="6" width="8" height="8" rx="2" fill="#e0e7ff"/><rect x="6" y="18" width="8" height="8" rx="2" fill="#e0e7ff"/><rect x="18" y="18" width="8" height="8" rx="2" fill="#fff"/></svg>', "linear-gradient(135deg,#818cf8,#6366f1)");
  },
  calendar() {
    return this.svg('<svg width="32" height="32" viewBox="0 0 32 32"><rect x="6" y="8" width="20" height="18" rx="3" fill="#fff"/><rect x="6" y="8" width="20" height="6" fill="#ef4444"/><text x="16" y="22" text-anchor="middle" fill="#1e293b" font-size="10" font-weight="bold">12</text></svg>', "linear-gradient(135deg,#f87171,#dc2626)");
  },
  music() {
    return this.svg('<svg width="32" height="32" viewBox="0 0 32 32"><path d="M12 8v14a4 4 0 11-2-3.5V8l12-2v12a4 4 0 11-2-3.5V6z" fill="#fff"/></svg>', "linear-gradient(135deg,#f472b6,#db2777)");
  },
  photos() {
    return this.svg('<svg width="32" height="32" viewBox="0 0 32 32"><rect x="5" y="7" width="22" height="18" rx="3" fill="#fff"/><circle cx="12" cy="14" r="3" fill="#fbbf24"/><path d="M8 21l5-5 4 4 6-6 3 7z" fill="#38bdf8"/></svg>', "linear-gradient(135deg,#86efac,#22c55e)");
  },
  terminal() {
    return this.svg('<svg width="32" height="32" viewBox="0 0 32 32"><rect x="5" y="6" width="22" height="20" rx="3" fill="#0f172a"/><path d="M9 12l4 4-4 4M16 20h7" stroke="#4ade80" stroke-width="1.5"/></svg>', "linear-gradient(135deg,#1e293b,#0f172a)");
  },
  mail() {
    return this.svg('<svg width="32" height="32" viewBox="0 0 32 32"><rect x="5" y="8" width="22" height="16" rx="2" fill="#fff"/><path d="M5 10l11 7 11-7" fill="none" stroke="#3b82f6" stroke-width="1.5"/></svg>', "linear-gradient(135deg,#60a5fa,#2563eb)");
  },
  maps() {
    return this.svg('<svg width="32" height="32" viewBox="0 0 32 32"><path d="M16 6l10 6v14l-10-6-10 6V12z" fill="#fff"/><circle cx="16" cy="14" r="2" fill="#ef4444"/></svg>', "linear-gradient(135deg,#4ade80,#16a34a)");
  },
  trash() {
    return this.svg('<svg width="32" height="32" viewBox="0 0 32 32"><path d="M8 10h16l-1 16H9z" fill="#fff"/><path d="M12 8h8M10 10h12" stroke="#64748b" stroke-width="1.5"/></svg>', "linear-gradient(135deg,#cbd5e1,#94a3b8)");
  }
};

// Fallback for any missing
Icons.settings = Icons.settings || function() { return Icons.svg('<circle cx="16" cy="16" r="8" fill="#fff"/>', '#64748b'); };
