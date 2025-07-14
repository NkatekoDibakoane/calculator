function add(a, b) {
  return a + b;
}

function subtract(a, b) {
  return a - b;
}

function multiply(a, b) {
  return a * b;
}

function divide(a, b) {
  if (b === 0) return "Error: No dividing by zero!";
  return a / b;
}

function operate(operator, a, b) {
  a = Number(a);
  b = Number(b);
  if (operator === '+') return add(a, b);
  if (operator === '-') return subtract(a, b);
  if (operator === '*') return multiply(a, b);
  if (operator === '/') return divide(a, b);
  return null;
}

const display = document.getElementById('display');
const numberButtons = document.querySelectorAll('.number');
const clearButton = document.querySelector('.clear');

let currentDisplayValue = '0';

function updateDisplay() {
  display.textContent = currentDisplayValue;
}

numberButtons.forEach((button) => {
  button.addEventListener('click', () => {
    if (currentDisplayValue === '0' || shouldResetDisplay) {
      currentDisplayValue = button.textContent;
      shouldResetDisplay = false;
    } else {
      currentDisplayValue += button.textContent;
    }
    updateDisplay();
  });
});

clearButton.addEventListener('click', () => {
  currentDisplayValue = '0';
  updateDisplay();
});

const operatorButtons = document.querySelectorAll('.operator');
const equalsButton = document.querySelector('.equals');

let firstOperand = null;
let secondOperand = null;
let currentOperator = null;
let shouldResetDisplay = false;

operatorButtons.forEach((button) => {
  button.addEventListener('click', () => {
    if (currentOperator !== null && !shouldResetDisplay) {
      evaluate();
    }
    firstOperand = currentDisplayValue;
    currentOperator = button.textContent;
    shouldResetDisplay = true;
  });
});

equalsButton.addEventListener('click', () => {
  if (currentOperator === null || shouldResetDisplay) return;
  evaluate();
});

function evaluate() {
  if (currentOperator === null || shouldResetDisplay) return;
  secondOperand = currentDisplayValue;
  const result = operate(currentOperator, firstOperand, secondOperand);
  currentDisplayValue = roundResult(result);
  updateDisplay();
  currentOperator = null;
}

function roundResult(number) {
  if (typeof number === "number" && !Number.isInteger(number)) {
    return Math.round(number * 1000) / 1000;
  }
  return number;
}