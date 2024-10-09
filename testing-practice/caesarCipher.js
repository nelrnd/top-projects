function caesarCipher(string, shift) {
  const ALPHABET = "abcdefghijklmnopqrstuvwxyz"

  function isLetter(char) {
    return ALPHABET.includes(char.toLowerCase())
  }

  function findIndex(char) {
    return ALPHABET.indexOf(char.toLowerCase())
  }

  function isUpperCase(char) {
    const index = findIndex(char)
    return ALPHABET[index] !== char
  }

  function shiftChar(char) {
    if (isLetter(char)) {
      const index = findIndex(char)
      const upper = isUpperCase(char)
      const shifted = ALPHABET[(index + shift) % ALPHABET.length]
      return upper ? shifted.toUpperCase() : shifted
    }
    return char
  }

  return string.split("").map(shiftChar).join("")
}

module.exports = caesarCipher
