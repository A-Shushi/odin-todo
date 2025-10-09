import "./styles.css"
import * as projectStorage from "./projectStorage.js";
import * as display from "./display.js"

projectStorage.getLocalArray()

display.renderSidebar()
display.renderProject(projectStorage.projectArray[0])
