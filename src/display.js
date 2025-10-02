const sidebarProjects = document.querySelector("#project-list")

function renderSidebar(projectArray) {
    while (sidebarProjects.firstChild) {
        sidebarProjects.removeChild(sidebarProjects.firstChild)
    }
    for (let i = 0; i < projectArray.length; i++) {
        const newListItem = document.createElement("li");

        const projectButton = document.createElement("button");
        projectButton.className = "project-list-item";
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