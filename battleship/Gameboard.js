class Gameboard {
  constructor() {
    this.size = 10
    this.board = this.createBoard(this.size)
    this.attacks = []
  }

  createBoard() {
    const board = []
    for (let x = 0; x < this.size; x++) {
      const row = []
      for (let y = 0; y < this.size; y++) {
        row.push({ ship: null })
      }
      board.push(row)
    }
    return board
  }

  placeShip(ship, coordinates, direction) {
    const squares = this.getSquares(coordinates, direction, ship.length)
    if (
      squares.length !== ship.length ||
      squares.some((square) => square.ship !== null)
    ) {
      throw Error("Invalid location")
    }
    squares.forEach((square) => (square.ship = ship))
  }

  getSquares(coordinates, direction, length) {
    coordinates = [...coordinates]
    let directionIndex
    const squares = []

    if (direction === "h") {
      directionIndex = 0
    } else if (direction === "v") {
      directionIndex = 1
    } else {
      throw new Error("Invalid direction")
    }

    for (let i = 0; i < length; i++, coordinates[directionIndex]++) {
      if (this.checkCoordinatesValidity(coordinates) === false) {
        break
      }
      const [x, y] = coordinates
      const square = this.board[x][y]
      squares.push(square)
    }

    return squares
  }

  receiveAttack(coordinates) {
    coordinates = [...coordinates]
    if (this.checkCoordinatesValidity(coordinates) === false) {
      throw new Error("Invalid coordinates")
    }
    const [x, y] = coordinates
    if (this.attacks.find((attack) => attack[0] === x && attack[1] === y)) {
      throw Error("Cannot attack at same coordinates twice")
    }
    const square = this.board[x][y]
    if (square.ship) {
      square.ship.hit()
    }
    this.attacks.push(coordinates)
  }

  checkCoordinatesValidity(coordinates) {
    const [x, y] = coordinates
    return x >= 0 && x < this.size && y >= 0 && y < this.size
  }

  get allShipsSunk() {
    return this.board
      .flat()
      .filter((square) => square.ship !== null)
      .every((square) => square.ship.isSunk === true)
  }
}

module.exports = Gameboard
