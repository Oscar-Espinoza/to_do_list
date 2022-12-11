/* eslint-disable no-use-before-define */
import {
  updateTask, handleCheckbox, focus, blur,
} from './updateTask.js';

const removeTask = (task) => {
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
  createTasksList();
};

export const addTaskDom = (description, index, completed) => {
  const taskList = document.getElementById('tasks-list');
  const newTask = document.createElement('li');
  newTask.classList.add('task');
  newTask.id = `task-${index}`;
  newTask.innerHTML = `
  <input type='checkbox' name='task-completed' id='check-${index}' ${completed ? 'checked' : ''}>
  <input type='text' name='task-text' class='description text-input' value=${description}>
  <img src='./images/dots.png' alt='three dots icon' id='move-${index}' class='dots-icon active' draggable='true'>
  <img src='./images/delete.png' alt='delete icon' id='delete-${index}' class='delete-icon'>
  `;
  newTask.querySelector('input[type=checkbox]').addEventListener('change', (e) => {
    const checkbox = e.target;
    handleCheckbox(checkbox);
  });
  newTask.querySelector('input[type=text]').addEventListener('focus', (e) => {
    focus(e.target.parentNode);
  });
  newTask.querySelector('input[type=text]').addEventListener('change', (e) => {
    updateTask(e.target);
  });
  newTask.querySelector('input[type=text]').addEventListener('blur', (e) => {
    blur(e.target.parentNode);
  });
  newTask.querySelector('.delete-icon').addEventListener('mousedown', (e) => {
    removeTask(e.target.parentNode);
  });
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

export const createTasksList = () => {
  let tasks = localStorage.getItem('tasks');
  const tasksList = document.getElementById('tasks-list');
  [...tasksList.children].forEach((element) => {
    if (element.classList.contains('task')) {
      tasksList.removeChild(element);
    }
  });
  if (tasks !== null) {
    tasks = JSON.parse(tasks);
    tasks.forEach((task) => {
      addTaskDom(task.description, task.index, task.completed);
    });
  }
};

export const removeCompletedTasks = () => {
  const checkedBoxes = document.querySelectorAll('input[type="checkbox"]:checked');
  if (checkedBoxes.length > 0) {
    const tasksListEl = document.getElementById('tasks-list');
    let tasksList = JSON.parse(localStorage.getItem('tasks'));
    checkedBoxes.forEach((checkbox) => {
      tasksListEl.removeChild(checkbox.parentNode);
      const index = parseInt(checkbox.id.slice(-1), 10);
      tasksList = tasksList.filter((task) => task.index !== index);
    });
    const newTasksList = tasksList.map((task, i) => {
      task.index = i + 1;
      return task;
    });
    localStorage.setItem('tasks', JSON.stringify(newTasksList));
  }
};