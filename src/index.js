import './styles.css';

const body = document.getElementById('item-list');
const form = document.getElementById('new-task-form');

//First we need a task class to create the array for our new tasks and the methods to add and remove those tasks to and from the 
//local storage
class tasks {

  static taskObj = [];

  constructor(description){
    this.description = description;
    this.completed = false;
    this.index = tasks.taskObj.length + 1;
  }

  static taskPush(newTask){
    tasks.taskObj.push(newTask);
  }

  static removeTask(element){
    element.parentElement.remove();
  }

}

//When the user submits a new task we create a new instance of the task obj, and call the methods to add that task to local storage
form.addEventListener('submit', (e) => {
  e.preventDefault();
  const taskInput = document.getElementById('new-task-input');
  const newTask = new tasks(taskInput.value);
  fillList(newTask);
  tasks.taskPush(newTask);
  localStorage.setItem('taskArray', JSON.stringify(tasks.taskObj));
  taskInput.value = '';
});

//This function gets call and insert the new task into the HTML
const fillList = (newTask) => {
  const content = `<li>
  <button class="${newTask.completed}"> 
  <i class="fa-regular fa-square"></i>
  </button>
  <div class="view">
  <label class="label" id="description-input">${newTask.description}</label>
  </div>
  <button class="remove-btn"> remove</button>
  <button class="${newTask.index}"> <i class="fa-solid fa-ellipsis-vertical"></i></button>
  </li>`;
  body.insertAdjacentHTML('beforeend', content);
};

//Function for emoving the task from the local storage
const removeTasks = (task) => {
  const taskDesc = task.querySelector('#description-input').innerText;
  const x = JSON.parse(localStorage.getItem('taskArray'));
  const filterIndex = x.findIndex((x) => x.description === taskDesc);
  x.splice(filterIndex, 1);
  x.forEach((item, index) => {
    item.index = index + 1;
  });
  localStorage.setItem('taskArray', JSON.stringify(x));
};

//Even for actually removing the task from the UI and the local storage when the remove btn gets clicked
body.addEventListener('click', (e) => {
  const task = e.target.parentElement;
  removeTasks(task);
  tasks.removeTask(e.target);
});

//Function for displaying the taks from the local storage
const displayTasks = () => {
  const tasks = JSON.parse(localStorage.getItem('taskArray'));
  tasks.forEach((x) => fillList(x));
};

window.addEventListener('DOMContentLoaded', displayTasks);