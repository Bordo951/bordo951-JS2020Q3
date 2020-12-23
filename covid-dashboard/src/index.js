import "regenerator-runtime/runtime.js";

// Import cursor
import initMouseMoveEvent from "./js/events/cursor-move";
window.addEventListener("mousemove", initMouseMoveEvent);

// Import dashboard initializer
import DashboardInitializer from "./js/initializers/dashboard-initializer";

// Import styles
import './styles/index.scss'

// Import of Map
import CovidMap from './js/component/map/map';

let covidMap = new CovidMap();
covidMap.initMap();

// Import Chart
import CovidChart from "./js/component/chart/chart";

let covidChart = new CovidChart();
covidChart.initChart('usa');

// Import Search
import CovidSearch from "./js/component/Search/search";

let covidSearch = new CovidSearch('#search');
covidSearch.init();

// Test import of an asset
import webpackLogo from './images/webpack-logo.svg'

const dashboardInitializer = new DashboardInitializer();
dashboardInitializer.initDashboard();
