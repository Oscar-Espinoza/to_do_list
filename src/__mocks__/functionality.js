/* eslint-disable import/prefer-default-export */
export const addTaskDom = (description, index, completed, list) => {
  const newTask = document.createElement('li');
  newTask.classList.add('task');
  newTask.id = `task-${index}`;
  newTask.innerHTML = `
    <input type='checkbox' name='task-completed' id='check-${index}' ${completed ? 'checked' : ''}>
    <input type='text' name='task-text' class='description text-input' value=${description}>
    <img src='./images/dots.png' alt='three dots icon' id='move-${index}' class='dots-icon active' draggable='true'>
    <img src='./images/delete.png' alt='delete icon' id='delete-${index}' class='delete-icon'>
  `;
  list.insertBefore(newTask, list.lastChild);
  return list;
};

export const removeTasks = (tasks) => {
  const tasksListEl = document.getElementById('list')
  let tasksList = JSON.parse(localStorage.getItem('tasks'));
  tasks.forEach(task => {
    tasksListEl.removeChild(task);
    const index = parseInt(task.id.slice(-1), 10);
    tasksList = tasksList.filter((item) => item.index !== index);
  });
  
  const newTasksList = tasksList.map((task, i) => {
    task.index = i + 1;
    return task;
  });
  localStorage.setItem('tasks', JSON.stringify(newTasksList));
};