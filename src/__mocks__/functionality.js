/* eslint-disable import/prefer-default-export */
export const addTaskDom = (description, index, completed, list) => {
  const newTask = document.createElement('li');
  newTask.classList.add('task');
  newTask.id = `task-${index}`;
  newTask.innerHTML = `
    <input type='checkbox' name='task-completed' id='check-${index}' ${completed ? 'checked' : ''}>
    <input type='text' name='task-text' id='text-${index}' class='description text-input' value=${description}>
    <img src='./images/dots.png' alt='three dots icon' id='move-${index}' class='dots-icon active' draggable='true'>
    <img src='./images/delete.png' alt='delete icon' id='delete-${index}' class='delete-icon'>
  `;
  list.insertBefore(newTask, list.lastChild);
  return newTask;
};

const localStorageMock = (() => {
  let store = {};

  return {
    getItem(key) {
      return store[key];
    },

    setItem(key, value) {
      store[key] = value;
    },

    clear() {
      store = {};
    },

    removeItem(key) {
      delete store[key];
    },

    getAll() {
      return store;
    },
  };
})();

export const addTaskStorage = (description) => {
  let taskList = localStorageMock.getItem('tasks');
  if (taskList === null || taskList === undefined) {
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
  localStorageMock.setItem('tasks', JSON.stringify(taskList));
  return taskList;
};

Object.defineProperty(window, 'localStorage', { value: localStorageMock });

export const removeTasks = (tasks) => {
  const tasksListEl = document.getElementById('list');
  let tasksList = JSON.parse(localStorageMock.getItem('tasks'));
  tasks.forEach((task) => {
    tasksListEl.removeChild(task);
    const index = parseInt(task.id.slice(-1), 10);
    tasksList = tasksList.filter((item) => item.index !== index);
  });
  localStorageMock.setItem('tasks', JSON.stringify(tasksList));
};

export const updateTask = (textInput) => {
  const tasksList = JSON.parse(localStorageMock.getItem('tasks'));
  const taskId = textInput.parentNode.id;
  const index = parseInt(taskId.slice(-1), 10);
  tasksList[index - 1].description = textInput.value;
  localStorageMock.setItem('tasks', JSON.stringify(tasksList));
  return textInput.value
};
