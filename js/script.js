class Calculator {
    constructor(perviousOperandTextElement, currentOperandTextElement) {
        this.perviousOperandTextElement = perviousOperandTextElement;
        this.currentOperandTextElement = currentOperandTextElement;
        this.clear()
    }

    clear() {
        this.currentOperand = ''
        this.perviousOperand = ''
        this.operation = undefined;
    }

    delete() {
        this.currentOperand = this.currentOperand.toString().slice(0, -1)

    }

    appendNumber(number) {
        if (number === '.' && this.currentOperand.includes('.')) return
        this.currentOperand = this.currentOperand.toString() + number.toString()
    }

    chooseOperation(operation) {
        if (this.currentOperand === '') return
        if (this.perviousOperand !== '') {
            this.compute()
        }
        this.operation = operation
        this.perviousOperand = this.currentOperand
        this.currentOperand = ''
    }

    compute() {
        let computeation;
        const prev = parseFloat(this.perviousOperand)
        const current = parseFloat(this.currentOperand)
        if (isNaN(prev) || isNaN(current)) return
        switch (this.operation) {
            case '+':
                computeation = prev + current;
            break;
            case '-':
                computeation = prev - current;
            break;
            case '*':
                computeation = prev * current;
            break;
            case '÷':
                computeation = prev / current;
            break;
            default:
                return;
        }
        this.currentOperand = computeation;
        this.operation = undefined;
        this.perviousOperand = '';

    }

    getDisplayNumber(number) {
        const stringNumber = number.toString()
        const inetgerDigits = parseFloat(stringNumber.split('.')[0]);
        const decimalDigits = stringNumber.split('.')[1];
        let inetgerDisplay;
        if (isNaN(inetgerDigits)) {
            inetgerDisplay = '';
        } else {
            inetgerDisplay = inetgerDigits.toLocaleString('en', {
                maximumFractionDigits: 0})
        }
        if (decimalDigits != null) {
            return `${inetgerDisplay}. ${inetgerDigits}`
        } else {
            return inetgerDisplay;
        }
    }

    updateDisplay() {
        this.currentOperandTextElement.innerText = this.getDisplayNumber(this.currentOperand);
        if (this.operation != null) {
        this.perviousOperandTextElement.innerText = `${this.getDisplayNumber(this.perviousOperand)} ${this.operation}`;
        } else {
            this.perviousOperandTextElement.innerText = '';
        }
    }

}

const numberButtons = document.querySelectorAll(`[data-number]`);
const operationButtons = document.querySelectorAll(`[data-operation]`);
const equalsButtons = document.querySelector(`[data-equals]`);
const deleteButtons = document.querySelector(`[data-delete]`);
const allClearButtons = document.querySelector(`[data-all-clear]`);
const perviousOperandTextElement = document.querySelector(`[data-pervious-operand]`);
const currentOperandTextElement = document.querySelector(`[data-current-operand]`);

 const calculator = new Calculator(perviousOperandTextElement, currentOperandTextElement)


 numberButtons.forEach(button => {
     button.addEventListener('click', () => {
         calculator.appendNumber(button.innerText)
         calculator.updateDisplay()
     })
 })
 

operationButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.chooseOperation(button.innerText)
        calculator.updateDisplay()
    })
})

equalsButtons.addEventListener('click', button => {
    calculator.compute()
    calculator.updateDisplay()
})

allClearButtons.addEventListener('click', button => {
    calculator.clear()
    calculator.updateDisplay()
})

deleteButtons.addEventListener('click', button => {
    calculator.delete()
    calculator.updateDisplay()
})