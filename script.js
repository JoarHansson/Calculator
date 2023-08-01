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
    return a / b;
}

let num1;
let operator;
let num2;
let numEquals;

function operate(num1, operator, num2) {
    if (operator === "+") {
       return add(num1, num2);
    } else if (operator === "-") {
        return subtract(num1, num2);
    } else if (operator === "×") {
        return multiply(num1, num2);
    } else if (operator === "÷") {
        return divide(num1, num2);
    }
}


function removeLeadingZeros(input) {
    const processedInput = input.replace(/^0+(?=\d)/, "");

    return processedInput;
}
  
const display = document.querySelector("#display");

const numberButtons = document.querySelectorAll(".btnNumbers");
const zeroButton = document.querySelector("#btnZero");

numberButtons.forEach((button) => {
    button.addEventListener("click", () => {
        numEquals = undefined;

        if (operator === undefined) {
            if (num1 === undefined) {
                num1 = button.textContent;
            } else {
                num1 += button.textContent;
            }
            num1 = removeLeadingZeros(num1);
            display.textContent = num1;

        } else if (operator !== undefined) {
            if (num2 === undefined) {
                num2 = button.textContent;
            } else {
                num2 += button.textContent;
            }
            num2 = removeLeadingZeros(num2);
            display.textContent = num1 + operator + num2;
        }     
    });
});


const operatorButtons = document.querySelectorAll(".btnOperators");

operatorButtons.forEach((button) => {
    button.addEventListener("click", () => { 
        if (numEquals !== undefined) {
            num1 = numEquals;
            num2 = undefined;
        } 
        if (operator !== undefined && num2 !== undefined) {
            num1 = operate(Number(num1), operator, Number(num2));
            num2 = undefined;
        }
        if (num1 === undefined) {
            num1 = 0;
        }
        operator = button.textContent;
        display.textContent = num1 + operator;
    });
});


const equalsButton = document.querySelector("#btnEquals");

equalsButton.addEventListener("click", () => {
    if (num2 === undefined) {
        return;
    } else if (operator == "÷" && num2 == 0) {
        numEquals = "ERROR"
        num1 = undefined;
        num2 = undefined;
        operator = undefined;
    } else {
        numEquals = parseFloat(operate(Number(num1), operator, Number(num2)).toFixed(3)).toString();
        num1 = undefined;
        num2 = undefined;
        operator = undefined;
    }
    display.textContent = numEquals;
});


const allClearButton = document.querySelector("#btnAllClear");

allClearButton.addEventListener("click", () => {
    num1 = undefined;
    num2 = undefined;
    operator = undefined;
    numEquals = undefined;
    display.textContent = "0";
});


const deleteButton = document.querySelector("#btnDelete");

deleteButton.addEventListener("click", () => {
    if (num2 === undefined) {
        const myArray = Array.from(num1);
        myArray.pop();
        let myString = myArray.join("")
        num1 = myString;
        display.textContent = num1;
    } else {
        const myArray = Array.from(num2);
        myArray.pop();
        let myString = myArray.join("")
        num2 = myString;
        display.textContent = num1 + operator + num2;
    }
    if (display.textContent == "") {
        display.textContent = 0;
    }
});


const decimalButton = document.querySelector("#btnDecimal");

decimalButton.addEventListener("click", () => {
    function containsSubstringTwice(str, substring) {
        const regex = new RegExp(substring, "g");
        const matches = str.match(regex);
        return matches && matches.length >= 2;
    }

    if (num2 === undefined && (containsSubstringTwice(num1, "\\."))) {
        const myArray = Array.from(num1);
        myArray.pop();
        let myString = myArray.join("")
        num1 = myString;
        display.textContent = num1;

    } else if (num2 !== undefined && (containsSubstringTwice(num2, "\\."))) {
        const myArray = Array.from(num2);
        myArray.pop();
        let myString = myArray.join("")
        num2 = myString;
        display.textContent = num1 + operator + num2;
    }
});


const keyboardShortcuts = {
    "1": "btnOne",
    "2": "btnTwo",
    "3": "btnThree",
    "4": "btnFour",
    "5": "btnFive",
    "6": "btnSix",
    "7": "btnSeven",
    "8": "btnEight",
    "9": "btnNine",
    "0": "btnZero",
    ".": "btnDecimal",
    "Escape": "btnAllClear",
    "Backspace": "btnDelete",
    "+": "btnAdd",
    "/": "btnDivide",
    "-": "btnSubtract",
    "*": "btnMultiply",
    "Enter": "btnEquals"
};

document.addEventListener("keydown", function(event) {
    const buttonId = keyboardShortcuts[event.key];

    if (buttonId) {
        const button = document.getElementById(buttonId);
        if (button) {
            button.click();
        }
    }
});