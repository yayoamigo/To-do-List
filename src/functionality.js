import './styles.css';
import updateTaskArray from './modules.js';

const body = document.getElementById('item-list');
const form = document.getElementById('new-task-form');
const clearBtn = document.getElementById('clear-btn');

// First we need a task class to create the array for our new tasks and the methods to add and
// remove those tasks to and from the
// local storage
class Tasks {
  static taskObj = [];

  constructor(description) {
    this.description = description;
    this.completed = false;
    this.index = Tasks.taskObj.length + 1;
  }

  static taskPush(newTask) {
    Tasks.taskObj.push(newTask);
  }

  static removeTask(element) {
    element.parentElement.remove();
  }
}

// This function gets call and insert the new task into the HTML
const fillList = (newTask) => {
  const content = `<li>
    <input type="checkbox" class="checkbox"  id="${newTask.description}">
    <label class="label" for="${newTask.description}">
    <span class="custom-checkbox"></span>
    <input type="text" class="description-input" value="${newTask.description}" readonly="">
    </label>
  <button class="edit" id="1${newTask.description}"> edit</button>
  <button class="remove"> remove</button>
  </li>`;
  body.insertAdjacentHTML('beforeend', content);
};

// When the user submits a new task we create a new instance of the task obj, and call the methods
// to add that task to local storage
form.addEventListener('submit', (e) => {
  e.preventDefault();
  const taskInput = document.getElementById('new-task-input');
  const newTask = new Tasks(taskInput.value);
  fillList(newTask);
  Tasks.taskPush(newTask);
  localStorage.setItem('taskArray', JSON.stringify(Tasks.taskObj));
  taskInput.value = '';
});

// Function for emoving the task from the local storage
const removeTasks = (task) => {
  const taskDesc = task.querySelector('input').value;
  const x = JSON.parse(localStorage.getItem('taskArray'));
  const filterIndex = x.findIndex((x) => x.description === taskDesc);
  x.splice(filterIndex, 1);
  x.forEach((item, index) => {
    item.index = index + 1;
  });
  localStorage.setItem('taskArray', JSON.stringify(x));
};

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