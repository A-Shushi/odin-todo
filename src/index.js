import "./styles.css"
import Todo from "./createTodo.js";
import * as projectStorage from "./projectStorage.js";
import * as display from "./display.js"
import {projectArray} from "./projectStorage.js";

// Create New Project
projectStorage.createProject("Inbox")

// Create new note and append to storage

projectStorage.projectArray[0].appendTodoToProject(new Todo("Index Title", "Description", "20 Sept", "High"))

display.renderSidebar()
display.renderProject(projectStorage.projectArray[0])
