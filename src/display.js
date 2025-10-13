import {format, differenceInCalendarDays} from "date-fns";
import {projectArray, createProject, deleteProject} from "./projectStorage.js";
import Todo from "./createTodo.js";
import * as projectStorage from "./projectStorage";

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
            console.log(projectStorage.projectArray)
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
            titleInput.value = "";
            descriptionInput.value = "";
            priorityInput.value = "Low"
            dateInput.value = "";
        }
    })
    newTodoDiv.appendChild(newAddTodoButton)
    projectContainer.appendChild(newTodoDiv)

    window.addEventListener("keydown", (e) => {
        const tag = e.target.tagName.toLowerCase();
        const isEditable = e.target.isContentEditable;

        if (tag === "input" || tag === "textarea" || isEditable) return;

        if (e.code === 'Space' || e.key === ' ') {
            if (newAddTodoButton.className !== "close") {
                todoForm.className = "active";
                newAddTodoButton.textContent = "Close";
                newAddTodoButton.className = "close";
                titleInput.focus()
                titleInput.value = "";
                descriptionInput.value = "";
                priorityInput.value = "Low"
                dateInput.value = "";
            }
        }
    });

    window.addEventListener("keydown", (e) => {
        if (e.code === 'Escape' || e.key === "Escape") {
            if (newAddTodoButton.className === "close") {
                todoForm.classList.remove("active");
                newAddTodoButton.textContent = "New TODO";
                newAddTodoButton.classList.remove("close");
                document.activeElement.blur()
            }
        }
    });

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

    const selectorDiv = document.createElement("div")
    selectorDiv.id = "selector-container"
    todoForm.appendChild(selectorDiv)

    const priorityLabel = document.createElement("label")
    priorityLabel.setAttribute("for", "todo-priority")
    priorityLabel.textContent = "Priority:"
    selectorDiv.appendChild(priorityLabel)
    const priorityInput = document.createElement("select")
    priorityInput.id = "todo-priority"
    priorityInput.name = "todo-priority"
    const optionLow = document.createElement("option")
    optionLow.value = "Low"
    optionLow.textContent = "Low"
    priorityInput.appendChild(optionLow)
    const optionHigh = document.createElement("option")
    optionHigh.value = "High"
    optionHigh.textContent = "High"
    priorityInput.appendChild(optionHigh)
    selectorDiv.appendChild(priorityInput)

    const dateLabel = document.createElement("label");
    dateLabel.setAttribute("for", "todo-date")
    dateLabel.textContent = "Date:"
    selectorDiv.appendChild(dateLabel)
    const dateInput = document.createElement("input");
    dateInput.type = "date"
    dateInput.id = "todo-date"
    dateInput.name = "todo-date"
    selectorDiv.appendChild(dateInput);

    const submitTodoButton = document.createElement("button");
    submitTodoButton.textContent = "Add TODO"
    submitTodoButton.addEventListener("click", () => {
        let dueDate;
        if (dateInput.value === "") {
            dueDate = new Date();
        } else {
            dueDate = new Date(dateInput.value)
        }
        const newTodo = new Todo(titleInput.value, descriptionInput.value, dueDate, priorityInput.value)
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
        newListItem.addEventListener("click", () => {
            if (newDescription.className === "todo-description") {
                newDescription.classList.add("active-item")
            } else {
                newDescription.classList.remove("active-item")
            }
        })

        const newCheckbox = document.createElement("input")
        newCheckbox.type = "checkbox";
        newCheckbox.name = "task-check";
        newCheckbox.className = "todo-checkbox"
        newCheckbox.id = `${i}`;
        newCheckbox.addEventListener('change', function () {
            if (this.checked) {
                newListItem.classList.add("checked-todo")
            } else {
                newListItem.classList.remove("checked-todo")
            }
            if (newDescription.className === "todo-description active-item") {
                newDescription.classList.remove("active-item")
            }
        });
        newListItem.appendChild(newCheckbox);

        const newDueDate = document.createElement("p");
        newDueDate.className = "due-date";
        if (differenceInCalendarDays(project.todoArray[i].dueDate, new Date()) > 6) {
            newDueDate.textContent = format(project.todoArray[i].dueDate, "dd MMM")
        } else if (differenceInCalendarDays(project.todoArray[i].dueDate, new Date()) === 0) {
            newDueDate.textContent = "Today"
        } else {
            newDueDate.textContent = format(project.todoArray[i].dueDate, "EEE")
        }
        newListItem.appendChild(newDueDate);

        const newPriority = document.createElement("p")
        newPriority.className = "priority";
        newPriority.textContent = project.todoArray[i].priority;
        if (project.todoArray[i].priority === "High") {
            newPriority.classList.add("high-priority")
        }
        newPriority.addEventListener("click", () => {
            if (project.todoArray[i].priority === "High") {
                project.todoArray[i].priority = "Low";
                newPriority.classList.remove("high-priority");
                renderProject(project);
            } else {
                project.todoArray[i].priority = "High";
                newPriority.classList.add("high-priority");
                renderProject(project);
            }
        })
        newListItem.appendChild(newPriority);

        const newTaskTitle = document.createElement("p");
        newTaskTitle.className = "todo-item";
        newTaskTitle.textContent = project.todoArray[i].title;
        newListItem.appendChild(newTaskTitle)

        const editButton = document.createElement("button")
        editButton.className = "edit-button";
        editButton.textContent = "Edit"
        editButton.addEventListener("click", () => {
            editDiv.classList.add("active-form")
        })
        newListItem.appendChild(editButton)

        const deleteButton = document.createElement("button")
        deleteButton.className = "delete";
        deleteButton.textContent = "X"
        deleteButton.addEventListener("click", (event) => {
            project.deleteTodoInProject(i)
            renderProject(project)
        })
        newListItem.appendChild(deleteButton)

        const newDescription = document.createElement("p")
        newDescription.className = "todo-description";
        newDescription.textContent = project.todoArray[i].description;
        if (project.todoArray[i].description) {
            newListItem.appendChild(newDescription)
        }

        const editDiv = document.createElement("div")
        editDiv.className = "edit-form";

        const editTitleLabel = document.createElement("label")
        editTitleLabel.className = "edit-label"
        editTitleLabel.textContent = "Title:"
        editDiv.appendChild(editTitleLabel)

        const editTitleInput = document.createElement("input")
        editTitleInput.className = "edit-title-input"
        editTitleInput.value = project.todoArray[i].title
        editDiv.appendChild(editTitleInput)

        const editDescriptionLabel = document.createElement("label")
        editDescriptionLabel.className = "edit-label"
        editDescriptionLabel.textContent = "Description:"
        editDiv.appendChild(editDescriptionLabel)

        const editDescriptionInput = document.createElement("textarea")
        editDescriptionInput.className = "edit-description-input"
        editDescriptionInput.value = project.todoArray[i].description
        editDiv.appendChild(editDescriptionInput)

        const editDateButtonDiv = document.createElement("div")
        editDateButtonDiv.className = "edit-date-button-container"

        const editDateDiv = document.createElement("div")
        editDateDiv.className = "date-edit-container"

        const editDateLabel = document.createElement("label")
        editDateLabel.className = "edit-label"
        editDateLabel.textContent = "Date:"
        editDateDiv.appendChild(editDateLabel)

        const editDateInput = document.createElement("input")
        editDateInput.type = "date"
        editDateInput.className = "edit-date-input"
        editDateInput.value = format(project.todoArray[i].dueDate, "yyyy-MM-dd")
        editDateDiv.appendChild(editDateInput)

        editDateButtonDiv.appendChild(editDateDiv)

        const editSubmitButton = document.createElement("button")
        editSubmitButton.className = "edit-submit-button"
        editSubmitButton.textContent = "Edit TODO"
        editSubmitButton.addEventListener("click", () => {
            project.editTodoInProject(i, editTitleInput.value, editDescriptionInput.value, new Date(editDateInput.value))
            console.log("Success")
            renderProject(project)
        })
        editDateButtonDiv.appendChild(editSubmitButton)

        editDiv.appendChild(editDateButtonDiv)

        newListItem.appendChild(editDiv)

        newUnorderedList.appendChild(newListItem)
    }
}

export {renderSidebar, renderProject}