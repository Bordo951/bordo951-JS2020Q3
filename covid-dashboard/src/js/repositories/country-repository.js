import CountryApiFetcher from "../fetchers/countries-api-fetcher";

export default class CountryRepository {
    constructor() {
        this.countryApiFetcher = new CountryApiFetcher();
    }

    async getCountriesData() {
        return await this.countryApiFetcher.fetchCountriesFields().then(data => {
            //@toDo: remove console.log when the development stage is finished
            console.log('data[\'Countries fields\']', data);
            return data;
        });
    }

    async getCountriesFlags() {
        const currentCountriesDataObject = await this.getCountriesData();
        const countriesFlags = {};

        currentCountriesDataObject.forEach((country) => {
            countriesFlags[country.name] = country.flag;
        });

        //@toDo: remove console.log when the development stage is finished
        console.log('data[CountryRepository.getCountriesFlags]', countriesFlags);

        return countriesFlags;
    }

    async getCountriesPopulation() {
        const currentCountriesDataObject = await this.getCountriesData();
        const countriesPopulation = {};

        currentCountriesDataObject.forEach((country) => {
            countriesPopulation[country.name] = country.population;
        });

        //@toDo: remove console.log when the development stage is finished
        console.log('data[CountryRepository.getCountriesPopulation]', countriesPopulation);

        return countriesPopulation;
    }
}
