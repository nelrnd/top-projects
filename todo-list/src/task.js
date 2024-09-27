import { v4 as uuidv4 } from "uuid"
import { formatDistance } from "date-fns"
import { capitalize, controller } from "./index.js"

const tasks = []

class Task {
  constructor(title, desc, dueDate, priority, list) {
    this.id = uuidv4()
    this.done = false
    this.title = title
    this.desc = desc
    this.dueDate = dueDate
    this.priority = priority
    this.list = list
  }

  static create(title, desc, dueDate, priority, list) {
    const task = new Task(title, desc, dueDate, priority, list)
    tasks.push(task)
    controller.displayTask(task)
  }

  get info() {
    let info = ""
    if (this.dueDate) {
      info += capitalize(formatDistance(this.dueDate, new Date(), { addSuffix: true }))
    }
    if (this.dueDate && this.priority) {
      info += " - "
    }
    if (this.priority) {
      info += capitalize(`${this.priority} priority`)
    }
    return info
  }

  delete() {
    const taskIndex = tasks.findIndex((task) => task.id === this.id)
    tasks.splice(taskIndex, 1)
    controller.removeTask(this)
  }
}

export default Task
export { tasks }