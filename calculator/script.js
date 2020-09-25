let numbers = document.querySelectorAll('.number'),
    operations = document.querySelectorAll('.operation'),
    decimalBtn = document.getElementById('decimal'),
    resultBtn = document.getElementById('result'),
    clearBtns = document.querySelectorAll('.clear-btn'),
    display = document.getElementById('display'),
    squareRootBtn = document.getElementById('squareRoot'),
    lockedBtn = document.querySelectorAll('.locked'),
    exponentiationBtn = document.getElementById('exponentiation')
    MemoryCurrentNumber = 0,
    MemoryNewNumber = false,
    MemoryPendingOperation = '';


for (let i=0; i < numbers.length; i++) {
    let number = numbers[i];
    number.addEventListener('click', function (e) {
        numberPress(e.target.textContent);
    });
}

for (let i=0; i < operations.length; i++) {
    let operationBtn = operations[i];
    operationBtn.addEventListener('click', function (e) {
        operation(e.target.textContent);
    });
}

for (let i=0; i < clearBtns.length; i++) {
    let clearBtn = clearBtns[i];
    clearBtn.addEventListener('click', function (e) {
        clear(e.target.id);//e.srcElement.id
    });
}

decimalBtn.addEventListener('click', decimal);

squareRootBtn.addEventListener('click', squareRoot);

exponentiationBtn.addEventListener('click', function () {
    operation('^');
});

function numberPress(number) {
    if (display.value === 'Invalid input') {
        unlockCalc();
    }

    if (MemoryNewNumber) {
        display.value = number;
        MemoryNewNumber = false;
    } else {
        if (display.value === '0') {
            display.value = number;
        } else {
            display.value += number;
        }
    }
}

function operation(sumbolOper) {
    let localOperationMemory = display.value;

    if (MemoryNewNumber && MemoryPendingOperation !== '=') {
        display.value = MemoryCurrentNumber;
    } else {
        MemoryNewNumber = true;
        if (MemoryPendingOperation === '+') {
            MemoryCurrentNumber += parseFloat(localOperationMemory);
        } else if (MemoryPendingOperation === '-') {
            MemoryCurrentNumber -= parseFloat(localOperationMemory);
        } else if (MemoryPendingOperation === '*') {
            MemoryCurrentNumber *= parseFloat(localOperationMemory);
        } else if (MemoryPendingOperation === '÷') {
            MemoryCurrentNumber /= parseFloat(localOperationMemory);
        } else if (MemoryPendingOperation === '^') {
            MemoryCurrentNumber = Math.pow(MemoryCurrentNumber, parseFloat(localOperationMemory));
        } else {
            MemoryCurrentNumber = parseFloat(localOperationMemory);
        }
        display.value = MemoryCurrentNumber;
        MemoryPendingOperation = sumbolOper;
    }
}

function decimal() {
    let localDecimalMemory = display.value;

    if (MemoryNewNumber) {
        localDecimalMemory = '0.';
        MemoryNewNumber = false;
    } else {
        if (localDecimalMemory.indexOf('.') === -1) {
            localDecimalMemory += '.';
        }
    }
    display.value = localDecimalMemory;
}

function clear(id) {
    if (id === 'ac') {
        display.value = '0';
        MemoryNewNumber = true;
    } else if (id === 'del') {
        unlockCalc();
    }
}

function squareRoot() {
    let localSquareMemory = display.value;

    if (localSquareMemory >= 0) {
        MemoryCurrentNumber = Math.sqrt(parseFloat(localSquareMemory));
        display.value = MemoryCurrentNumber;
    } else {
        disableCalc();
        display.value = 'Invalid input';
    }

}

function disableCalc() {
    for (let i=0; i < lockedBtn.length; i++) {
        let locked = lockedBtn[i];
        locked.disabled = true;
    }
}

function enableCalc() {
    for (let i=0; i < lockedBtn.length; i++) {
        let locked = lockedBtn[i];
        locked.disabled = false;
    }
}

function unlockCalc() {
    display.value = '0';
    MemoryNewNumber = true;
    MemoryCurrentNumber = 0;
    MemoryPendingOperation = '';
    enableCalc();
}




