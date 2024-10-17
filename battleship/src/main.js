require("./style.css")
const Game = require("./classes/Game")
const Controller = require("./classes/Controller")

const controller = new Controller(document.getElementById("content"))
const game = new Game(controller)
controller.game = game

game.start()

document.addEventListener("hit", (event) => {
  const square = event.square

  function addMark(square) {
    const mark = document.createElement("div")
    mark.className = "mark"
    square.appendChild(mark)
  }

  addMark(square)
})
