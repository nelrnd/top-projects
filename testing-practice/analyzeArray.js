function analyzeArray(arr) {
  function getAverage(arr) {
    return arr.reduce((curr, prev) => prev + curr, 0) / arr.length
  }

  return {
    average: getAverage(arr),
    min: Math.min(...arr),
    max: Math.max(...arr),
    length: arr.length,
  }
}

module.exports = analyzeArray
