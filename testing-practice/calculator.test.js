const calculator = require("./calculator")

it("adds two numbers", () => {
  expect(calculator.add(1, 3)).toBe(4)
})

it("substracts one number from another", () => {
  expect(calculator.substract(6, 2)).toBe(4)
})

it("multiply two numbers", () => {
  expect(calculator.multiply(4, 3)).toBe(12)
})

it("divides one number by another", () => {
  expect(calculator.divide(10, 2)).toBe(5)
})
