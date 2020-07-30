const { Sequelize } = require('sequelize');

module.exports = {
    start: function (appInstance) {
       /* if (appInstance.APP_ENV == 'test') {
            let dbPath = appInstance.pathHelper.root_path(appInstance.env('DB_TEST'));
            appInstance.connection = new Sequelize({
                dialect: 'sqlite',
                storage: dbPath
            });
            return;
        }*/
        appInstance.connection = new Sequelize(
            appInstance.env('DB_DATABASE'),
            appInstance.env('DB_USERNAME'),
            appInstance.env('DB_PASSWORD'),
            {
                host: appInstance.env('DB_HOST'),
                dialect: appInstance.env('DB_CONNECTION'),
                dialectOptions: {
                    waitForConnections: true,
                    connectionLimit: 10,
                    queueLimit: 0
                }
            });
    }
}
