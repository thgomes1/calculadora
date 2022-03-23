let total = document.getElementById("total");
let previewContainer = document.getElementById("preview-container");
let calculatorKeys = document.getElementById("calculator-keys");
let calculatorKeyNumber = document.getElementsByClassName("key-number");
let calculatorKeyOperator = document.getElementsByClassName("key-operator");
let calculateKeyButton = document.getElementById("key-resolve");
let clearButton = document.getElementById("clear");
let deleteButton = document.getElementById("delete");

let number = "";
let solution = "";
let number1 = 0;
let number2 = 0;
let operator = "";
let clearFirstNumber = false;
let clearSecondNumber = false;
let firstNumberInserted = false;

onload = function () {
    for (let keyNumber of calculatorKeyNumber) {
        keyNumber.addEventListener("click", insertNumbers);
    }
    for (let keyOperator of calculatorKeyOperator) {
        keyOperator.addEventListener("click", insertOperator);
    }
};

function calculate() {
    if (operator == "") {
        previewContainer.innerHTML = `<p>${number1}</p>` + `<span>=</span>`;
        total.innerText = number1;
    }

    if (operator !== "") {
        if (previewContainer.children[0].innerText == total.innerText) {
            solution = number1;
            number2 = solution;
        }

        number1 = number1 * 1;
        number2 = number2 * 1;

        console.log(number1);
        console.log(number2);

        if (operator == "X") {
            solution = number1 * number2;
        }
        if (operator == "-") {
            solution = number1 - number2;
        }
        if (operator == "+") {
            solution = number1 + number2;
        }
        if (operator == "÷") {
            solution = number1 / number2;
        }

        previewContainer.innerHTML = `<p>${number1}</p>` + `<span>${operator}</span>` + `<p>${number2}</p>` + `<span>=</span>`;
        total.innerText = solution;

        if (total.innerText > 999 || total.innerText < -999) {
            formatNumber();
        }

        number1 = solution;

        clearSecondNumber = false;
    }
}

function insertOperator() {
    firstNumberInserted = true;
    number2 = number1;

    if (this.innerHTML == "X") {
        operator = "X";
    }
    if (this.innerHTML == "-") {
        operator = "-";
    }
    if (this.innerHTML == "+") {
        operator = "+";
    }
    if (this.innerHTML == "÷") {
        operator = "÷";
    }

    previewContainer.innerHTML = `<p>${number1}</p>` + `<span id="operator">${operator}</span>`;
}

function insertNumbers() {
    number = this.innerText;

    if (firstNumberInserted == false) {
        if (clearFirstNumber == false) {
            clearFirstNumber = true;
            total.innerHTML = number;
            number1 = number;
            return;
        }

        if (clearFirstNumber == true) {
            total.innerText += number;
            number1 += number;
            formatNumber();
            return;
        }
    }

    if (firstNumberInserted == true) {
        if (clearSecondNumber == false) {
            clearSecondNumber = true;
            total.innerHTML = number;
            number2 = number;
            return;
        }

        if (clearSecondNumber == true) {
            total.innerText += number;
            number2 += number;
            formatNumber();
            return;
        }
    }
}

function formatNumber() {
    console.log(total.innerText);

    if (total.innerHTML.includes(".") == true && total.innerHTML.includes(",") == false && total.innerHTML > 999) {
        formattedNumber = total.innerHTML * 1;
        total.innerHTML = formattedNumber.toLocaleString("en-US");
        return;
    }

    if (total.innerHTML.includes(".") == false) {
        formattedNumber = total.innerHTML.replace(/,/g, "") * 1;
        total.innerHTML = formattedNumber.toLocaleString("en-US");
        return;
    }
}

let n = -5000;
console.log(n < -999);

function clearValues() {
    total.innerHTML = "0";
    previewContainer.innerHTML = "";
    number = "";
    solution = "";
    number1 = 0;
    number2 = 0;
    operator = "";
    clearFirstNumber = false;
    clearSecondNumber = false;
    firstNumberInserted = false;
}

function deleteValue() {
    if (firstNumberInserted == false && typeof solution !== "number") {
        total.innerHTML = "0";
        number1 = "";
        return;
    }

    if (firstNumberInserted == true && typeof solution !== "number") {
        total.innerHTML = "0";
        number2 = "";
        return;
    }

    if (firstNumberInserted == true && typeof solution == "number") {
        clearValues();
        return;
    }
}

calculateKeyButton.addEventListener("click", calculate);
clearButton.addEventListener("click", clearValues);
deleteButton.addEventListener("click", deleteValue);

// finished
