const rockBtn = document.querySelector("button#rock");
const paperBtn = document.querySelector("button#paper");
const scissorsBtn = document.querySelector("button#scissors");

[rockBtn, paperBtn, scissorsBtn].forEach((btn) => {
  btn.addEventListener("click", (event) => console.log(event.target.id));
});
