
import { Tasks, removeTasks, fillList } from './addRemove';

const localStorageMock = (function () {
  let store = {};
  return {
    getItem(key) {
      return store[key];
    },

    setItem(key, value) {
      store[key] = value;
    },

    clear() {
      store = {};
    },

    removeItem(key) {
      delete store[key];
    },

    getAll() {
      return store;
    },
  };
}());

document.body.innerHTML = `<div id="list">
<form id="new-task-form">
 <input id="new-task-input" placeholder="Add to your list..." type="text">
 <button type="submit" class="button"> <i class="fa-solid fa-right-to-bracket"></i> </button>
</form>  
<div class="list-div"> 
 <ul id="item-list" class="task"> 
  </ul>
</div>
</div>`;

Object.defineProperty(window, 'localStorage', { value: localStorageMock });

describe('Add and remove functions', () => {
  test('Adds a new li element to the Dom', () => {
    const body = document.getElementById('item-list');
    const newTask = new Tasks('Boy a car');
    fillList(newTask);
    expect(body.querySelectorAll('li').length).toBe(1);
  });

  test('Removes and element from the local storage', () => {
    const body = document.getElementById('item-list');
    const newTask = new Tasks('buy a cat');
    Tasks.taskPush(newTask);
    localStorage.setItem('taskArray', JSON.stringify(Tasks.taskObj));
    fillList(newTask);
    const li = body.querySelector('li');
    removeTasks(li);
    expect(JSON.parse(localStorage.getItem('taskArray'))).toHaveLength(0);
  });
});
