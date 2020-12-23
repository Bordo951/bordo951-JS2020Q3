import CovidRepository from "../repositories/covid-repository";
import MapView from "../views/map-view";

export default class MapRender {
    constructor() {
        this.covidRepository = new CovidRepository();
        this.mapView = new MapView();
    }
}