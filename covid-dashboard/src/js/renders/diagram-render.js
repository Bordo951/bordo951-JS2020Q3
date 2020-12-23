import CovidRepository from "../repositories/covid-repository";
import DiagramView from "../views/diagram-view";

export default class DiagramRender {
    constructor() {
        this.covidRepository = new CovidRepository();
        this.diagramView = new DiagramView();
    }
}