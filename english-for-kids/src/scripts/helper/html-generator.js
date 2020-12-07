import CardsRepository from './../entity/cards-repository';
import CategoriesRepository from './../entity/categories-repository';

import CategoriesView from './../templates/categories-view';
import CardsView from "./../templates/cards-view";
import GameView from "../templates/game-view";

export default class HtmlGenerator {

    constructor() {
        this.categoriesRepository = new CategoriesRepository();
        this.categoriesView = new CategoriesView();
        this.cardsRepository = new CardsRepository();
        this.cardsView = new CardsView();
        this.gameView = new GameView();
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

    getGameOverHtml() {
        // let game = this.gameRepository.getGame();
        let game = {};
        let html = '';
        html = this.gameView.getSuccessGameHtml(game);
        //html = this.gameView.getFailureGameHtml(game);

        return html;
    }
}
