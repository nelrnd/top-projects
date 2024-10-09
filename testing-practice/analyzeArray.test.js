const analyzeArray = require("./analyzeArray")

it("works with array of size 2", () => {
  expect(analyzeArray([1, 2])).toEqual({
    average: 1.5,
    min: 1,
    max: 2,
    length: 2,
  })
})

it("works with array of size 3", () => {
  expect(analyzeArray([5, 10, 15])).toEqual({
    average: 10,
    min: 5,
    max: 15,
    length: 3,
  })
})

it("works with unsorted array", () => {
  expect(analyzeArray([7, 3, 12, 9])).toEqual({
    average: 7.75,
    min: 3,
    max: 12,
    length: 4,
  })
})
