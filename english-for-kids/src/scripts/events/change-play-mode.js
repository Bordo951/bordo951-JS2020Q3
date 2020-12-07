import PlayMode from "../helper/play-mode";

let playMode = new PlayMode();

function handleChangePlayMode() {
    if (this.checked) {
        document.body.classList.add('play-mode');
        playMode.enable();
    } else {
        document.body.classList.remove('play-mode');
        playMode.disable();
    }
}

let playModeInput = document.getElementById('play-mode');

playModeInput.addEventListener("change", handleChangePlayMode);