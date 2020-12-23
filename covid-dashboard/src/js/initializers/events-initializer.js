import ClickOnZoomEvent from "../events/click-on-zoom";

export default class EventsInitializer {
    constructor() {
        this.eventsPool = [
            new ClickOnZoomEvent()
        ]
    }

    initEvents() {
        this.eventsPool.forEach((item) => {
            document.addEventListener("DOMContentLoaded", item.initEvent());
        });
    }
}