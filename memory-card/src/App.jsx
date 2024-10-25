import { useState, useEffect } from "react"

function App() {
  const [characters, setCharacters] = useState([])

  useEffect(() => {
    getCharacters()
      .then((characters) => setCharacters(characters))
      .catch((err) => console.log(err))
  }, [])

  return (
    <>
      <h1>Memory Card</h1>
      {characters.map((character) => (
        <>
          <img key={character.id} src={character.image} alt={character.name} />
          <p>{character.id}</p>
        </>
      ))}
    </>
  )
}

async function getCharacters() {
  function filterCharacters(character) {
    return !excludeList.includes(character.id)
  }

  function mapCharacters(character) {
    return {
      id: character.id,
      name: character.name,
      image: character.images[0],
    }
  }

  const excludeList = [
    141, 166, 195, 325, 396, 400, 1359, 559, 593, 627, 735, 736,
  ]
  const res = await fetch("https://narutodb.xyz/api/akatsuki")
  const data = await res.json()
  const characters = data.akatsuki
  const result = characters.filter(filterCharacters).map(mapCharacters)
  return result
}

export default App
