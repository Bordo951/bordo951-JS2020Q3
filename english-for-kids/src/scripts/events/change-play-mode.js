function handleChangePlayMode() {
    if (this.checked) {
        document.body.classList.add('play-mode');
    } else {
        document.body.classList.remove('play-mode');
    }
}

let playModeInput = document.getElementById('play-mode');

playModeInput.addEventListener("change", handleChangePlayMode);