class Controller {
  constructor() {}

  createBoard(gameboard) {
    const boardWrapper = document.createElement("div")
    const squaresWrapper = document.createElement("div")
    const shipsWrapper = document.createElement("div")

    boardWrapper.className = "board"
    shipsWrapper.className = "ships"
    squaresWrapper.style.gridTemplateColumns = `repeat(${gameboard.size}, 1fr)`
    squaresWrapper.style.gridTemplateRows = `repeat(${gameboard.size}, 1fr)`
    shipsWrapper.style.gridTemplateColumns = `repeat(${gameboard.size}, 1fr)`
    shipsWrapper.style.gridTemplateRows = `repeat(${gameboard.size}, 1fr)`

    for (let x = 0; x < gameboard.size; x++) {
      for (let y = 0; y < gameboard.size; y++) {
        const squareElem = document.createElement("button")
        squareElem.onclick = () => this.handleSquareClick([x, y])
        squaresWrapper.appendChild(squareElem)
      }
    }

    for (const placedShip of gameboard.placedShips) {
      const shipElem = document.createElement("div")
      shipElem.className = "ship"
      shipElem.style.gridColumnStart = placedShip.coordinates[0] + 1
      shipElem.style.gridRowStart = placedShip.coordinates[1] + 1
      if (placedShip.orientation === "horizontal") {
        shipElem.style.gridColumnEnd = `span ${placedShip.ship.length}`
        shipElem.style.gridRowEnd = "span 1"
      } else {
        shipElem.style.gridRowEnd = `span ${placedShip.ship.length}`
        shipElem.style.gridColumnEnd = "span 1"
      }
      shipsWrapper.appendChild(shipElem)
    }

    boardWrapper.appendChild(squaresWrapper)
    boardWrapper.appendChild(shipsWrapper)
    return boardWrapper
  }

  handleSquareClick(coordinates) {
    console.log(coordinates)
  }
}

module.exports = Controller
