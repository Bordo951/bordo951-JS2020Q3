import {initRotateCardEvent} from './../events/rotate-card';
import {initPlayCardSoundEvent} from './../events/play-card-sound';
import {initClickOnCardPlayModeEvent} from './../events/click-on-card';
import {initClickOnReset} from './../events/click-on-reset';

export default class EventManager {
    initCardsEvents() {
        initRotateCardEvent();
        initPlayCardSoundEvent();
        initClickOnCardPlayModeEvent();
    }

    initStaticPagesEvents() {
        initClickOnReset();
    }
}
