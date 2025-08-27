document.addEventListener('DOMContentLoaded', () => {
    const todoInput = document.getElementById("taskInput");
    const addTaskButton = document.getElementById("addBtn");
    const todoList = document.getElementById("taskList");

    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    // Render existing tasks
    tasks.forEach((task) => renderTask(task));

    // Add new task
    addTaskButton.addEventListener('click', () => {
        const taskText = todoInput.value.trim();
        if (taskText === "") return;

        const newTask = {
            id: Date.now(),
            text: taskText,
            completed: false
        };

        tasks.push(newTask);
        saveTask();
        renderTask(newTask); // show on UI
        todoInput.value = "";
    });

    // Render single task
    function renderTask(task) {
        const li = document.createElement("li");
        // Every <li> has data-id = task.id.
        li.setAttribute('data-id', task.id);

        li.innerHTML = `
            ${task.text} 
            <button class = "delete-btn">Delete</button>
        `;

        // delete handler
        li.querySelector(".delete-btn").addEventListener('click', () => {
            // It keeps only those whose id is not equal to the current task’s id.
            tasks = tasks.filter(t => t.id !== task.id); // remove from array
            saveTask();
            li.remove(); // remove from DOM
        });

        todoList.appendChild(li);
    }

    // Save tasks to local storage
    function saveTask() {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }
});
