'use strict';
const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Image extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Image.belongsToMany(models.User, {
        through: "image_likes",
        foreignKey: "image_id",
      });
      Image.belongsTo(models.User, {
        foreignKey: 'owner'
      });
    }
  };

  Image.init({
    // Model attributes are defined here
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    url: {
      type: DataTypes.STRING,
      allowNull: false
    },
    title: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT
    },
    likes: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    owner: {
      type: DataTypes.INTEGER,
      //foreign key def
      references: {
        // This is a reference to another model
        model: 'User',
        // This is the column name of the referenced model
        key: 'id'
      }
    },
  }, {
    sequelize,
    modelName: 'Image',
  });


  return Image;
};