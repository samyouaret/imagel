'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {

    await queryInterface.createTable('image_likes',
      {
        user_id: {
          type: Sequelize.INTEGER,
          references: {
            // This is a reference to User model
            // it uses plural (table name )
            model: 'Users',
            // This is the column name of the referenced model
            key: 'id'
          },
        },
        image_id: {
          type: Sequelize.INTEGER,
          references: {
            // This is a reference to User model
            // it uses plural (table name )
            model: 'Images',
            // This is the column name of the referenced model
            key: 'id'
          },
        },
      });

  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('image_likes');
  }
};
