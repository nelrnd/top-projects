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

  function getBoard() {
    return [...board]
  }

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

  return { getBoard, isEmpty, isTied, placeMark, getWinner, reset }
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

    DisplayController.displayStatus(`It's ${players[turn].name} turn.`)
    DisplayController.displayBoard(Gameboard.getBoard())
    DisplayController.displayScores(players)
  }

  function play(index) {
    let turnValid = Gameboard.isEmpty(index)
    if (turnValid === false) {
      console.error("Square is already taken, chose another one")
    } else {
      Gameboard.placeMark(index, players[turn].mark)
      DisplayController.displayMark(index, players[turn].mark)
      switchTurn()
      
      const winnerMark = Gameboard.getWinner()
      if (winnerMark) {
        endGame(winnerMark)
      } else if (Gameboard.isTied()) {
        endGame()
      } else {
        DisplayController.displayStatus(`It's ${players[turn].name} turn.`)
      }
    }
  }

  function switchTurn() {
    turn = (turn + 1) % 2
  }

  function endGame(winnerMark) {
    DisplayController.handleEndGame()
    if (winnerMark) {
      const winner = players.find((player) => player.mark === winnerMark)
      winner.updateScore()
      DisplayController.displayStatus(`Game over! ${winner.name} won!`)
      DisplayController.displayScores(players)
    } else {
      DisplayController.displayStatus(`Game over! It was a tie!`)
    }
  }

  return { addPlayer, start, play }
})()

const DisplayController = (function() {
  const statusElem = document.getElementById("status")
  const boardElem = document.getElementById("board")
  const scoresElem = document.getElementById("scores")
  const dialogElem = document.getElementById("dialog")
  const namesForm = document.getElementById("names-form")
  const restartBtn = document.getElementById("restart")

  function displayStatus(message) {
    statusElem.textContent = message
  }

  function displayBoard(board) {
    boardElem.innerHTML = null
    board.forEach((square, index) => {
      const button = document.createElement("button")
      button.textContent = square
      button.onclick = () => Game.play(index)
      boardElem.appendChild(button)
    })
  }

  function displayScores(players) {
    scoresElem.innerHTML = null
    const thead = scoresElem.createTHead()
    const headRow = thead.insertRow()
    const tbody = scoresElem.createTBody()
    const bodyRow = tbody.insertRow()
    players.forEach((player) => {
      const th = document.createElement("th")
      th.textContent = player.name
      headRow.appendChild(th)
      const cell = bodyRow.insertCell()
      cell.textContent = player.getScore()
    })
  }
  
  function handleFormSubmit(event) {
    event.preventDefault()
    const formData = new FormData(event.target)
    const firstPlayerName = formData.get("first-player-name")
    const secondPlayerName = formData.get("second-player-name")
    Game.addPlayer(firstPlayerName, "X")
    Game.addPlayer(secondPlayerName, "O")
    Game.start()
    namesForm.reset()
    dialog.close()
  }

  function displayMark(index, mark) {
    const button = boardElem.childNodes[index]
    button.textContent = mark
    button.disabled = true
  }

  function handleEndGame() {
    Array.from(boardElem.childNodes).forEach((button) => button.disabled = true)
    restartBtn.classList.remove("hidden")
  }

  namesForm.addEventListener("submit", handleFormSubmit)

  restartBtn.addEventListener("click", () => {
    Game.start()
    restartBtn.classList.add("hidden")
  })

  dialogElem.showModal()

  return { displayStatus, displayBoard, displayScores, displayMark, handleEndGame }
})()