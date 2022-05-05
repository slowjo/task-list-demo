const newTaskForm = document.querySelector('.new-task-form');
const newTaskInput = document.querySelector('.new-task-input');
const tasksContainer = document.querySelector('.tasks');

let taskList = JSON.parse(localStorage.getItem('tasklist')) || [];

tasksContainer.addEventListener('click', (e) => {
    if (e.target.classList.contains('hidden-checkbox')) {
        const selectedTask = taskList.find((task) => task.id === e.target.id);
        selectedTask.complete = e.target.checked;
        save();
    }

    if (e.target.classList.contains('delete-button')) {
        const selectedTask = e.target.parentElement;
        const taskId = selectedTask.children[0].id;
        taskList = taskList.filter((task) => task.id !== taskId);
        saveAndRender();
    }
});

newTaskForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const taskName = newTaskInput.value;
    if (taskName == null || taskName === '') return;
    const task = {
        id: Date.now().toString(),
        name: taskName,
        complete: false,
    };
    newTaskInput.value = null;
    taskList.push(task);
    saveAndRender();
});

function saveAndRender() {
    save();
    while(tasksContainer.firstChild) {
        tasksContainer.removeChild(tasksContainer.firstChild);
    }
    renderTasks();
}

function save() {
    localStorage.setItem('tasklist', JSON.stringify(taskList));
}

function renderTasks() {
    taskList.forEach((task) => {
        const taskElement = document.createElement('div');
        taskElement.classList.add('task');
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.classList.add('hidden-checkbox');
        checkbox.id = task.id;
        checkbox.checked = task.complete;
        taskElement.appendChild(checkbox);
        const label = document.createElement('label');
        label.htmlFor = task.id;
        const customCheckbox = document.createElement('span');
        customCheckbox.classList.add('custom-checkbox');
        label.appendChild(customCheckbox);
        label.append(task.name);
        taskElement.appendChild(label);
        const button = document.createElement('button');
        button.classList.add('btn');
        button.classList.add('delete-button');
        button.innerHTML = '&times;';
        taskElement.appendChild(button);
        tasksContainer.appendChild(taskElement);
    });
}

renderTasks();
