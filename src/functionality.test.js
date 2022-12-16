import mountDOM from 'jsdom-mount';
import { addTaskDom, addTaskStorage, removeTasks, updateTask, handleCheckbox } from './functionality.js';

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
    const textInput = document.getElementById('text-1')
    textInput.value = 'something different'
    const newText = updateTask(textInput)
    console.log(newText);
    expect(initialDescription).not.toBe(newText)
  })


});
