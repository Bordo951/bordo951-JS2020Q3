import CategoriesRepository from './../entity/categories-repository';

export default class UrlChecker {
    constructor() {
        this.trustedUrls = ['statistics','success-game-over','failure-game-over'];
        this.categoriesRepository = new CategoriesRepository();
    }

    isStaticPageUrl(url) {
        return url.length > 0 && this.trustedUrls.indexOf(url) !== -1;
    }

    isCategoryUrl(url) {
        let category = this.categoriesRepository.getCategoryByUrlKey(url);

        return url.length > 0 && typeof category === 'object';
    }
}