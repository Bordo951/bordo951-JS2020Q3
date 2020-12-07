import HtmlGenerator from './../helper/html-generator';

export default class PageBuilder {

    constructor() {
        this.htmlGeneratorObject = new HtmlGenerator();
        this.categoriesMenuId = 'main-menu-list';
        this.contentMainId = 'main-content';
    }

    updateContentWithHtml(html) {
        document.getElementById(this.contentMainId).innerHTML = html;
    }

    updateMenuWithHtml(html) {
        document.getElementById(this.categoriesMenuId).innerHTML = html;
    }

    buildCategoryMenu() {
        let html = this.htmlGeneratorObject.getCategoriesMenuHtml();

        this.updateMenuWithHtml(html);
    }

    buildCategoryMainPage() {
        let html = this.htmlGeneratorObject.getCategoriesMainHtml();

        this.updateContentWithHtml(html);
    }

    buildCardsCategoryPage(categoryUrlKey) {
        let html = this.htmlGeneratorObject.getCardsMainHtml(categoryUrlKey);

        this.updateContentWithHtml(html);
    }
}
