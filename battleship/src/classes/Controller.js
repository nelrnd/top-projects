class Controller {
  constructor(content) {
    this.content = content
    this.statusMessage = null
  }

  createBoard(gameboard, isMe, name) {
    function handleSquareClick(coordinates) {
      gameboard.receiveAttack(...coordinates)
    }

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
        let squareElem
        if (isMe) {
          squareElem = document.createElement("div")
        } else {
          squareElem = document.createElement("button")
          squareElem.onclick = () => handleSquareClick([x, y])
        }
        squareElem.className = "square"
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

    if (name) {
      const boardHeading = document.createElement("h2")
      boardHeading.textContent = name
      boardWrapper.appendChild(boardHeading)
    }

    return boardWrapper
  }

  createStatusMessage(message) {
    const statusMessage = document.createElement("header")
    statusMessage.setAttribute("id", "message")
    if (message) {
      statusMessage.textContent = message
    }
    this.statusMessage = statusMessage
    return statusMessage
  }

  updateStatusMessage(message) {
    this.statusMessage.textContent = message
  }

  initiateGame(players) {
    const statusMessage = this.createStatusMessage("It's your turn")
    const boardElem1 = this.createBoard(players[0].gameboard, true, "You")
    const boardElem2 = this.createBoard(players[1].gameboard, false, "Computer")
    const boardRow = document.createElement("div")
    const separatorElem = document.createElement("div")
    boardRow.className = "board-row"
    separatorElem.className = "separator"
    boardRow.appendChild(boardElem1)
    boardRow.appendChild(separatorElem)
    boardRow.appendChild(boardElem2)
    this.content.appendChild(statusMessage)
    this.content.appendChild(boardRow)
  }
}

module.exports = Controller
