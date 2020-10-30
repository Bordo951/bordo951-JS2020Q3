const MAX_INPUT_LENGTH = 10,
      INVALID_INPUT_MESSAGE = 'Invalid input';

let numbers = document.querySelectorAll('.number'),
    operations = document.querySelectorAll('.operation'),
    decimalBtn = document.getElementById('decimal'),
    resultBtn = document.getElementById('result'),
    clearBtns = document.querySelectorAll('.clear-btn'),
    display = document.getElementById('display'),
    squareRootBtn = document.getElementById('squareRoot'),
    lockedBtn = document.querySelectorAll('.locked'),
    exponentiationBtn = document.getElementById('exponentiation'),
    changeSignBtn = document.getElementById('changeSign'),
    MemoryStorageOperation = document.getElementById('storageOperation'),
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

changeSignBtn.addEventListener('click', changeSign);

function numberPress(number) {
    if (display.value === INVALID_INPUT_MESSAGE) {
        unlockCalc();
    }

    if (MemoryPendingOperation === '=') {
        MemoryPendingOperation = '';
        MemoryStorageOperation.innerHTML = MemoryPendingOperation;
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
    if (display.value.length > MAX_INPUT_LENGTH) {
        lockCalc();
    }
}

function operation(sumbolOper) {
    let localOperationMemory = display.value;

    if (MemoryNewNumber && MemoryPendingOperation !== '=') {
        display.value = MemoryCurrentNumber;
        if (MemoryPendingOperation !== sumbolOper) {
            MemoryStorageOperation.innerHTML = sumbolOper;
            MemoryPendingOperation = sumbolOper;
        }
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
        display.value = MemoryCurrentNumber.toFixed(9) * 1000000000 / 1000000000;
        MemoryPendingOperation = sumbolOper;
        MemoryStorageOperation.innerHTML = MemoryPendingOperation;
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
        MemoryStorageOperation.innerHTML = '';
    } else if (id === 'del') {
        unlockCalc();
    }
}

function squareRoot() {
    let localSquareMemory = display.value;

    if (localSquareMemory >= 0) {
        MemoryCurrentNumber = Math.sqrt(parseFloat(localSquareMemory));
        display.value = MemoryCurrentNumber.toFixed(9) * 1000000000 / 1000000000;
        MemoryStorageOperation.innerHTML = '&radic;';
    } else {
        lockCalc();
    }
}

function changeSign() {
    let localSignMemory = display.value,
        lastIndex = localSignMemory.length;

    if (localSignMemory > 0) {
        localSignMemory = '-' + localSignMemory;
    } else if (localSignMemory !== '0') {
            localSignMemory = localSignMemory.substring(1, lastIndex);
        }
    display.value = localSignMemory;
}



function disableCalc() {
    for (let i=0; i < lockedBtn.length; i++) {
        let locked = lockedBtn[i];
        locked.disabled = true;
    }
}

function lockCalc() {
    display.value = INVALID_INPUT_MESSAGE;
    MemoryStorageOperation.innerHTML = '';
    disableCalc();
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
    MemoryStorageOperation.innerHTML = '';
    enableCalc();
}




