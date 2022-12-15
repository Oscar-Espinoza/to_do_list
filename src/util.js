export const updateTask = (textInput) => {
  const tasksList = JSON.parse(localStorage.getItem('tasks'));
  const taskId = textInput.parentNode.id;
  const index = parseInt(taskId.slice(-1), 10);
  tasksList[index - 1].description = textInput.value;
  localStorage.setItem('tasks', JSON.stringify(tasksList));
};

export const handleCheckbox = (checkbox) => {
  const tasks = JSON.parse(localStorage.getItem('tasks'));
  const index = parseInt(checkbox.id.slice(-1), 10);
  tasks[index - 1].completed = checkbox.checked;
  localStorage.setItem('tasks', JSON.stringify(tasks));
};

export const focus = (task) => {
  task.classList.add('focus');
  const deleteIcon = task.lastElementChild;
  const dotsIcon = task.querySelector('.dots-icon');
  dotsIcon.classList.remove('active');
  deleteIcon.classList.add('active');
};

export const blur = (task) => {
  task.classList.remove('focus');
  const deleteIcon = task.lastElementChild;
  const dotsIcon = task.querySelector('.dots-icon');
  dotsIcon.classList.add('active');
  deleteIcon.classList.remove('active');
};

export const removeTask = (task) => {
  const tasksListEl = task.parentNode;
  let tasksList = JSON.parse(localStorage.getItem('tasks'));
  tasksListEl.removeChild(task);
  const index = parseInt(task.id.slice(-1), 10);
  tasksList = tasksList.filter((task) => task.index !== index);
  const newTasksList = tasksList.map((task, i) => {
    task.index = i + 1;
    return task;
  });
  localStorage.setItem('tasks', JSON.stringify(newTasksList));
};