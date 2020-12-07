import PageBuilder from './../helper/page-builder';

let PageBuilderObject = new PageBuilder();

function handlePageLoaded() {
    PageBuilderObject.buildCategoryMenu();
    PageBuilderObject.buildPageFromHash(window.location.hash);
}

document.addEventListener("DOMContentLoaded", handlePageLoaded);