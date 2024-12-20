const { Player, Computer } = require("./Player")

class Game {
  constructor(controller) {
    this.player = new Player()
    this.computer = new Computer()
    this.players = [this.player, this.computer]
    this.currentTurn = 0
    this.controller = controller
  }

  get currentPlayer() {
    return this.players[this.currentTurn]
  }

  get otherPlayer() {
    return this.players[(this.currentTurn + 1) % 2]
  }

  switchTurn() {
    this.currentTurn = (this.currentTurn + 1) % 2
    this.setTurn()
  }

  start() {
    this.players.forEach((player) => player.gameboard.populateRandomly())
    if (this.controller) {
      this.controller.initiateGame(this.players)
    }
    this.setTurn()
  }

  setTurn() {
    if (this.controller) {
      const message =
        this.currentPlayer === this.players[0]
          ? "It's your turn"
          : "It's computer turn"
      this.controller.updateInfo(message)
    }
    if (this.currentPlayer.type === "computer") {
      this.disableBoard(this.currentPlayer)
      setTimeout(() => {
        this.currentPlayer.play(this.otherPlayer.gameboard)
        this.switchTurn()
      }, 2000)
    } else {
      this.enableBoard(this.otherPlayer)
    }
  }

  disableBoard(player) {
    const squares = player.gameboard.elem.querySelectorAll(".square")
    squares.forEach((square) => square.setAttribute("disabled", true))
  }

  enableBoard(player) {
    const squares = player.gameboard.elem.querySelectorAll(".square")
    squares.forEach((square) => square.removeAttribute("disabled"))
  }

  play(coordinates) {
    try {
      this.otherPlayer.gameboard.receiveAttack(...coordinates)
      if (this.otherPlayer.gameboard.allShipsAreSunk) {
        this.players.forEach((player) => this.disableBoard(player))
        this.controller.updateInfo("Game is over.")
      } else {
        this.switchTurn()
      }
    } catch (err) {
      console.log(err)
    }
  }
}

module.exports = Game
