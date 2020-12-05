import categories from "../data/categories";

export default class  CategoriesRepository {
    getCategoryByID(categoryId) {
        let result = categories.filter(obj => {
            return obj.categoryId === categoryId
        });
        return result[0];
    }

    getCategoryByUrlKey(urlKey) {
        let result = categories.filter(obj => {
            return obj.urlKey === urlKey
        });
        return result[0];
    }
}
