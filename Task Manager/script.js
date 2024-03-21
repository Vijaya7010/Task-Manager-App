// Retrieve tasks from local storage
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

// Function to display tasks
function displayTasks() {
    const taskList = document.getElementById('taskList');
    taskList.innerHTML = '';
    tasks.forEach((task, index) => {
        const li = document.createElement('li');
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.checked = task.completed;
        checkbox.addEventListener('change', () => {
            toggleCompletion(index);
        });
        li.appendChild(checkbox);
        li.appendChild(document.createTextNode(task.name + (task.deadline ? ` (Deadline: ${task.deadline})` : '')));
        const deleteIcon = document.createElement('span');
        deleteIcon.classList.add('delete-icon');
        deleteIcon.innerHTML = '&#10006;';
        deleteIcon.addEventListener('click', () => {
            deleteTask(index);
        });
        li.appendChild(deleteIcon);
        taskList.appendChild(li);
    });
}

// Function to add a new task
function addTask() {
    const taskInput = document.getElementById('taskInput');
    const deadlineInput = document.getElementById('deadlineInput');
    const taskName = taskInput.value.trim();
    const deadlineValue = deadlineInput.value.trim();
    if (taskName !== '') {
        tasks.push({ name: taskName, deadline: deadlineValue, completed: false });
        localStorage.setItem('tasks', JSON.stringify(tasks));
        displayTasks();
        taskInput.value = '';
        deadlineInput.value = '';
    }
}

// Function to toggle task completion
function toggleCompletion(index) {
    tasks[index].completed = !tasks[index].completed;
    localStorage.setItem('tasks', JSON.stringify(tasks));
    displayTasks();
}

// Function to delete a task
function deleteTask(index) {
    tasks.splice(index, 1);
    localStorage.setItem('tasks', JSON.stringify(tasks));
    displayTasks();
}

// Function to filter tasks
function filterTasks(filterType) {
    let filteredTasks;
    if (filterType === 'completed') {
        filteredTasks = tasks.filter(task => task.completed);
    } else if (filterType === 'active') {
        filteredTasks = tasks.filter(task => !task.completed);
    } else {
        filteredTasks = tasks;
    }
    displayFilteredTasks(filteredTasks);
}

function displayFilteredTasks(filteredTasks) {
    const taskList = document.getElementById('taskList');
    taskList.innerHTML = '';
    filteredTasks.forEach((task, index) => {
        const li = document.createElement('li');
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.checked = task.completed;
        checkbox.addEventListener('change', () => {
            toggleCompletion(index);
        });
        li.appendChild(checkbox);
        li.appendChild(document.createTextNode(task.name + (task.deadline ? ` (Deadline: ${task.deadline})` : '')));
        const deleteIcon = document.createElement('span');
        deleteIcon.classList.add('delete-icon');
        deleteIcon.innerHTML = '&#10006;';
        deleteIcon.addEventListener('click', () => {
            deleteTask(index);
        });
        li.appendChild(deleteIcon);
        taskList.appendChild(li);
    });
}
// Function to initialize flatpickr for deadline input field
const deadlineInput = document.getElementById('deadlineInput');
const flatpickrInstance = flatpickr(deadlineInput, {
    enableTime: true,
    dateFormat: "Y-m-d H:i",
});

// Initial display of tasks
displayTasks();
