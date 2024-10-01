function mergeSort(arr) {
  if (arr.length === 1) return arr
  const merged = []
  const left = mergeSort(arr.slice(0, Math.floor(arr.length / 2)))
  const right = mergeSort(arr.slice(Math.floor(arr.length / 2)))
  while (left.length || right.length) {
    if (!left.length) {
      merged.push(right.shift())
    } else if (!right.length) {
      merged.push(left.shift())
    } else if (left.at(0) < right.at(0)) {
      merged.push(left.shift())
    } else {
      merged.push(right.shift())
    }
  }
  return merged
}

console.log(mergeSort([3, 2, 1, 13, 8, 5, 0, 1]))
console.log(mergeSort([105, 79, 100, 110]))
