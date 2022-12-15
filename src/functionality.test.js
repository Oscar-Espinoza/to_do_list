import mountDOM from 'jsdom-mount';
import { addTaskDom, addTaskStorage, removeTasks } from './functionality.js';

jest.mock('./functionality');

describe('todo ADD and REMOVE functionalities', () => {
  mountDOM(
    `<ul id='list'>
      <li></li>
    </ul>`);
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
