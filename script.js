const calculatorDisplay = document.querySelector('h1')
const inputBtns = document.querySelectorAll('button')
const clearBtn = document.getElementById('clear-btn')

let firstValue = 0
let operatorValue = '';
let awaitingNextValue = false;

//  Calculate first and second value depending on operator
const calculate = {
    '/':(firstNumber, secondNumber) => firstNumber / secondNumber,
    '*':(firstNumber, secondNumber) => firstNumber * secondNumber,
    '+':(firstNumber, secondNumber) => firstNumber + secondNumber,
    '-':(firstNumber, secondNumber) => firstNumber - secondNumber,
    '=':(firstNumber, secondNumber) => secondNumber,
}

function sendNumberValue(value) {
    // Replace current display value if first value is entered
    if(awaitingNextValue) {
        calculatorDisplay.textContent = value;
        awaitingNextValue = false;
    } else {
        // if current display value is 0, replace it, if not add number
        const displayValue = calculatorDisplay.textContent;
        calculatorDisplay.textContent = displayValue === '0' ? value : displayValue + value
    }
}

function addDecimal() {
    // If operator press, don't add decimal
    if(awaitingNextValue) return;
    // if no decimal add one
    if(!calculatorDisplay.textContent.includes('.')) {
        calculatorDisplay.textContent = `${calculatorDisplay.textContent}.`
    }
}

function useOperator(operator) {
    const currentValue = Number(calculatorDisplay.textContent);
    // To prevent multiple operators
    if(operatorValue && awaitingNextValue) {
        operatorValue = operator;
        return;
    }
    // Assign firstvalue if no value
    if(!firstValue) {
        firstValue = currentValue
    } else {
        const calculation = calculate[operatorValue](firstValue, currentValue);
        calculatorDisplay.textContent = calculation;
        firstValue = calculation
    }
    //  Ready for next value, store operator
    awaitingNextValue = true;
    operatorValue = operator;
}

// Reset all value, display
function resetAll() {
    calculatorDisplay.textContent = '0'
    firstValue = 0;
    operatorValue = '';
    awaitingNextValue =  false;
}

// Add event listeners for numbers, operators, decimal button
inputBtns.forEach((inputBtn) => {
    if(inputBtn.classList.length === 0) {
        inputBtn.addEventListener('click', () => sendNumberValue(inputBtn.value))
    } else if(inputBtn.classList.contains('operator')){
        inputBtn.addEventListener('click', () => useOperator(inputBtn.value))
    } else if(inputBtn.classList.contains('decimal')) {
        inputBtn.addEventListener('click', () => addDecimal())
    }
})

clearBtn.addEventListener('click', resetAll);