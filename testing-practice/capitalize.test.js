const capitalize = require("./capitalize")

it("capitalizes lowercased string", () => {
  expect(capitalize("hello")).toBe("Hello")
})

it("capitalizes uppercased string", () => {
  expect(capitalize("HELLO")).toBe("HELLO")
})

it("capitalizes capitalized string", () => {
  expect(capitalize("Hello")).toBe("Hello")
})

it("capitalizes string with multiple words", () => {
  expect(capitalize("hello, how are you?")).toBe("Hello, how are you?")
})
