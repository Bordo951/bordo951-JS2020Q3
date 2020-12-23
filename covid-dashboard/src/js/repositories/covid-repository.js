import CovidApiFetcher from "../fetchers/covid-api-fetcher";
import Sorter from "../helpers/sorter";

export default class CovidRepository {
    constructor() {
        this.covidApiFether = new CovidApiFetcher();
        this.sorter = new Sorter();
    }

    async getCountriesData(sortedKey) {
        return await this.covidApiFether.fetchSummary().then(data => {
            //@toDo: remove console.log when the development stage is finished
            console.log('data[\'Countries\']', data['Countries']);
            let sorted = data['Countries'];
            if(sortedKey) {
                this.sorter.sortCases(sorted, sortedKey);
            }
            return sorted;
        });
    }

    async getGlobalData() {
        return await this.covidApiFether.fetchSummary().then(data => {
            //@toDo: remove console.log when the development stage is finished
            console.log('data[\'Global\']', data['Global']);
            return data['Global'];
        });
    }

    async getTotalConfirmedByCountrySlugAndStatus(countrySlug, status) {
        return await this.covidApiFether.fetchTotalByCountrySlugStatus(countrySlug, status).then(data => {
            //@toDo: remove console.log when the development stage is finished
            console.log(`data.${countrySlug}.${status}`, data);
            return data;
        });
    }

    async getTotalConfirmedByCountrySlug(countrySlug) {
        return await this.covidApiFether.fetchTotalByCountrySlugStatus(countrySlug, 'confirmed').then(data => {
            //@toDo: remove console.log when the development stage is finished
            console.log(`data.${countrySlug}.confirmed`, data);
            return data;
        });
    }

    async getTotalDeathsByCountrySlug(countrySlug) {
        return await this.covidApiFether.fetchTotalByCountrySlugStatus(countrySlug, 'deaths').then(data => {
            //@toDo: remove console.log when the development stage is finished
            console.log(`data.${countrySlug}.deaths`, data);
            return data;
        });
    }

    async getTotalRecoveredByCountrySlug(countrySlug) {
        return await this.covidApiFether.fetchTotalByCountrySlugStatus(countrySlug, 'recovered').then(data => {
            //@toDo: remove console.log when the development stage is finished
            console.log(`data.${countrySlug}.recovered`, data);
            return data;
        });

    }

    async getCurrentData() {
        return await this.covidApiFether.fetchSummary().then(data => {
            //@toDo: remove console.log when the development stage is finished
            console.log('data[\'Date\']', data['Date']);
            return data['Date'];
        });
    }
}
