const field = document.createElement('div');
const overlay = document.createElement('div');
const newGame = document.createElement('button');
const board = document.createElement('div')
const moves = document.createElement('div');
const pauseGameHTML = document.createElement('button');
const cellSize = 100;
let empty = {};
let cells = [];
let numbers = [... Array(15).keys()];
let counterHtml = document.getElementsByClassName('counter');
let counter = 0;

newGame.addEventListener('click', startGame);
pauseGameHTML.addEventListener('click', pauseGame);

function resumeGame() {
    pauseGameHTML.innerHTML = 'Pause Game';
    pauseGameHTML.removeEventListener('click', resumeGame, false);
    pauseGameHTML.addEventListener('click', pauseGame);
    overlay.remove();
}

function pauseGame() {
    addOverlay();
    pauseGameHTML.innerHTML = 'Resume Game';
    pauseGameHTML.removeEventListener('click', pauseGame, false);
    pauseGameHTML.addEventListener('click', resumeGame);
}

function startGame() {
    resumeGame();
    cells = [];
    numbers = [... Array(15).keys()]
        .sort(() => Math.random() - 0.5);
    pauseGameHTML.disabled = false;
    counter = 0;
    counterHtml[0].innerHTML = 0;
    removeCells();
    createCells();
}

function increaseCounterHtml() {
    counterHtml[0].innerHTML = ++counter;
}

function addOverlay() {
    newGame.className = 'menu-item';
    newGame.innerHTML = 'New Game';
    overlay.append(newGame);

    overlay.className = 'overlay';
    field.append(overlay);
}

function createGameHTML() {
    board.className = 'board';
    document.body.append(board);

    addOverlay();

    moves.className = 'moves';
    board.append(moves);

    pauseGameHTML.disabled = true;
    pauseGameHTML.className = 'pauseGame';
    pauseGameHTML.innerHTML = 'Pause Game';
    board.append(pauseGameHTML);

    moves.innerHTML = '<span class = "description">Moves </span><span class="counter"></span>';
    counterHtml[0].innerHTML = 0;

    field.className = 'field';
    document.body.append(field);
}

function move(index) {
    const cell = cells[index];
    const leftDiff = Math.abs(empty.left - cell.left);
    const topDiff = Math.abs(empty.top - cell.top);

    if (leftDiff+topDiff > 1) {
        return;
    }

    cell.element.style.left = `${empty.left * cellSize}px`;
    cell.element.style.top = `${empty.top * cellSize}px`;

    const emptyLeft = empty.left;
    const emptyTop = empty.top;
    empty.left = cell.left;
    empty.top = cell.top;
    cell.left = emptyLeft;
    cell.top = emptyTop;

    increaseCounterHtml();

    const isFinished = cells.every(cell => {
        if(cell.value > 0) {
            return cell.value - 1 === cell.top * 4 + cell.left;
        } else {
            return true;
        }
    });

    if(isFinished) {
        alert('You won!');
    }
}

function createCells() {
    for (let i = 0; i < 15; i++) {
        const cell = document.createElement('div');
        const value = numbers[i] + 1;
        cell.className = 'cell';
        cell.innerHTML = value;

        const left = i % 4;
        const top = (i - left) / 4;

        cells.push({
            value: value,
            left: left,
            top: top,
            element: cell
        });

        cell.style.left = `${left * cellSize}px`;
        cell.style.top = `${top * cellSize}px`;

        field.append(cell);

        cell.addEventListener('click', () => {
            move(i);
        })
    }

    empty = {
        value: 0,
        top: 3,
        left: 3
    };

    cells.push(empty);
}

function removeCells() {
    field.innerHTML = '';
}

function createGame() {
    createGameHTML();
    createCells();
}

createGame();
