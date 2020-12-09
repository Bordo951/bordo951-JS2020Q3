import SoundsPlayer from "../helper/sounds-player";
import CardsRepository from "../entity/cards-repository";
import CategoriesRepository from "../entity/categories-repository";

import PageNavigator from "../helper/page-navigator";

let soundPlayer = new SoundsPlayer();
let cardsRepository = new CardsRepository();
let categoriesRepository = new CategoriesRepository();
let pageNavigator = new PageNavigator();

let failedAnswers = 0;

function addSucessStar() {
    let starRow = document.getElementById('star-row');
    let span = document.createElement('span');
    span.innerHTML = '<img class="star" src="./assets/images/star.svg" alt="Star">';

    starRow.appendChild(span);
}

function addErrorStar() {

}

function clickOnCard() {
    let isCardInTrain = !this.classList.contains('disabled');
    let isGameStarted = document.body.classList.contains('game-started');

    if (isCardInTrain && isGameStarted) {
        if (this.classList.contains('target_card')) {
            soundPlayer.playCorrectSound();
            this.classList.remove('target_card');
            this.classList.add('disabled');
            selectNextCard();
            addSucessStar();
        } else {
            failedAnswers += 1;
            soundPlayer.playErrorSound();
            addErrorStar();
        }
    }
}

function clickOnStartGameButton() {
    failedAnswers = 0;
    localStorage.removeItem('failedAnswers');
    document.getElementById('star-row').innerHTML = '';
    document.body.classList.add('game-started');
    selectNextCard();
}

function clickOnRepeatCardButton() {
    let activeCard = document.querySelector('.play-mode #main-content .target_card'),
        cardId = Number.parseInt(activeCard.dataset.cardId),
        currentCard = cardsRepository.getCardById(cardId);

    setTimeout(function (){
        soundPlayer.playCardSound(currentCard)
    }, 400);
}

export function initClickOnCardPlayModeEvent() {
    let activeCards = document.querySelectorAll('.play-mode #main-content .card');
    activeCards.forEach(function (activeCard) {
        activeCard.addEventListener('click', clickOnCard);
    });

    let startGameButton = document.getElementById('start-game');
    startGameButton.addEventListener('click', clickOnStartGameButton);

    let repeatCardButton = document.getElementById('repeat-card');
    repeatCardButton.addEventListener('click', clickOnRepeatCardButton);
}

let getRandomInt = function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
};

function selectNextCard() {
    let activeCards = document.querySelectorAll('.play-mode #main-content .card');
    let isRandomSelecting = true,
        isPlayingGame = true,
        randomCardIndex;

    activeCards.forEach(function (activeCard) {
        if(!activeCard.classList.contains('disabled')){
            isPlayingGame = false;
        }
    });

    while (isRandomSelecting && !isPlayingGame) {
        randomCardIndex = getRandomInt(activeCards.length);
        let isActiveCard = !activeCards[randomCardIndex].classList.contains('disabled');
        if(isActiveCard) {
            activeCards[randomCardIndex].classList.add('target_card');
            isRandomSelecting = false;
        }
    }

    if(!isPlayingGame) {
        let randomCardId = Number.parseInt(activeCards[randomCardIndex].dataset.cardId),
            randomCard = cardsRepository.getCardById(randomCardId);

        setTimeout(function (){
            soundPlayer.playCardSound(randomCard)
        }, 800);
    } else {
        if(failedAnswers > 0) {
            localStorage.setItem('failedAnswers', failedAnswers);
            setTimeout(function (){
                pageNavigator.openFailureGameOverPage();
            }, 400);
        } else {
            setTimeout(function (){
                pageNavigator.openSuccessGameOverPage();
            }, 400);
        }
    }
}
