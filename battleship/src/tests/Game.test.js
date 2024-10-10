const Game = require("../classes/Game")

it("switch turn", () => {
  const game = new Game()
  expect(game.currentTurn).toBe(0)
  game.switchTurn()
  expect(game.currentTurn).toBe(1)
  game.switchTurn()
  expect(game.currentTurn).toBe(0)
})
