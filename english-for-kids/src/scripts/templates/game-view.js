export default class GameView {
    getFailureGameHtml(game) {
        return `<div class="game-over">
                        <div class="game-over__image-wrapper">
                            <img class="game-over__image" src="./assets/images/game-over/failure.svg" alt="Failure" title="Failure">
                        </div>
                        <div class="game-over__result-wrapper">
                            <p class="game-over__result">
                                <span class="game-over__result-message">Error rate</span>
                                <span class="game-over__result-error">5</span>
                            </p>
                        </div>
                    </div>`;
    }

    getSuccessGameHtml(game) {
        return `<div class="game-over">
                        <div class="game-over__image-wrapper">
                            <img class="game-over__image" src="./assets/images/game-over/success.svg" alt="Success" title="Success">
                        </div>
                        <div class="game-over__result-wrapper">
                            <p class="game-over__result">
                                <span class="game-over__result-message">Good Job!</span>
                            </p>
                        </div>
                    </div>`;
    }
}