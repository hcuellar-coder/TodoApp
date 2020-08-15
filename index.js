//event listener for the click of the add button
document.getElementById('addButton').addEventListener('click', emptyValue);


function deleteComplete(e) {
    var todoList = document.getElementById(e.target.id).parentElement.parentElement;
    todoList.removeChild(document.getElementById(e.target.id).parentElement);
    console.log(todoList);
}


//this function sets the class name, which will allow css to give us the strike through look or not
function todoComplete(e) {
    if (e.target.checked) {
        document.getElementById(e.target.id).parentNode.className = 'todoStrike';
    }
    else {
        document.getElementById(e.target.id).parentNode.className = 'todo';
    }
}

function emptyValue() {
    if (document.getElementById('todoItem').value)
        addToDo();
    else
        console.log('empty');
}

function addToDo() {

    //generating a todoID to locate which checkbox or delete button was clicked
    // this will return a random integer from 1 to 100;
    var todoID = parseInt((Math.random() * 100) + 1);
    var checkBoxID = parseInt((Math.random() * 100) + 1);
    var buttonID = parseInt((Math.random() * 100) + 1);

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
    newTodoCheckbox.id = checkBoxID;

    //creates an input with the type button and a random ID for look up  , and value of 'x'
    var newTodoDelete = document.createElement('input');
    newTodoDelete.type = 'Button';
    newTodoDelete.className = 'deleteButton';
    newTodoDelete.value = 'X'
    newTodoDelete.id = buttonID;

    //appends a child to the new checkbox with id,  essentially add the checkbox within the <div></div>
    newTodoItem.appendChild(newTodoCheckbox);

    //appends a child to the new todoListItem, essentially add the text within the <div></div> after the checkbox
    newTodoItem.appendChild(todoTextNode);

    //appends a child to the new todoListItem, essentially add the Delete Button within the <div></div> after the text
    newTodoItem.appendChild(newTodoDelete);

    //this variable contains the list of Todos
    var todoItemList = document.getElementById('todoList');

    //this var is the last child of the list, which is actually a line break or space.
    var lastTodoItem = todoItemList.lastChild;

    //Insert the new TodoListItem to the 'end' of the list of Todos
    todoItemList.insertBefore(newTodoItem, lastTodoItem);
    //todoItemList.replaceChild(newTodoItem, lastTodoItem);

    //set the input box to a blank
    document.getElementById('todoItem').value = '';

    //focus back on the input box
    document.getElementById('todoItem').focus();


    //Add an event listener for the checkbox
    document.getElementById(newTodoCheckbox.id).addEventListener('change', todoComplete);

    //Add an event listener for the click of the delete button
    document.getElementById(newTodoDelete.id).addEventListener('click', deleteComplete);
}