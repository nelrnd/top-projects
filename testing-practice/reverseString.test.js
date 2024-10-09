const reverseString = require("./reverseString")

it("reverses one word string", () => {
  expect(reverseString("hello")).toBe("olleh")
})

it("reverses multiple words string", () => {
  expect(reverseString("hello world")).toBe("dlrow olleh")
})

it("respects uppercase and lowercase characters", () => {
  expect(reverseString("Hello World")).toBe("dlroW olleH")
})

it("respects punctuation", () => {
  expect(reverseString("Hello, World!")).toBe("!dlroW ,olleH")
})
