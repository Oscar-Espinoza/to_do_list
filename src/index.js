// import _ from 'lodash';
import './styles/main.scss';

const tasks = [
  {
    descrition: 'Wash dishes',
    completed: false,
    index: 0,
  },
  {
    descrition: 'Complete To do list project',
    completed: false,
    index: 1,
  },
];

const addTask = (task) => {
  const taskList = document.getElementById('tasks-list');
  const newTask = document.createElement('li');
  newTask.classList.add('task');
  newTask.id = `task-${task.id}`;
  newTask.innerHTML = `
  <input type='checkbox' name='isTaskCompleted' id='check-${task.id}' value='${task.completed}'>
  <p class='description'>${task.descrition}</p>
  <img src='../src/images/dots.png' alt='three dots icon' class='three-dots'>
  `;
  taskList.insertBefore(newTask, taskList.lastChild);
};

tasks.forEach((task) => {
  addTask(task);
});
