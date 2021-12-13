const { root_path } = require('../utils/pathHelper');

module.exports = {
    publicPath: root_path("public/storage"),
    storeType: "disk",
    // storeType: "s3",
}