const { root_path } = require('../helpers/PathHelper');
const fs = require('fs');
const path = require('path');
const { DataTypes } = require('sequelize');

function loadModels(sequelize) {
    const modelsPath = root_path('app/models');
    fs.readdir(modelsPath, (err, files) => {
        files.forEach(file => {
            require(path.join(modelsPath, file))(sequelize,
                DataTypes);
        });
    });
    sequelize.sync({ alter: true })
}

module.exports = loadModels;