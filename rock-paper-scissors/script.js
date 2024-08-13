const output = document.querySelector("#output");
const rockBtn = document.querySelector("button#rock");
const paperBtn = document.querySelector("button#paper");
const scissorsBtn = document.querySelector("button#scissors");

function getComputerChoice() {
  const random = Math.floor(Math.random() * 3);
  switch (random) {
    case 0:
      return "rock";
    case 1:
      return "paper";
    case 2:
      return "scissors";
  }
}

function displayScore(scoreA, scoreB) {
  const scores = document.querySelector(".scores");
  const leftText = scores.firstElementChild;
  const rightText = scores.lastElementChild;
  leftText.textContent = `you: ${scoreA}`;
  rightText.textContent = `computer: ${scoreB}`;
}

function capitalize(string) {
  return string.at(0).toUpperCase() + string.slice(1);
}

function playGame() {
  let humanScore = 0;
  let computerScore = 0;

  function playRound(humanChoice) {
    const computerChoice = getComputerChoice();

    if (
      (humanChoice === "rock" && computerChoice === "paper") ||
      (humanChoice === "paper" && computerChoice === "scissors") ||
      (humanChoice === "scissors" && computerChoice === "rock")
    ) {
      output.textContent = `You lose! ${capitalize(computerChoice)} beats ${humanChoice}.`;
      computerScore++;
    } else if (humanChoice === computerChoice) {
      output.textContent = `It's a tie! You both chose ${humanChoice}.`;
    } else {
      output.textContent = `You won! ${capitalize(humanChoice)} beats ${computerChoice}.`;
      humanScore++;
    }

    displayScore(humanScore, computerScore);
  }

  [rockBtn, paperBtn, scissorsBtn].forEach((btn) => {
    btn.addEventListener("click", (event) => playRound(event.target.id));
  });
}

playGame();
