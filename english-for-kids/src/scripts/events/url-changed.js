import PageBuilder from './../helper/page-builder';

let PageBuilderObject = new PageBuilder();

function handleUrlChanged() {
    PageBuilderObject.buildPageFromHash(window.location.hash);
}

window.addEventListener("hashchange", handleUrlChanged);
