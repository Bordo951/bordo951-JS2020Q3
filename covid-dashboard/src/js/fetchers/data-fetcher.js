export default class DataFetcher {
    async fetchDataFrom(url) {
        let response = await fetch(url);
        return await response.json();
    }
}