import HtmlGenerator from './../helper/html-generator';

export default class PageBuilder {

    constructor() {
        this.htmlGeneratorObject = new HtmlGenerator();
        this.categoriesMenuId = 'main-menu-list';
        this.categoriesMainId = 'categories';
        this.cardsMainId = 'cards';
    }

    cleanMainPage() {
        document.getElementById(this.cardsMainId).innerHTML = '';
        document.getElementById(this.categoriesMainId).innerHTML = '';
    }

    buildCategoryMenu() {
        let html = this.htmlGeneratorObject.getCategoriesMenuHtml();
        document.getElementById(this.categoriesMenuId).innerHTML = html;
    }

    buildCategoryMainPage() {
        this.cleanMainPage();
        document.getElementById(this.categoriesMainId).style.zIndex = '9';

        let html = this.htmlGeneratorObject.getCategoriesMainHtml();
        document.getElementById(this.categoriesMainId).innerHTML = html;
    }

    buildCardsCategoryPage(categoryUrlKey) {
        this.cleanMainPage();
        document.getElementById(this.categoriesMainId).style.zIndex = '0';

        let html = this.htmlGeneratorObject.getCardsMainHtml(categoryUrlKey);
        document.getElementById(this.cardsMainId).innerHTML = html;
    }
}
