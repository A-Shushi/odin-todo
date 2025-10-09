import storeProjects from "./storage.js";

class Project {
    constructor(name, todoArray) {
        this.name = name;
        if (todoArray) {
            this.todoArray = todoArray;
        } else {
            this.todoArray = [];
        }
    }
}


Project.prototype.appendTodoToProject = function (todo) {
    this.todoArray.push(todo);
    this.todoArray.sort((a, b) => a.dueDate - b.dueDate)
    storeProjects(projectArray)
}

Project.prototype.deleteTodoInProject = function (todoIndex) {
    this.todoArray.splice(todoIndex, 1);
    storeProjects(projectArray)
}

const projectArray = [];

function createProject(name, todoArray) {
    let newProject = new Project(name, todoArray);
    projectArray.push(newProject)
    storeProjects(projectArray)
}

function deleteProject(projectIndex) {
    projectArray.splice(projectIndex, 1)
    storeProjects(projectArray)
}

function getLocalArray() {
    if (!localStorage.projectArray) {
        createProject("Inbox")
    } else {
        for (const project of JSON.parse(localStorage.projectArray)) {
            createProject(project.name, project.todoArray)
        }
    }
}

export {projectArray, createProject, deleteProject, getLocalArray}