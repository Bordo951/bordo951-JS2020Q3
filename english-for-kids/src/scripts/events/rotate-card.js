function rotateCard() {
    let dataCardId = this.dataset.cardId;
    document.querySelector(`.card__flipped[data-card-id="${dataCardId}"]`).classList.add('rotated');
}

function rotateCardBack() {
    let dataCardId = this.dataset.cardId;
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
