document.addEventListener('DOMContentLoaded',()=>{
  setTimeout(()=>{
    document.getElementById('boot-screen').classList.add('fade-out');
    setTimeout(()=>{
      document.getElementById('boot-screen').classList.add('hidden');
      document.getElementById('desktop').classList.remove('hidden');
    },800);
  },2800);

  function updateClock(){
    const now=new Date();
    const opts={weekday:'short',month:'short',day:'numeric',hour:'numeric',minute:'2-digit'};
    document.getElementById('clock').textContent=now.toLocaleString('en-US',opts);
  }
  updateClock();
  setInterval(updateClock,30000);

  document.querySelectorAll('.dock-item').forEach(item=>{
    item.addEventListener('click',()=>{
      const app=item.dataset.app;
      if(app==='trash')return;
      openApp(app);
    });
  });

  const siriPanel=document.getElementById('siri-panel');
  document.getElementById('siri-btn').addEventListener('click',()=>{
    siriPanel.classList.toggle('hidden');
    if(!siriPanel.classList.contains('hidden'))document.getElementById('siri-input').focus();
  });

  const siriInput=document.getElementById('siri-input');
  const siriChat=document.getElementById('siri-chat');
  const siriSend=document.getElementById('siri-send');

  function addSiriMsg(text,isUser){
    const div=document.createElement('div');
    div.className='siri-msg '+(isUser?'user':'siri');
    div.textContent=text;
    siriChat.appendChild(div);
    siriChat.scrollTop=siriChat.scrollHeight;
  }

  function askSiri(query){
    addSiriMsg(query,true);
    siriInput.value='';
    addSiriMsg('Thinking...',false);
    const responses={hello:"Hi! I'm Siri in this Grok macOS simulator. How can I help?",time:`It's ${new Date().toLocaleTimeString()}.`,date:`Today is ${new Date().toLocaleDateString('en-US',{weekday:'long',year:'numeric',month:'long',day:'numeric'})}.`,weather:"I'm a mock Siri — try a real weather app!",open:"Click Dock icons to open apps.",help:"Ask about time, date, or say hello. Lightweight AI mock.",default:"Interesting! Try 'time', 'date', or 'hello'."};
    let reply=responses.default;
    const q=query.toLowerCase();
    if(q.includes('hello')||q.includes('hi')||q.includes('hey'))reply=responses.hello;
    else if(q.includes('time'))reply=responses.time;
    else if(q.includes('date')||q.includes('day'))reply=responses.date;
    else if(q.includes('weather'))reply=responses.weather;
    else if(q.includes('open')||q.includes('app'))reply=responses.open;
    else if(q.includes('help'))reply=responses.help;
    setTimeout(()=>{siriChat.lastChild.remove();addSiriMsg(reply,false);},600+Math.random()*400);
  }

  siriSend.addEventListener('click',()=>{const q=siriInput.value.trim();if(q)askSiri(q);});
  siriInput.addEventListener('keydown',e=>{if(e.key==='Enter'){const q=siriInput.value.trim();if(q)askSiri(q);}});

  let zCounter=100;
  const openWindows={};

  function openApp(name){
    if(openWindows[name]){openWindows[name].style.zIndex=++zCounter;return;}
    const win=document.createElement('div');
    win.className='window';
    win.style.left=(80+Math.random()*200)+'px';
    win.style.top=(60+Math.random()*120)+'px';
    win.style.width='520px';
    win.style.height='380px';
    win.style.zIndex=++zCounter;
    const titles={finder:'Finder',safari:'Safari',messages:'Messages',mail:'Mail',photos:'Photos',music:'Music',notes:'Notes',settings:'System Settings'};
    const contents={finder:`<div class="app-grid"><div class="folder-item"><div class="folder-icon"></div>Applications</div><div class="folder-item"><div class="folder-icon"></div>Documents</div><div class="folder-item"><div class="folder-icon"></div>Downloads</div><div class="folder-item"><div class="folder-icon"></div>Desktop</div></div>`,safari:`<div class="browser-bar"><input value="https://www.apple.com" readonly></div><p>Safari mock — browsing simulated.</p><p style="margin-top:12px;opacity:.7">Lightweight macOS Tahoe simulator.</p>`,messages:`<p><strong>iMessage</strong></p><p style="margin-top:12px;opacity:.8">No conversations. Mock Messages.</p>`,mail:`<p><strong>Inbox</strong></p><p style="margin-top:12px;opacity:.8">0 new messages. Mock Mail.</p>`,photos:`<p>Photos library empty in this simulator.</p>`,music:`<p><strong>Music</strong></p><p style="margin-top:12px;opacity:.8">Library simulated. No audio.</p>`,notes:`<textarea class="note-area" placeholder="Start typing...">Welcome to Notes.\nSimple mockup.</textarea>`,settings:`<p><strong>System Settings</strong></p><p style="margin-top:16px">• Appearance: Dark</p><p>• Desktop & Dock</p><p>• Notifications</p><p style="margin-top:12px;opacity:.6">Mock settings only.</p>`};
    win.innerHTML=`<div class="window-header"><div class="window-controls"><div class="control close" data-action="close"></div><div class="control minimize" data-action="minimize"></div><div class="control maximize" data-action="maximize"></div></div><div class="window-title">${titles[name]||name}</div></div><div class="window-content">${contents[name]||'<p>App content</p>'}</div>`;
    win.querySelector('[data-action="close"]').addEventListener('click',()=>{win.remove();delete openWindows[name];});
    win.querySelector('[data-action="minimize"]').addEventListener('click',()=>{win.style.display='none';});
    const header=win.querySelector('.window-header');
    let dragging=false,ox=0,oy=0;
    header.addEventListener('mousedown',e=>{if(e.target.classList.contains('control'))return;dragging=true;ox=e.clientX-win.offsetLeft;oy=e.clientY-win.offsetTop;win.style.zIndex=++zCounter;});
    document.addEventListener('mousemove',e=>{if(!dragging)return;win.style.left=(e.clientX-ox)+'px';win.style.top=(e.clientY-oy)+'px';});
    document.addEventListener('mouseup',()=>{dragging=false;});
    document.getElementById('windows-container').appendChild(win);
    openWindows[name]=win;
  }
});