document.addEventListener('DOMContentLoaded', () => {
  setTimeout(() => {
    document.getElementById('boot-screen').classList.add('fade-out');
    setTimeout(() => {
      document.getElementById('boot-screen').classList.add('hidden');
      document.getElementById('desktop').classList.remove('hidden');
    }, 800);
  }, 2600);

  function updateClock() {
    const now = new Date();
    const opts = { weekday: 'short', month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit' };
    document.getElementById('clock').textContent = now.toLocaleString('en-US', opts);
  }
  updateClock();
  setInterval(updateClock, 30000);

  document.querySelectorAll('.dock-item').forEach(item => {
    item.addEventListener('click', () => {
      const app = item.dataset.app;
      if (app === 'trash') return;
      openApp(app);
    });
  });

  initSiri();
});