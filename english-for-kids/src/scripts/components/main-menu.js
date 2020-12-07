export default class MainMenu {
    openMainMenu() {
        document.getElementById('hamburger').checked = true;
    }

    closeMainMenu() {
        document.getElementById('hamburger').checked = false;
    }
}