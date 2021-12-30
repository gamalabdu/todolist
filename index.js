//selectors

const todoInput = document.querySelector('.todo-input')
const todoButton = document.querySelector('.todo-button')
const todoList = document.querySelector('.todo-list')
const todoSelect = document.getElementById('tudo-selector')
const completeSelect = document.querySelector('.todos')
const filterOption = document.querySelector('.filter-todo')


// event listeners

document.addEventListener('DOMContentLoaded',getTodos)

todoButton.addEventListener('click',addToDo)

todoList.addEventListener('click', deleteCheck)

filterOption.addEventListener('change',filterTodo)


// functions

function addToDo(e){
    //prevent form from submitting
    e.preventDefault()
    
    // CREATE DIV 
    const todoDiv = document.createElement("div")
    todoDiv.classList.add("todo")

    // SELECT
    // create li
    const newTodoSelect = document.createElement("li")
    // assigning inner text to ....
    newTodoSelect.innerText = todoSelect.value
    // adding class name to newTodo
    newTodoSelect.classList.add("todo-select")
    // adding newTodo into todoDiv
    todoDiv.appendChild(newTodoSelect)


    // ITEM
    // create li
    const newTodo = document.createElement("li")
    // assigning inner text to ....
    newTodo.innerText = todoInput.value
    // adding class name to newTodo
    newTodo.classList.add("todo-item")
    // adding newTodo into todoDiv
    todoDiv.appendChild(newTodo)

    //saving to local storage
    saveLocaltodos(todoInput.value)

    //BUTTONS
    // check mark button
    const completedButton = document.createElement('button')
    // add icon to button
    completedButton.innerHTML = '<i class="fas fa-check"></i>'
    // add class to button
    completedButton.classList.add("complete-btn")
    // add button to div
    todoDiv.appendChild(completedButton)

    
    // trash button
    const trashButton = document.createElement('button')
    // add icon to button
    trashButton.innerHTML = '<i class="fa-solid fa-trash"></i>'
    // add class to button
    trashButton.classList.add("trash-btn")
    // add button to div
    todoDiv.appendChild(trashButton)

    // append todoDiv to list
    todoList.appendChild(todoDiv)

    // CLEAR INPUT VALUE
    todoInput.value = " "
}


function deleteCheck(e) {
    // saving the item we're deleting in temp variable called item
    const item = e.target // e.target is the <button class="trash-btn"> 
    // deleting item
    if(item.classList[0] === 'trash-btn'){
        //item.parentElement.remove() // alternative to the code below, basically getting the parent element and removing all at once
       const todo = item.parentElement // setting temp variable todo to the parent node of item which is the div that contains everything 
       //todo.remove() // removes the parent of item which is the parent of the button, which is the div containing everything
       // animation
       todo.classList.add("fall")
       removeLocaltodos(todo)
       todo.addEventListener('transitionend',function (){ // adding eventListener before we remove element 
          todo.remove() // once transtion ends, then we finally remove the whole div
       })
    }
    // checking item off
    if (item.classList[0] === 'complete-btn') {
        const todo = item.parentElement // sets temp variable todo to items parent node which is the div containing everything
        todo.classList.toggle('completed') // sets an action we can style in css when it's clicked, in css you would use the 'completed' attribute
    }
}

function filterTodo(e) {
  const todos = todoList.childNodes;
  todos.forEach(function(todo) {
    switch (e.target.value) {
      case "all":
        todo.style.display = "flex";
        break;
      case "completed":
        if (todo.classList.contains("completed")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
        break;
      case "uncompleted":
        if (!todo.classList.contains("completed")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
    }
  });
}


  function saveLocaltodos(todo) {

    // check if you already have things in local storage
    let todos;
    if(localStorage.getItem('todos') === null) {
        todos = []
    } else {
        todos = JSON.parse(localStorage.getItem('todos'))
    }
        todos.push(todo)
        localStorage.setItem('todos',JSON.stringify(todos))
  }

  function getTodos () {

    let todos;

    if(localStorage.getItem('todos') === null) {
        todos = []
    } else {
        todos = JSON.parse(localStorage.getItem('todos'))
    }

        todos.forEach(function(todo){

            // CREATE DIV 
        const todoDiv = document.createElement("div")
        todoDiv.classList.add("todo")

        // SELECT
        // create li
        const newTodoSelect = document.createElement("li")
        // assigning inner text to ....
        newTodoSelect.innerText = todo
        // adding class name to newTodo
        newTodoSelect.classList.add("todo-select")
        // adding newTodo into todoDiv
        todoDiv.appendChild(newTodoSelect)


        // ITEM
        // create li
        const newTodo = document.createElement("li")
        // assigning inner text to ....
        newTodo.innerText = todoInput.value
        // adding class name to newTodo
        newTodo.classList.add("todo-item")
        // adding newTodo into todoDiv
        todoDiv.appendChild(newTodo)


        //BUTTONS
        // check mark button
        const completedButton = document.createElement('button')
        // add icon to button
        completedButton.innerHTML = '<i class="fas fa-check"></i>'
        // add class to button
        completedButton.classList.add("complete-btn")
        // add button to div
        todoDiv.appendChild(completedButton)

        
        // trash button
        const trashButton = document.createElement('button')
        // add icon to button
        trashButton.innerHTML = '<i class="fa-solid fa-trash"></i>'
        // add class to button
        trashButton.classList.add("trash-btn")
        // add button to div
        todoDiv.appendChild(trashButton)

        // append todoDiv to list
        todoList.appendChild(todoDiv)

        })
    

  }

  function removeLocaltodos(todo){

    let todos
    
    if(localStorage.getItem('todos') === null) {
        todos = []
    } else {
        todos = JSON.parse(localStorage.getItem('todos'))
    }

    const todoIndex = todo.children[0].innerText // gives us the name of the entry from the div
    
    todos.splice(todos.indexOf(todoIndex),1) // from todos array, remove the index of todoIndex, which is the name of the element that you want to remove, and the todoIndex is the number of the index of the entry you want to remove

    localStorage.setItem("todos",JSON.stringify(todos))
  }

