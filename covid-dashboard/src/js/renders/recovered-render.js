import CovidRepository from "../repositories/covid-repository";
import RecoveredView from "../views/recovered-view";
import FormatHelper from '../component/FormatHelper/format-helper';
import ClickOnCountryEvent from "../events/click-on-country";

export default class RecoveredRender {
    constructor() {
        this.covidRepository = new CovidRepository();
        this.recoveredView = new RecoveredView();
        this.formatHelper = new FormatHelper();
        this.clickOnCountryEvent = new ClickOnCountryEvent();
    }

    async renderRecoveredCases() {
        const currentDataObject = await this.covidRepository.getGlobalData();
        const totalCasesElement = document.getElementById('recovered__recovered-number');
        const formattedData = this.formatHelper.formatNumber(currentDataObject['TotalRecovered']);
        totalCasesElement.innerHTML = formattedData;
    }

    async renderRecoveredItems() {
        const currentDataObject = await this.covidRepository.getCountriesData('TotalRecovered');
        const recoveredItemElement = document.getElementById('recovered__item');
        let html = '';

        currentDataObject.forEach((item) => {
            html += this.recoveredView.getRecoveredListHtml(item);
        });
        recoveredItemElement.innerHTML = html;
        this.clickOnCountryEvent.initEvent();
    }
}
