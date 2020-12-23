import CovidRepository from "../repositories/covid-repository";
import DeathView from "../views/death-view";
import FormatHelper from '../component/FormatHelper/format-helper';
import ClickOnCountryEvent from "../events/click-on-country";

export default class DeathRender {
    constructor() {
        this.covidRepository = new CovidRepository();
        this.deathView = new DeathView();
        this.formatHelper = new FormatHelper();
        this.clickOnCountryEvent = new ClickOnCountryEvent();
    }

    async renderDeathCases() {
        const currentDataObject = await this.covidRepository.getGlobalData();
        const totalCasesElement = document.getElementById('death__death-toll');
        const formattedData = this.formatHelper.formatNumber(currentDataObject['TotalDeaths']);
        totalCasesElement.innerHTML = formattedData;
    }

    async renderDeathItems() {
        const currentDataObject = await this.covidRepository.getCountriesData('TotalDeaths');
        const deathItemElement = document.getElementById('death__item');
        let html = '';

        currentDataObject.forEach((item) => {
            html += this.deathView.getDeathListHtml(item);
        });
        deathItemElement.innerHTML = html;
        this.clickOnCountryEvent.initEvent();
    }
}
