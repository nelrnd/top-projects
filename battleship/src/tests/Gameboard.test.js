const Gameboard = require("../classes/Gameboard")
const Ship = require("../classes/Ship")

it("can place ship horizontally", () => {
  const gameboard = new Gameboard()
  const ship = new Ship(3)
  gameboard.placeShip(ship, [0, 0], "horizontal")
  expect(gameboard.getPlacedShip(0, 0).ship).toBe(ship)
  expect(gameboard.getPlacedShip(1, 0).ship).toBe(ship)
  expect(gameboard.getPlacedShip(2, 0).ship).toBe(ship)
  expect(gameboard.getPlacedShip(3, 0)).toBeUndefined()
  expect(gameboard.getPlacedShip(0, 1)).toBeUndefined()
})

it("can place ship vertically", () => {
  const gameboard = new Gameboard()
  const ship = new Ship(3)
  gameboard.placeShip(ship, [0, 0], "vertical")
  expect(gameboard.getPlacedShip(0, 0).ship).toBe(ship)
  expect(gameboard.getPlacedShip(0, 1).ship).toBe(ship)
  expect(gameboard.getPlacedShip(0, 2).ship).toBe(ship)
  expect(gameboard.getPlacedShip(0, 3)).toBeUndefined()
  expect(gameboard.getPlacedShip(1, 0)).toBeUndefined()
})

it("can place ship anywhere on the board", () => {
  const gameboard = new Gameboard()
  const ship = new Ship(3)
  gameboard.placeShip(ship, [4, 3], "horizontal")
  expect(gameboard.getPlacedShip(4, 3).ship).toBe(ship)
  expect(gameboard.getPlacedShip(0, 0)).toBeUndefined()
})

it("cannot place ship outside the board", () => {
  const gameboard = new Gameboard()
  const ship = new Ship(3)
  expect(() => gameboard.placeShip(ship, [-1, 0], "horizontal")).toThrow(
    "Cannot place ship: invalid location"
  )
})

it("cannot place ship overflowing the board", () => {
  const gameboard = new Gameboard()
  const ship = new Ship(3)
  expect(() => gameboard.placeShip(ship, [8, 8], "horizontal")).toThrow(
    "Cannot place ship: invalid location"
  )
})

it("cannot place ship on top of another", () => {
  const gameboard = new Gameboard()
  const ship1 = new Ship(3)
  const ship2 = new Ship(3)
  gameboard.placeShip(ship1, [0, 1], "horizontal")
  expect(() => gameboard.placeShip(ship2, [1, 0], "vertical")).toThrow(
    "Cannot place ship: invalid location"
  )
})

it("can replace ship", () => {
  const gameboard = new Gameboard()
  const ship = new Ship(3)
  gameboard.placeShip(ship, [0, 0], "horizontal")
  expect(gameboard.getPlacedShip(2, 0).ship).toBe(ship)
  gameboard.placeShip(ship, [0, 1], "horizontal")
  expect(gameboard.getPlacedShip(2, 1).ship).toBe(ship)
  expect(gameboard.getPlacedShip(2, 0)).toBeUndefined()
})

it("can receive attacks", () => {
  const gameboard = new Gameboard()
  const ship = new Ship(2)
  gameboard.placeShip(ship, [5, 5], "horizontal")
  gameboard.receiveAttack(0, 0)
  expect(gameboard.receivedAttacks.length).toBe(1)
  expect(ship.isSunk).toBe(false)
  gameboard.receiveAttack(5, 5)
  expect(gameboard.receivedAttacks.length).toBe(2)
  expect(ship.isSunk).toBe(false)
  gameboard.receiveAttack(6, 5)
  expect(gameboard.receivedAttacks.length).toBe(3)
  expect(ship.isSunk).toBe(true)
})

it("cannot attack same coordinates twice", () => {
  const gameboard = new Gameboard()
  gameboard.receiveAttack(0, 0)
  expect(() => gameboard.receiveAttack(0, 0)).toThrow(
    "Cannot attack: coordinates already attacked"
  )
})

it("cannot attack at invalid coordinates", () => {
  const gameboard = new Gameboard()
  expect(() => gameboard.receiveAttack(-1, 120)).toThrow(
    "Cannot attack: invalid coordinates"
  )
})

it("reports whether all ships are sunk", () => {
  const gameboard = new Gameboard()
  const ship1 = new Ship(1)
  const ship2 = new Ship(1)
  gameboard.placeShip(ship1, [0, 0], "horizontal")
  gameboard.placeShip(ship2, [9, 9], "horizontal")
  gameboard.receiveAttack(0, 0)
  expect(gameboard.allShipsAreSunk).toBe(false)
  gameboard.receiveAttack(9, 9)
  expect(gameboard.allShipsAreSunk).toBe(true)
})

it("can populate board with randomly placed ships", () => {
  const gameboard = new Gameboard()
  gameboard.populateRandomly()
  expect(gameboard.placedShips.length).toBe(5)
})

it("gets index from coordinates", () => {
  expect(Gameboard.getSquareIndex([3, 0], 10)).toBe(3)
})

it("get coordinates from index", () => {
  expect(Gameboard.getSquareCoordinates(3, 10)).toEqual([3, 0])
})
