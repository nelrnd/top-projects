import List from "./list.js"
import Task from "./task.js"

class Controller {
  constructor(menuElem, listElem) {
    this.menuElem = menuElem
    this.listElem = listElem
    this.currentList = null
  }

  createList(list) {
    const elem = document.createElement("li")
    const button = document.createElement("button")
    button.textContent = list.title
    button.onclick = () => this.displayTasks(list.tasks)
    elem.appendChild(button)
    return elem
  }

  createListOption(list) {
    const elem = document.createElement("option")
    elem.textContent = list.title
    elem.setAttribute("value", list.id)
    return elem
  }

  displayList(list) {
    const listElem = this.createList(list)
    this.menuElem.appendChild(listElem)
    // display list in select options
    const listOptionElem = this.createListOption(list)
    const select = document.querySelector("#task-list")
    select.appendChild(listOptionElem)
  }

  createTask(task) {
    const elem = document.createElement("details")
    const frontLine = document.createElement("summary")
    const expanded = document.createElement("div")
    const checkbox = document.createElement("input")
    const title = document.createTextNode(task.title)
    const info = document.createElement("p")
    const desc = document.createElement("p")
    const button = document.createElement("button")

    elem.classList.add("task")
    elem.setAttribute("data-id", task.id)
    checkbox.setAttribute("type", "checkbox")
    if (task.done) {
      checkbox.setAttribute("checked", true)
    }

    info.textContent = task.info
    desc.textContent = task.desc
    button.textContent = "Delete"

    button.onclick = task.delete.bind(task)

    frontLine.appendChild(checkbox)
    frontLine.appendChild(title)
    expanded.appendChild(info)
    expanded.appendChild(desc)
    expanded.appendChild(button)
    elem.appendChild(frontLine)
    elem.appendChild(expanded)

    return elem
  }

  displayTask(task) {
    const taskElem = this.createTask(task)
    this.listElem.appendChild(taskElem)
  }

  displayTasks(tasks) {
    this.listElem.innerHTML = null
    for (const task of tasks) {
      this.displayTask(task)
    }
  }

  removeTask(task) {
    const taskElem = document.querySelector(`.task[data-id="${task.id}"`)
    taskElem.remove()
  }

  handleListFormSubmit(event) {
    event.preventDefault()
    const form = event.target
    const formData = new FormData(form)
    const title = formData.get("list-title")
    List.create(title)
    form.reset()
  }

  handleTaskFormSubmit(event) {
    event.preventDefault()
    const form = event.target
    const formData = new FormData(form)
    const title = formData.get("title")
    const desc = formData.get("desc")
    const dueDate = formData.get("due-date")
    const priority = formData.get("priority")
    const list = formData.get("list")
    Task.create(title, desc, dueDate, priority, list)
    form.reset()
  }
}

export default Controller