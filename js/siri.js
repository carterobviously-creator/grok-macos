function initSiri() {
  const panel = document.getElementById('siri-panel');
  const input = document.getElementById('siri-input');
  const chat = document.getElementById('siri-chat');
  const send = document.getElementById('siri-send');

  document.getElementById('siri-btn').addEventListener('click', () => {
    panel.classList.toggle('hidden');
    if (!panel.classList.contains('hidden')) input.focus();
  });

  function addMsg(text, isUser) {
    const div = document.createElement('div');
    div.className = 'siri-msg ' + (isUser ? 'user' : 'siri');
    div.textContent = text;
    chat.appendChild(div);
    chat.scrollTop = chat.scrollHeight;
  }

  const replies = {
    hello: "Hi! I'm the mock Siri in this Grok macOS simulator. How can I help?",
    hi: "Hello! Ask me about time, date, weather, or apps.",
    time: () => `It's ${new Date().toLocaleTimeString('en-US')}.`,
    date: () => `Today is ${new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}.`,
    weather: "I'm a lightweight mock — no live weather data here.",
    open: "Click any Dock icon to open an app.",
    help: "Try: hello, time, date, weather, open, or who are you.",
    who: "I'm a simple rule-based Siri mock for entertainment in this browser simulator.",
    name: "This is the Grok macOS simulator — not real macOS.",
    default: "Interesting. Try saying hello, time, date, or help."
  };

  function ask(q) {
    addMsg(q, true);
    input.value = '';
    addMsg('Thinking...', false);
    const lower = q.toLowerCase();
    let reply = replies.default;
    if (lower.includes('hello') || lower.includes('hi') || lower.includes('hey')) reply = replies.hello;
    else if (lower.includes('time')) reply = typeof replies.time === 'function' ? replies.time() : replies.time;
    else if (lower.includes('date') || lower.includes('day')) reply = typeof replies.date === 'function' ? replies.date() : replies.date;
    else if (lower.includes('weather')) reply = replies.weather;
    else if (lower.includes('open') || lower.includes('app')) reply = replies.open;
    else if (lower.includes('help')) reply = replies.help;
    else if (lower.includes('who') || lower.includes('what are you')) reply = replies.who;
    else if (lower.includes('name') || lower.includes('this')) reply = replies.name;

    setTimeout(() => {
      chat.lastChild.remove();
      addMsg(reply, false);
    }, 500 + Math.random() * 500);
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