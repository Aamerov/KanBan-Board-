// Elements of Not-Started list
const notStartedArea = document.getElementById('not-started-area');
const addNSTaskButton = notStartedArea.querySelector('.addbtn');

// Elements of In-Progress list
const inProgressArea = document.getElementById('in-progress-area');
const addInProTaskButton = inProgressArea.querySelector('.addbtn');

// Elements of Finished list
const finishedArea = document.getElementById('finished-area');
const addFinishedTaskButton = finishedArea.querySelector('.addbtn');
// General function to add new task by providing the list name

const tasksLists = document.querySelectorAll('.tasks_area');
// const notStartedArea_tasks = [];
// const inProgressArea_tasks = [];
// const finishedArea_tasks = [];
// localStorage.setItem('notStartedArea', notStartedArea_tasks);
// localStorage.setItem('inProgressArea', inProgressArea_tasks);
// localStorage.setItem('finishedArea', finishedArea_tasks);
const newTaskHandler = (list, name) => {
  const newTask = document.createElement('div');
  newTask.className = 'task draggable';
  const generatedID1 = Math.random();
  const generatedID2 = Math.random();
  newTask.setAttribute('id', generatedID2);
  newTask.setAttribute('draggable', true);
  const taskId = newTask.getAttribute('id');
  newTask.insertAdjacentHTML(
    'beforeend',
    `<p id=${generatedID1}> New Task!</p>
    <div class="twobtn">
    <button class="tbtn editbtn" onclick="editTaskContentHandler(${generatedID1})"><ion-icon name="create"></ion-icon></button>
    <button class="tbtn deletebtn" onclick="deleteTaskHandler(${generatedID2})"><ion-icon name="trash-bin"></ion-icon></button>
    </div>`
  );
  list.insertBefore(newTask, list.lastElementChild);
  const draggable = document.getElementById(generatedID2);
  draggable.addEventListener('dragstart', () => {
    draggable.classList.add('dragging');
  });
  draggable.addEventListener('dragend', () => {
    draggable.classList.remove('dragging');
  });
  // localStorage.key[name].append({ info: 'New Task!' });
  // let p = document.getElementById(generatedID1);
  // const config = {
  //   childList: true,
  //   attributes: true,
  //   characterData: true,
  //   subtree: true,
  //   attributeOldValue: true,
  //   characterDataOldValue: true,
  // };
  // const observer = new MutationObserver((list) => {
  //   console.log(list[0].target.textContent);
  //   localStorage.key[name].setItem({ info: 'New Task!' });
  // });

  tasksLists.forEach((list) => {
    list.addEventListener('dragover', (e) => {
      e.preventDefault;
      const afterElement = positionIndicator(list, e.clientY);
      const draggable = document.querySelector('.dragging');
      if (afterElement == null) {
        list.insertBefore(draggable, list.lastElementChild);
      } else {
        list.insertBefore(draggable, afterElement);
      }
    });
  });
};
function positionIndicator(list, y) {
  const draggableElements = [
    ...list.querySelectorAll('.draggable:not(.dragging)'),
  ];
  return draggableElements.reduce(
    (closest, child) => {
      const box = child.getBoundingClientRect();
      const offset = y - box.top - box.height / 2;
      // console.log(offset);
      if (offset < 0 && offset > closest.offset) {
        return { offset: offset, element: child };
      } else {
        return closest;
      }
    },
    {
      offset: Number.NEGATIVE_INFINITY,
    }
  ).element;
}

//Functions to delete & Edit tasks by ID

const editTaskContentHandler = (id) => {
  const taskElement = document.getElementById(id);

  if (taskElement.getAttribute('contenteditable', false)) {
    taskElement.removeAttribute('contenteditable');
  } else {
    taskElement.setAttribute('contenteditable', true);
  }
  taskElement.focus();
};

const deleteTaskHandler = (id) => {
  const taskElement = document.getElementById(id);
  taskElement.remove();
};

// Assigning Add Buttons Function for each list

const addNSTask = () => {
  newTaskHandler(notStartedArea, 'notStartedArea');
};
const addInProTask = () => {
  newTaskHandler(inProgressArea, 'inProgressArea');
};
const addFinishedTask = () => {
  newTaskHandler(finishedArea, 'finishedArea');
};

// Add Buttons Triggers
addNSTaskButton.addEventListener('click', addNSTask);
addInProTaskButton.addEventListener('click', addInProTask);
addFinishedTaskButton.addEventListener('click', addFinishedTask);
