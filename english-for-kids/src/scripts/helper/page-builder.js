import HtmlGenerator from './../helper/html-generator';
import UrlChecker from "../checkers/url-checker";
import EventManager from "./event-manager";
import SoundsPlayer from "./sounds-player";
import PageNavigator from "./page-navigator";

export default class PageBuilder {

    constructor() {
        this.htmlGenerator = new HtmlGenerator();
        this.urlChecker = new UrlChecker();
        this.eventManager = new EventManager();
        this.soundsPlayer = new SoundsPlayer();
        this.pageNavigator = new PageNavigator();
        this.categoriesMenuId = 'main-menu-list';
        this.contentMainId = 'main-content';
        this.delayAfterSuccessGameOver = 3000;
        this.delayAfterFailureGameOver = 5000;
    }

    buildPageFromHash(hash) {
        let pageKeyUrl = hash.substring(1);

        if (this.urlChecker.isStaticPageUrl(pageKeyUrl)) {
            this.buildStaticPage(pageKeyUrl);
            return;
        }

        if (this.urlChecker.isCategoryUrl(pageKeyUrl)) {
            this.buildCardsCategoryPage(pageKeyUrl);
            return;
        }

        this.buildCategoryMainPage();
    }

    updateContentWithHtml(html) {
        document.getElementById(this.contentMainId).innerHTML = html;
    }

    updateMenuWithHtml(html) {
        document.getElementById(this.categoriesMenuId).innerHTML = html;
    }

    buildCategoryMenu() {
        let html = this.htmlGenerator.getCategoriesMenuHtml();

        this.updateMenuWithHtml(html);
    }

    buildCategoryMainPage() {
        let html = this.htmlGenerator.getCategoriesMainHtml();

        this.updateContentWithHtml(html);
    }

    buildCardsCategoryPage(categoryUrlKey) {
        let html = this.htmlGenerator.getCardsMainHtml(categoryUrlKey);

        this.updateContentWithHtml(html);
        this.eventManager.initCardsEvents();
    }

    buildStaticPage(pageKeyUrl) {
        let html = '';
        switch (pageKeyUrl) {
            case 'success-game-over':
                html = this.htmlGenerator.getSuccessGameOverHtml();
                this.soundsPlayer.playSuccessSound();
                this.pageNavigator.openHomepage(this.delayAfterSuccessGameOver);
            break;
            case 'failure-game-over':
                html = this.htmlGenerator.getFailureGameOverHtml();
                this.soundsPlayer.playFailureSound();
                this.pageNavigator.openHomepage(this.delayAfterFailureGameOver);
            break;
            default:
                html = pageKeyUrl;
            break;
        }

        this.updateContentWithHtml(html);
    }
}
