import createTodo from "./createTodo.js";
import * as projectStorage from "./projectStorage.js";
import "./styles.css"

// Create New Project
projectStorage.createProject("New Project")

// Create new note and append to storage
createTodo(0, "Title", "Description", "DueDate", "Priority")

console.log(projectStorage.projectArray)
console.log(projectStorage.projectArray[0].todoArray)


let projectBtn = document.querySelector(".project-list-item")
let deleteBtn = document.querySelector(".delete")

projectBtn.addEventListener("click", (event) => {
    console.log(event)
    console.log("PROJECT")
})

deleteBtn.addEventListener("click", (event) => {
    console.log(event)
    console.log("DELETE")
})