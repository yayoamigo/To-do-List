import './styles.css';
import updateTaskArray from './modules.js';
import { removeTasks, Tasks, fillList } from './addRemove.js';
import Sortable from 'sortablejs';

const body = document.getElementById('item-list');
const form = document.getElementById('new-task-form');
const clearBtn = document.getElementById('clear-btn');




//Sortable library for drag and drop 
Sortable.create(body, {
  animation: 150,
  chosenClass: "selected",
  dragClass: "drag",
  onEnd: () => {
    
    
  },
  group: 'taskArray2',
  store: {
    set: (sortable) => {
      const order = sortable.toArray();
      const x = JSON.parse(localStorage.getItem('taskArray'));
      const tempArr = [];
      order.forEach((item)=> {
        const newOrder = x.find((obj) => obj.index == item);
        tempArr.push(newOrder);
      })
      tempArr.forEach((item, index) => {
        item.index = index + 1;
      });
  localStorage.setItem('taskArray', JSON.stringify(tempArr));
  },
  
  }
});

// When the user submits a new task we create a new instance of the task obj, and call the methods
// to add that task to local storage
form.addEventListener('submit', (e) => {
  e.preventDefault();
  const taskInput = document.getElementById('new-task-input');
  if (taskInput.value === '' || taskInput.value === null) {
    return;
  }
  const newTask = new Tasks(taskInput.value);
  fillList(newTask);
  Tasks.taskPush(newTask);
  localStorage.setItem('taskArray', JSON.stringify(Tasks.taskObj));
  taskInput.value = '';
});

body.addEventListener('click', (e) => {
  const task = e.target.parentElement;
  const id = e.target.getAttribute('id');
  if (e.target.classList.contains('remove')) {
    removeTasks(task);
    Tasks.removeTask(e.target);
  }
  // task will be edited when first the input field of task is updated and then edit icon is clicked
  if (e.target.classList.contains('edit')) {
    const input = task.querySelector('.description-input');
    input.removeAttribute('readonly');
    input.focus();
    input.addEventListener('blur', (e) => {
      input.setAttribute('readonly', true);
      const x = JSON.parse(localStorage.getItem('taskArray'));
      const filterIndex = x.findIndex((x) => x.description === id);
      x[filterIndex].description = e.target.value;
      localStorage.setItem('taskArray', JSON.stringify(x));
    });
  }
  // When the user clicks on the checkbox the obj updates to checked
  if (e.target.classList.contains('checkbox')) {
    const tasks = JSON.parse(localStorage.getItem('taskArray'));
    updateTaskArray(e.target, tasks);
  }
});

// Function for clearing all the completed tasks
clearBtn.addEventListener('click', () => {
  const tasks = JSON.parse(localStorage.getItem('taskArray'));
  const filterTasks = tasks.filter((task) => !task.completed);
  localStorage.setItem('taskArray', JSON.stringify(filterTasks));
  window.location.reload();
});

// Function for displaying the taks from the local storage
const displayTasks = () => {
  const tasks = JSON.parse(localStorage.getItem('taskArray'));
  tasks.forEach((x) => fillList(x));
  const completedTasksIndex = tasks.filter((task) => task.completed === true);
  for (let i = 0; i < completedTasksIndex.length; i += 1) {
    for (let j = 0; j < (body.children).length; j += 1) {
      if (j === (completedTasksIndex[i].index - 1)) {
        body.children[j].children[0].checked = true;
      }
    }
  }
};

window.addEventListener('DOMContentLoaded', displayTasks);