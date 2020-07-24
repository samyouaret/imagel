var LocalStrategy = require('passport-local').Strategy;
const UserRepository = require('../../repositories/UserRepository');
const { DataTypes } = require('sequelize');

module.exports = function (sequelize) {
    return new LocalStrategy({
        // by default, local strategy uses username and password, we will override with email
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true // allows us to pass back the entire request to the callback
    }, function (req, email, password, done) {
        const userRepository = new UserRepository(sequelize, DataTypes);
        userRepository.findOrCreate(req, done)
    });
}
