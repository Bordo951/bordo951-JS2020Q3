export default class StatisticRepository {

    increaseTurnedClicksOnCard(cardId) {
        this.updateCardByState(cardId, 'turned');
        console.log('increaseTotalClickOnCard');
    }

    increaseSuccessClickOnCard(cardId) {
        this.updateCardByState(cardId, 'success');
        console.log('increaseSuccessClickOnCard');
    }

    increaseErrorClickOnCard(cardId) {
        this.updateCardByState(cardId, 'error');
        console.log('increaseErrorClickOnCard');
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
        console.log('resetStatistics');
    }

}


