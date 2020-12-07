import MainMenu from "../components/main-menu";

let mainMenu = new MainMenu();

export function initOverlayClickEvent() {
    let mainMenuOverlay = document.getElementById('main-menu-overlay');
    mainMenuOverlay.addEventListener('click', mainMenu.closeMainMenu);
}

document.addEventListener("DOMContentLoaded", initOverlayClickEvent);