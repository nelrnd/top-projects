function fibs(nb) {
  const sequence = [0, 1]
  while (sequence.length < nb) {
    sequence.push(sequence.at(-1) + sequence.at(-2))
  }
  return sequence
}

console.log(fibs(20))

function fibsRec(nb, arr = [0, 1]) {
  if (arr.length === nb) {
    return arr
  }
  arr.push(arr.at(-1) + arr.at(-2))
  return fibsRec(nb, arr)
}

console.log(fibsRec(20))
