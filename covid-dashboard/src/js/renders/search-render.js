import CovidRepository from "../repositories/covid-repository";
import SearchView from "../views/search-view";

export default class SearchRender {
    constructor() {
        this.covidRepository = new CovidRepository();
        this.search = new SearchView();
    }

    async renderSearch() {
        const countriesDataObject = await this.covidRepository.getCountriesData();
        const updateDataItemElement = document.getElementById('search');
        let html = '';
        countriesDataObject.forEach((element) => {
            html += this.search.renderCountryOption(element);
        });

        updateDataItemElement.innerHTML = html;
    }
}
