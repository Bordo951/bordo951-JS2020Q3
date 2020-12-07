import PageBuilder from './../helper/page-builder';

let PageBuilderObject = new PageBuilder();

function handleHashChange() {
    let categoryKeyUrl = window.location.hash.substring(1);
    if (categoryKeyUrl.length > 0) {
        PageBuilderObject.buildCardsCategoryPage(categoryKeyUrl);
    } else {
        PageBuilderObject.buildCategoryMainPage();
    }
}

window.addEventListener("hashchange", handleHashChange);
