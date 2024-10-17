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

  play(ennemyGameboard) {
    let attackCoordinates
    do {
      const x = Math.floor(Math.random() * ennemyGameboard.size)
      const y = Math.floor(Math.random() * ennemyGameboard.size)
      attackCoordinates = [x, y]
    } while (ennemyGameboard.findAttack(...attackCoordinates))
    ennemyGameboard.receiveAttack(...attackCoordinates)
  }
}

module.exports = { Player, Computer }
