//event listener for the Add Button
document.getElementById('addButton').addEventListener('click', emptyValue);
//event lisetner for the enter keydown
document.addEventListener('keydown', todoEnterKey);
//event listener for clicking on to the page, to focus on the input
document.addEventListener('click', inputFocus);

//function to focus on the input when clicking into the page
function inputFocus() {
    document.getElementById('todoItem').focus();
}

//this function checks for the enter key and adds the todo item
function todoEnterKey(e) {
    if (e.key === 'Enter')
        emptyValue();
}

//function deletes a todo item
function deleteComplete(e) {
    var todoList = document.getElementById(e.target.id).parentElement.parentElement;
    todoList.removeChild(document.getElementById(e.target.id).parentElement);
    document.getElementById('todoItem').focus();
}

//this function sets the class name, which will allow css to give us the strike through look or not
function todoComplete(e) {
    if (e.target.checked)
        document.getElementById(e.target.id).parentNode.className = 'todoStrike';
    else
        document.getElementById(e.target.id).parentNode.className = 'todo';
}

//this function is more of check to keep a user from submitting an empty string
function emptyValue() {
    if (document.getElementById('todoItem').value)
        addToDo();
}

function addToDo() {
    //generating a todoID to locate which checkbox or delete button was clicked
    // this will return a random integer from 1 to 100;
    var todoID = parseInt((Math.random() * 100) + 1);
    var todoCheckboxID = parseInt((Math.random() * 100) + 1);
    var todoDeleteID = parseInt((Math.random() * 100) + 1);

    //takes the input value from the html input
    var inputTodoValue = document.getElementById('todoItem').value;

    //takes the input value and creates a textNode to append into the <div></div>
    var todoTextNode = document.createTextNode(inputTodoValue);

    //creates a new div item <div></div>
    var newTodoItem = document.createElement('div');
    newTodoItem.id = todoID;
    newTodoItem.className = 'todo';

    //creates an input with the type checkbox and a random ID to look up 
    var newTodoCheckbox = document.createElement('input');
    newTodoCheckbox.type = 'checkbox';
    newTodoCheckbox.className = 'checkBox';
    newTodoCheckbox.id = todoCheckboxID;

    //creates an input with the type button and a random ID for look up  , and value of 'x'
    var newTodoDelete = document.createElement('input');
    newTodoDelete.type = 'Button';
    newTodoDelete.className = 'deleteButton';
    newTodoDelete.value = 'X'
    newTodoDelete.id = todoDeleteID;

    //appends a checkbox child, textNode, and Delete Button within the <div></div>
    newTodoItem.appendChild(newTodoCheckbox);
    newTodoItem.appendChild(todoTextNode);
    newTodoItem.appendChild(newTodoDelete);

    //this variable contains the list of Todos
    var todoItemList = document.getElementById('todoList');

    //this var is the last child of the list, which is actually a line break or space.
    var lastTodoItem = todoItemList.lastChild;

    //Insert the new TodoListItem to the 'end' of the list of Todos
    todoItemList.insertBefore(newTodoItem, lastTodoItem);

    //set the input box to a blank
    document.getElementById('todoItem').value = '';

    //focus back on the input box
    document.getElementById('todoItem').focus();

    //Add an event listener for the checkbox
    document.getElementById(newTodoCheckbox.id).addEventListener('change', todoComplete);

    //Add an event listener for the click of the delete button
    document.getElementById(newTodoDelete.id).addEventListener('click', deleteComplete);
}