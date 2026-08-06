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
    const q=query.toLowerCase();
    let reply='I\'m a lightweight mock Siri powered by a tiny rule engine. Try time, date, weather, open apps, or hello.';
    if(q.includes('hello')||q.includes('hi')||q.includes('hey'))reply="Hi! I'm Siri in this Grok macOS simulator. How can I help?";
    else if(q.includes('time'))reply=`It's ${new Date().toLocaleTimeString()}.`;
    else if(q.includes('date')||q.includes('day'))reply=`Today is ${new Date().toLocaleDateString('en-US',{weekday:'long',year:'numeric',month:'long',day:'numeric'})}.`;
    else if(q.includes('weather'))reply="Looks clear and mild in this simulated world. (Mock weather)";
    else if(q.includes('open')||q.includes('app')||q.includes('finder')||q.includes('safari'))reply="Click any Dock icon to open apps. Finder, Safari, Messages and more are available.";
    else if(q.includes('help')||q.includes('what can'))reply="I can tell time/date, chat a bit, or guide you to Dock apps. Ask anything fun.";
    else if(q.includes('who are you')||q.includes('siri'))reply="I'm a mock Siri for this entertainment macOS simulator. Not the real one.";
    else if(q.includes('joke'))reply="Why do programmers prefer dark mode? Because light attracts bugs.";
    else if(q.includes('thank'))reply="You're welcome!";
    else if(q.includes('bye')||q.includes('goodbye'))reply="See you later!";
    setTimeout(()=>{siriChat.lastChild.remove();addSiriMsg(reply,false);},500+Math.random()*500);
  }

  siriSend.addEventListener('click',()=>{const q=siriInput.value.trim();if(q)askSiri(q);});
  siriInput.addEventListener('keydown',e=>{if(e.key==='Enter'){const q=siriInput.value.trim();if(q)askSiri(q);}});

  let zCounter=100;
  const openWindows={};

  function openApp(name){
    if(openWindows[name]){openWindows[name].style.zIndex=++zCounter;openWindows[name].style.display='flex';return;}
    const win=document.createElement('div');
    win.className='window';
    win.style.left=(60+Math.random()*180)+'px';
    win.style.top=(50+Math.random()*100)+'px';
    win.style.width='540px';
    win.style.height='400px';
    win.style.zIndex=++zCounter;
    const titles={finder:'Finder',safari:'Safari',messages:'Messages',mail:'Mail',photos:'Photos',music:'Music',notes:'Notes',calendar:'Calendar',maps:'Maps',appstore:'App Store',settings:'System Settings'};
    const contents={
      finder:`<div class="app-grid"><div class="folder-item"><div class="folder-icon"></div>Applications</div><div class="folder-item"><div class="folder-icon"></div>Documents</div><div class="folder-item"><div class="folder-icon"></div>Downloads</div><div class="folder-item"><div class="folder-icon"></div>Desktop</div></div>`,
      safari:`<div class="browser-bar"><input value="https://www.apple.com" readonly></div><p>Safari mock — browsing simulated.</p><p style="margin-top:12px;opacity:.7">Lightweight macOS simulator for fun.</p>`,
      messages:`<p><strong>iMessage</strong></p><p style="margin-top:12px;opacity:.8">No conversations yet. Mock Messages app.</p>`,
      mail:`<p><strong>Inbox</strong></p><p style="margin-top:12px;opacity:.8">0 new messages. Mock Mail.</p>`,
      photos:`<p>Photos library is empty in this simulator.</p>`,
      music:`<p><strong>Music</strong></p><p style="margin-top:12px;opacity:.8">Library simulated. No real audio playback.</p>`,
      notes:`<textarea class="note-area" placeholder="Start typing...">Welcome to Notes.\nSimple mockup for entertainment.</textarea>`,
      calendar:`<p><strong>Calendar</strong></p><p style="margin-top:12px">Today · No events</p><p style="opacity:.7;margin-top:8px">Mock calendar view.</p>`,
      maps:`<p><strong>Maps</strong></p><p style="margin-top:12px;opacity:.8">Map view simulated. Search places in a real Maps app.</p>`,
      appstore:`<div class="store-item"><strong>Featured</strong><span style="opacity:.7"> — Mock App Store</span></div><div class="store-item"><strong>Productivity</strong><span style="opacity:.7"> — Sample categories</span></div><div class="store-item"><strong>Entertainment</strong><span style="opacity:.7"> — Browse simulated</span></div>`,
      settings:`<p><strong>System Settings</strong></p><p style="margin-top:16px">• Appearance: Dark</p><p>• Desktop & Dock</p><p>• Notifications</p><p>• Displays</p><p style="margin-top:12px;opacity:.6">Mock settings only.</p>`
    };
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