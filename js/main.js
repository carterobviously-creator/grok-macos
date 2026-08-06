document.addEventListener('DOMContentLoaded', () => {
  // Boot screen
  setTimeout(() => {
    document.getElementById('boot-screen').classList.add('fade-out');
    setTimeout(() => {
      document.getElementById('boot-screen').classList.add('hidden');
      document.getElementById('desktop').classList.remove('hidden');
    }, 900);
  }, 2700);

  // Clock
  function updateClock() {
    const now = new Date();
    const opts = { weekday: 'short', month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit' };
    document.getElementById('clock').textContent = now.toLocaleString('en-US', opts);
  }
  updateClock();
  setInterval(updateClock, 30000);

  // Calendar icon day
  const calIcon = document.querySelector('.calendar-icon');
  if (calIcon) calIcon.setAttribute('data-day', new Date().getDate());

  // Dock clicks
  document.querySelectorAll('.dock-item').forEach(item => {
    item.addEventListener('click', () => {
      const app = item.dataset.app;
      if (typeof openApp === 'function') openApp(app);
    });
  });

  // Siri
  if (typeof initSiri === 'function') initSiri();
});