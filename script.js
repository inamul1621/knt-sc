const display = document.getElementById('display');
let isDegree = true;

function appendNumber(num) {
  display.value += num;
}

function appendOperator(op) {
  display.value += op;
}

function appendDot() {
  if (!display.value.endsWith('.')) {
    display.value += '.';
  }
}

function clearDisplay() {
  display.value = '';
}

function deleteChar() {
  display.value = display.value.slice(0, -1);
}

function appendFunction(func) {
  if (['Math.sin(', 'Math.cos(', 'Math.tan('].includes(func)) {
    display.value += (isDegree ? `toRadians(${func}` : func);
  } else {
    display.value += func;
  }
}

function appendBracket(bracket) {
  display.value += bracket;
}

function appendConstant(constant) {
  display.value += constant;
}

function appendReciprocal() {
  if (display.value) {
    display.value = `1/(${display.value})`;
  }
}

function toggleSign() {
  if (display.value) {
    if (display.value.startsWith('-')) {
      display.value = display.value.slice(1);
    } else {
      display.value = '-' + display.value;
    }
  }
}

function calculateFactorial() {
  try {
    const value = parseFloat(display.value);
    if (value < 0 || !Number.isInteger(value)) {
      display.value = 'Error';
    } else {
      display.value = factorial(value);
    }
  } catch (e) {
    display.value = 'Error';
  }
}

function factorial(n) {
  return n === 0 ? 1 : n * factorial(n - 1);
}

function calculate() {
  try {
    const expression = display.value.replace(/toRadians\((Math\.\w+)\(/g, (match, func) => {
      return `Math.${func.replace('Math.', '')}(toRadians(`;
    });
    const result = eval(expression);
    display.value = result;
  } catch (e) {
    display.value = 'Error';
  }
}

function toRadians(degrees) {
  return degrees * (Math.PI / 180);
}

function toggleDegRad() {
  isDegree = !isDegree;
  document.getElementById('degRadBtn').innerText = isDegree ? 'Deg' : 'Rad';
}
