let component = {
    addZero: function(n) {
        return (parseInt(n, 10) < 10 ? '0' : '') + n;
    },

    getRandomStateGameId: function() {
        return '_' + Math.random().toString(36).substr(2, 9);
    },

    getRandomInt: function(max) {
        return Math.floor(Math.random() * Math.floor(max));
    }
}

export {component as helper};