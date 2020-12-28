const todoForm = document.getElementById("add-todo")
const todoInputBox = document.getElementById("add-todo-input")
const todoWrapper = document.getElementById("todo-wrapper");


function addTodoList() {
    todoWrapper.innerHTML +=
    `
    <li class="todo-list-element"> 
        <i id="todo-check" class="far fa-check-circle"></i>
        <div  class="todo-content">
            ${todoInputBox.value}
        </div>
        <i  id="todo-delete" class="fas fa-trash-alt"></i>
    </li>
    `
    todoInputBox.value = ''
}

todoForm.addEventListener("submit", (event) => {
    event.preventDefault();
    addTodoList();
})

export default todoForm;