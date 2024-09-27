import { v4 as uuidv4 } from "uuid"
import { tasks } from "./task.js"
import { controller } from "./index.js"

const lists = []

class List {
  constructor(title) {
    this.id = uuidv4()
    this.title = title
  }

  static create(title) {
    const list = new List(title)
    lists.push(list)
    controller.displayList(list)
  }

  get tasks() {
    return tasks.filter((task) => task.listId === this.id)
  }
}

export default List
export { lists }