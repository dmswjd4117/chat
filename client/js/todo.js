const todoForm = document.getElementById("add-todo")
const todoInput = todoForm.querySelector("#add-todo-input")
const todoWrapper = document.getElementById("todo-wrapper");

const TODO_LIST = "todos";

let toDoList = []

function deleteToDo(event) {
    const parentNode = event.target.parentNode;
    todoWrapper.removeChild(parentNode);
    const cleanTodos = toDoList.filter(function(todo) {
        return todo.id !== JSON.parse(parentNode.id);
    })
    toDoList = cleanTodos;
    console.log(toDoList)
    saveTodos();
}

function saveTodos() {
    localStorage.setItem(TODO_LIST, JSON.stringify(toDoList))
}

function addTodoList(value) {
    const newId = toDoList.length+1;

    const li = document.createElement("li");
    const list = document.createElement("i");
    const div = document.createElement("div");
    const delBtn = document.createElement("i");

    li.setAttribute("class","todo-list-element");
    li.id = newId;

    list.setAttribute("id", "todo-check");
    list.setAttribute("class", "far fa-check-circle");

    div.setAttribute("class", "todo-content")

    delBtn.setAttribute("class", "fas fa-trash-alt")
    delBtn.setAttribute("id", "todo-delete")
    
    delBtn.addEventListener("click", deleteToDo);

    div.innerText = value;

    li.appendChild(list);
    li.appendChild(div);
    li.appendChild(delBtn);
    

    todoWrapper.appendChild(li)

    const toDoObj = {
        text : value,
        id : newId
    }
    toDoList.push(toDoObj);
    saveTodos();
}

function handleSubmit(event) {
    event.preventDefault();
    const currentValue = todoInput.value;
    addTodoList(currentValue);
    todoInput.value = ''
}

function loadToDos() {
    const toDos = localStorage.getItem(TODO_LIST);
    if (toDos !== null) {
        const parsedToDos = JSON.parse(toDos);
        parsedToDos.forEach(todo => {
            addTodoList(todo.text);
        });
    }
}

function init() {
    loadToDos();
    todoForm.addEventListener("submit",handleSubmit);
}

init();

export default todoForm;


/*
    todoWrapper.innerHTML +=
    `
    <li id=${newId} class="todo-list-element"> 
        <i id="todo-check" class="far fa-check-circle"></i>
        <div  class="todo-content">
            ${value}
        </div>
        <button  id="todo-delete"  class="fas fa-trash-alt todo-delete-btn"></button>
    </li>
    `
    const delBtn = document.querySelector(".todo-delete-btn")
    delBtn.addEventListener("click", deleteToDo); 

*/