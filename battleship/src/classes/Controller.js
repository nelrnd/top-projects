const Gameboard = require("./Gameboard")

class Controller {
  constructor(content, game) {
    this.game = game
    this.content = content
    this.info = null
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

  createInfo() {
    const info = document.createElement("header")
    info.setAttribute("id", "info")
    this.info = info
    return info
  }

  updateInfo(message) {
    this.info.textContent = message
  }

  initiateGame(players) {
    const info = this.createInfo()
    const board1 = this.createBoard(players[0].gameboard, true, "You")
    const board2 = this.createBoard(players[1].gameboard, false, "Computer")
    players[0].gameboard.elem = board1
    players[1].gameboard.elem = board2
    const boardRow = document.createElement("div")
    const separatorElem = document.createElement("div")
    boardRow.className = "board-row"
    separatorElem.className = "separator"
    boardRow.appendChild(board1)
    boardRow.appendChild(separatorElem)
    boardRow.appendChild(board2)
    this.content.appendChild(info)
    this.content.appendChild(boardRow)
  }

  handleClick(gameboard, coordinates) {
    this.game.play(coordinates)
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
    const { gameboard, placedShip } = event.detail
    const ships = gameboard.elem.querySelector(".ships")
    const ship = this.createShip(placedShip)
    ships.appendChild(ship)
  }
}

module.exports = Controller
