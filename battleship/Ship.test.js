const Ship = require("./Ship")

it("can be sunked if hit enough times", () => {
  const ship = new Ship(3)
  ship.hit()
  ship.hit()
  expect(ship.isSunk).toBe(false)
  ship.hit()
  expect(ship.isSunk).toBe(true)
})
