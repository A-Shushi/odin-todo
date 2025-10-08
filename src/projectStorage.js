class Project {
    constructor(name) {
        this.name = name;
        this.todoArray = []
    }
}

Project.prototype.appendTodoToProject = function (todo) {
    this.todoArray.push(todo);
    this.todoArray.sort((a, b) => a.dueDate - b.dueDate)
}

Project.prototype.deleteTodoInProject = function (todoIndex) {
    this.todoArray.splice(todoIndex, 1);
}

const projectArray = [];

function createProject(name) {
    const newProject = new Project(name);
    projectArray.push(newProject)
}

function deleteProject(projectIndex) {
    projectArray.splice(projectIndex, 1)
}

export {projectArray, createProject, deleteProject}