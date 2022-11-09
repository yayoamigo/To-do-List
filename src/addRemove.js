// Function for emoving the task from the local storage
export const removeTasks = (task) => {
  const taskDesc = task.querySelector('input').value;
  const x = JSON.parse(localStorage.getItem('taskArray'));
  const filterIndex = x.findIndex((x) => x.description === taskDesc);
  x.splice(filterIndex, 1);
  x.forEach((item, index) => {
    item.index = index + 1;
  });
  localStorage.setItem('taskArray', JSON.stringify(x));
};

// First we need a task class to create the array for our new tasks and the methods to add and
// remove those tasks to and from the
// local storage
export class Tasks {
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
export const fillList = (newTask) => {
  const body = document.getElementById('item-list');
  const content = `<li>
    <input type="checkbox" class="checkbox"  id="${newTask.description}">
    <label class="label" for="${newTask.description}">
    <span class="custom-checkbox"></span>
    <input type="text" class="description-input" value="${newTask.description}" readonly="">
    </label>
  <i class="fa-solid fa-pen-to-square edit" id="1${newTask.description}"></i>
  <i class="fa-solid fa-trash-can remove"></i>
  </li>`;
  body.insertAdjacentHTML('beforeend', content);
};