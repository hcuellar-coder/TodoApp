document.addEventListener('click', function () {
    document.getElementById('todoInput').focus();
});

document.getElementById('addButton').addEventListener('click', function () {
    if (document.getElementById('todoInput').value)
        addTodoProcess();
});

document.addEventListener('keydown', function (e) {
    if (e.key === 'Enter' && document.getElementById('todoInput').value)
        addTodoProcess();
});

function addTodoProcess() {
    let todoID = parseInt((Math.random() * 1000) + 1);
    let checkboxID = parseInt((Math.random() * 1000) + 1);
    let deleteID = parseInt((Math.random() * 1000) + 1);

    let inputTodoValue = document.getElementById('todoInput').value;
    addTodo(false, inputTodoValue, todoID, checkboxID, deleteID);

    todoListStorage.push({ checked: false, todo: inputTodoValue, todoID: todoID, checkboxID: checkboxID, deleteID: deleteID });
    window.localStorage.setItem("todoList", JSON.stringify(todoListStorage));

    document.getElementById('todoInput').value = '';
    document.getElementById('todoInput').focus();
}

function addTodo(checked, inputTodoValue, todoID, checkboxID, deleteID) {

    let newTodoItem = document.createElement('div');
    newTodoItem.id = todoID;
    if (!checked)
        newTodoItem.className = 'todo';
    else
        newTodoItem.className = 'todoStrike';

    let newTodoCheckbox = document.createElement('input');
    newTodoCheckbox.type = 'checkbox';
    newTodoCheckbox.className = 'checkBox';
    newTodoCheckbox.id = checkboxID;
    newTodoCheckbox.checked = checked;

    let newTodoLabel = document.createElement('label');
    newTodoLabel.innerHTML = inputTodoValue;

    let newTodoDelete = document.createElement('input');
    newTodoDelete.type = 'Button';
    newTodoDelete.className = 'deleteButton';
    newTodoDelete.value = 'X'
    newTodoDelete.id = deleteID;

    newTodoItem.appendChild(newTodoCheckbox);
    newTodoItem.appendChild(newTodoLabel);
    newTodoItem.appendChild(newTodoDelete);

    let todoItemList = document.getElementById('todoList');
    let lastTodoItem = todoItemList.lastChild;
    todoItemList.insertBefore(newTodoItem, lastTodoItem);

    document.getElementById(newTodoCheckbox.id).addEventListener('change', completeTodo);
    document.getElementById(newTodoDelete.id).addEventListener('click', deleteTodo);
}

let todoListStorage = [];

if (window.localStorage.length !== 0) {
    repopulateTodoList();
}

function repopulateTodoList() {
    todoListStorage = (JSON.parse(window.localStorage.getItem("todoList")));
    for (let i = 0; i < todoListStorage.length; i++) {
        addTodo(todoListStorage[i].checked, todoListStorage[i].todo, todoListStorage[i].todoID, todoListStorage[i].checkboxID, todoListStorage[i].deleteID);
    }
}

function deleteTodo(e) {
    let todoList = document.getElementById(e.target.id).parentElement.parentElement;
    todoList.removeChild(document.getElementById(e.target.id).parentElement);

    let deleteIndex = todoListStorage.indexOf(todoListStorage.find(({ deleteID }) => deleteID == e.target.id));
    todoListStorage.splice(deleteIndex, 1);

    window.localStorage.clear();
    window.localStorage.setItem("todoList", JSON.stringify(todoListStorage));

    document.getElementById('todoInput').focus();
}

function completeTodo(e) {
    let checkboxIndex = todoListStorage.indexOf(todoListStorage.find(({ checkboxID }) => checkboxID == e.target.id));
    if (e.target.checked) {
        document.getElementById(e.target.id).nextElementSibling.className = 'todoStrike';
        todoListStorage[checkboxIndex].checked = true;

    } else {
        document.getElementById(e.target.id).nextElementSibling.className = 'todo';
        todoListStorage[checkboxIndex].checked = false;
    }
    window.localStorage.clear();
    window.localStorage.setItem("todoList", JSON.stringify(todoListStorage));
}