import { controller } from "./index.js"

const tasks = []

class Task {
  constructor(title, desc, dueDate, priority) {
    this.done = false
    this.title = title
    this.desc = desc
    this.dueDate = dueDate
    this.priority = priority
  }

  static create(title, desc, dueDate, priority) {
    const task = new Task(title, desc, dueDate, priority)
    tasks.push(task)
    controller.displayTask(task)
  }
}

export default Task
export { tasks }