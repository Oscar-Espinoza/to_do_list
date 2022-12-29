const arrayUpdate = (draggedIndex, dropIndex) => {
  const tasksList = JSON.parse(localStorage.getItem('tasks'))
  const temp = tasksList[draggedIndex]
  if (draggedIndex < dropIndex) {  
    for (let i = draggedIndex; i <= dropIndex; i += 1) {
      
      if (i !== dropIndex) {
        tasksList[i] = tasksList[i + 1];
        tasksList[i].index = i + 1
      } else {
        temp.index = i + 1
        tasksList[i] = temp;
      }    
    }
  } else if (draggedIndex > dropIndex) {
    for (let i = draggedIndex; i >= dropIndex; i -= 1) {      
      if (i !== dropIndex) {
        tasksList[i] = tasksList[i - 1];
        tasksList[i].index = i + 1
      } else {
        temp.index = i + 1
        tasksList[i] = temp;
      }    
    }
  }
  localStorage.setItem('tasks', JSON.stringify(tasksList))
};

export const drop = (task, mouseYPosition) => {
  const taskList = task.parentNode;
  const taskProperties = task.getBoundingClientRect();
  const draggedTask = document.querySelector('.dragging');
  const draggedIndex = parseInt(draggedTask.id.slice(-1)) - 1
  const dropIndex = parseInt(task.id.slice(-1)) - 1

  if (mouseYPosition <= (taskProperties.y + (taskProperties.height/2))) {
    taskList.insertBefore(draggedTask, task);
    arrayUpdate(draggedIndex, dropIndex)
  } else {
    taskList.insertBefore(draggedTask, task.nextSibling);
    arrayUpdate(draggedIndex, dropIndex)
  }
};