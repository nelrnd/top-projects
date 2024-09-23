function createPlayer(name, mark) {
  let score = 0
  
  function getScore() {
    return score
  }

  function updateScore() {
    score++
  }

  return { name, mark, getScore, updateScore }
}

const Gameboard = (function() {
  const board = new Array(9).fill(null)

  const winningPatterns = [
    [1, 1, 1, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 1, 1, 1, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 1, 1, 1],
    [1, 0, 0, 1, 0, 0, 1, 0, 0],
    [0, 1, 0, 0, 1, 0, 0, 1, 0],
    [0, 0, 1, 0, 0, 1, 0, 0, 1],
    [1, 0, 0, 0, 1, 0, 0, 0, 1],
    [0, 0, 1, 0, 1, 0, 1, 0, 0]
  ]

  function isEmpty(index) {
    return board[index] === null
  }

  function isTied() {
    return board.every((square) => square !== null)
  }

  function placeMark(index, mark) {
    board[index] = mark
  }

  function getWinner() {
    const marks = board.filter((square, index, array) => square !== null && array.indexOf(square) === index)

    for (let i = 0; i < marks.length; i++) {
      let mark = marks[i]
      pattern: for (let j = 0; j < winningPatterns.length; j++) {
        for (let k = 0; k < winningPatterns[j].length; k++) {
          if (winningPatterns[j][k] === 1 && board[k] !== mark) {
            continue pattern
          }
        }
        return mark
      }
    }
  }

  function reset() {
    board.fill(null)
  }

  return { isEmpty, isTied, placeMark, getWinner, reset }
})()

const Game = (function() {
  const players = []
  let turn = 0

  function addPlayer(name, mark) {
    if (players.length === 2) {
      console.error("Cannot add another player in the game")
    }
    name = name || `player ${players.length + 1}`
    mark = mark || (!players.length ? "X" : "O")
    const player = createPlayer(name, mark)
    players.push(player)
  }

  function start() {
    if (players.length < 2) {
      console.log("Cannot start game without 2 players")
    }
    Gameboard.reset()
    displayTurnPlayer()
  }

  function displayTurnPlayer() {
    console.log(`It's ${players[turn].name} turn.`)
  }

  function play(index) {
    let turnValid = Gameboard.isEmpty(index)
    if (turnValid === false) {
      console.error("Square is already taken, chose another one")
    } else {
      Gameboard.placeMark(index, players[turn].mark)
      switchTurn()
      
      const winnerMark = Gameboard.getWinner()
      if (winnerMark) {
        endGame(winnerMark)
      } else if (Gameboard.isTied()) {
        endGame()
      } else {
        displayTurnPlayer()
      }
    }
  }

  function switchTurn() {
    turn = (turn + 1) % 2
  }

  function endGame(winnerMark) {
    if (winnerMark) {
      const winner = players.find((player) => player.mark === winnerMark)
      winner.updateScore()
      console.log(`Game over! ${winner.name} won!`)
      displayScores()
    } else {
      console.log(`Game over! It was a tie!`)
    }
  }

  function displayScores() {
    const longestName = players.sort((a, b) => b.name.length - a.name.length)[0].name
    const textLength = longestName.length + 5
    players.forEach((player) => {
      const name = player.name
      const score = player.getScore()
      const start = name.padEnd(textLength - String(score).length, ".")
      const text = start + score
      console.log(text)
    })
  }

  return { addPlayer, start, play }
})()

Game.addPlayer("Nel", "X")
Game.addPlayer("Kof", "O")
Game.start()
Game.play(0)
Game.play(1)
Game.play(2)
Game.play(4)
Game.play(3)
Game.play(6)
Game.play(5)
Game.play(8)
Game.play(7)