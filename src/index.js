import createTodo from "./createTodo.js";
import * as projectStorage from "./projectStorage.js";

// Create New Project
projectStorage.createProject("New Project")

// Create new note and append to storage
createTodo(0, "Title", "Description", "DueDate", "Priority")

console.log(projectStorage.projectArray)
console.log(projectStorage.projectArray[0].todoArray)
