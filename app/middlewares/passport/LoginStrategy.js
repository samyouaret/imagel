var LocalStrategy = require('passport-local').Strategy;
const UserRepository = require('../../repositories/UserRepository');
const { DataTypes } = require('sequelize');

module.exports = function (sequelize) {
    return new LocalStrategy(
        {
            usernameField: 'email',
            passwordField: 'password'
        },
        function (email, password, done) {
            const userRepository = new UserRepository(sequelize, DataTypes);
            userRepository.authenticate(email, password)
                .then((user) => {
                    if (!user) {
                        return done(null, false, { message: 'Incorrect username.' });
                    }
                    done(null, user);
                }).catch((err) => done(err));

        });
}
