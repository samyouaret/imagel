require('dotenv').config({ debug: true })
const app = require('./app');

module.exports = {
    start: function () {
        app.start();
    }
}