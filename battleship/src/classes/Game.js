class Game {
  constructor(players = []) {
    this.players = players
    this.currentTurn = 0
  }

  addPlayer(player) {
    if (this.players.length >= 2) {
      throw new Error("Game cannot contain more than 2 players")
    }
    this.players.push(player)
  }

  play(coordinates) {
    this.players[(this.currentTurn + 1) % 2].gameboard.receiveAttack(
      coordinates
    )
  }

  switchTurn() {
    this.currentTurn = this.currentTurn === 0 ? 1 : 0
  }
}

module.exports = Game
