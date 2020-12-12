import CardsRepository from "../entity/cards-repository";
import StatisticRepository from "../entity/statistic-repository";
import SoundsPlayer from "../helper/sounds-player";

let cardsRepository = new CardsRepository();
let soundsPlayer = new SoundsPlayer();
let statisticRepository = new StatisticRepository();

function rotateCard() {
    let dataCardId = parseInt(this.dataset.cardId);
    let card = cardsRepository.getCardById(dataCardId);
    soundsPlayer.playCardSound(card);
    document.querySelector(`.card__flipped[data-card-id="${dataCardId}"]`).classList.add('rotated');
    statisticRepository.increaseTurnedClicksOnCard(dataCardId);
}

function rotateCardBack() {
    let dataCardId = parseInt(this.dataset.cardId);
    document.querySelector(`.card__flipped[data-card-id="${dataCardId}"]`).classList.remove('rotated');
}

export function initRotateCardEvent() {
    let rotatedCardsButtons = document.querySelectorAll('[data-action="rotate-card"]');
    rotatedCardsButtons.forEach(function (button) {
        button.addEventListener('click', rotateCard);
    });
    let flipCards = document.querySelectorAll('.card__flipped');
    flipCards.forEach(function (button) {
        button.addEventListener('mouseleave', rotateCardBack);
    });
}

document.addEventListener("DOMContentLoaded", initRotateCardEvent);
