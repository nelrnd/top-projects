const Tree = require("./Tree")

function createArray(size = 20, range = 100) {
  const arr = []
  while (arr.length < size) {
    arr.push(Math.floor(Math.random() * range))
  }
  return arr
}

function prettyPrint(node, prefix = "", isLeft = true) {
  if (node === null) {
    return
  }
  if (node.right !== null) {
    prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false)
  }
  console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.value}`)
  if (node.left !== null) {
    prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true)
  }
}

const myTree = new Tree(createArray())

console.log(myTree.isBalanced())

myTree.levelOrder((node) => console.log(node.value))
myTree.inOrder((node) => console.log(node.value))
myTree.insert(300)
myTree.insert(400)
myTree.insert(500)
myTree.insert(600)
console.log(myTree.isBalanced())
myTree.rebalance()
console.log(myTree.isBalanced())
prettyPrint(myTree.root)
