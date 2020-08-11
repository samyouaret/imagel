const middleware = require('../app/middlewares/auth');
const guest = require('../app/middlewares/guest');
const { createController } = require('../helpers/factory');
const { rules, validateWeb } = require('../validators/userValidator');
const passport = require('passport');

function authenticate(name) {
    return passport.authenticate(name, {
        successRedirect: '/home',
        failureRedirect: 'back',
        failureFlash: true
    });
}

const router = middleware();
let AuthController = createController('AuthController');
// guest, rules(), validateWeb
router.get('/signup', guest, AuthController.register.bind(AuthController));
router.post('/signup', guest, rules(), validateWeb, authenticate('local-signup'));
router.get('/signin', guest, AuthController.login.bind(AuthController));
router.post('/signin', guest, authenticate('local-login'));
router.post('/logout', AuthController.logout.bind(AuthController));

module.exports = router;
