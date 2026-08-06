let zCounter = 100;
const openWindows = {};

const appData = {
  finder: {
    title: 'Finder',
    content: `<div class="app-grid">
      <div class="folder-item"><div class="folder-icon"></div>Applications</div>
      <div class="folder-item"><div class="folder-icon"></div>Documents</div>
      <div class="folder-item"><div class="folder-icon"></div>Downloads</div>
      <div class="folder-item"><div class="folder-icon"></div>Desktop</div>
      <div class="folder-item"><div class="folder-icon"></div>Pictures</div>
      <div class="folder-item"><div class="folder-icon"></div>Music</div>
    </div>`
  },
  safari: {
    title: 'Safari',
    content: `<div class="browser-bar"><span style="opacity:.5;font-size:12px">← →</span><input value="https://www.apple.com" readonly></div>
      <p style="margin-bottom:10px">Safari mock browser.</p>
      <p style="opacity:.7;font-size:13px">Lightweight Grok macOS simulator — entertainment only.</p>`
  },
  messages: {
    title: 'Messages',
    content: `<p><strong>iMessage</strong></p><p style="margin-top:14px;opacity:.75">No conversations yet. Mock Messages app.</p>`
  },
  mail: {
    title: 'Mail',
    content: `<p><strong>Inbox</strong></p><p style="margin-top:12px;opacity:.75">0 new messages. Mock Mail.</p>`
  },
  photos: {
    title: 'Photos',
    content: `<p>Photos library is empty in this simulator.</p><p style="margin-top:10px;opacity:.6;font-size:13px">No real media stored.</p>`
  },
  music: {
    title: 'Music',
    content: `<p><strong>Apple Music</strong></p><p style="margin-top:12px;opacity:.75">Library simulated. No audio playback.</p>`
  },
  notes: {
    title: 'Notes',
    content: `<textarea class="note-area" placeholder="Start typing a note...">Welcome to Notes.\n\nThis is a simple mockup for the Grok macOS simulator.</textarea>`
  },
  calendar: {
    title: 'Calendar',
    content: `<p><strong>Today</strong></p><p style="margin-top:12px">No events scheduled.</p><p style="margin-top:8px;opacity:.6;font-size:13px">Mock Calendar.</p>`
  },
  appstore: {
    title: 'App Store',
    content: `<div class="appstore-grid">
      <div class="appstore-card"><h4>Pages</h4><p>Word processor</p></div>
      <div class="appstore-card"><h4>Numbers</h4><p>Spreadsheets</p></div>
      <div class="appstore-card"><h4>Keynote</h4><p>Presentations</p></div>
      <div class="appstore-card"><h4>GarageBand</h4><p>Music creation</p></div>
    </div><p style="margin-top:16px;opacity:.6;font-size:12px">Mock App Store — no real downloads.</p>`
  },
  settings: {
    title: 'System Settings',
    content: `<div class="settings-list">
      <p>• Appearance: Dark</p>
      <p>• Desktop & Dock</p>
      <p>• Notifications</p>
      <p>• Sound</p>
      <p>• Focus</p>
      <p>• Displays</p>
      <p style="opacity:.55;margin-top:12px">Mock settings only.</p>
    </div>`
  }
};

function openApp(name) {
  if (openWindows[name]) {
    openWindows[name].style.zIndex = ++zCounter;
    openWindows[name].style.display = 'flex';
    document.getElementById('app-name').textContent = appData[name]?.title || name;
    return;
  }
  const data = appData[name] || { title: name, content: '<p>App content</p>' };
  const win = document.createElement('div');
  win.className = 'window';
  win.style.left = (70 + Math.random() * 180) + 'px';
  win.style.top = (50 + Math.random() * 100) + 'px';
  win.style.width = name === 'notes' ? '480px' : '540px';
  win.style.height = name === 'notes' ? '400px' : '360px';
  win.style.zIndex = ++zCounter;
  win.innerHTML = `<div class="window-header">
    <div class="window-controls">
      <div class="control close" data-action="close"></div>
      <div class="control minimize" data-action="minimize"></div>
      <div class="control maximize" data-action="maximize"></div>
    </div>
    <div class="window-title">${data.title}</div>
  </div>
  <div class="window-content">${data.content}</div>`;

  win.querySelector('[data-action="close"]').addEventListener('click', () => {
    win.remove();
    delete openWindows[name];
    document.getElementById('app-name').textContent = 'Finder';
  });
  win.querySelector('[data-action="minimize"]').addEventListener('click', () => {
    win.style.display = 'none';
  });

  const header = win.querySelector('.window-header');
  let dragging = false, ox = 0, oy = 0;
  header.addEventListener('mousedown', e => {
    if (e.target.classList.contains('control')) return;
    dragging = true;
    ox = e.clientX - win.offsetLeft;
    oy = e.clientY - win.offsetTop;
    win.style.zIndex = ++zCounter;
  });
  document.addEventListener('mousemove', e => {
    if (!dragging) return;
    win.style.left = (e.clientX - ox) + 'px';
    win.style.top = (e.clientY - oy) + 'px';
  });
  document.addEventListener('mouseup', () => { dragging = false; });

  document.getElementById('windows-container').appendChild(win);
  openWindows[name] = win;
  document.getElementById('app-name').textContent = data.title;
}