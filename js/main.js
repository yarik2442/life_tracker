window.addEventListener('load', function() {
  if (!window.Telegram?.WebApp) {
    console.error('Не Telegram Web App');
    return;
  }

  const tg = window.Telegram.WebApp;
  tg.ready();
  tg.expand();

  if (tg.themeParams) {
    document.body.style.background = tg.themeParams.bg_color || '#f0f2f5';
    document.body.style.color = tg.themeParams.text_color || '#1d1d1f';
  }

  // Переключение вкладок
  const tabs = document.querySelectorAll('.tab-item');
  const contents = document.querySelectorAll('.tab-content');

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      contents.forEach(c => c.classList.remove('active'));
      tab.classList.add('active');
      document.getElementById(tab.getAttribute('data-tab')).classList.add('active');
    });
  });

  // Инициализация вкладок
  initCurrent();  // из current.js
  initTasks();    // из tasks.js
});
