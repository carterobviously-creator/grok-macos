document.addEventListener('DOMContentLoaded',()=>{
  setTimeout(()=>{
    document.getElementById('boot-screen').classList.add('fade-out');
    setTimeout(()=>{
      document.getElementById('boot-screen').classList.add('hidden');
      document.getElementById('desktop').classList.remove('hidden');
    },900);
  },2700);

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
    if(!siriPanel.classList.contains('hidden')){
      document.getElementById('siri-input').focus();
      if(!document.getElementById('siri-chat').children.length){
        addSiriMsg("Hi — mock Siri here. Ask about time, date, apps, or say hello.",false);
      }
    }
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
    addSiriMsg('…',false);
    const q=query.toLowerCase();
    let reply="I'm a lightweight mock AI in this simulator. Try time, date, weather, or open an app from the Dock.";
    if(/hello|hi|hey|howdy/.test(q))reply="Hello! This is a fun macOS-style mockup. What can I do for you?";
    else if(/time|clock/.test(q))reply=`It's ${new Date().toLocaleTimeString('en-US',{hour:'numeric',minute:'2-digit'})}.`;
    else if(/date|day|today/.test(q))reply=`Today is ${new Date().toLocaleDateString('en-US',{weekday:'long',year:'numeric',month:'long',day:'numeric'})}.`;
    else if(/weather/.test(q))reply="Mock weather: partly cloudy, 72°F. (This simulator has no live data.)";
    else if(/open|launch|app|finder|safari|mail/.test(q))reply="Use the Dock at the bottom to open apps. Click any icon.";
    else if(/siri|who are you|what are you/.test(q))reply="I'm a simple rule-based Siri stand-in powered by a tiny mock LLM for this entertainment demo.";
    else if(/help|what can/.test(q))reply="Ask for the time, date, weather, or just say hello. Click Dock icons for apps.";
    else if(/thank/.test(q))reply="You're welcome!";
    else if(/joke|funny/.test(q))reply="Why do programmers prefer dark mode? Because light attracts bugs.";
    setTimeout(()=>{
      siriChat.lastChild.remove();
      addSiriMsg(reply,false);
    },500+Math.random()*500);
  }

  siriSend.addEventListener('click',()=>{const q=siriInput.value.trim();if(q)askSiri(q);});
  siriInput.addEventListener('keydown',e=>{if(e.key==='Enter'){const q=siriInput.value.trim();if(q)askSiri(q);}});

  let zCounter=100;
  const openWindows={};

  function openApp(name){
    if(openWindows[name]){
      openWindows[name].style.display='flex';
      openWindows[name].style.zIndex=++zCounter;
      return;
    }
    const win=document.createElement('div');
    win.className='window';
    win.style.left=(70+Math.random()*180)+'px';
    win.style.top=(50+Math.random()*100)+'px';
    win.style.width=name==='notes'?'480px':'540px';
    win.style.height=name==='notes'?'360px':'400px';
    win.style.zIndex=++zCounter;

    const titles={finder:'Finder',safari:'Safari',messages:'Messages',mail:'Mail',photos:'Photos',music:'Music',notes:'Notes',calendar:'Calendar',settings:'System Settings'};
    const contents={
      finder:`<div class="app-grid">
        <div class="folder-item"><div class="folder-icon"></div>Applications</div>
        <div class="folder-item"><div class="folder-icon"></div>Documents</div>
        <div class="folder-item"><div class="folder-icon"></div>Downloads</div>
        <div class="folder-item"><div class="folder-icon"></div>Desktop</div>
        <div class="folder-item"><div class="folder-icon"></div>Pictures</div>
      </div>`,
      safari:`<div class="browser-bar"><input value="https://www.apple.com" readonly></div>
        <p style="opacity:.85">Safari mock — browsing is simulated for this demo.</p>
        <p style="margin-top:14px;opacity:.55;font-size:13px">Grok macOS entertainment simulator</p>`,
      messages:`<p><strong>Messages</strong></p><p style="margin-top:12px;opacity:.75">No conversations yet. This is a mock iMessage window.</p>`,
      mail:`<p><strong>Inbox</strong></p><p style="margin-top:10px;opacity:.75">0 unread · Mock Mail app</p>`,
      photos:`<p>Photos library is empty in this simulator.</p><p style="margin-top:10px;opacity:.6;font-size:13px">No real media stored.</p>`,
      music:`<p><strong>Music</strong></p><p style="margin-top:12px;opacity:.75">Library simulated. No audio playback.</p>`,
      notes:`<textarea class="note-area" placeholder="Start typing a note…">Welcome to Notes.\n\nThis is a simple mockup for entertainment.</textarea>`,
      calendar:`<div class="calendar-day">${new Date().getDate()}</div><div class="calendar-label">${new Date().toLocaleDateString('en-US',{weekday:'long',month:'long',year:'numeric'})}</div><p style="text-align:center;margin-top:20px;opacity:.6;font-size:13px">No events · Mock Calendar</p>`,
      settings:`<div class="settings-list">
        <p><strong>System Settings</strong></p>
        <p style="margin-top:14px">• Appearance — Dark</p>
        <p>• Desktop & Dock</p>
        <p>• Notifications</p>
        <p>• Sound</p>
        <p style="margin-top:12px;opacity:.55;font-size:13px">Mock controls only</p>
      </div>`
    };

    win.innerHTML=`<div class="window-header">
      <div class="window-controls">
        <div class="control close" data-action="close"></div>
        <div class="control minimize" data-action="minimize"></div>
        <div class="control maximize" data-action="maximize"></div>
      </div>
      <div class="window-title">${titles[name]||name}</div>
    </div>
    <div class="window-content">${contents[name]||'<p>App content</p>'}</div>`;

    win.querySelector('[data-action="close"]').addEventListener('click',()=>{win.remove();delete openWindows[name];});
    win.querySelector('[data-action="minimize"]').addEventListener('click',()=>{win.style.display='none';});
    win.querySelector('[data-action="maximize"]').addEventListener('click',()=>{
      if(win.dataset.max==='1'){
        win.style.width=win.dataset.ow;win.style.height=win.dataset.oh;
        win.style.left=win.dataset.ol;win.style.top=win.dataset.ot;
        win.dataset.max='0';
      }else{
        win.dataset.ow=win.style.width;win.dataset.oh=win.style.height;
        win.dataset.ol=win.style.left;win.dataset.ot=win.style.top;
        win.style.left='40px';win.style.top='40px';
        win.style.width='calc(100vw - 80px)';win.style.height='calc(100vh - 120px)';
        win.dataset.max='1';
      }
    });

    const header=win.querySelector('.window-header');
    let dragging=false,ox=0,oy=0;
    header.addEventListener('mousedown',e=>{
      if(e.target.classList.contains('control'))return;
      dragging=true;ox=e.clientX-win.offsetLeft;oy=e.clientY-win.offsetTop;
      win.style.zIndex=++zCounter;
    });
    document.addEventListener('mousemove',e=>{
      if(!dragging)return;
      win.style.left=(e.clientX-ox)+'px';
      win.style.top=(e.clientY-oy)+'px';
    });
    document.addEventListener('mouseup',()=>{dragging=false;});

    document.getElementById('windows-container').appendChild(win);
    openWindows[name]=win;
  }
});