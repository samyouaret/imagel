const { env } = require('../helpers/PathHelper');

module.exports = {
    development: {
        username: env('DB_USERNAME'),
        password: env('DB_PASSWORD'),
        database: env('DB_DATABASE'),
        host: env('DB_HOST'),
        port: 3306,
        dialect: env('DB_CONNECTION'),
        dialectOptions: {
            bigNumberStrings: true
        }
    },
    test: {
        database: env('DB_TEST'),
        dialect: 'sqlite',
        host: '127.0.0.1'
    },
    production: {
        username: env('DB_USERNAME'),
        password: env('DB_PASSWORD'),
        database: env('DB_DATABASE'),
        host: env('DB_HOST'),
        port: 3306,
        dialect: env('DB_CONNECTION'),
        dialectOptions: {
            bigNumberStrings: true
        }
    }
};