import "./styles.css"
import createTodo from "./createTodo.js";
import * as projectStorage from "./projectStorage.js";
import * as display from "./display.js"
import {projectArray} from "./projectStorage.js";

// Create New Project
projectStorage.createProject("Inbox")
projectStorage.createProject("New Project")
projectStorage.createProject("Second Project")

// Create new note and append to storage
createTodo(0, "Index Title", "Description", "20 Sept", "Priority")
createTodo(1, "First Title", "Description", "21 Sept", "Priority")
createTodo(2, "First Title", "Description", "22 Sept", "Priority")

console.log(projectStorage.projectArray)
console.log(projectStorage.projectArray[0].todoArray)
console.log(projectStorage.projectArray[1].todoArray)
console.log(projectStorage.projectArray[2].todoArray)

display.renderSidebar()
display.renderProject(projectStorage.projectArray[0])
