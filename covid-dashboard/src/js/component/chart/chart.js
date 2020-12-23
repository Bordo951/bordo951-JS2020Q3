import Chart from 'chart.js';
import CovidRepository from "../../repositories/covid-repository";

export default class CovidChart {
    constructor() {
        this.covidRepository = new CovidRepository();
    }

    initChart(countrySlug) {
        const arrData = [];
        const arrCases = [];
        const totalConfirmedByCountry = this.covidRepository.getTotalConfirmedByCountrySlug(countrySlug);
        totalConfirmedByCountry.then((cases) => {

            cases.map((item) => {
                arrData.push(item['Date']);
            });

            let zeroCases = cases[0];
            arrCases.push(Math.abs(zeroCases['Cases']));
            for (let i = 1; i < cases.length; i++) {
                let nextCases = cases[i];
                let currentCases = cases[i - 1];
                let casesAmount = Math.abs(nextCases['Cases'] - currentCases['Cases']);
                arrCases.push(casesAmount);
            }

            let canvasElement = document.getElementById('chart');

            let ctx = canvasElement.getContext('2d');

            return new Chart(ctx, {
                // The type of chart we want to create
                type: 'bar',

                // The data for our dataset
                data: {
                    labels: arrData,
                    datasets: [{
                        label: '',
                        backgroundColor: 'rgb(255, 170, 0)',
                        borderColor: 'rgb(255, 170, 0)',
                        data: arrCases
                    }]
                },

                // Configuration options go here
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    legend: {
                        display: false
                    },
                    scales: {
                        xAxes: [{
                            gridLines: {
                                display: true,
                                color: "rgba(255, 255, 255, .3)",
                                borderDash: [10, 10]
                            },
                            type: 'time',
                            time: {
                                unit: 'quarter',
                                displayFormats: {
                                    quarter: 'MMM YYYY'
                                }
                            },
                            ticks: {
                                beginAtZero: true
                            }
                        }],
                        yAxes: [{
                            gridLines: {
                                display: true,
                                color: "rgba(255, 255, 255, .3)",
                                borderDash: [10, 10]
                            },
                            ticks: {
                                beginAtZero: true,
                                maxTicksLimit: 4,
                                callback: function (value) {
                                    if (value < 1000) {
                                        return value;
                                    } else if (value >= 1000 && value < 1000000) {
                                        return `${Math.round(value / 1000)}k`;
                                    } else if (value => 1000000) {
                                        return `${Math.round(value / 1000000)}M`;
                                    }

                                }
                            }
                        }]
                    }
                }
            });

        });
    }

    updateChart(countrySlug, status) {
        const arrData = [];
        const arrCases = [];
        const totalConfirmedByCountry = this.covidRepository.getTotalConfirmedByCountrySlugAndStatus(countrySlug, status);
        totalConfirmedByCountry.then((cases) => {

            cases.map((item) => {
                arrData.push(item['Date']);
            });

            let zeroCases = cases[0];
            arrCases.push(Math.abs(zeroCases['Cases']));
            for (let i = 1; i < cases.length; i++) {
                let nextCases = cases[i];
                let currentCases = cases[i - 1];
                let casesAmount = Math.abs(nextCases['Cases'] - currentCases['Cases']);
                arrCases.push(casesAmount);
            }

            Chart.helpers.each(Chart.instances, function (instance) {
                instance.config.data.datasets[0].data = arrCases;
                instance.config.data.labels = arrData;
                instance.update();
            });
        });
    }
}
