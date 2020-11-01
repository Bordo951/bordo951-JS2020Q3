const Keyboard = {
    elements: {
        main: null,
        keysContainer: null,
        keys: []
    },

    eventHandlers: {
        oninput: null,
        onclose: null
    },

    properties: {
        value: "",
        capsLock: false,
        shift: false,
        language: 'en'
    },

    keyLayouts: {
        ru: [
            "1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "backspace",
            "й", "ц", "у", "к", "е", "н", "г", "ш", "щ", "з", "х", "ъ",
            "caps", "ф", "ы", "в", "а", "п", "р", "о", "л", "д", "ж", "э", "enter",
            "done", "я", "ч", "с", "м", "и", "т", "ь", "б", "ю", ".",
            "ru", "space", "shift"
        ],
        ru_shift: [
            "!", "\"", "№", ";", "%", ":", "?", "*", "(", ")", "backspace",
            "Й", "Ц", "У", "К", "Е", "Н", "Г", "Ш", "Щ", "З", "Х", "Ъ",
            "caps", "Ф", "Ы", "В", "А", "П", "Р", "О", "Л", "Д", "Ж", "Э", "enter",
            "done", "Я", "Ч", "С", "М", "И", "Т", "Ь", "Б", "Ю", ",",
            "ru", "space", "shift"
        ],
        en: [
            "1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "backspace",
            "q", "w", "e", "r", "t", "y", "u", "i", "o", "p", "[", "]",
            "caps", "a", "s", "d", "f", "g", "h", "j", "k", "l", ";", "'", "enter",
            "done", "z", "x", "c", "v", "b", "n", "m", ",", ".", "?",
            "en", "space", "shift"
        ],

        en_shift: [
            "!", "@", "#", "$", "%", "^", "&", "*", "(", ")", "backspace",
            "Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P", "{", "}",
            "caps", "A", "S", "D", "F", "G", "H", "J", "K", "L", ":", "\"", "enter",
            "done", "Z", "X", "C", "V", "B", "N", "M", "<", ">", "/",
            "en", "space", "shift"
        ]
    },

    lineBreaks: {
        ru: ["backspace", "ъ", "enter", "."],
        ru_shift: ["backspace", "Ъ", "enter", ","],
        en: ["backspace", "]", "enter", "?"],
        en_shift: ["backspace", "}", "enter", "/"]
    },

    init() {
        let layoutsAmount = 2;

        if(document.querySelectorAll('[data-lang]').length < layoutsAmount) {
            // Create main elements
            this.elements.main = document.createElement("div");
            this.elements.keysContainer = document.createElement("div");

            // Setup main elements
            this.elements.main.dataset.lang = this.properties.language;
            this.elements.main.classList.add("keyboard", "keyboard--hidden", "keyboard--trans");
            this.elements.keysContainer.classList.add("keyboard__keys");
            this.elements.keysContainer.appendChild(this._createKeys());

            this.elements.keys = this.elements.keysContainer.querySelectorAll(".keyboard__key");

            // Add to DOM
            this.elements.main.appendChild(this.elements.keysContainer);
            document.body.appendChild(this.elements.main);

            // Automatically use keyboard for elements with .use-keyboard-input
            document.querySelectorAll(".use-keyboard-input").forEach(element => {
                element.addEventListener("focus", () => {
                    this.open(element.value, currentValue => {
                        element.value = currentValue;
                    });
                });
            });
        }
    },

    _createKeys() {
        const fragment = document.createDocumentFragment();
        let keyLayout = this.keyLayouts[this.properties.language];

        // Creates HTML for an icon
        const createIconHTML = function (icon_name, icon_caption) {
            if (icon_caption === undefined) {
                icon_caption = "";
            }
            return `<i class="material-icons">${icon_name}</i>${icon_caption}`;
        };

        keyLayout.forEach(key => {
            const keyElement = document.createElement("button");
            let insertLineBreak = this.lineBreaks[this.properties.language].indexOf(key) !== -1;

            // Add attributes/classes
            keyElement.setAttribute("type", "button");
            keyElement.classList.add("keyboard__key");

            switch (key) {
                case "backspace":
                    keyElement.classList.add("keyboard__key--wide");
                    keyElement.innerHTML = createIconHTML("backspace");

                    keyElement.addEventListener("click", () => {
                        this.properties.value = this.properties.value.substring(0, this.properties.value.length - 1);
                        this._triggerEvent("oninput");
                    });

                    break;

                case "caps":
                    keyElement.classList.add("keyboard__key--wide", "keyboard__key--activatable");
                    keyElement.innerHTML = createIconHTML("keyboard_capslock", "caps lock");

                    keyElement.addEventListener("click", () => {
                        this._toggleCapsLock();
                        keyElement.classList.toggle("keyboard__key--active", this.properties.capsLock);
                    });

                    if (this.properties.capsLock) {
                        keyElement.classList.add("keyboard__key--active");
                    }

                    break;

                case "enter":
                    keyElement.classList.add("keyboard__key--wide");
                    keyElement.innerHTML = createIconHTML("keyboard_return");

                    keyElement.addEventListener("click", () => {
                        this.properties.value += "\n";
                        this._triggerEvent("oninput");
                    });

                    break;

                case "space":
                    keyElement.classList.add("keyboard__key--extra-wide");
                    keyElement.innerHTML = createIconHTML("space_bar");

                    keyElement.addEventListener("click", () => {
                        this.properties.value += " ";
                        this._triggerEvent("oninput");
                    });

                    break;

                case "done":
                    keyElement.classList.add("keyboard__key--wide", "keyboard__key--dark");
                    keyElement.innerHTML = createIconHTML("check_circle");

                    keyElement.addEventListener("click", () => {
                        this.close();
                        this._triggerEvent("onclose");
                    });

                    break;

                case "en":
                    keyElement.textContent = key.toLowerCase();
                    keyElement.addEventListener("click", () => {
                        this.changeLanguage("ru");
                    });

                    break;

                case "ru":
                    keyElement.textContent = key.toLowerCase();
                    keyElement.addEventListener("click", () => {
                        this.changeLanguage("en");
                    });

                    break;

                case "shift":
                    keyElement.classList.add("keyboard__key--wide", "keyboard__key--activatable");
                    keyElement.innerHTML = createIconHTML("publish", "shift");

                    keyElement.addEventListener("click", () => {
                        this._toggleShift();
                        keyElement.classList.toggle("keyboard__key--active", this.properties.shift);
                    });

                    if (this.properties.shift) {
                        keyElement.classList.add("keyboard__key--active");
                    }

                    break;

                default:
                    // keyElement.textContent = key.toLowerCase();
                    keyElement.textContent = key;

                    keyElement.addEventListener("click", () => {
                        let addedValue;

                        if (this.properties.shift) {
                            addedValue = this.properties.capsLock ? key.toLowerCase() : key.toUpperCase();
                        } else {
                            addedValue = this.properties.capsLock ? key.toUpperCase() : key.toLowerCase();
                        }

                        this.properties.value += addedValue;

                        // this.properties.value += this.properties.capsLock ? key.toUpperCase() : key.toLowerCase();
                        this._triggerEvent("oninput");
                    });

                    break;
            }

            fragment.appendChild(keyElement);

            if (insertLineBreak) {
                fragment.appendChild(document.createElement("br"));
            }
        });

        return fragment;
    },

    _triggerEvent(handlerName) {
        if (typeof this.eventHandlers[handlerName] == "function") {
            this.eventHandlers[handlerName](this.properties.value);
        }
    },

    _toggleCapsLock() {
        this.properties.capsLock = !this.properties.capsLock;

        for (const key of this.elements.keys) {
            if (key.childElementCount === 0) {
                if (this.properties.shift) {
                    key.textContent = this.properties.capsLock ? key.textContent.toLowerCase() : key.textContent.toUpperCase();
                } else {
                    key.textContent = this.properties.capsLock ? key.textContent.toUpperCase() : key.textContent.toLowerCase();
                }
            }

        }
    },

    _toggleShift() {
        this.properties.shift = !this.properties.shift;
        let keyboards = document.getElementsByClassName('keyboard');

        for (const keyboard of keyboards) {
            keyboard.remove();
        }

        if (this.properties.shift) {
            this.properties.language += '_shift';
        } else {
            this.properties.language = this.properties.language.replace('_shift', '');
        }
        this.init();
        //!this.properties.language
        //if (language === "en") {add keyboard en shift} else {add keyboard ru shift}

        // to lowwercase
        for (const key of this.elements.keys) {
            if (key.childElementCount === 0) {
                if (this.properties.capsLock) {
                    key.textContent = this.properties.shift ? key.textContent.toLowerCase() : key.textContent.toUpperCase();
                } else {
                    key.textContent = this.properties.shift ? key.textContent.toUpperCase() : key.textContent.toLowerCase();
                }
            }

        }

        this.viewCurrentLanguageKeyboard();
    },

    changeLanguage(language) {
        let currentKeyboard = document.querySelectorAll('[data-lang='+this.properties.language+']');

        //currentKeyboard[0].classList.add('keyboard--hidden');
        currentKeyboard[0].remove();
        this.properties.language = language;
        this.properties.capsLock = false;
        this.properties.shift = false;
        this.init();
        this.viewCurrentLanguageKeyboard();
    },

    viewCurrentLanguageKeyboard() {
        let targetKeyboard = document.querySelectorAll('[data-lang='+this.properties.language+']');
        targetKeyboard[0].classList.remove('keyboard--hidden');
        targetKeyboard[0].classList.remove('keyboard--trans');
    },

    open(initialValue, oninput, onclose) {
        let currentKeyboard = document.querySelectorAll('[data-lang='+this.properties.language+']');

        this.properties.value = initialValue || "";
        this.eventHandlers.oninput = oninput;
        this.eventHandlers.onclose = onclose;
        currentKeyboard[0].classList.remove('keyboard--hidden');
    },

    close() {
        let currentKeyboard = document.querySelectorAll('[data-lang='+this.properties.language+']');
        this.properties.value = "";
        this.eventHandlers.oninput = oninput;
        this.eventHandlers.onclose = onclose;
        currentKeyboard[0].classList.add('keyboard--trans');
        currentKeyboard[0].classList.add('keyboard--hidden');
    }
};

window.addEventListener("DOMContentLoaded", function () {
    Keyboard.init();
});