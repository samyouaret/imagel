const path = require('path');

module.exports = {
    env: function (key, value = null) {
        if (value) {
            process.env[key] = value;
            return;
        }
        return process.env[key] || null;
    },
    root_path(filePath) {
        return path.join(path.dirname(__dirname), filePath)
    },
    view_path(view) {
        return path.join(path.dirname(__dirname), "resources/views", view)
    },
    route_path(route) {
        return path.join(path.dirname(__dirname), "routes", route)
    },
    static_path(file) {
        return path.join(path.dirname(__dirname), "public", file)
    },
    service_path(file) {
        return path.join(path.dirname(__dirname), 'app', "services", file)
    },
    config_path(file) {
        return path.join(path.dirname(__dirname), "config", file)
    },
    model_path(file) {
        return path.join(path.dirname(__dirname), "app", 'models', file)
    },
    controller_path(file) {
        return path.join(path.dirname(__dirname), 'app', "controllers", file)
    }
}