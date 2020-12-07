export default class CategoriesView {
    getCategoryMenuItemHtml(category) {
        let title = category.language['en'],
            image = category.image.menu;
        return `<li><a href="#${category.urlKey}"><img class="menu-img" src="./assets/images/categories/menu/${image}.svg" alt="${title}" title="${title}">${title}</a></li>`;
    }

    getCategoryMainItemHtml(category) {
        let title = category.language['en'];
        return `<a class="card" href="#${category.urlKey}">
                        <div class="card__image-wrapper">
                            <img class="card__image" src="./assets/images/categories/main/${category.urlKey}.jpg" alt="${title}" title="${title}">
                        </div>
                        <div class="card__content-wrapper">
                            <h3 class="card__title">${title}</h3>
                        </div>
                    </a>`;
    }
}
