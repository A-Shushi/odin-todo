import "./styles.css"
import createTodo from "./createTodo.js";
import * as projectStorage from "./projectStorage.js";
import * as display from "./display.js"
import {projectArray} from "./projectStorage.js";

// Create New Project
projectStorage.createProject("New Project")
projectStorage.createProject("Second Project")

// Create new note and append to storage
createTodo(0, "Title", "Description", "DueDate", "Priority")

console.log(projectStorage.projectArray)
console.log(projectStorage.projectArray[0].todoArray)

display.renderSidebar(projectStorage.projectArray)
