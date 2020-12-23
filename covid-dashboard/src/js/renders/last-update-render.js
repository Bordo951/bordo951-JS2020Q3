import CovidRepository from "../repositories/covid-repository";
import LastUpdateView from "../views/last-update-view";

export default class LastUpdateRender {
    constructor() {
        this.covidRepository = new CovidRepository();
        this.lastUpdateView = new LastUpdateView();
    }

    async renderLastUpdate() {
        const currentDataObject = await this.covidRepository.getCurrentData();
        const updateDataItemElement = document.getElementById('update-time__item');
        let html = this.lastUpdateView.getFormattedDateHtml(currentDataObject);

        updateDataItemElement.innerHTML = html;
    }
}
