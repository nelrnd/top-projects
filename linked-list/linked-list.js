const Node = require("./node")

class LinkedList {
  constructor() {
    this.head = null
  }

  append(value) {
    const node = new Node(value)
    if (this.head) {
      this.tail.nextNode = node
    } else {
      this.head = node
    }
  }

  prepend(value) {
    const node = new Node(value, this.head)
    this.head = node
  }

  get tail() {
    let currentNode = this.head
    while (currentNode && currentNode.nextNode) {
      currentNode = currentNode.nextNode
    }
    return currentNode
  }

  get size() {
    let currentNode = this.head
    let count = 0
    while (currentNode) {
      count++
      currentNode = currentNode.nextNode
    }
    return count
  }

  at(index) {
    let currentNode = this.head
    let count = 0
    while (count < index && currentNode) {
      currentNode = currentNode.nextNode
      count++
    }
    return currentNode
  }

  pop() {
    if (this.size === 2) {
      this.head.nextNode = null
    } else if (this.size === 1) {
      this.head === null
    } else {
      this.at(this.size - 2).nextNode = null
    }
  }

  contains(value) {
    let currentNode = this.head
    while (currentNode) {
      if (currentNode.value === value) {
        return true
      }
      currentNode = currentNode.nextNode
    }
    return false
  }

  find(value) {
    let currentNode = this.head
    let count = 0
    while (currentNode) {
      if (currentNode.value === value) {
        return count
      }
      currentNode = currentNode.nextNode
      count++
    }
    return null
  }

  insertAt(value, index) {
    if (this.at(index) === this.head) {
      this.prepend(value)
    } else if (index >= this.size - 1) {
      this.append(value)
    } else {
      const node = new Node(value, this.at(index))
      const prevNode = this.at(index - 1)
      prevNode.nextNode = node
    }
  }

  removeAt(index) {
    if (index >= this.size) {
      throw Error("Cannot find node at specified index")
    }
    const prevNode = this.at(index - 1)
    prevNode.nextNode = prevNode.nextNode.nextNode
  }

  toString() {
    let string = ""
    let currentNode = this.head
    while (currentNode) {
      if (currentNode === this.head) {
        string += `( ${currentNode.value} )`
      } else {
        string += ` -> ( ${currentNode.value} )`
      }
      currentNode = currentNode.nextNode
    }
    string += string ? " -> null" : "null"
    return string
  }
}

module.exports = LinkedList
