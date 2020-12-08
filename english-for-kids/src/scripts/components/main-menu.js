export default class MainMenu {
    openMainMenu() {
        document.getElementById('hamburger').checked = true;
        document.getElementById('main-menu-overlay').classList.remove('hidden');
    }

    closeMainMenu() {
        document.getElementById('hamburger').checked = false;
        document.getElementById('main-menu-overlay').classList.add('hidden');
    }

    activeCurrentItem(pageKeyUrl) {
        let menuItems = document.querySelectorAll('#main-menu-list li');
        menuItems.forEach(function (menuItem){
            menuItem.classList.remove('active');
        });

        let currentItem = document.querySelector(`li[data-category-urlkey="#${pageKeyUrl}"]`);
        if(currentItem) {
            currentItem.classList.add('active');
        }
    }
}
