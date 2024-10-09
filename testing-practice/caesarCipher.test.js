const caesarCipher = require("./caesarCipher")

it("caesar cipher string 'abc' to 'def'", () => {
  expect(caesarCipher("abc", 3)).toBe("def")
})

it("caesar cipher 'hello' to 'ifmmp'", () => {
  expect(caesarCipher("hello", 1)).toBe("ifmmp")
})

it("wraps z to a", () => {
  expect(caesarCipher("xyz", 3)).toBe("abc")
})

it("preserves case", () => {
  expect(caesarCipher("Hello World", 2)).toBe("Jgnnq Yqtnf")
})

it("preverses punctuation", () => {
  expect(caesarCipher("Hello, World!", 2)).toBe("Jgnnq, Yqtnf!")
})
