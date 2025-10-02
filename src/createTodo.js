import {projectArray} from "./projectStorage.js";

class Todo {
    constructor(title, description, dueDate, priority) {
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
    }
}

export default function (projectIndex, title, description, dueDate, priority) {
    const newTodo = new Todo(title, description, dueDate, priority)
    projectArray[projectIndex].appendTodoToProject(newTodo)
}
