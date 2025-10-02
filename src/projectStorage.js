class Project {
    constructor(name) {
        this.name = name;
        this.todoArray = []
    }
}

Project.prototype.appendTodoToProject = function (todo) {
    this.todoArray.push(todo)
}

const projectArray = [];

function createProject(name) {
    const newProject = new Project(name);
    projectArray.push(newProject)
}

export {projectArray, createProject}