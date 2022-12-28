const arrayUpdate = (draggedIndex, dropIndex) => {
  const tasksList = JSON.parse(localStorage.getItem('tasks'))
};

export const drop = (task, mouseYPosition) => {
  const taskList = task.parentNode;
  const taskProperties = task.getBoundingClientRect();
  const draggedTask = document.querySelector('.dragging');

  if (mouseYPosition <= (taskProperties.y + (taskProperties.height/2))) {
    taskList.insertBefore(draggedTask, task);
  } else {
    taskList.insertBefore(draggedTask, task.nextSibling);
  }
};