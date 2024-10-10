const Gameboard = require("./Gameboard")

class Player {
  constructor(type = "human") {
    this.type = type
    this.gameboard = new Gameboard()
  }
}

class Computer extends Player {
  constructor() {
    super("computer")
  }
}

module.exports = { Player, Computer }
