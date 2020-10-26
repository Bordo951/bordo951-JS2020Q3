function initLinkPets() {
    let linkPets = document.getElementsByClassName('linkPets');

    for (let i = 0; i < linkPets.length; i++) {
        linkPets[i].addEventListener('click', function() {
            window.location.href = this.dataset.link;
        });
    }  
}
document.addEventListener("DOMContentLoaded", initLinkPets);

// Finds pet by name
function findPetByName(name) {
    return pets.filter(obj => {
        return obj.name === name
    });
}

// Checks if overlay exists
function isOverlayOnThePage() {
    return document.getElementsByClassName('overlay').length;
}

// Checks if popup exists
function isPopupOnThePage() {
    return document.getElementsByClassName('popup').length;
}

// Handles event on background shadow click
function onOverlayClick(event) {
    hidePetPopup();
    hideOverlay();
}

// Adds background overlay
function viewOverlay() {
    let overlay = document.createElement("div");
    overlay.classList.add('overlay');
    overlay.addEventListener("click", onOverlayClick);

    if (!isOverlayOnThePage()) {
        document.body.appendChild(overlay);
    }
}

// Removes background shadow
function hideOverlay() {
    let shadowHtml = document.getElementsByClassName('overlay');

    if (shadowHtml.length > 0) {
        shadowHtml[0].remove();
    }
}

// Builds pet popup
function buildPetPopupByName(name) {
    let pet = findPetByName(name)[0],
        popupHtml, closePopupButton, popupContent;

    popupHtml = document.createElement("div");
    popupHtml.classList.add('popup');

    closePopupButton = document.createElement("button");
    closePopupButton.classList.add('popup-close');
    closePopupButton.innerHTML = "<svg width=\"12\" height=\"12\" viewBox=\"0 0 12 12\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n" +
        "<path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M7.42618 6.00003L11.7046 1.72158C12.0985 1.32775 12.0985 0.689213 11.7046 0.295433C11.3108 -0.0984027 10.6723 -0.0984027 10.2785 0.295433L5.99998 4.57394L1.72148 0.295377C1.32765 -0.098459 0.68917 -0.098459 0.295334 0.295377C-0.0984448 0.689213 -0.0984448 1.32775 0.295334 1.72153L4.57383 5.99997L0.295334 10.2785C-0.0984448 10.6723 -0.0984448 11.3108 0.295334 11.7046C0.68917 12.0985 1.32765 12.0985 1.72148 11.7046L5.99998 7.42612L10.2785 11.7046C10.6723 12.0985 11.3108 12.0985 11.7046 11.7046C12.0985 11.3108 12.0985 10.6723 11.7046 10.2785L7.42618 6.00003Z\" fill=\"#292929\"/>\n" +
        "</svg>";
    closePopupButton.addEventListener("click", hidePetPopup);
    popupHtml.appendChild(closePopupButton);

    popupContent = document.createElement("div");
    popupContent.classList.add('popup-content');
    popupContent.innerHTML = buildPetsPopupContent(pet);
    popupHtml.appendChild(popupContent);

    return popupHtml;
}

// Builds pets popup content
function buildPetsPopupContent(pet) {

    return '<div class="popup-image">\n' +
            '   <img src=' + pet.img + ' alt="jennifer">' +
            '</div>' +
            '<div class="popup-text">' +
            '    <p class="pets-name">' + pet.name + '</p>' +
            '    <p class="pets-race">' + pet.type + ' - ' + pet.breed + '</p>' +
            '    <p class="pets-description">' + pet.description + '</p>' +
            '    <ul class="pets-characteristic">' +
            '        <li><span>Age:</span> ' + pet.age + '</li>' +
            '        <li><span>Inoculations:</span> ' + getPetsCharacteristic(pet.inoculations) + '</li>' +
            '        <li><span>Diseases:</span> ' + getPetsCharacteristic(pet.diseases) + '</li>' +
            '        <li><span>Parasites:</span> ' + getPetsCharacteristic(pet.parasites) + '</li>' +
            '    </ul>' +
            '</div>';
}

// Parses text characteristics
function getPetsCharacteristic(characteristic) {
    let text = '';

    for (let i = 0; i < characteristic.length; i++) {
        text += characteristic[i];
        if (i + 1 < characteristic.length) {
            text += ", ";
        }
    }

    return text;
}

// Opens pet popup
function viewPetPopup(event) {
    let petName = event.target.dataset.petName;
    petPopup = buildPetPopupByName(petName);

    if (!isPopupOnThePage()) {
        document.body.appendChild(petPopup);
        viewOverlay();
    }
}

// Close pet popup
function hidePetPopup() {
    let popup = document.getElementsByClassName('popup');

    if (popup.length > 0) {
        popup[0].remove();
        hideOverlay();
    }
}

// Init pet popup
function initPetPopups() {
    let cardButtons = document.getElementsByClassName('our-friends-card__button');

    for (let i = 0; i < cardButtons.length; i++) {
        cardButtons[i].addEventListener("click", viewPetPopup);
    }
}

document.addEventListener("DOMContentLoaded", initPetPopups);

