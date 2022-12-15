jest.mock('./functionality')

import mountDOM from 'jsdom-mount';
import { addTaskDom } from './functionality';
import { removeTasks } from './util';

describe('todo ADD and REMOVE functionalities', () => {
  test('ADD function', () => {
    mountDOM(`<ul id="list"><li></li></ul>`);
    const description = 'some description';
    const index = 1;
    const completed = false;
    const list = document.getElementById('list')
    console.log(list.children.length);
    addTaskDom(description, index, completed, list)    
    expect(list.children.length).toBe(2)
  });
});