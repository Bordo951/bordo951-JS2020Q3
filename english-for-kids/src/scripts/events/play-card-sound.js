import CardsRepository from "../entity/cards-repository";
import SoundsPlayer from "../helper/sounds-player";

let cardsRepository = new CardsRepository();
let soundsPlayer = new SoundsPlayer();

function playSound() {
    let dataCardId = Number.parseInt(this.dataset.cardId);
    let card = cardsRepository.getCardById(dataCardId);

    soundsPlayer.playCardSound(card);
}

export function initPlayCardSoundEvent() {
    let soundCardsButtons = document.querySelectorAll('[data-action="play-sound"]');
    soundCardsButtons.forEach(function (button) {
        button.addEventListener('click', playSound);
    });
}

document.addEventListener("DOMContentLoaded", initPlayCardSoundEvent);