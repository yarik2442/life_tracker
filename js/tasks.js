function initTasks() {
  let tasks = JSON.parse(localStorage.getItem('tasks') || '[]');

  const tasksList = document.getElementById('tasks-list');
  const noTasks = document.getElementById('no-tasks');
  const addBtn = document.getElementById('add-task-btn');
  const modal = document.getElementById('add-task-modal');
  const taskInput = document.getElementById('task-name');
  const saveBtn = document.getElementById('save-task');
  const cancelBtn = document.getElementById('cancel-task');

  function renderTasks() {
    tasksList.innerHTML = '';
    const today = new Date().toISOString().split('T')[0];
    const todayTasks = tasks.filter(t => t.date === today);

    if (todayTasks.length === 0) {
      noTasks.style.display = 'block';
    } else {
      noTasks.style.display = 'none';
      todayTasks.forEach(task => {
        const div = document.createElement('div');
        div.className = 'task-item';
        div.innerHTML = `
          <input type="checkbox" ${task.done ? 'checked' : ''} onchange="toggleTask(${task.id})">
          <div class="task-name" style="${task.done ? 'text-decoration: line-through; opacity: 0.7;' : ''}">
            ${task.name}
          </div>
        `;
        tasksList.appendChild(div);
      });
    }
  }

  window.toggleTask = function(id) {
    const task = tasks.find(t => t.id === id);
    if (task) {
      task.done = !task.done;
      localStorage.setItem('tasks', JSON.stringify(tasks));
      renderTasks();
    }
  };

  addBtn.addEventListener('click', () => {
    modal.style.display = 'flex';
    taskInput.value = '';
    taskInput.focus();
  });

  cancelBtn.addEventListener('click', () => {
    modal.style.display = 'none';
  });

  saveBtn.addEventListener('click', () => {
    const name = taskInput.value.trim();
    if (name) {
      const today = new Date().toISOString().split('T')[0];
      tasks.push({
        id: Date.now(),
        name,
        done: false,
        date: today
      });
      localStorage.setItem('tasks', JSON.stringify(tasks));
      renderTasks();
      modal.style.display = 'none';
    }
  });

  modal.addEventListener('click', e => {
    if (e.target === modal) modal.style.display = 'none';
  });

  renderTasks();
}
