require("./style.css")

const Gameboard = require("./classes/Gameboard")
const Controller = require("./classes/Controller")

const controller = new Controller()

const gameboard = new Gameboard()
gameboard.populateRandomly()

const board = controller.createBoard(gameboard)
document.body.appendChild(board)
