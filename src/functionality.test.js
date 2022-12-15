import mountDOM from 'jsdom-mount';
import { addTaskDom, addTaskStorage } from './functionality';

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
    const list = document.getElementById('list')
    console.log(list.children.length);
    addTaskDom(description, index, completed, list)
    addTaskStorage(description);
    expect(list.children.length).toBe(2)
  });

  test('REMOVE function', () =>  {
    
  })
});
