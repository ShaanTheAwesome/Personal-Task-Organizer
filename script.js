// Retrieve tasks from local storage or initialise an empty array for tasks

let todo = JSON.parse(localStorage.getItem("todo")) || [];
const todoInput = document.getElementById("todoInput");
const todoList = document.getElementById("todoList");
const todoCount = document.getElementById("todoCount");
const addButton = document.querySelector(".button");
const delButton = document.getElementById(".deleteButton");

// Initialize Project
document.addEventListener("DOMContentLoaded", function () {
    addButton.addEventListener("click", addTask);
    todoInput.addEventListener('keydown', function (event) {
        if (event.key === "Enter") {
            event.preventDefault() // Don't refresh or send us to another page
            addTask();
        }
    });
    ClearButton.addEventListener("click", deleteAllTasks);
    DeleteButton.addEventListener("click", deleteSelected);
    displayTasks();
});

// Adds task to the Todo list
function addTask() {
    const newTask = todoInput.value.trim()
    if (newTask !== "") {
        todo.push({
            text: newTask, 
            disabled: false,
        })  // todo == Array, so .push == .append
        saveToLocalStorage();
        todoInput.value = "";
        displayTasks();
    }
}

// Clears the entire task list
function deleteAllTasks() {
    todo = [];
    saveToLocalStorage();
    displayTasks();
}

// Displays the task
function displayTasks() {
    todoList.innerHTML = "";
    todo.forEach((item, index) => {
        const p = document.createElement("p");
        p.innerHTML = `
            <div class="todo-container">
                <input type="checkbox" class="todo-checkbox", id="input-${index}" ${item.disabled ? "checked" : ""}>
            <p id="todo-${index}" class="${item.disabled ? "disabled" : ""}" onclick="editTask(${index})">${item.text}</p>
            </div>
        `;
        p.querySelector(".todo-checkbox").addEventListener("change", () => {
            toggleTask(index);
        });
        todoList.appendChild(p);
    });
    todoCount.textContent = todo.length;
}

// Allows task editing in case of spelling mistakes
function editTask(index) {
    const todoItem = document.getElementById(`todo-${index}`);
    const existingText = todo[index].text;
    const inputElement = document.createElement("input");

    inputElement.value = existingText;
    todoItem.replaceWith(inputElement);
    inputElement.focus();

    inputElement.addEventListener("blur", function () {
        const updatedText = inputElement.value.trim();
        if (updatedText) {
            todo[index].text = updatedText;
            saveToLocalStorage();
            displayTasks();
        }
    });
}

// Deletes selected task from task list
function deleteSelected() {
    let i = 0;
    while (i < todo.length) {
        if (todo[i].disabled) {
            todo.splice(i, 1);
        } else {
            i++;
        }
    }
    saveToLocalStorage();
    displayTasks();
}

// Checks and unchecks the task
function toggleTask(index) {
    todo[index].disabled = !todo[index].disabled;
    saveToLocalStorage();
    displayTasks();
}

// Saves task to local browser
function saveToLocalStorage() {
    localStorage.setItem("todo", JSON.stringify(todo));
}