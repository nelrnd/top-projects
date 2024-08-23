const display = document.querySelector("#display");
const numberButtons = document.querySelectorAll(".numbers button");
const operatorButtons = document.querySelectorAll(".operators button");
const operateButton = document.querySelector("button#operate");
const clearButton = document.querySelector("button#clear");
const dotButton = document.querySelector("button#dot");

function populateDisplay(text) {
  display.textContent = text || 0;
}

class Calculator {
  constructor() {
    this.number1 = 0;
    this.number2 = null;
    this.operator = null;
  }

  get complete() {
    return !!(this.number1 !== null && this.number2 !== null && this.operator);
  }

  get operationText() {
    let text = "";
    if (this.number1 !== null) text += this.number1;
    if (this.operator) text += " " + this.getOperatorSymbol(this.operator);
    if (this.number2 !== null) text += " " + this.number2;
    return text;
  }

  add(a = this.number1, b = this.number2) {
    return a + b;
  }

  substract(a = this.number1, b = this.number2) {
    return a - b;
  }

  multiply(a = this.number1, b = this.number2) {
    return a * b;
  }

  divide(a = this.number1, b = this.number2) {
    return a / b;
  }

  operate() {
    if (!this.complete) {
      console.log("Cannot run operation, operation incomplete");
      return;
    }

    const number1 = Number(this.number1);
    const number2 = Number(this.number2);
    let result;

    switch (this.operator) {
      case "add":
        result = this.add(number1, number2);
        break;
      case "substract":
        result = this.substract(number1, number2);
        break;
      case "multiply":
        result = this.multiply(number1, number2);
        break;
      case "divide":
        result = this.divide(number1, number2);
        break;
    }

    // clear result
    result = Math.trunc(result * 100) / 100;

    if (result === Infinity) {
      console.log("something went wrong 😛");
      result = 0;
    }

    this.clear();
    this.number1 = result;

    return result;
  }

  clear() {
    this.number1 = 0;
    this.number2 = null;
    this.operator = null;
  }

  getOperatorSymbol(operator = this.operator) {
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

  addNumber(number) {
    if (!this.operator) {
      this.number1 = Number((this.number1 || "") + "" + number);
    } else {
      this.number2 = Number((this.number2 || "") + "" + number);
    }
  }

  addOperator(operator) {
    if (this.complete) {
      const result = this.operate();
      this.clear();
      this.number1 = result;
    }
    this.operator = operator;
  }

  addDot() {
    if (!this.operator) {
      if (!String(this.number1).includes(".")) {
        this.number1 = (this.number1 || 0) + ".";
      }
    } else {
      if (!String(this.number2).includes(".")) {
        this.number2 = (this.number2 || 0) + ".";
      }
    }
  }
}

const calculator = new Calculator();

numberButtons.forEach((button) => {
  button.addEventListener("click", (event) => {
    const number = event.target.textContent;
    calculator.addNumber(number);
  });
});

operatorButtons.forEach((button) => {
  button.addEventListener("click", (event) => {
    const { operator } = event.target.dataset;
    calculator.addOperator(operator);
  });
});

dotButton.addEventListener("click", () => calculator.addDot());
operateButton.addEventListener("click", () => calculator.operate());
clearButton.addEventListener("click", () => calculator.clear());

[
  ...numberButtons,
  ...operatorButtons,
  operateButton,
  clearButton,
  dotButton,
].forEach((button) =>
  button.addEventListener("click", () => {
    populateDisplay(calculator.operationText);
  }),
);
