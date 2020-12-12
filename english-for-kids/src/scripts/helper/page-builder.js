import HtmlGenerator from './../helper/html-generator';
import UrlChecker from "../checkers/url-checker";
import EventManager from "./event-manager";
import SoundsPlayer from "./sounds-player";
import PageNavigator from "./page-navigator";
import MainMenu from "../components/main-menu";
import PlayMode from "../helper/play-mode";

export default class PageBuilder {

    constructor() {
        this.htmlGenerator = new HtmlGenerator();
        this.urlChecker = new UrlChecker();
        this.eventManager = new EventManager();
        this.soundsPlayer = new SoundsPlayer();
        this.pageNavigator = new PageNavigator();
        this.mainMenu = new MainMenu();
        this.playMode = new PlayMode();
        this.categoriesMenuId = 'main-menu-list';
        this.contentMainId = 'main-content';
        this.delayAfterSuccessGameOver = 3500;
        this.delayAfterFailureGameOver = 5500;
    }

    buildPageFromHash(hash) {
        let pageKeyUrl = hash.substring(1);

        this.mainMenu.closeMainMenu();
        this.mainMenu.activeCurrentItem(pageKeyUrl);

        if (this.urlChecker.isMainPageUrl(pageKeyUrl)) {
            document.body.classList.add('main-page');
        } else {
            document.body.classList.remove('main-page');
        }

        if (this.urlChecker.isStaticPageUrl(pageKeyUrl)) {
            document.body.classList.add('static-page');
            this.buildStaticPage(pageKeyUrl);
            return;
        } else {
            document.body.classList.remove('static-page');
        }

        if (this.urlChecker.isCategoryUrl(pageKeyUrl)) {
            this.buildCardsCategoryPage(pageKeyUrl);
            return;
        }

        this.buildCategoryMainPage();
    }

    updateContentWithHtml(html) {
        document.getElementById(this.contentMainId).innerHTML = html;
        this.eventManager.initStaticPagesEvents();
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
                this.playMode.disable();
                this.pageNavigator.openHomepage(this.delayAfterSuccessGameOver);
            break;
            case 'failure-game-over':
                html = this.htmlGenerator.getFailureGameOverHtml();
                this.soundsPlayer.playFailureSound();
                this.playMode.disable();
                this.pageNavigator.openHomepage(this.delayAfterFailureGameOver);
            break;
            case 'statistics':
                html = this.htmlGenerator.getStatisticsHtml();
            break;
            default:
                html = pageKeyUrl;
            break;
        }

        this.updateContentWithHtml(html);
    }
}
