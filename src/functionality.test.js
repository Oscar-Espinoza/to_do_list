import mountDOM from 'jsdom-mount';
import {
  addTaskDom, addTaskStorage, removeTasks, updateTask, handleCheckbox, removeCompletedTasks,
} from './functionality.js';

jest.mock('./functionality');

describe('todo ADD and REMOVE functionalities', () => {
  mountDOM(
    `<ul id='list'>
      <li></li>
    </ul>`,
  );
  test('ADD function', () => {
    const description = 'some description';
    const index = 1;
    const completed = false;
    const list = document.getElementById('list');
    addTaskDom(description, index, completed, list);
    addTaskStorage(description);
    expect(list.children.length).toBe(2);
  });

  test('REMOVE function', () => {
    const task = document.getElementById('task-1');
    removeTasks([task]);
    const list = document.getElementById('list');
    expect(list.children.length).toBe(1);
  });
});

describe('handleCheckbox and updateTask functions', () => {
  test('updateTask function', () => {
    const initialDescription = 'some description';
    const index = 1;
    const completed = false;
    const list = document.getElementById('list');
    addTaskDom(initialDescription, index, completed, list);
    addTaskStorage(initialDescription);
    const textInput = document.getElementById('text-1');
    textInput.value = 'something different';
    const newText = updateTask(textInput);
    expect(initialDescription).not.toBe(newText);
  });

  test('handle checkbox', () => {
    const checkbox = document.getElementById('check-1');
    checkbox.click();
    const checkboxValue = handleCheckbox(checkbox);
    expect(checkboxValue).toBe(true);
  });

  test('check Clear all completed', () => {
    const checkbox = document.getElementById('check-1');
    removeCompletedTasks([checkbox]);
    const checkboxArray = document.querySelectorAll('input[type="checkbox"]:checked');
    expect(checkboxArray).toHaveLength(0);
  });
});
