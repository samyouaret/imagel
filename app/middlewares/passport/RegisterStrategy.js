var LocalStrategy = require('passport-local').Strategy;
const UserRepository = require('../../repositories/UserRepository');

module.exports = function (connection) {
    return new LocalStrategy({
        // by default, local strategy uses username and password, we will override with email
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true // allows us to pass back the entire request to the callback
    }, function (req, email, password, done) {
        console.log('registering ....');
        const userRepository = new UserRepository(connection);
        userRepository.on('exists', function () {
            done(null, false, req.flash('signupMessage', 'That email is already taken.'));
        });
        userRepository.on('create', function (user) {
            done(null, user)
        });
        userRepository.on('error', function (err) {
            console.log(err);
        });
        userRepository.findOrCreate(req.body);
    });
}
