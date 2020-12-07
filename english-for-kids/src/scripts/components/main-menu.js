export default class MainMenu {
    openMainMenu() {
        document.getElementById('hamburger').checked = true;
        document.getElementById('main-menu-overlay').classList.remove('hidden');
    }

    closeMainMenu() {
        document.getElementById('hamburger').checked = false;
        document.getElementById('main-menu-overlay').classList.add('hidden');
    }
}