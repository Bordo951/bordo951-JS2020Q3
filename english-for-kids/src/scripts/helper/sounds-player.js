export default class SoundsPlayer {
    playCardSound(card) {
        let audio = new Audio(`./assets/audio/${card.categoryId}/${card.language['en']}.mp3`);
        audio.play();
    }

    playGameModeSound(mode) {
        let audio = new Audio(`./assets/audio/game-mode/${mode}.mp3`);
        audio.play();
    }

    playCorrectSound() {
        this.playGameModeSound('correct');
    }

    playErrorSound() {
        this.playGameModeSound('error');
    }

    playFailureSound() {
        this.playGameModeSound('failure');
    }

    playSuccessSound() {
        this.playGameModeSound('success');
    }
}