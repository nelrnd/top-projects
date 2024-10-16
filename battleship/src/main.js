require("./style.css")
const { Player, Computer } = require("./classes/Player")
const Controller = require("./classes/Controller")

const content = document.getElementById("content")

const player1 = new Player()
const player2 = new Computer()

const players = [player1, player2]
players.forEach((player) => player.gameboard.populateRandomly())

const controller = new Controller(content)

controller.initiateGame(players)
