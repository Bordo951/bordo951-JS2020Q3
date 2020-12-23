import DataFetcher from "./data-fetcher";

export default class CovidApiFetcher extends DataFetcher {
    async fetchSummary() {
        return await this.fetchDataFrom('https://api.covid19api.com/summary');
    }

    /*
     * @param {string} status - confirmed, recovered, deaths
     */
    async fetchTotalByCountrySlugStatus(countrySlug, status) {
        return await this.fetchDataFrom(`https://api.covid19api.com/total/dayone/country/${countrySlug}/status/${status}`)
    }
}
