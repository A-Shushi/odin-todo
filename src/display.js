import createTodo from "./createTodo.js";
import {projectArray, createProject, deleteProject} from "./projectStorage.js";
import Todo from "./createTodo.js";

const sidebarProjects = document.querySelector("#project-list")
const projectContainer = document.querySelector("#project-container")

function renderSidebar() {
    while (sidebarProjects.firstChild) {
        sidebarProjects.removeChild(sidebarProjects.firstChild)
    }

    const newListItem = document.createElement("li");
    newListItem.id = "inbox-list-item"

    const projectButton = document.createElement("button");
    projectButton.id = "inbox-list-button";
    projectButton.textContent = projectArray[0].name;
    projectButton.addEventListener("click", (event) => {
        renderProject(projectArray[0]);
    })
    newListItem.appendChild(projectButton)

    sidebarProjects.appendChild(newListItem)

    for (let i = 1; i < projectArray.length; i++) {
        const newListItem = document.createElement("li");
        newListItem.className = "project-list-item"

        const projectButton = document.createElement("button");
        projectButton.className = "project-list-button";
        projectButton.textContent = projectArray[i].name;
        projectButton.addEventListener("click", (event) => {
            renderProject(projectArray[i]);
        })
        newListItem.appendChild(projectButton)

        const deleteButton = document.createElement("button")
        deleteButton.className = "delete";
        deleteButton.textContent = "X"
        deleteButton.addEventListener("click", (event) => {
            deleteProject(i)
            renderSidebar()
        })
        newListItem.appendChild(deleteButton)

        sidebarProjects.appendChild(newListItem)
    }
    const addProjectItem = document.createElement("li");
    addProjectItem.id = "add-project-item"

    const newProjectButton = document.createElement("button");
    newProjectButton.id = "add-project-button";
    newProjectButton.textContent = "CREATE NEW PROJECT";
    newProjectButton.addEventListener("click", (event) => {
        console.log("New Project")
        const newProjectName = prompt("What's the name of the project?")
        if (newProjectName) {
            createProject(newProjectName)
            renderSidebar();
        } else {
            alert("Please provide a suitable name for the new project")
        }
    })
    addProjectItem.appendChild(newProjectButton)

    sidebarProjects.appendChild(addProjectItem)

}

function renderProject(project) {
    while (projectContainer.firstChild) {
        projectContainer.removeChild(projectContainer.firstChild)
    }

    const newProjectHeader = document.createElement("h1")
    newProjectHeader.textContent = project.name;
    projectContainer.appendChild(newProjectHeader)

    const newTodoDiv = document.createElement("div")

    const newAddTodoButton = document.createElement("button")
    newAddTodoButton.id = "new-todo-button"
    newAddTodoButton.textContent = "New TODO"
    newAddTodoButton.addEventListener("click", () => {
        if (newAddTodoButton.className === "close") {
            todoForm.classList.remove("active");
            newAddTodoButton.textContent = "New TODO";
            newAddTodoButton.classList.remove("close");
        } else {
            todoForm.className = "active";
            newAddTodoButton.textContent = "Close";
            newAddTodoButton.className = "close";
        }
    })
    newTodoDiv.appendChild(newAddTodoButton)
    projectContainer.appendChild(newTodoDiv)

    const todoForm = document.createElement("form")
    todoForm.id = "todo-form";

    const titleLabel = document.createElement("label")
    titleLabel.setAttribute("for", "todo-title")
    titleLabel.textContent = "Title:"
    todoForm.appendChild(titleLabel)
    const titleInput = document.createElement("input")
    titleInput.type = "text";
    titleInput.id = "todo-title"
    titleInput.name = "todo-title"
    todoForm.appendChild(titleInput)

    const descriptionLabel = document.createElement("label")
    descriptionLabel.setAttribute("for", "todo-description")
    descriptionLabel.textContent = "Description:"
    todoForm.appendChild(descriptionLabel)
    const descriptionInput = document.createElement("textarea")
    descriptionInput.id = "todo-description"
    descriptionInput.name = "todo-description"
    todoForm.appendChild(descriptionInput)

    const priorityLabel = document.createElement("label")
    priorityLabel.setAttribute("for", "todo-priority")
    priorityLabel.textContent = "Priority:"
    todoForm.appendChild(priorityLabel)
    const priorityInput = document.createElement("select")
    priorityInput.id = "todo-priority"
    priorityInput.name = "todo-priority"
    const optionLow = document.createElement("option")
    optionLow.value = "low"
    optionLow.textContent = "Low"
    priorityInput.appendChild(optionLow)
    const optionHigh = document.createElement("option")
    optionHigh.value = "high"
    optionHigh.textContent = "High"
    priorityInput.appendChild(optionHigh)
    todoForm.appendChild(priorityInput)

    const dateLabel = document.createElement("label");
    dateLabel.setAttribute("for", "todo-date")
    dateLabel.textContent = "Date:"
    todoForm.appendChild(dateLabel)
    const dateInput = document.createElement("input");
    dateInput.type = "date"
    dateInput.id = "todo-date"
    dateInput.name = "todo-date"
    todoForm.appendChild(dateInput);

    const submitTodoButton = document.createElement("button");
    submitTodoButton.type = "button";
    submitTodoButton.textContent = "Add TODO"
    submitTodoButton.addEventListener("click", () => {
        const newTodo = new Todo(titleInput.value, descriptionInput.value, dateInput.value, priorityInput.value)
        project.appendTodoToProject(newTodo)
        renderProject(project)
    })
    todoForm.appendChild(submitTodoButton)

    projectContainer.appendChild(todoForm)

    
    const newUnorderedList = document.createElement("ul")
    newUnorderedList.id = "todo-list";
    projectContainer.appendChild(newUnorderedList);

    for (let i = 0; i < project.todoArray.length; i++) {
        const newListItem = document.createElement("li");
        newListItem.className = "todo-list-item"

        const newCheckbox = document.createElement("input")
        newCheckbox.type = "checkbox";
        newCheckbox.name = "task-check";
        newCheckbox.id = `${i}`;
        newCheckbox.addEventListener('change', function () {
            if (this.checked) {
                console.log(`${project.todoArray[i].title} is checked`);
                newListItem.classList.add("checked-todo")
            } else {
                console.log(`${project.todoArray[i].title} is unchecked`);
                newListItem.classList.remove("checked-todo")
            }
        });
        newListItem.appendChild(newCheckbox);

        const newDueDate = document.createElement("p");
        newDueDate.className = "due-date";
        newDueDate.textContent = project.todoArray[i].dueDate
        newListItem.appendChild(newDueDate);

        const newTaskTitle = document.createElement("p");
        newTaskTitle.className = "todo-item";
        newTaskTitle.textContent = project.todoArray[i].title;
        newListItem.appendChild(newTaskTitle)

        const deleteButton = document.createElement("button")
        deleteButton.className = "delete";
        deleteButton.textContent = "X"
        deleteButton.addEventListener("click", (event) => {
            project.deleteTodoInProject(i)
            renderProject(project)
        })
        newListItem.appendChild(deleteButton)

        newUnorderedList.appendChild(newListItem)
    }
}

export {renderSidebar, renderProject}