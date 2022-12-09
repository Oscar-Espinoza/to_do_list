// import _ from 'lodash';
import './styles/main.scss';
import { 
  addTaskDom, 
  addTaskStorage, 
  removeCompletedTasks, 
  updateTask } 
from './functionality.js';

const createTasksList = () => {
  let tasks = localStorage.getItem('tasks');
  if (tasks != null) {
    tasks = JSON.parse(tasks);
    tasks.forEach((task) => {
      addTaskDom(task.description, task.index, task.completed);
    })
  }
}

createTasksList();

document.querySelectorAll('input[type="checkbox"]').forEach(checkbox => {
  checkbox.addEventListener('change', (e) => {
    const tasks = JSON.parse(localStorage.getItem('tasks'));
    const index = parseInt(e.target.id.slice(-1));
    tasks[index - 1].completed = e.target.checked;
    localStorage.setItem('tasks', JSON.stringify(tasks));
  });
});


document.getElementById('new-task').addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    const newTask = addTaskStorage(e.target.value);
    e.target.value = '';
    addTaskDom(newTask.description, newTask.index);
  }
});

document.querySelectorAll('input[name="task-text"]').forEach(textInput => {
  textInput.addEventListener('change', (e) => {
    updateTask(textInput);
  });
});

document.getElementById('remove-completed').addEventListener('click', () => {
  removeCompletedTasks();
});