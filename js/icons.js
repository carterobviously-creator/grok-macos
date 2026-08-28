const Icons = {
  svg(inner, bg) {
    return `<div class="icon" style="background:${bg}">${inner}</div>`;
  },
  finder() {
    return this.svg(`<svg width="30" height="30" viewBox="0 0 30 30"><rect x="4" y="7" width="22" height="16" rx="3" fill="#fff"/><path d="M4 13h22" stroke="#93c5fd" stroke-width="2"/></svg>`, "linear-gradient(#38bdf8,#2563eb)");
  },
  notes() {
    return this.svg(`<svg width="28" height="28" viewBox="0 0 28 28"><rect x="6" y="4" width="16" height="20" rx="2" fill="#fff"/><path d="M9 10h10M9 14h10M9 18h7" stroke="#f59e0b" stroke-width="1.6"/></svg>`, "linear-gradient(#fde68a,#f59e0b)");
  },
  calc() {
    return this.svg(`<svg width="28" height="28" viewBox="0 0 28 28"><rect x="6" y="5" width="16" height="18" rx="2" fill="#fff"/><rect x="8" y="7" width="12" height="4" rx="1" fill="#111"/><circle cx="10" cy="15" r="1.2" fill="#111"/><circle cx="14" cy="15" r="1.2" fill="#111"/><circle cx="18" cy="15" r="1.2" fill="#111"/></svg>`, "linear-gradient(#cbd5e1,#475569)");
  },
  web() {
    return this.svg(`<svg width="30" height="30" viewBox="0 0 30 30"><circle cx="15" cy="15" r="11" fill="#fff"/><path d="M15 6l3 12-12-3 9-9z" fill="#ef4444"/></svg>`, "linear-gradient(#7dd3fc,#0284c7)");
  },
  settings() {
    return this.svg(`<svg width="28" height="28" viewBox="0 0 28 28"><circle cx="14" cy="14" r="5" fill="none" stroke="#fff" stroke-width="2"/><circle cx="14" cy="14" r="10" fill="none" stroke="#fff" stroke-width="2" stroke-dasharray="3 4"/></svg>`, "linear-gradient(#94a3b8,#334155)");
  },
  store() {
    return this.svg(`<svg width="28" height="28" viewBox="0 0 28 28"><rect x="5" y="10" width="18" height="12" rx="2" fill="#fff"/><path d="M9 10v-2a5 5 0 0110 0v2" stroke="#fff" stroke-width="2" fill="none"/></svg>`, "linear-gradient(#60a5fa,#1d4ed8)");
  },
  calendar() {
    return this.svg(`<svg width="28" height="28" viewBox="0 0 28 28"><rect x="5" y="6" width="18" height="16" rx="2" fill="#fff"/><path d="M5 11h18" stroke="#ef4444"/><text x="14" y="20" text-anchor="middle" font-size="9" fill="#111">28</text></svg>`, "linear-gradient(#fecaca,#ef4444)");
  },
  music() {
    return this.svg(`<svg width="28" height="28" viewBox="0 0 28 28"><path d="M10 20a3 3 0 106 0V8l8-2v10" fill="none" stroke="#fff" stroke-width="2"/></svg>`, "linear-gradient(#fb7185,#db2777)");
  },
  terminal() {
    return this.svg(`<svg width="28" height="28" viewBox="0 0 28 28"><rect x="4" y="6" width="20" height="16" rx="2" fill="#0f172a"/><path d="M8 12l4 3-4 3M14 18h6" stroke="#4ade80" stroke-width="1.6"/></svg>`, "linear-gradient(#1e293b,#020617)");
  },
  aura() {
    return this.svg(`<svg width="28" height="28" viewBox="0 0 28 28"><circle cx="14" cy="14" r="8" fill="none" stroke="#fff" stroke-width="2"/><circle cx="14" cy="14" r="3" fill="#fff"/></svg>`, "linear-gradient(#c4b5fd,#7c3aed)");
  },
  photos() {
    return this.svg(`<svg width="28" height="28" viewBox="0 0 28 28"><circle cx="10" cy="12" r="4" fill="#f472b6"/><circle cx="16" cy="11" r="4" fill="#60a5fa"/><circle cx="13" cy="16" r="4" fill="#fbbf24"/></svg>`, "linear-gradient(#fff,#e2e8f0)");
  }
};
