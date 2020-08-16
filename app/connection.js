const { Sequelize, DataTypes } = require('sequelize');
const { env, config_path } = require('../utils/PathHelper');
const config = require(config_path('database'));

const initConnection = function () {
    let options = config[env('APP_ENV')];
    if (!options) {
        throw new Error(`invalid ${env('APP_ENV')} mode `);
    }
    return new Sequelize(options);
}

let sequelize = initConnection();

const modelDefiners = [
    require('../database/models/user'),
    require('../database/models/image'),
];

// We define all models according to their files.
for (const modelDefiner of modelDefiners) {
    modelDefiner(sequelize, DataTypes);
}

for (const model in sequelize.models) {
    if (sequelize.models[model].associate) {
        sequelize.models[model].associate(sequelize.models);
    }
}

module.exports = sequelize;