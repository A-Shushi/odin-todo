export default function storeProjects(projectArray) {
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