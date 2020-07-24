const { root_path } = require('../helpers/PathHelper');

module.exports = {
    services: [
        root_path('app/services/AppService'),
        root_path('app/services/DatabaseService'),
        root_path('app/services/AuthService'),
        root_path('app/services/RouterService'),
    ]
}