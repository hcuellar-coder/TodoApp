//event listener for the click of the add button
var addTodo = document.getElementById('addButton').addEventListener('click', addToDo);


//working on this function to strike-through the value of the item
function todoComplete(e) {
    console.log('value = ' + e.target.checked)
    console.log(e.target);
    console.log(document.getElementById(e.target.id).nextSibling);
    document.getElementById(e.target.id).nextSibling.value = 'change';
    console.log(document.getElementById(e.target.id).nextSibling);
    console.log('todoComplete');
}

function addToDo() {

    //generating a checkbox id to locate which checkbox was clicked
    // this will return a random integer from 1 to 100;
    var todoID = parseInt((Math.random() * 100) + 1);

    //takes the input value from the html input
    var inputTodoValue = document.getElementById('todoItem').value;

    //takes the input value and creates a textNode to append into the <div></div>
    var TodoTextNode = document.createTextNode(inputTodoValue);

    //creates a new div item <div></div>
    var newTodoItem = document.createElement('div');

    //creates an input with the type checkbox and a random ID to look up with later 
    var newTodoCheckbox = document.createElement('input');
    newTodoCheckbox.type = 'checkbox';
    newTodoCheckbox.id = todoID;

    //appends a child to the new checkbox with id,  essentially add the checkbox within the <div></div>
    newTodoItem.appendChild(newTodoCheckbox);

    //appends a child to the new todoListItem, essentially add the text within the <div></div> after the checkbox
    newTodoItem.appendChild(TodoTextNode);

    //this variable contains the list of Todos
    var todoItemList = document.getElementById('todoList');

    //this var is the last child of the list, which is actually a line break or space.
    var lastTodoItem = todoItemList.lastChild;

    //Insert the new TodoListItem to the 'end' of the list of Todos
    todoItemList.insertBefore(newTodoItem, lastTodoItem);

    //Add an event listener for the checkbox
    document.getElementById(newTodoCheckbox.id).addEventListener('change', todoComplete);
}