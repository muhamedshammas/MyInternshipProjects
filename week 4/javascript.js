document.addEventListener('DOMContentLoaded', function () {
    const taskForm = document.getElementById('taskForm');
    const taskInput = document.getElementById('taskInput');
    const taskList = document.getElementById('taskList');

    taskForm.addEventListener('submit', function (e) {
        e.preventDefault();
        addTask(taskInput.value);
        taskInput.value = '';
    });

    taskList.addEventListener('click', function (e) {
        if (e.target.classList.contains('checkbox')) {
            toggleTask(e.target.parentNode);
        } else if (e.target.tagName === 'BUTTON') {
            deleteTask(e.target.parentNode);
        }
    });

    function addTask(taskText) {
        const li = document.createElement('li');
        li.innerHTML = `
            <div class="checkbox"></div>
            <span>${taskText}</span>
            <button>Delete</button>
        `;
        taskList.appendChild(li);
        updateLocalStorage();
    }

    function deleteTask(taskItem) {
        taskItem.remove();
        updateLocalStorage();
    }

    function toggleTask(taskItem) {
        taskItem.classList.toggle('completed');
        const checkbox = taskItem.querySelector('.checkbox');
        checkbox.classList.toggle('checked');
        updateLocalStorage();
    }

    function updateLocalStorage() {
        const tasks = [];
        document.querySelectorAll('li').forEach(taskItem => {
            tasks.push({
                text: taskItem.querySelector('span').innerText,
                completed: taskItem.classList.contains('completed')
            });
        });
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    function loadTasks() {
        const storedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
        storedTasks.forEach(task => {
            addTaskFromStorage(task);
        });
    }

    function addTaskFromStorage(task) {
        const li = document.createElement('li');
        li.innerHTML = `
            <div class="checkbox ${task.completed ? 'checked' : ''}"></div>
            <span>${task.text}</span>
            <button>Delete</button>
        `;
        if (task.completed) {
            li.classList.add('completed');
        }
        taskList.appendChild(li);
    }

    loadTasks();
});
