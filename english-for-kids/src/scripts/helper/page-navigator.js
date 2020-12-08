export default class PageNavigator {
    openSuccessGameOverPage() {
        document.body.classList.remove('game-started');
        window.location.hash = 'success-game-over';
    }

    openFailureGameOverPage() {
        document.body.classList.remove('game-started');
        window.location.hash = 'failure-game-over';
    }

    openHomepage(timeout = 0) {
        setTimeout(function () {
            window.location.hash = '';
        }, timeout);
    }
}