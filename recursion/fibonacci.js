function fibs(nb) {
  const sequence = [0, 1]
  while (sequence.length < nb) {
    sequence.push(sequence.at(-1) + sequence.at(-2))
  }
  return sequence
}

console.log(fibs(8))
