const output = document.querySelector("#output");
const rockBtn = document.querySelector("button#rock");
const paperBtn = document.querySelector("button#paper");
const scissorsBtn = document.querySelector("button#scissors");

[rockBtn, paperBtn, scissorsBtn].forEach((btn) => {
  btn.addEventListener("click", (event) => playRound(event.target.id));
});

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

function playRound(humanChoice) {
  const computerChoice = getComputerChoice();
  output.textContent = humanChoice + " against " + computerChoice;
}

function getHumanChoice() {
  let choice = prompt("Rock, paper or scissors?");
  choice = choice.trim().toLowerCase();
  if (choice !== "rock" && choice !== "paper" && choice !== "scissors") {
    choice = getHumanChoice();
  }
  return choice;
}

function capitalize(string) {
  return string.at(0).toUpperCase() + string.slice(1);
}

function playGame() {
  let humanScore = 0;
  let computerScore = 0;

  function playRound(humanChoice, computerChoice) {
    let message;

    if (
      (humanChoice === "rock" && computerChoice === "paper") ||
      (humanChoice === "paper" && computerChoice === "scissors") ||
      (humanChoice === "scissors" && computerChoice === "rock")
    ) {
      message = `You lose! ${capitalize(computerChoice)} beats ${humanChoice}.`;
      computerScore++;
    } else if (humanChoice === computerChoice) {
      message = `It's a tie! You both chose ${humanChoice}.`;
    } else {
      message = `You won! ${capitalize(humanChoice)} beats ${computerChoice}.`;
      humanScore++;
    }

    console.log(message);
    console.log("Your score: " + humanScore);
    console.log("Computer score: " + computerScore);
  }

  // play 5 round

  let humanChoice = getHumanChoice();
  let computerChoice = getComputerChoice();
  playRound(humanChoice, computerChoice);

  humanChoice = getHumanChoice();
  computerChoice = getComputerChoice();
  playRound(humanChoice, computerChoice);

  humanChoice = getHumanChoice();
  computerChoice = getComputerChoice();
  playRound(humanChoice, computerChoice);

  humanChoice = getHumanChoice();
  computerChoice = getComputerChoice();
  playRound(humanChoice, computerChoice);

  humanChoice = getHumanChoice();
  computerChoice = getComputerChoice();
  playRound(humanChoice, computerChoice);

  console.log("-------------");
  console.log("Game is over!");

  if (humanScore > computerScore) {
    console.log("You won the game");
  } else if (humanScore < computerScore) {
    console.log("Computer won the game");
  } else {
    console.log("It's a complete tie");
  }

  console.log("Your score: " + humanScore);
  console.log("Computer score: " + computerScore);
}
