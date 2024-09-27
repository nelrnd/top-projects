import { v4 as uuidv4 } from "uuid"
import { tasks } from "./task.js"
import { controller } from "./index.js"

const lists = []

class List {
  constructor({ id, title }) {
    this.id = id || uuidv4()
    this.title = title
  }

  static create({ id, title }) {
    const list = new List({ id, title })
    lists.push(list)
    controller.displayList(list)
    controller.saveDataInStorage()
  }

  get tasks() {
    return tasks.filter((task) => task.list === this.id)
  }
}

export default List
export { lists }