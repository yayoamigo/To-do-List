const updateTaskArray = (element, tasks) => {
  element.addEventListener('change', (e) => {
    const taskIndex = tasks.findIndex((x) => x.description === e.target.id);
    if (e.target.checked) {
      tasks[taskIndex].completed = true;
    } else {
      tasks[taskIndex].completed = false;
    }
    localStorage.setItem('taskArray', JSON.stringify(tasks));
  });
};

export default updateTaskArray;