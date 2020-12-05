import './../styles/index.scss';

import CardsRepository from './entity/cards-repository';
import CategoriesRepository from './entity/categories-repository';

let cardsRepositoryObject = new CardsRepository();
let categoriesRepositoryObject = new CategoriesRepository();

console.log(cardsRepositoryObject.getCardById(12));
console.log(cardsRepositoryObject.getCardsByCategoryId(5));
console.log(categoriesRepositoryObject.getCategoryByID(3));
console.log(categoriesRepositoryObject.getCategoryByUrlKey('emotions'));
