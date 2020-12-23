import EventsInitializer from "./events-initializer";
import RythmInitializer from "./rythm-initializer";
import DashboardRender from "../renders/dashboard-render";
import CovidSearch from "../component/Search/search";

export default class DashboardInitializer {
    constructor() {
        this.eventsInitializer = new EventsInitializer();
        this.rythmInitializer = new RythmInitializer();
        this.dashboardRender = new DashboardRender();
        this.search = new CovidSearch()
    }

    initDashboard() {
        this.dashboardRender.renderDashboard();
        this.rythmInitializer.initRythm();
        this.eventsInitializer.initEvents();
        this.search.init();
    }
}
