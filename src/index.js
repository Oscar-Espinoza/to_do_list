import './styles/main.scss';
import {
  addTaskDom,
  addTaskStorage,
  removeCompletedTasks,
  updateTask,
  createTasksList,
}
from './functionality.js';

createTasksList(addTaskDom);

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