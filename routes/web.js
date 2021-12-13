const authCheck = require('../app/middlewares/auth-check');
const express = require('express');
const { createController } = require('../helpers/factory');
const { resources, auth } = require('../utils/Router');
const { multer } = require('../utils/storage');
const csrf = require('../app/middlewares/csrf')
const authMiddleware = require('../app/middlewares/auth')
const imageValidator = require('../validators/imageValidator')
const validate = require('../validators/validator');
const { root_path } = require('../utils/pathHelper');

const router = authMiddleware();

let controller = createController('HomeController');

const fileFilter = (req, file, callback) => {
    if (file.mimetype == 'image/jpeg' || file.mimetype == 'image/png') {
        callback(null, true);
    } else {
        req.flash('error', ['file must be an image.']);
        callback(null, false);
    }
}
// const upload = multer({ dest: root_path('public/uploads') })
const upload = multer('uploads', { fileFilter });
router.use(upload.single('image'));

let userController = createController('UserController');
router.get('/user/:user', userController.show.bind(userController));
router.post('/user/likes/:image',authCheck, userController.likeImage.bind(userController));

const csrfProtection = csrf();

router.use(csrfProtection);
// define authentication routes
auth(router);
const imageRouter = express.Router();
resources('/images', 'ImageController', {
    middlewares: {
        store: [imageValidator.rules(), validate],
        update: [authCheck],
        edit: [authCheck],
        create: [authCheck],
        delete: [authCheck],
    },
    router: imageRouter
});

router.get('/', controller.index.bind(controller));
router.get('/home', authCheck, controller.home.bind(controller));
router.use(imageRouter);
module.exports = router;