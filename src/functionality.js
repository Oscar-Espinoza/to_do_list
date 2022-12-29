/* eslint-disable no-use-before-define */
import {
  focus, blur,
} from './util.js';

import { drop } from './dragAndDrop.js';

export const updateTask = (textInput) => {
  const tasksList = JSON.parse(localStorage.getItem('tasks'));
  const taskId = textInput.parentNode.id;
  const index = parseInt(taskId.slice(-1), 10);
  tasksList[index - 1].description = textInput.value;
  localStorage.setItem('tasks', JSON.stringify(tasksList));
};

export const addTaskDom = (description, index, completed) => {
  const taskList = document.getElementById('tasks-list');
  const newTask = document.createElement('li');
  newTask.classList.add('task');
  newTask.id = `task-${index}`;
  newTask.draggable = true;
  newTask.innerHTML = `
    <input type='checkbox' name='task-completed' id='check-${index}' ${completed ? 'checked' : ''}>
    <input type='text' name='task-text' class='description text-input' value=${description}>
    <img src='./images/dots.png' alt='three dots icon' id='move-${index}' class='dots-icon active' draggable='false'>
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
    removeTasks([e.target.parentNode]);
    createTasksList();
  });
  newTask.addEventListener('dragstart', () => {
    newTask.classList.add('dragging');
    document.querySelectorAll('.task').forEach((task) => {
      [...task.children].forEach((children) => {
        children.classList.add('waitingDrop');
      });
    });
  });
  newTask.addEventListener('dragend', () => {
    newTask.classList.remove('dragging');
    document.querySelectorAll('.task').forEach((task) => {
      [...task.children].forEach((children) => {
        children.classList.remove('waitingDrop');
      });
    });
  });
  newTask.addEventListener('dragover', (e) => {
    e.preventDefault();
  });
  newTask.addEventListener('drop', (e) => {
    drop(e.target, e.clientY);
    createTasksList();
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

export const removeTasks = (tasks) => {
  const tasksListEl = document.getElementById('tasks-list');
  let tasksList = JSON.parse(localStorage.getItem('tasks'));
  tasks.forEach((task) => {
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

export const removeCompletedTasks = () => {
  const checkedBoxes = document.querySelectorAll('input[type="checkbox"]:checked');
  const tasksToDelete = [];
  if (checkedBoxes.length > 0) {
    checkedBoxes.forEach((checkbox) => {
      tasksToDelete.push(checkbox.parentNode);
    });
    removeTasks(tasksToDelete);
  }
};

export const handleCheckbox = (checkbox) => {
  const tasks = JSON.parse(localStorage.getItem('tasks'));
  const index = parseInt(checkbox.id.slice(-1), 10);
  tasks[index - 1].completed = checkbox.checked;
  localStorage.setItem('tasks', JSON.stringify(tasks));
};