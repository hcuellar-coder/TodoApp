document.addEventListener('click', function() {
    document.getElementById('todo-input').focus();
});

document.getElementById('add-button').addEventListener('click', function() {
    if (document.getElementById('todo-input').value)
        addTodoProcess();
});

document.addEventListener('keydown', function(e) {
    if (e.key === 'Enter' && document.getElementById('todo-input').value)
        addTodoProcess();
});

function addTodoProcess() {
    let todoID = parseInt((Math.random() * 1000) + 1);

    let inputTodoValue = document.getElementById('todo-input').value;
    addTodo(false, inputTodoValue, todoID);

    todoListStorage.push({ checked: false, todo: inputTodoValue, todoID: todoID });
    window.localStorage.setItem("todoList", JSON.stringify(todoListStorage));

    document.getElementById('todo-input').value = '';
    document.getElementById('todo-input').focus();
}

function addTodo(checked, inputTodoValue, todoID) {

    let newTodoItem = document.createElement('li');
    newTodoItem.id = todoID;

    let newTodoCheckbox = document.createElement('input');
    newTodoCheckbox.type = 'checkbox';
    newTodoCheckbox.className = 'check-box';
    newTodoCheckbox.id = todoID;
    newTodoCheckbox.checked = checked;

    let newTodoLabel = document.createElement('div');
    newTodoLabel.innerHTML = inputTodoValue;
    newTodoLabel.className = checked ? 'todo-strike' : 'todo';

    let newTodoDelete = document.createElement('button');
    newTodoDelete.className = 'delete-button';
    newTodoDelete.innerText = 'X'
    newTodoDelete.id = todoID;

    newTodoItem.prepend(newTodoCheckbox);
    newTodoItem.appendChild(newTodoLabel);
    newTodoItem.appendChild(newTodoDelete);

    let todoItemList = document.getElementById('todo-list');
    let lastTodoItem = todoItemList.lastChild;
    todoItemList.insertBefore(newTodoItem, lastTodoItem);

    newTodoItem.addEventListener('click', e => {
        if (e.target.type === 'submit') {
            deleteTodo(e);
        } else if (e.target.type === 'checkbox') {
            completeTodo(newTodoItem);
        }
    })
}

let todoListStorage = [];

if (window.localStorage.getItem("todoList")) {
    repopulateTodoList();
}

function repopulateTodoList() {
    todoListStorage = (JSON.parse(window.localStorage.getItem("todoList")));
    for (let i = 0; i < todoListStorage.length; i++) {
        addTodo(todoListStorage[i].checked, todoListStorage[i].todo, todoListStorage[i].todoID, todoListStorage[i].checkboxID, todoListStorage[i].deleteID);
    }
}

function deleteTodo(e) {
    e.target.parentElement.remove();

    let deleteIndex = todoListStorage.findIndex(item => item.todoID === parseInt(e.target.id));
    todoListStorage.splice(deleteIndex, 1);

    window.localStorage.clear();
    window.localStorage.setItem("todoList", JSON.stringify(todoListStorage));

    document.getElementById('todo-input').focus();
}

function completeTodo(todo) {
    let checkboxIndex = todoListStorage.findIndex(item => item.todoID === parseInt(todo.id));
    let div = todo.querySelector('div');

    if (div.className === 'todo') {
        div.className = 'todoStrike';
        todoListStorage[checkboxIndex].checked = true;
    } else {
        div.className = 'todo';
        todoListStorage[checkboxIndex].checked = false;
    }
    window.localStorage.clear();
    window.localStorage.setItem("todoList", JSON.stringify(todoListStorage));
}