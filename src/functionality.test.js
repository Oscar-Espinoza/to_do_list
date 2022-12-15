import mountDOM from 'jsdom-mount';
import { addTaskDom } from './functionality.js';

//import { removeTasks } from './util';

jest.mock('./functionality');


describe('todo ADD and REMOVE functionalities', () => {
  test('ADD function', () => {
    mountDOM(`
        <ul id='list'>
          <li></li>
        </ul>
      `
    );
    const description = 'some description';
    const index = 1;
    const completed = false;
    const list = document.getElementById('list');
    addTaskDom(description, index, completed);
    expect(list.children.length).toBe(2);
  });

});