import DataFetcher from "./data-fetcher";

export default class CountryApiFetcher extends DataFetcher {
    async fetchCountriesFields() {
        return await this.fetchDataFrom('https://restcountries.eu/rest/v2/all?fields=name;population;flag');
    }
}