export default class Randomizer {
    getDifferentRandomIntInclusive(min, max, current) {
        let target = this.getRandomIntInclusive(min, max);
        while (current === target) {
            target = this.getRandomIntInclusive(min, max);
        }

        return target;
    }

    getRandomIntInclusive(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);

        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
}