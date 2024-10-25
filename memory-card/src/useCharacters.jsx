import { useState, useEffect } from "react"

export default function useCharacters() {
  const [characters, setCharacters] = useState([])

  const excludeList = [
    141, 166, 195, 325, 396, 400, 1359, 559, 593, 627, 735, 736,
  ]

  function isNotInExcludeList(character) {
    return !excludeList.includes(character.id)
  }

  function modelCharacter(character) {
    return {
      id: character.id,
      name: character.name,
      image: character.images[0],
    }
  }

  function shuffle() {
    const newCharacters = [...characters]
    let currentIndex = characters.length
    while (currentIndex != 0) {
      let randomIndex = Math.floor(Math.random() * currentIndex)
      currentIndex--
      ;[newCharacters[currentIndex], newCharacters[randomIndex]] = [
        newCharacters[randomIndex],
        newCharacters[currentIndex],
      ]
    }
    setCharacters(newCharacters)
  }

  useEffect(() => {
    fetch("https://narutodb.xyz/api/akatsuki")
      .then((res) => res.json())
      .then((data) => data.akatsuki)
      .then((characters) => characters.filter(isNotInExcludeList))
      .then((characters) => characters.map(modelCharacter))
      .then((characters) => setCharacters(characters))
      .catch((err) => console.log(err))
  }, [])

  return [characters, shuffle]
}
