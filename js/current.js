function initCurrent() {
  const user = window.Telegram.WebApp.initDataUnsafe?.user;

  if (user) {
    const fullName = [user.first_name, user.last_name].filter(Boolean).join(' ');
    document.getElementById('fullname').textContent = fullName || 'Без имени';
    document.getElementById('userid').textContent = 'ID: ' + user.id;
    document.getElementById('avatar').src = user.photo_url || 'https://t.me/i/userpic/320/default_avatar.jpg';
  } else {
    document.getElementById('fullname').textContent = 'Не удалось загрузить';
  }
}
