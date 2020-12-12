export default class StatisticRepository {

    increaseTurnedClicksOnCard(cardId) {
        this.updateCardByState(cardId, 'turned');
    }

    increaseSuccessClickOnCard(cardId) {
        this.updateCardByState(cardId, 'success');
    }

    increaseErrorClickOnCard(cardId) {
        this.updateCardByState(cardId, 'error');
    }

    updateCardByState(cardId, state) {
        let currentStat = this.getCardByState(cardId, state);

        currentStat++;
        localStorage.setItem('card_' + cardId + ':' + state, currentStat);
    }

    getRateByState(cardId) {
        let success = this.getCardByState(cardId, 'success');
        let error = this.getCardByState(cardId, 'error');
        let rate = Math.round(success / (success + error) * 100);

        if (Number.isNaN(rate)) {
            rate = 0;
        }

        return rate;
    }

    getCardByState(cardId, state) {
        let currentStat = localStorage.getItem('card_' + cardId + ':' + state);

        if (!currentStat) {
            currentStat = 0;
        }

        return parseInt(currentStat);
    }

    resetStatistics() {
        localStorage.clear();
        document.location.reload();
    }

}


