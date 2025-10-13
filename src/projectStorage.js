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

Project.prototype.editTodoInProject = function (todoIndex, todoTitle, todoDescription, todoDueDate) {
    this.todoArray[todoIndex].title = todoTitle;
    this.todoArray[todoIndex].description = todoDescription;
    this.todoArray[todoIndex].dueDate = todoDueDate;
    this.todoArray.sort((a, b) => a.dueDate - b.dueDate)
    storeProjects(projectArray)
}

const projectArray = [];

function createProject(name, todoArray) {
    let newProject = new Project(name, todoArray);
    for (const todo of newProject.todoArray) {
        todo.dueDate = new Date(todo.dueDate)
    }
    projectArray.push(newProject)
    storeProjects(projectArray)
}

function deleteProject(projectIndex) {
    projectArray.splice(projectIndex, 1)
    storeProjects(projectArray)
}

function storeProjects(projectArray) {
    const storageArray = [];
    for (const project of projectArray) {
        const projectToStore = {
            name: project.name,
            todoArray: project.todoArray
        }
        storageArray.push(projectToStore)
    }
    localStorage.projectArray = JSON.stringify(storageArray);
}

function getLocalArray() {
    if (!localStorage.projectArray) {
        createProject("Inbox", [])
    } else {
        for (const project of JSON.parse(localStorage.projectArray)) {
            createProject(project.name, project.todoArray)
        }
    }
}

export {projectArray, createProject, deleteProject, getLocalArray}