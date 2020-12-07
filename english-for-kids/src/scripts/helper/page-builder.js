import HtmlGenerator from './../helper/html-generator';

export default class PageBuilder {

    constructor() {
        this.htmlGeneratorObject = new HtmlGenerator();
        this.categoriesMenuId = 'main-menu-list';
        this.contentMainId = 'main-content';
    }

    cleanMainPage() {
        document.getElementById(this.contentMainId).innerHTML = '';
    }

    buildCategoryMenu() {
        let html = this.htmlGeneratorObject.getCategoriesMenuHtml();
        document.getElementById(this.categoriesMenuId).innerHTML = html;
    }

    buildCategoryMainPage() {
        this.cleanMainPage();
        let html = this.htmlGeneratorObject.getCategoriesMainHtml();
        document.getElementById(this.contentMainId).innerHTML = html;
    }

    buildCardsCategoryPage(categoryUrlKey) {
        this.cleanMainPage();
        let html = this.htmlGeneratorObject.getCardsMainHtml(categoryUrlKey);
        document.getElementById(this.contentMainId).innerHTML = html;
    }
}
