const Node = require("./Node")

class Tree {
  constructor(array) {
    this.root = this.buildTree(array, true)
  }

  buildTree(array, firstRun = false) {
    if (array.length < 1) {
      return null
    }
    array = [...array]
    if (firstRun) {
      // sort array and remove duplicates
      array = Array.from(new Set(array.sort((a, b) => a - b)))
    }
    const mid = Math.floor(array.length / 2)
    const root = new Node(array[mid])
    root.left = this.buildTree(array.slice(0, mid))
    root.right = this.buildTree(array.slice(mid + 1))
    return root
  }

  insert(value, currentNode = this.root, firstRun = true) {
    if (firstRun && !currentNode) {
      this.root = new Node(value)
      return
    }
    if (!currentNode) {
      return new Node(value)
    }

    if (value < currentNode.value) {
      currentNode.left = this.insert(value, currentNode.left, false)
    } else if (value > currentNode.value) {
      currentNode.right = this.insert(value, currentNode.right, false)
    } else {
      console.log("Value is already present")
    }

    return currentNode
  }

  deleteItem(value, currentNode = this.root) {
    if (value < currentNode.value) {
      currentNode.left = this.deleteItem(value, currentNode.left)
    } else if (value > currentNode.value) {
      currentNode.right = this.deleteItem(value, currentNode.right)
    } else {
      if (!currentNode.left && !currentNode.right) {
        return null
      } else if (currentNode.left && currentNode.right) {
        let nextBiggest = currentNode.right
        while (nextBiggest.left) {
          nextBiggest = nextBiggest.left
        }
        this.deleteItem(nextBiggest.value)
        currentNode.value = nextBiggest.value
        return currentNode
      } else {
        return currentNode.left || currentNode.right
      }
    }
    return currentNode
  }

  find(value, currentNode = this.root) {
    if (!currentNode) {
      console.log("Could not find value in tree")
      return
    }

    if (value < currentNode.value) {
      return this.find(value, currentNode.left)
    } else if (value > currentNode.value) {
      return this.find(value, currentNode.right)
    } else {
      return currentNode
    }
  }

  levelOrder(callback) {
    if (!callback) {
      throw new Error("Callback function is required")
    }
    const queue = [this.root]
    while (queue.length) {
      const first = queue.shift()
      callback(first)
      if (first.left) queue.push(first.left)
      if (first.right) queue.push(first.right)
    }
  }

  inOrder(cb, currentNode = this.root) {
    if (!cb) throw new Error("Callback is required")
    if (!currentNode) return
    this.inOrder(cb, currentNode.left)
    cb(currentNode)
    this.inOrder(cb, currentNode.right)
  }

  preOrder(cb, currentNode = this.root) {
    if (!cb) throw new Error("Callback is required")
    if (!currentNode) return
    cb(currentNode)
    this.preOrder(cb, currentNode.left)
    this.preOrder(cb, currentNode.right)
  }

  postOrder(cb, currentNode = this.root) {
    if (!cb) throw new Error("Callback is required")
    if (!currentNode) return
    this.postOrder(cb, currentNode.left)
    this.postOrder(cb, currentNode.right)
    cb(currentNode)
  }

  height(node, counter = 0, firstRun = true) {
    if (!node) return counter
    if (!firstRun) counter++
    const leftHeight = this.height(node.left, counter, false)
    const rightHeight = this.height(node.right, counter, false)
    return Math.max(leftHeight, rightHeight)
  }

  depth(node = this.root) {
    let counter = 0
    let currentNode = this.root
    while (currentNode !== node) {
      currentNode =
        node.value < currentNode.value ? currentNode.left : currentNode.right
      counter++
    }
    return counter
  }

  isBalanced() {
    let currentNode = this.root
    const queue = [currentNode]
    while (queue.length) {
      const first = queue.shift()
      if (first.left) queue.push(first.left)
      if (first.right) queue.push(first.right)
      const leftHeight = this.height(first.left)
      const rightHeight = this.height(first.right)
      if (Math.abs(leftHeight - rightHeight) > 1) return false
    }
    return true
  }

  rebalance() {
    const values = []
    this.inOrder((node) => values.push(node.value))
    this.root = this.buildTree(values)
  }
}

module.exports = Tree
