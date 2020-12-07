import {initRotateCardEvent} from './../events/rotate-card';
import {initPlayCardSoundEvent} from './../events/play-card-sound';

export default class EventManager {
    initCardsEvents() {
        initRotateCardEvent();
        initPlayCardSoundEvent();
    }
}