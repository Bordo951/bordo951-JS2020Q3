import Rythm from 'rythm.js';
import Randomizer from "../helpers/randomizer";

export default class RythmInitializer {
    constructor() {
        this.rythm = new Rythm();
        this.randomizer = new Randomizer();
        this.isStarted = false;
        this.currentTrack = 5;
    }

    initRythm() {
        this.rythm.addRythm('header', 'color', 0, 10, {
            from: [112, 168, 0],
            to: [230, 0, 0]
        });
        this.rythm.addRythm('header', 'neon', 0, 10, {
            from: [255, 255, 0],
            to: [255, 0, 0]
        });

        this.rythm.addRythm('header__logo', 'vanish', 0, 10);

        this.rythm.addRythm('zoom', 'borderColor', 0, 10);

        this.rythm.addRythm('header__burger', 'fontSize', 0, 10);

        this.rythm.addRythm('global__cases-number', 'pulse', 0, 10);
        this.rythm.addRythm('update-time__item', 'pulse', 0, 10);
        this.rythm.addRythm('death__death-toll ', 'pulse', 0, 10, {
            min: 0.1,
            max: 0.8
        });
        this.rythm.addRythm('recovered__recovered-number ', 'pulse', 0, 10, {
            min: 0.1,
            max: 0.8
        });

        this.rythm.addRythm('global', 'radius', 0, 10, {
            min: 0,
            max: 30
        });

        this.rythm.addRythm('zoom', 'borderWidth', 0, 2, {
            min: 2,
            max: 10
        });

        this.rythm.addRythm('zoom__size', 'neon', 0, 10, {
            from: [255, 255, 0],
            to: [255, 0, 0]
        });

        this.rythm.addRythm('zoom__size', 'twist', 0, 10, {
            min: 20,
            max: 180
        });

        this.rythm.addRythm('header__title', 'kern', 0, 10, {
            min: -2,
            max: 1,
            reverse: true,
        });

        this.rythm.addRythm('region__title', 'vanish', 0, 10);
        this.rythm.addRythm('global__title', 'vanish', 0, 10);
        this.rythm.addRythm('update-time__title', 'vanish', 0, 10);
        this.rythm.addRythm('death__title', 'vanish', 0, 10);
        this.rythm.addRythm('recovered__title', 'vanish', 0, 10);

        this.rythm.addRythm('region__list', 'twist', 0, 10);
        this.rythm.addRythm('death__list', 'twist', 0, 10);
        this.rythm.addRythm('recovered__list', 'twist', 0, 10);

        this.rythm.addRythm('zoom', 'radius', 0, 10, {
            min: 0,
            max: 10
        });

        this.initStartedEvent();
    }

    initStartedEvent() {
        let headerBurger = document.getElementsByClassName('header__burger');

        this.rythm.setMusic(`assets/audio/music/${this.currentTrack}.mp3`);

        headerBurger[0].addEventListener('click', this.handleClickEvent.bind(this));
    }

    handleClickEvent() {
        if (this.isStarted) {
            this.rythm.stop();
            this.isStarted = false;
            this.currentTrack = this.randomizer.getDifferentRandomIntInclusive(1, 5, this.currentTrack);
            this.rythm.setMusic(`assets/audio/music/${this.currentTrack}.mp3`);
            document.body.classList.remove('magic-mode-enabled');
        } else {
            document.body.classList.add('magic-mode-enabled');
            this.rythm.start();
            this.isStarted = true;
        }
    }
}
