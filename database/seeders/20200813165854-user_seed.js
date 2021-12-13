'use strict';
const bcrypt = require('bcrypt');

const hash = async (password) => {
  const saltRounds = 10;
  return bcrypt.hash(password, saltRounds);
}

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [{
      firstName: 'John',
      lastName: 'Doe',
      email: 'John@Doe.com',
      password: await hash('john123456'),
      createdAt: new Date(),
      updatedAt: new Date()
    }]);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {});
  }
};
