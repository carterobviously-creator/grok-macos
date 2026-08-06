function initSiri() {
  const panel = document.getElementById('siri-panel');
  const input = document.getElementById('siri-input');
  const chat = document.getElementById('siri-chat');
  const send = document.getElementById('siri-send');

  document.getElementById('siri-btn').addEventListener('click', () => {
    panel.classList.toggle('hidden');
    if (!panel.classList.contains('hidden')) {
      input.focus();
      if (!chat.children.length) {
        addMsg("Hi — I'm the mock Siri in this Grok macOS simulator. Ask about time, date, apps, or just say hello.", false);
      }
    }
  });

  function addMsg(text, isUser) {
    const div = document.createElement('div');
    div.className = 'siri-msg ' + (isUser ? 'user' : 'siri');
    div.textContent = text;
    chat.appendChild(div);
    chat.scrollTop = chat.scrollHeight;
  }

  function ask(q) {
    addMsg(q, true);
    input.value = '';
    addMsg('…', false);
    const lower = q.toLowerCase();
    let reply = "I'm a lightweight mock AI for this entertainment demo. Try time, date, weather, joke, or open an app.";

    if (/hello|hi|hey|howdy/.test(lower)) reply = "Hello! This is a fun macOS-style mockup. What can I help with?";
    else if (/time|clock/.test(lower)) reply = `It's ${new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })}.`;
    else if (/date|day|today/.test(lower)) reply = `Today is ${new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}.`;
    else if (/weather/.test(lower)) reply = "Mock weather: partly cloudy, 72°F. (No live data in this simulator.)";
    else if (/open|launch|finder|safari|mail|notes|music|photos|calendar|settings|terminal|app store/.test(lower)) reply = "Click any Dock icon at the bottom to open apps.";
    else if (/siri|who are you|what are you/.test(lower)) reply = "I'm a simple rule-based Siri stand-in powered by a tiny mock LLM for this demo.";
    else if (/help|what can/.test(lower)) reply = "Ask for the time, date, weather, a joke, or say hello. Use the Dock for apps.";
    else if (/thank/.test(lower)) reply = "You're welcome!";
    else if (/joke|funny/.test(lower)) reply = "Why do programmers prefer dark mode? Because light attracts bugs.";
    else if (/apple|macos|os/.test(lower)) reply = "This is an approximate browser mockup for entertainment — not real macOS or Apple software.";
    else if (/grok|xai/.test(lower)) reply = "Grok macOS is a fun simulator built for demo purposes.";

    setTimeout(() => {
      chat.lastChild.remove();
      addMsg(reply, false);
    }, 400 + Math.random() * 600);
  }

  send.addEventListener('click', () => {
    const q = input.value.trim();
    if (q) ask(q);
  });
  input.addEventListener('keydown', e => {
    if (e.key === 'Enter') {
      const q = input.value.trim();
      if (q) ask(q);
    }
  });
}