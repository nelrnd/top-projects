class Square {
  constructor(x, y) {
    this.x = x
    this.y = y
    this.moves = []
  }
}

class Graph {
  constructor(size = 10) {
    this.size = size
    this.board = this.createBoard()
    this.patterns = [
      [-1, -2],
      [1, -2],
      [2, 1],
      [2, -1],
      [1, 2],
      [-1, 2],
      [-2, -1],
    ]
    this.populateMoves()
  }

  createBoard() {
    const board = []
    for (let x = 0; x < this.size; x++) {
      const row = []
      for (let y = 0; y < this.size; y++) {
        const square = new Square(x, y)
        row.push(square)
      }
      board.push(row)
    }
    return board
  }

  populateMoves() {
    for (const row of this.board) {
      for (const square of row) {
        const moves = this.findMoves(square)
        square.moves.push(...moves)
      }
    }
  }

  findMoves(square) {
    const moves = []
    for (const pattern of this.patterns) {
      const x = square.x + pattern[0]
      const y = square.y + pattern[1]
      if (x >= 0 && x < this.size && y >= 0 && y < this.size) {
        moves.push([x, y])
      }
    }
    return moves
  }

  findSquare(x, y) {
    if (x < 0 || x >= this.size || y < 0 || y >= this.size) {
      console.log("Cannot find square: x or y is out of range")
    }
    return this.board[x][y]
  }

  knightMoves(start, finish) {
    const [finishX, finishY] = finish

    const queue = [[start]]
    let shortestPath

    while (queue.length) {
      const first = queue.shift()
      const [currentX, currentY] = first.at(-1)
      if (currentX === finishX && currentY === finishY) {
        shortestPath = first
        break
      }
      const square = this.findSquare(currentX, currentY)
      queue.push(...square.moves.map((move) => [...first, move]))
    }

    console.log(
      `You made it in ${shortestPath.length} ${shortestPath.length === 1 ? "move" : "moves"}! Here's your path:`
    )
    for (const step of shortestPath) {
      console.log(step)
    }
  }
}

const myGraph = new Graph()
console.log(myGraph.knightMoves([0, 0], [7, 7]))
