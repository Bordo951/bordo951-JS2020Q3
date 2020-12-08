import {initClickOnCardPlayModeEvent} from './../events/click-on-card';

export default class PlayMode {
    enable() {
        initClickOnCardPlayModeEvent();
    }

    disable() {
        let activeCards = document.querySelectorAll('#main-content .card');
        activeCards.forEach(function (activeCard) {
            activeCard.classList.remove('target_card');
        });
        localStorage.removeItem('failedAnswers');
        document.getElementById('star-row').innerHTML = '';
    }
}
