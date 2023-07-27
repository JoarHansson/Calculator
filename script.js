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
    } else if (operator === "*") {
        return multiply(num1, num2);
    } else if (operator === "/") {
        return divide(num1, num2);
    }
}


const numberButtons = document.querySelectorAll(".gridItemNumbers");

numberButtons.forEach((button) => {
    button.addEventListener("click", () => {
        numEquals = undefined;
        if (operator === undefined) {
            if (num1 === undefined) {
                num1 = button.textContent;
            } else {
                num1 += button.textContent;
            }
            console.log(num1, operator, num2); 
        } else if (operator !== undefined) {
            if (num2 === undefined) {
                num2 = button.textContent;
            } else {
                num2 += button.textContent;
            }
            console.log(num1, operator, num2);   
        }     
    });
});


const operatorButtons = document.querySelectorAll(".gridItemOperators");

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
        console.log(num1, operator, num2);
    });
});


const equalsButton = document.querySelector("#btnEquals");

equalsButton.addEventListener("click", () => {
    if (num2 === undefined) {
        return;
    } else if (operator == "/" && num2 == 0) {
        numEquals = "ERROR"
        num1 = undefined;
        num2 = undefined;
        operator = undefined;
    } else {
        numEquals = operate(Number(num1), operator, Number(num2));
        num1 = undefined;
        num2 = undefined;
        operator = undefined;
    }
    console.log(numEquals);
    console.log(num1, operator, num2);
});


const allClearButton = document.querySelector("#btnAllClear");

allClearButton.addEventListener("click", () => {
    num1 = undefined;
    num2 = undefined;
    operator = undefined;
    numEquals = undefined;
    console.log(num1, operator, num2, numEquals);
});


const deleteButton = document.querySelector("#btnDelete");

deleteButton.addEventListener("click", () => {
    if (num2 === undefined) {
        const myArray = Array.from(num1);
        myArray.pop();
        let myString = myArray.join("")
        num1 = myString;
        console.log(num1, operator, num2);
    } else {
        const myArray = Array.from(num2);
        myArray.pop();
        let myString = myArray.join("")
        num2 = myString;
        console.log(num1, operator, num2);
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
        console.log(num1, operator, num2);
        console.log(containsSubstringTwice(num1, "\\."));  

    } else if (num2 !== undefined && (containsSubstringTwice(num2, "\\."))) {
        const myArray = Array.from(num2);
        myArray.pop();
        let myString = myArray.join("")
        num2 = myString;
        console.log(num1, operator, num2);
        console.log(containsSubstringTwice(num2, "\\."));
    }
});