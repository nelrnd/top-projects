const Gameboard = require("./Gameboard")

class Controller {
  constructor(content, game) {
    this.game = game
    this.content = content
    this.statusMessage = null
  }

  handleClick(gameboard, coordinates) {
    try {
      gameboard.receiveAttack(...coordinates)
    } catch {
      /* do nothing */
    }
  }

  createBoard(gameboard, isMe, name) {
    const board = document.createElement("div")
    const squares = document.createElement("div")
    const ships = document.createElement("div")

    board.className = "board"
    squares.className = "squares"
    ships.className = "ships"

    squares.style.gridTemplateColumns = `repeat(${gameboard.size}, 1fr)`
    squares.style.gridTemplateRows = `repeat(${gameboard.size}, 1fr)`
    ships.style.gridTemplateColumns = `repeat(${gameboard.size}, 1fr)`
    ships.style.gridTemplateRows = `repeat(${gameboard.size}, 1fr)`

    // create squares
    for (let i = 0; i < gameboard.size * gameboard.size; i++) {
      let square = document.createElement(isMe ? "div" : "button")
      square.className = "square"
      if (!isMe) {
        const coordinates = [i % gameboard.size, Math.trunc(i / gameboard.size)]
        square.onclick = () => this.handleClick(gameboard, coordinates)
      }
      squares.appendChild(square)
    }

    // create ships
    if (isMe) {
      for (const placedShip of gameboard.placedShips) {
        const ship = this.createShip(placedShip)
        ships.appendChild(ship)
      }
    }

    board.appendChild(squares)
    board.appendChild(ships)

    // create heading
    if (name) {
      const boardHeading = document.createElement("h2")
      boardHeading.textContent = name
      board.appendChild(boardHeading)
    }

    board.addEventListener("attack", (event) => this.handleAttack(event))
    board.addEventListener("sunk", (event) => this.handleSunk(event))

    return board
  }

  createShip(placedShip) {
    const ship = document.createElement("div")
    ship.className = "ship"
    ship.style.gridColumnStart = placedShip.coordinates[0] + 1
    ship.style.gridRowStart = placedShip.coordinates[1] + 1
    if (placedShip.orientation === "horizontal") {
      ship.style.gridColumnEnd = `span ${placedShip.ship.length}`
      ship.style.gridRowEnd = "span 1"
    } else {
      ship.style.gridRowEnd = `span ${placedShip.ship.length}`
      ship.style.gridColumnEnd = "span 1"
    }
    return ship
  }

  renderBoards(players) {
    const boardRow = document.querySelector(".board-row")
    boardRow.innerHTML = null

    const boards = players.map((player) => this.createBoard())
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
    const statusMessage = this.createStatusMessage()
    const boardElem1 = this.createBoard(players[0].gameboard, true, "You")
    const boardElem2 = this.createBoard(players[1].gameboard, false, "Computer")
    players[0].gameboard.elem = boardElem1
    players[1].gameboard.elem = boardElem2
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

  handleAttack(event) {
    const { gameboard, coordinates, isHit } = event.detail
    const index = Gameboard.getSquareIndex(coordinates, gameboard.size)
    const square = gameboard.elem.querySelector(".squares").childNodes[index]
    const mark = document.createElement("div")
    mark.className = isHit ? "mark hit" : "mark"
    square.appendChild(mark)
  }

  handleSunk(event) {
    console.log(this)
    const { gameboard, placedShip } = event.detail
    const ships = gameboard.elem.querySelector(".ships")
    const ship = this.createShip(placedShip)
    ships.appendChild(ship)
  }
}

module.exports = Controller
