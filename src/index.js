import './styles/main.scss';
import {
  addTaskDom,
  addTaskStorage,
  removeCompletedTasks,
  createTasksList,
}
from './functionality.js';

createTasksList();

document.getElementById('new-task').addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    const newTask = addTaskStorage(e.target.value);
    e.target.value = '';
    addTaskDom(newTask.description, newTask.index);
  }
});

document.getElementById('remove-completed').addEventListener('click', () => {
  removeCompletedTasks();
  createTasksList();
});