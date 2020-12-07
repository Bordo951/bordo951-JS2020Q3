export default class SoundsPlayer {
    playCardSound(card) {
        let audio = new Audio(`./assets/audio/${card.categoryId}/${card.language['en']}.mp3`);
        audio.play();
    }
}