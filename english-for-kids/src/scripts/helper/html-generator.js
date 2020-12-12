import CardsRepository from './../entity/cards-repository';
import CategoriesRepository from './../entity/categories-repository';
import StatisticRepository from "../entity/statistic-repository";

import CategoriesView from './../templates/categories-view';
import CardsView from "./../templates/cards-view";
import GameView from "../templates/game-view";
import StatisticsView from "../templates/statistics-view";

export default class HtmlGenerator {

    constructor() {
        this.categoriesRepository = new CategoriesRepository();
        this.cardsRepository = new CardsRepository();
        this.statisticsRepository = new StatisticRepository();
        this.categoriesView = new CategoriesView();
        this.cardsView = new CardsView();
        this.gameView = new GameView();
        this.statisticsView = new StatisticsView();

    }

    getCategoriesMenuHtml() {
        let categories = this.categoriesRepository.getAllCategories();
        let html = '';
        categories.forEach(function (category) {
            html += this.categoriesView.getCategoryMenuItemHtml(category);
        }.bind(this));

        return html;
    }

    getCategoriesMainHtml() {
        let categories = this.categoriesRepository.getMainCategories();
        let html = '';
        categories.forEach(function (category) {
            html += this.categoriesView.getCategoryMainItemHtml(category);
        }.bind(this));

        return html;
    }

    getCardsMainHtml(categoryUrlKey) {
        let category = this.categoriesRepository.getCategoryByUrlKey(categoryUrlKey);
        let html = null;

        if (category) {
            let cards = this.cardsRepository.getCardsByCategoryId(category.categoryId);
            html = '';
            cards.forEach(function (card) {
                html += this.cardsView.getCardMainItemHtml(card);
            }.bind(this));
        }

        return html;
    }

    getSuccessGameOverHtml(game) {
        let html = '';
        html = this.gameView.getSuccessGameHtml(game);

        return html;
    }

    getFailureGameOverHtml(game) {
        let html = '';
        html = this.gameView.getFailureGameHtml(game);

        return html;
    }

    getStatisticsHtml() {
        let cards = this.cardsRepository.getAllCards();
        let html = this.statisticsView.getHeaderTable();

        cards.forEach(function (card) {
            let category = this.categoriesRepository.getCategoryByID(card.categoryId);
            let turned = this.statisticsRepository.getCardByState(card.cardId,'turned');
            let success = this.statisticsRepository.getCardByState(card.cardId,'success');
            let error = this.statisticsRepository.getCardByState(card.cardId,'error');
            let rate = this.statisticsRepository.getRateByState(card.cardId);

            let viewCard = {
                language: card.language,
                categoryId: category.language['en'],
                turned: turned,
                success: success,
                errors: error,
                rate: rate

            };
            html += this.statisticsView.getStatisticTableRows(viewCard);
        }.bind(this));

        html += this.statisticsView.getFooterTable();

        return html;
    }
}
