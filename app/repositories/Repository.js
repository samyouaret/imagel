const { getModel } = require('../../helpers/factory');
const events = require('events');

class Repository extends events.EventEmitter {
    constructor() {
        super();
        this.model = getModel(this.getModelName());
    }

    getModel() {
        return this.model;
    }
}

module.exports = Repository;