export default class CardsView {
    getCardMainItemHtml(card) {
        let originalTitle = card.language['en'],
            translatedTitle = card.language['ru'],
            originalTitleCapitalized = originalTitle.charAt(0).toUpperCase() + originalTitle.slice(1),
            translatedTitleCapitalized = translatedTitle.charAt(0).toUpperCase() + translatedTitle.slice(1);

        return `<div class="card card__flipped" data-card-id="${card.cardId}">
                    <div class="card__flipped-inner">
                        <div class="card__flipped-front">
                            <div class="card__image-wrapper">
                                <img class="card__image" src="./assets/images/${card.categoryId}/${originalTitle}.jpg" alt="${originalTitleCapitalized}">
                            </div>
                            <div class="card__content-wrapper">
                                <button class="card__flipped__button" data-action="play-sound" data-card-id="${card.cardId}">
                                    <img class="card__flipped__button-img" src="./assets/images/cards-button/sound.svg" alt="Sound" title="Sound">
                                </button>
                                <h3 class="card__title">${originalTitleCapitalized}</h3>
                                <button class="card__flipped__button" data-action="rotate-card" data-card-id="${card.cardId}">
                                    <img class="card__flipped__button-img" src="./assets/images/cards-button/turn.svg" alt="Turn" title="Turn">
                                </button>
                            </div>
                        </div>
                        <div class="card__flipped-back">
                            <div class="card__image-wrapper">
                                <img class="card__image" src="./assets/images/${card.categoryId}/${originalTitle}.jpg" alt="${originalTitleCapitalized}">
                            </div>
                            <div class="card__content-wrapper">
                                <h3 class="card__title">${translatedTitleCapitalized}</h3>
                            </div>
                        </div>
                    </div>
                </div>`;
    }
}
