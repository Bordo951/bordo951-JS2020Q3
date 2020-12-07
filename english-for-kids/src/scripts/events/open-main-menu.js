import MainMenu from "../components/main-menu";

let mainMenu = new MainMenu();

function handleOpenMainMenu() {
    if (this.checked) {
        mainMenu.openMainMenu();
    } else {
        mainMenu.closeMainMenu();
    }
}

let mainMenuIcon = document.getElementById('hamburger');

mainMenuIcon.addEventListener("change", handleOpenMainMenu);