const { Sequelize, DataTypes } = require('sequelize');
const { root_path, env } = require('../helpers/PathHelper');
const { applyExtraSetup } = require('../database/models/extra-setup');

const initConnection = function () {
    // if (env('APP_ENV') == 'test') {
    //     let dbPath = env('DB_TEST');
    //     return new Sequelize(dbPath);
    // }
    return new Sequelize(
        env('DB_DATABASE'),
        env('DB_USERNAME'),
        env('DB_PASSWORD'),
        {
            host: env('DB_HOST'),
            dialect: env('DB_CONNECTION'),
            dialectOptions: {
                waitForConnections: true,
                connectionLimit: 10,
                queueLimit: 0
            }
        });
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
        console.log(sequelize.models[model]);
        sequelize.models[model].associate(sequelize.models);
    }
}

// We execute any extra setup after the models are defined, such as adding associations.
// applyExtraSetup(sequelize);

// We export the sequelize connection instance to be used around our app.
module.exports = sequelize;