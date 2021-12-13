const pathHelper = require('../utils/pathHelper');
const connection = require('../app/connection');

module.exports = {
    createController(ClassName) {
        const controllerClass = require(pathHelper.controller_path(ClassName));
        return new controllerClass();
    },
    getModel(name) {
        return connection.models[name];
    }
}