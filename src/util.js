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