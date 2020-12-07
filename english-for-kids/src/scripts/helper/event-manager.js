import {initRotateCardEvent} from './../events/rotate-card';
import {initPlayCardSoundEvent} from './../events/play-card-sound';
import {initClickOnCardPlayModeEvent} from './../events/click-on-card';

export default class EventManager {
    initCardsEvents() {
        initRotateCardEvent();
        initPlayCardSoundEvent();
        initClickOnCardPlayModeEvent();
    }
}