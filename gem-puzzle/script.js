const field = document.createElement('div'),
    overlay = document.createElement('div'),
    newGame = document.createElement('button'),
    board = document.createElement('div'),
    moves = document.createElement('div'),
    pauseGameHTML = document.createElement('button'),
    boxTime = document.createElement('div'),
    cellSize = 100,
    time = document.createElement('time'),
    soundHTML = document.createElement('button'),
    sounds = ['click-cell', 'sound-press'];
let empty = {},
    cells = [],
    numbers = [... Array(15).keys()],
    counterHtml = document.getElementsByClassName('counter'),
    counter = 0,
    audioContainer = document.createElement('div'),
    sound = true,
    today = new Date(0, 0, 0, 0, 0, 0),
    timeCounter,
    isTimeCounting = false;


newGame.addEventListener('click', startGame);
pauseGameHTML.addEventListener('click', pauseGame);

soundHTML.addEventListener('click', turnOffSound);

const createIconHTML = function (icon_name, icon_caption) {
    if (icon_caption === undefined) {
        icon_caption = "";
    }
    return `<i class="material-icons">${icon_name}</i>${icon_caption}`;
};

function turnOffSound () {
    playSoundByKey('sound-press');

    soundHTML.innerHTML = createIconHTML("volume_off");
    sound = false;

    soundHTML.removeEventListener('click', turnOffSound, false);
    soundHTML.addEventListener('click', turnOnSound);
}

function turnOnSound() {
    sound = true;
    soundHTML.innerHTML = createIconHTML("volume_up");

    soundHTML.removeEventListener('click', turnOnSound, false);
    soundHTML.addEventListener('click', turnOffSound);

    playSoundByKey('sound-press');
}

function showTime() {
    let min = today.getMinutes(),
        sec = today.getSeconds();

    // Output Time
    time.innerHTML = `${addZero(min)}<span>:</span>${addZero(sec)}`;
    updateTime();
    timeCounter = setTimeout(showTime, 500);
}

function addZero(n) {
    return (parseInt(n, 10) < 10 ? '0' : '') + n;
}

function updateTime() {
    if(isTimeCounting) {
        today.setMilliseconds(today.getMilliseconds() + 500);
    }
}

function playSoundByKey(key) {
    let currentAudio;

    if (sound) {
        currentAudio = document.querySelector('audio[data-key=' + key + ']');
        currentAudio.currentTime = 0;
        currentAudio.play();
    }
}

function createAudio() {
    let audioHtml = '';

    // Creates HTML for an audio
    const createAudioHTML = function (key, src) {
        return `<audio data-key="${key}" src="${src}"></audio>`;
    };


        sounds.forEach(function (sound) {
            let src = `./media/sound/${sound}.mp3`,
                key = `${sound}`;

            audioHtml += createAudioHTML(key, src);
        });

    return audioHtml;
}



function resumeGame() {
    pauseGameHTML.innerHTML = 'Pause Game';
    isTimeCounting = true;
    pauseGameHTML.removeEventListener('click', resumeGame, false);
    pauseGameHTML.addEventListener('click', pauseGame);
    overlay.remove();
}

function pauseGame() {
    isTimeCounting = false;
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

    isTimeCounting = true;
    today = new Date(0, 0, 0, 0, 0, 0);
    clearTimeout(timeCounter);
    showTime();
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
    audioContainer.innerHTML = createAudio();
    document.body.append(audioContainer);

    board.className = 'board';
    document.body.append(board);

    addOverlay();

    boxTime.className = 'boxTime';
    boxTime.innerHTML = '<span class="descriptionTime">Time</span>'
    board.append(boxTime);
    time.id = 'time';
    time.innerHTML = '00:00';
    boxTime.append(time);

    moves.className = 'moves';
    board.append(moves);

    pauseGameHTML.disabled = true;
    pauseGameHTML.className = 'pauseGame';
    pauseGameHTML.innerHTML = 'Pause Game';
    board.append(pauseGameHTML);

    moves.innerHTML = '<span class="description">Moves</span><span class="counter"></span>';
    counterHtml[0].innerHTML = 0;

    field.className = 'field';
    document.body.append(field);

    soundHTML.className = 'sound';
    soundHTML.innerHTML = createIconHTML("volume_up");
    document.body.append(soundHTML);
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
    playSoundByKey('click-cell');

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
