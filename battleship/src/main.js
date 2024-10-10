const Game = require("./classes/Game")
const { Player, Computer } = require("./classes/Player")
const Controller = require("./classes/Controller")
require("./style.css")

const player1 = new Player()
const player2 = new Computer()
const game = new Game([player1, player2])
const controller = new Controller(game)

const boardElem = controller.createBoard(player1.gameboard)
document.body.appendChild(boardElem)
