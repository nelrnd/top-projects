import { useState } from "react"
import useCharacters from "./useCharacters.jsx"
import "./App.css"

function App() {
  const [characters, shuffle] = useCharacters()
  const [clickedIds, setClickedIds] = useState(new Set())
  const [score, setScore] = useState(0)
  const [bestScore, setBestScore] = useState(0)

  function handleClick(character) {
    if (clickedIds.has(character.id)) {
      setScore(0)
      if (score > bestScore) {
        setBestScore(score)
      }
      setClickedIds(new Set())
    } else {
      const newClickedIds = new Set([...clickedIds])
      newClickedIds.add(character.id)
      setClickedIds(newClickedIds)
      setScore(score + 1)
    }
    shuffle()
  }

  return (
    <>
      <h1>Memory Card</h1>
      <p>Win the game by clicking every card exactly once.</p>
      <Grid>
        {characters.map((character) => (
          <Card
            key={character.id}
            character={character}
            onClick={() => handleClick(character)}
          />
        ))}
      </Grid>
      <div className="score">
        <strong>Score:</strong> {score} | <strong>Best score:</strong>{" "}
        {bestScore}
      </div>
    </>
  )
}

function Card({ character, onClick }) {
  return (
    <button className="card" onClick={onClick}>
      <img src={character.image} alt="" />
      <h2>{character.name}</h2>
    </button>
  )
}

function Grid({ children }) {
  return <div className="grid">{children}</div>
}

export default App
