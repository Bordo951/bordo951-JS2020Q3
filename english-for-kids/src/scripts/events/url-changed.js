import PageBuilder from './../helper/page-builder';

let PageBuilderObject = new PageBuilder();

function handleUrlChanged() {
    document.body.classList.remove('game-started');
    PageBuilderObject.buildPageFromHash(window.location.hash);
}

window.addEventListener("hashchange", handleUrlChanged);
