import HtmlGenerator from './../helper/html-generator';
import UrlChecker from "../checkers/url-checker";

export default class PageBuilder {

    constructor() {
        this.htmlGenerator = new HtmlGenerator();
        this.urlChecker = new UrlChecker();
        this.categoriesMenuId = 'main-menu-list';
        this.contentMainId = 'main-content';
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
    }

    buildStaticPage(pageKeyUrl) {
        let html = '';
        switch (pageKeyUrl) {
            case 'game-over':
                html = this.htmlGenerator.getGameOverHtml();
            break;
            default:
                html = pageKeyUrl;
            break;
        }

        this.updateContentWithHtml(html);
    }
}
