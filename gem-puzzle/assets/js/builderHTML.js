import {helper} from "./helper";

let component = {
    createSavedGameHTML: function (savedGame) {
        let innerSavedGameText = this.buildInnerSavedGameText(savedGame);
        return `<button data-state-id="${savedGame.stateId}" class="load-game">${innerSavedGameText}</button>`;
    },

    buildInnerSavedGameText: function(savedGame) {
        let savedAtText = savedGame.savedAt,
            fieldSizeText = savedGame.fieldSize,
            gameTimeText = `${helper.addZero(savedGame.gameTime.min)}:${helper.addZero(savedGame.gameTime.sec)}`,
            gameMovesText = savedGame.gameMoves;

    return `${savedAtText}: ${fieldSizeText}x${fieldSizeText}, time:${gameTimeText}, moves:${gameMovesText}`;
    },

    createIconHTML: function (icon_name, icon_caption) {
        if (icon_caption === undefined) {
            icon_caption = "";
        }
        return `<i class="material-icons">${icon_name}</i>${icon_caption}`;
    },

    createAudioHTML: function (key, src) {
        return `<audio data-key="${key}" src="${src}"></audio>`;
    },

    createSizeOptionHTML: function (fieldSize, currentFieldSize) {
        let selectedAttribute = '';

        if(fieldSize === currentFieldSize) {
            selectedAttribute = 'selected="selected" ';
        }

        return `<option ${selectedAttribute}value="${fieldSize}">${fieldSize}x${fieldSize}</option>`;
    },

    createFieldOptionHTML: function (field, currentField) {
        let selectedField = '';

        if(field === currentField) {
            selectedField = 'selected="selected" ';
        }

        return `<option ${selectedField}value="${field}">${field}</option>`;
    }
}

export {component as builderHTML};