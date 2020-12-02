import cardsRepository from './entity/cards-repository';
import categoriesRepository from './entity/categories-repository';

let cardsRepositoryObject = new cardsRepository();
let categoriesRepository = new categoriesRepository();

console.log(cardsRepositoryObject.getCardById(12));
console.log(cardsRepositoryObject.getCardsByCategoryId(5));
console.log(categoriesRepository.getCategoryByID(3));
console.log(categoriesRepository.getCategoryByUrlKey('emotions'));