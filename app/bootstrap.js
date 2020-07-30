require('dotenv').config({ debug: true });
const Application = require('./Application');

module.exports = {
    start: function () {
        app = new Application();
        app.start();
    }
}