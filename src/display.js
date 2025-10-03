const sidebarProjects = document.querySelector("#project-list")
const projectContainer = document.querySelector("#project-container")

function renderSidebar(projectArray) {
    while (sidebarProjects.firstChild) {
        sidebarProjects.removeChild(sidebarProjects.firstChild)
    }

    const newListItem = document.createElement("li");
    newListItem.id = "inbox-list-item"

    const projectButton = document.createElement("button");
    projectButton.id = "inbox-list-button";
    projectButton.textContent = projectArray[0].name;
    projectButton.addEventListener("click", (event) => {
        console.log(event)
        console.log("Inbox")
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
            console.log(event)
            console.log(`PROJECT ${i}`)
        })
        newListItem.appendChild(projectButton)

        const deleteButton = document.createElement("button")
        deleteButton.className = "delete";
        deleteButton.textContent = "X"
        deleteButton.addEventListener("click", (event) => {
            console.log(event)
            console.log(`DELETE Project ${i}`)
        })
        newListItem.appendChild(deleteButton)

        sidebarProjects.appendChild(newListItem)
    }
}

function renderProject(project) {
    while (projectContainer.firstChild) {
        projectContainer.removeChild(projectContainer.firstChild)
    }

    const newProjectHeader = document.createElement("h1")
    newProjectHeader.textContent = project.name;
    projectContainer.appendChild(newProjectHeader)

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
            } else {
                console.log(`${project.todoArray[i].title} is unchecked`);
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
            console.log(event)
            console.log(`DELETE TASK ${i}`)
        })
        newListItem.appendChild(deleteButton)

        newUnorderedList.appendChild(newListItem)
    }
}

export {renderSidebar, renderProject}