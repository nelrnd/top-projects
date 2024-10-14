const Game = require("./classes/Game")
const { Player, Computer } = require("./classes/Player")
require("./style.css")

const player1 = new Player()
const player2 = new Computer()
const game = new Game([player1, player2])
