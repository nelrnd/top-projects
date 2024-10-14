const Ship = require("./Ship")

const defaultShipsBlueprint = [5, 4, 3, 3, 2]

class Gameboard {
  constructor(size = 10) {
    this.size = size
    this.placedShips = []
    this.receivedAttacks = []
  }

  get allShipsAreSunk() {
    return this.placedShips.every((placedShip) => placedShip.ship.isSunk)
  }

  placeShip(ship, coordinates, orientation) {
    const validLocation = this.checkLocationValidity(
      ship,
      coordinates,
      orientation
    )
    if (!validLocation) {
      throw new Error("Cannot place ship: invalid location")
    }
    const placedShip = this.placedShips.find(
      (placedShip) => placedShip.ship === ship
    )
    if (placedShip) {
      placedShip.coordinates = coordinates
      placedShip.orientation = orientation
    } else {
      this.placedShips.push({ ship, coordinates, orientation })
    }
  }

  getPlacedShip(x, y) {
    return this.placedShips.find((placedShip) => {
      const { coordinates, orientation } = placedShip
      const takenSquares = this.getSquares(
        placedShip.ship.length,
        coordinates,
        orientation
      )
      return takenSquares.find((square) => square[0] === x && square[1] === y)
    })
  }

  checkLocationValidity(ship, coordinates, orientation) {
    const squares = this.getSquares(ship.length, coordinates, orientation)
    return (
      squares.length === ship.length &&
      squares.every((square) => !this.getPlacedShip(...square))
    )
  }

  getSquares(length, coordinates, orientation) {
    coordinates = [...coordinates]
    const orientationIndex = orientation === "horizontal" ? 0 : 1
    const squares = []
    for (let i = 0; i < length; i++, coordinates[orientationIndex]++) {
      const [x, y] = coordinates
      if (this.checkCoordinatesValidity(x, y)) {
        squares.push([x, y])
      }
    }
    return squares
  }

  checkCoordinatesValidity(x, y) {
    return x >= 0 && x < this.size && y >= 0 && y < this.size
  }

  receiveAttack(x, y) {
    if (this.checkCoordinatesValidity(x, y) === false) {
      throw new Error("Cannot attack: invalid coordinates")
    }
    if (this.findAttack(x, y)) {
      throw new Error("Cannot attack: coordinates already attacked")
    }
    const placedShip = this.getPlacedShip(x, y)
    if (placedShip) {
      placedShip.ship.hit()
    }
    this.receivedAttacks.push([x, y])
  }

  findAttack(x, y) {
    return this.receivedAttacks.find(
      (attack) => attack[0] === x && attack[1] === y
    )
  }
}

module.exports = Gameboard
