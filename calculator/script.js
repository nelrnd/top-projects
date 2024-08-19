function add(a, b) {
  return a + b;
}

function substract(a, b) {
  return a - b;
}

function multiply(a, b) {
  return a * b;
}

function divide(a, b) {
  return a / b;
}

let number1 = null;
let number2 = null;
let operator = null;

function operate(a, b, operator) {
  if (!a || !b || !operator) {
    throw new Error("Cannot run operation, missing arguments");
  }

  switch (operator) {
    case "add":
      return add(a, b);
    case "substract":
      return substract(a, b);
    case "multiply":
      return multiply(a, b);
    case "divide":
      return divide(a, b);
  }
}

const display = document.querySelector("#display");
const numberBtns = document.querySelectorAll(".numbers button");
const operatorBtns = document.querySelectorAll(".operators button");
const operateBtn = document.getElementById("operate");
const clearBtn = document.getElementById("clear");

function handleNumberButtonClick(event) {
  const number = event.target.textContent;
  if (!operator) {
    number1 = Number(+number1 + "" + number);
  } else {
    number2 = Number(+number2 + "" + number);
  }
  populateDisplay(number2 || number1);
}

function handleOperatorButtonClick(event) {
  operator = event.target.dataset.operator;
  populateDisplay();
}

function handleOperateButtonClick() {
  if (!number1 || !number2 || !operator) {
    return;
  }

  const result = operate(number1, number2, operator);
  clear();
  number1 = result;
  populateDisplay();
}

function clear() {
  number1 = null;
  number2 = null;
  operator = null;
  populateDisplay();
}

function populateDisplay() {
  let text = 0;
  if (number1) {
    text = number1;
  }
  if (operator) {
    text += " " + getOperatorSymbol(operator);
  }
  if (number2) {
    text += " " + number2;
  }
  display.textContent = text;
}

function getOperatorSymbol(operator) {
  switch (operator) {
    case "add":
      return "+";
    case "substract":
      return "-";
    case "multiply":
      return "x";
    case "divide":
      return "÷";
  }
}

numberBtns.forEach((button) => {
  button.addEventListener("click", handleNumberButtonClick);
});

operatorBtns.forEach((button) => {
  button.addEventListener("click", handleOperatorButtonClick);
});

operateBtn.addEventListener("click", handleOperateButtonClick);

clearBtn.addEventListener("click", clear);
