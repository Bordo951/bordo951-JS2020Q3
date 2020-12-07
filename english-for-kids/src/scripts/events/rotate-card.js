function rotateCard() {
    let dataCardId = this.dataset.cardId;
    document.querySelector(`.card__flipped[data-card-id="${dataCardId}"]`).classList.add('rotated');

    setTimeout(function(){
        document.querySelector(`.card__flipped[data-card-id="${dataCardId}"]`).classList.remove('rotated');
    }, 1000);
}

export function initRotateCardEvent() {
    let rotatedCardsButtons = document.querySelectorAll('[data-action="rotate-card"]');
    rotatedCardsButtons.forEach(function (button) {
        button.addEventListener('click', rotateCard);
    });
}

document.addEventListener("DOMContentLoaded", initRotateCardEvent);