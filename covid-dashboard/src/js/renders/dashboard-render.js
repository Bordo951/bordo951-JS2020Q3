import GlobalRender from "./global-render";
import RegionRender from "./region-render";
import DeathRender from "./death-render";
import RecoveredRender from "./recovered-render";
import LastUpdateRender from "./last-update-render";
import SearchRender from "./search-render";


export default class DashboardRender {
    constructor() {
        this.globalRender = new GlobalRender();
        this.regionRender = new RegionRender();
        this.deathRender = new DeathRender();
        this.recoveredRender = new RecoveredRender();
        this.lastUpdateRender = new LastUpdateRender();
        this.searchRender = new SearchRender();
    }

    renderDashboard() {
        this.globalRender.renderGlobalCases();

        this.regionRender.renderRegionItems();

        this.deathRender.renderDeathCases();
        this.deathRender.renderDeathItems();

        this.recoveredRender.renderRecoveredCases();
        this.recoveredRender.renderRecoveredItems();

        this.lastUpdateRender.renderLastUpdate();

        this.searchRender.renderSearch();
    }
}
