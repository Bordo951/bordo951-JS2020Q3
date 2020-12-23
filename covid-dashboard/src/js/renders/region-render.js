import CovidRepository from "../repositories/covid-repository";
import CountryRepository from "../repositories/country-repository";
import RegionView from "../views/global-view";
import ClickOnCountryEvent from "../events/click-on-country";

export default class RegionRender {
    constructor() {
        this.covidRepository = new CovidRepository();
        this.countryRepository = new CountryRepository();
        this.regionView = new RegionView();
        this.clickOnCountryEvent = new ClickOnCountryEvent();
        this.defaultFlagUrl = '/assets/default-flag.svg';
    }

    async renderRegionItems() {
        const currentDataObject = await this.covidRepository.getCountriesData('TotalConfirmed');
        const currentCountriesFlagsObject = await this.countryRepository.getCountriesFlags();
        const regionItemElement = document.getElementById('region__item');
        let html = '';

        currentDataObject.forEach((item) => {
            item['Flag'] = currentCountriesFlagsObject[item.Country] ?? this.defaultFlagUrl;
            html += this.regionView.getRegionListHtml(item);
        });

        regionItemElement.innerHTML = html;
        this.clickOnCountryEvent.initEvent();
    }
}
