const sidebarProjects = document.querySelector("#project-list")

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
            console.log("DELETE")
        })
        newListItem.appendChild(deleteButton)

        sidebarProjects.appendChild(newListItem)
    }
}

export {renderSidebar}