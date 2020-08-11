const authCheck = require('../app/middlewares/auth-check');
const express = require('express');
const { createController } = require('../helpers/factory');
const { root_path } = require('../helpers/PathHelper');
const { resources, auth } = require('../helpers/Router');
const multer = require('multer');
const csrf = require('../app/middlewares/csrf')
const authMiddleware = require('../app/middlewares/auth')

const router = authMiddleware();

let controller = createController('HomeController');

const storage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, root_path('public/uploads'))
    },
    filename: function (req, file, callback) {
        // fi error pass error instead of null
        let name = file.originalname.split('.');
        let extension = '.' + name.pop();
        const newName = name.join('') + '$_' + Date.now() + extension;
        callback(null, newName)
    }
})
const fileFilter = (req, file, callback) => {
    if (file.mimetype == 'image/jpeg' || file.mimetype == 'image/png') {
        callback(null, true);
    } else {

        req.flash('message', { errors: ['file must be an image.'] });
        callback(null, false);
    }
}
// const upload = multer({ dest: root_path('public/uploads') })
const upload = multer({ storage, fileFilter })
router.use(upload.single('image'));

const csrfProtection = csrf();

router.use(csrfProtection);
auth(router);
const imageRouter = express.Router();
// imageRouter.use(authCheck);
resources('/images', 'ImageController', {
    middlewares: {
        store: [],
        update: [],
    },
    router: imageRouter
});

router.use(imageRouter);
router.get('/', controller.index.bind(controller));
router.get('/home', authCheck, controller.home.bind(controller));

module.exports = [router];