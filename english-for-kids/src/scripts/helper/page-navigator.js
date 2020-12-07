export default class PageNavigator {
    openSuccessGameOverPage() {
        window.location.hash = 'success-game-over';
    }

    openFailureGameOverPage() {
        window.location.hash = 'failure-game-over';
    }

    openHomepage(timeout = 0) {
        setTimeout(function () {
            window.location.hash = '';
        }, timeout);
    }
}