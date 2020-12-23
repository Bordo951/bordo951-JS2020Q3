import CovidChart from "../component/chart/chart";

export default class ClickOnCountryEvent {
    constructor() {
       this.covidChart = new CovidChart();
    }

    initEvent() {
        const regionCountries = document.querySelectorAll('.region__list');
        const deathsCountries = document.querySelectorAll('.death__list');
        const recoveredCountries = document.querySelectorAll('.recovered__list');

        regionCountries.forEach(this.addOnClickListener.bind(this));
        deathsCountries.forEach(this.addOnClickListener.bind(this));
        recoveredCountries.forEach(this.addOnClickListener.bind(this));

    }

    addOnClickListener(item) {
        item.addEventListener('click', () => this.handleOnClickEvent(item));
    }

    handleOnClickEvent(item) {
        let currentCountrySlug = item.dataset.slug;
        let currentCountryCases = item.dataset.cases;
        this.covidChart.updateChart(currentCountrySlug, currentCountryCases);
    }
}
