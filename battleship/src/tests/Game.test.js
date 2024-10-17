const Game = require("../classes/Game")

it("switch turn", () => {
  const game = new Game()
  expect(game.currentPlayer).toEqual(game.players[0])
  game.switchTurn()
  expect(game.currentPlayer).toEqual(game.players[1])
  game.switchTurn()
  expect(game.currentPlayer).toEqual(game.players[0])
})
