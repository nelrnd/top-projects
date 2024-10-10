const Gameboard = require("./Gameboard")
const Ship = require("./Ship")

it("cannot receive attack at same coordinates twice", () => {
  const gameboard = new Gameboard()
  gameboard.receiveAttack([0, 0])
  expect(() => gameboard.receiveAttack([0, 0])).toThrow(
    "Cannot attack at same coordinates twice"
  )
})

it("cannot place ship on invalid location", () => {
  const gameboard = new Gameboard()
  const ship = new Ship()
  expect(() => gameboard.placeShip(ship, [-10, 0], "h")).toThrow(
    "Invalid location"
  )
})

it("cannot place ship over already placed ship", () => {
  const gameboard = new Gameboard()
  const ship1 = new Ship(3)
  const ship2 = new Ship(3)
  gameboard.placeShip(ship1, [1, 0], "v")
  expect(() => gameboard.placeShip(ship2, [0, 1], "h")).toThrow(
    "Invalid location"
  )
})

it("can place two ships at two different locations", () => {
  const gameboard = new Gameboard()
  const ship1 = new Ship(3)
  const ship2 = new Ship(3)
  gameboard.placeShip(ship1, [0, 0], "h")
  gameboard.placeShip(ship2, [0, 1], "h")
})

it("can receive attacks without sunking placed ship", () => {
  const gameboard = new Gameboard()
  const ship = new Ship(3)
  gameboard.placeShip(ship, [0, 0], "h")
  gameboard.receiveAttack([3, 3])
  gameboard.receiveAttack([4, 4])
  gameboard.receiveAttack([5, 5])
  expect(ship.isSunk).toBe(false)
})

it("can sunk placed ship if attacked at correct coordinates", () => {
  const gameboard = new Gameboard()
  const ship = new Ship(3)
  gameboard.placeShip(ship, [0, 0], "h")
  gameboard.receiveAttack([0, 0])
  gameboard.receiveAttack([1, 0])
  gameboard.receiveAttack([2, 0])
  expect(ship.isSunk).toBe(true)
})

it("keeps track of received attacks", () => {
  const gameboard = new Gameboard()
  gameboard.receiveAttack([0, 0])
  gameboard.receiveAttack([1, 0])
  gameboard.receiveAttack([0, 1])
  expect(gameboard.attacks.length).toBe(3)
})

it("reports whether all ships are sunk", () => {
  const gameboard = new Gameboard()
  const ship1 = new Ship(1)
  const ship2 = new Ship(2)
  gameboard.placeShip(ship1, [0, 0], "h")
  gameboard.placeShip(ship2, [0, 1], "h")
  expect(gameboard.allShipsSunk).toBe(false)
  gameboard.receiveAttack([0, 0])
  expect(gameboard.allShipsSunk).toBe(false)
  gameboard.receiveAttack([0, 1])
  gameboard.receiveAttack([1, 1])
  expect(gameboard.allShipsSunk).toBe(true)
})
