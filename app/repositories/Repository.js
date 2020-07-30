const { root_path } = require('../../helpers/PathHelper');
const { DataTypes } = require('sequelize');
const events = require('events');

class Repository extends events.EventEmitter {
    constructor(connection) {
        super();
        this.connection = connection;
        let modelInitializer = require(root_path('app/models/' + this.getModelName()));
        this.model = modelInitializer(connection, DataTypes);
    }

    getModel() {
        return this.model;
    }
}

module.exports = Repository;