import cards from "../data/cards";

export default class CardsRepository {
    getAllCards() {
        return cards;
    }

    /**
     * Gets card by id
     * @param {Number} cardId
     * @returns {object}
     */
    getCardById(cardId) {
        let result = cards.filter(obj => {
            return obj.cardId === cardId
        });
        return result[0];
    }

    getCardsByCategoryId(categoryId) {
        let result = cards.filter(obj => {
            return obj.categoryId === categoryId
        });
        return result;
    }
}
