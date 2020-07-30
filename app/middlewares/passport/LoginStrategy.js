var LocalStrategy = require('passport-local').Strategy;
const UserRepository = require('../../repositories/UserRepository');

module.exports = function (connection) {
    return new LocalStrategy(
        {
            usernameField: 'email',
            passwordField: 'password'
        },
        function (email, password, done) {
            const userRepository = new UserRepository(connection);
            userRepository.authenticate(email, password)
                .then((user) => {
                    if (!user) {
                        return done(null, false, { message: 'Incorrect username.' });
                    }
                    done(null, user, { message: 'success' });
                }).catch((err) => done(err));

        });
}
