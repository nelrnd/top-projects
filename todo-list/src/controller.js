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
    const select = document.querySelector("#list-form select")
    select.appendChild(listOptionElem)
  }

  createTask(task) {
    const elem = document.createElement("div")
    elem.textContent = task.title
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

  handleListFormSubmit(event) {
    event.preventDefault()
    const form = event.target
    const formData = new FormData(form)
    const title = formData.get("list-title")
    console.log(title)
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
    console.log({title, desc, dueDate, priority})
    Task.create(title, desc, dueDate, priority)
    form.reset()
  }
}

export default Controller