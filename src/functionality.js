export const addTaskDom = (description, index, completed = false) => {
  const taskList = document.getElementById('tasks-list');
  const newTask = document.createElement('li');
  newTask.classList.add('task');
  newTask.id = `task-${index}`;
  newTask.innerHTML = `
  <input type='checkbox' name='task-completed' id='check-${index}' ${completed ? 'checked' : ''}>
  <input type='text' name='task-text' class='description text-input' value=${description}>
  <img src='./images/dots.png' alt='three dots icon' class='three-dots'>
  `;
  taskList.insertBefore(newTask, taskList.lastChild);
};

export const addTaskStorage = (description) => {
  let taskList = localStorage.getItem('tasks');
  if (taskList === null) {
    taskList = [];
  } else {
    taskList = JSON.parse(taskList);
  }
  const newTask = {
    description,
    index: taskList.length + 1,
    completed: false,
  };
  taskList.push(newTask);
  localStorage.setItem('tasks', JSON.stringify(taskList));
  return newTask;
};

export const removeCompletedTasks = () => {
  const checkedBoxes = document.querySelectorAll('input[type="checkbox"]:checked');
  if (checkedBoxes.length > 0) {
    const tasksListEl = document.getElementById('tasks-list');
    let tasksList = JSON.parse(localStorage.getItem('tasks'));
    checkedBoxes.forEach(checkbox => {
      tasksListEl.removeChild(checkbox.parentNode);
      const index = parseInt(checkbox.id.slice(-1));
      tasksList = tasksList.filter((task) => task.index != index);
    });
    const newTasksList = tasksList.map((task, i) => {
      task.index = i + 1;
      return task;
    });
    localStorage.setItem('tasks', JSON.stringify(newTasksList));
  }
};

export const updateTask = (input) => {
  const tasksList = JSON.parse(localStorage.getItem('tasks'));
  const taskId = input.parentNode.id;
  const index = parseInt(taskId.slice(-1));
  tasksList[index - 1].description = input.value  ;
  localStorage.setItem('tasks', JSON.stringify(tasksList));
};
