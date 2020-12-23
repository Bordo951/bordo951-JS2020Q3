export default class ClickOnZoomEvent {
    initEvent() {
        const zooms = document.querySelectorAll('.zoom__size');

        zooms.forEach(this.addOnClickListener.bind(this));
    }

    addOnClickListener(item) {
        item.addEventListener('click', () => this.handleOnClickEvent(item));
    }

    handleOnClickEvent(item) {
        item.parentNode.classList.toggle('view-full-screen');
    }
}