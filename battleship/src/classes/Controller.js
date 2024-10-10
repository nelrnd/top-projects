class Controller {
  constructor(game) {
    this.game = game
  }

  createBoard(board) {
    const boardElem = document.createElement("div")
    boardElem.className = "board"

    for (const x of board) {
      for (const y of board[x]) {
        const squareElem = document.createElement("button")
        boardElem.appendChild(squareElem)
      }
    }

    return boardElem
  }
}
