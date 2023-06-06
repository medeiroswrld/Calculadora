const numberButtons = document.querySelectorAll("[data-number]")
const operationButtons = document.querySelectorAll("[data-operator]")
const equalsButtons = document.querySelector("[data-equals]")
const deleteButtons = document.querySelector("[data-delete]")
const allClearButtons = document.querySelector("[data-all-clear]")
const previousOperandTextElements = document.querySelector("[data-previous-operand]")
const currentOperandTextElements = document.querySelector("[data-current-operand]")

class Calculator {
    constructor(previousOperandTextElements, currentOperandTextElements) {
        this.previousOperandTextElements = previousOperandTextElements
        this.currentOperandTextElements = currentOperandTextElements
        this.clear();
    }

    formateDisplayNumber(number) {
        const stringNumber = number.toString();

        const integerDigitals = parseFloat(stringNumber.split(".")[0]);
        const decimalDigitals = stringNumber.split(".")[1];

        let integerDisplay;

        if (isNaN(integerDigitals)) {
            integerDisplay = "";
        } else {
            integerDisplay = integerDigitals.toLocaleString("en", {
                maximumFractionDigits: 0,
            })
        }
        if (decimalDigitals != null) {
            return `${integerDisplay}.${decimalDigitals}`;
        } else {
            return integerDisplay;
        }
    }

    delete() {
        this.currentOperand = this.currentOperand.toString().slice(0, -1);
    }

    calculate() {
        let result;

        const _previousOperand = parseFloat(this.previousOperand)
        const _currentOperand = parseFloat(this.currentOperand)

        if (isNaN(_previousOperand) || isNaN(_currentOperand)) return;

        switch (this.operation) {
            case "+":
                result = _previousOperand + _currentOperand;
                break;
            case "-":
                result = _previousOperand - _currentOperand;
                break;
            case "*":
                result = _previousOperand * _currentOperand;
                break;
            case "÷":
                result = _previousOperand / _currentOperand;
                break;
            default:
                return;
        }

        this.currentOperand = result;
        this.operation = undefined;
        this.previousOperand = ""
    }


    chooseOperation(operation) {
        if (this.currentOperand == "") return;

        if (this.previousOperand !== "") {
            this.calculate()
        }

        this.operation = operation;

        this.previousOperand = this.currentOperand;
        this.currentOperand = "";
    }

    appendNumber(number) {
        if (this.currentOperand.includes(".") && number === ".") return;

        this.currentOperand = `${this.currentOperand}${number.toString()}`
    }

    clear() {
        this.currentOperand = "";
        this.previousOperand = "";
        this.operation = undefined;
    }

    updateDisplay() {
        this.previousOperandTextElements.innerText = `${this.formateDisplayNumber(this.previousOperand)} ${this.operation || ""}`;
        this.currentOperandTextElements.innerText = this.formateDisplayNumber(this.currentOperand);
    }
}

const calculator = new Calculator(
    previousOperandTextElements,
    currentOperandTextElements,
)

for (const numberButton of numberButtons) {
    numberButton.addEventListener("click", () => {
        calculator.appendNumber(numberButton.innerHTML);
        calculator.updateDisplay()
    })
}

for (const operationButton of operationButtons) {
    operationButton.addEventListener("click", () => {
        calculator.chooseOperation(operationButton.innerText);
        calculator.updateDisplay();
    })
}

allClearButtons.addEventListener("click", () => {
    calculator.clear();
    calculator.updateDisplay()
})

equalsButtons.addEventListener("click", () => {
    calculator.calculate();
    calculator.updateDisplay();

})

deleteButtons.addEventListener("click", () => {
    calculator.delete();
    calculator.updateDisplay();
})