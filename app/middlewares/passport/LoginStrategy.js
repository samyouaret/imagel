var LocalStrategy = require('passport-local').Strategy;
const UserRepository = require('../../repositories/UserRepository');

module.exports = function () {
    return new LocalStrategy(
        {
            usernameField: 'email',
            passwordField: 'password'
        },
        function (email, password, done) {
            const userRepository = new UserRepository();
            userRepository.authenticate(email, password)
                .then((user) => {
                    if (!user) {
                        return done(null, false, { message: 'incorrect email/password.' });
                    }
                    done(null, user, { message: 'login success' });
                }).catch((err) => done(err));
        });
}
