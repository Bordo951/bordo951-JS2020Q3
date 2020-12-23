import CovidRepository from "../repositories/covid-repository";
import GlobalView from "../views/global-view";
import FormatHelper from '../component/FormatHelper/format-helper';

export default class GlobalRender {
    constructor() {
        this.covidRepository = new CovidRepository();
        this.globalView = new GlobalView();
        this.formatHelper = new FormatHelper();
    }

    async renderGlobalCases() {
        const currentDataObject = await this.covidRepository.getGlobalData();
        const totalCasesElement = document.getElementById('global__cases-number');
        const formattedData = this.formatHelper.formatNumber(currentDataObject['TotalConfirmed']);
        totalCasesElement.innerHTML = formattedData;
    }
}