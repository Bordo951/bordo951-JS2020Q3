import StatisticRepository from "../entity/statistic-repository";

let statisticRepository = new StatisticRepository();

export function initClickOnReset() {
    let resetButton = document.getElementById('reset');
    if (resetButton) {
        resetButton.addEventListener('click', statisticRepository.resetStatistics);
    }
}

document.addEventListener("DOMContentLoaded", initClickOnReset);
