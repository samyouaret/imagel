const authCheck = require('../app/middlewares/auth-check');
const express = require('express');
const { createController } = require('../helpers/factory');
const { resources, auth } = require('../utils/Router');
const { multer } = require('../utils/storage');
const csrf = require('../app/middlewares/csrf')
const authMiddleware = require('../app/middlewares/auth')
const imageValidator = require('../validators/imageValidator')
const validate = require('../validators/validator')

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

const csrfProtection = csrf();

router.use(csrfProtection);
auth(router);
const imageRouter = express.Router();
// imageRouter.use(authCheck);
resources('/images', 'ImageController', {
    middlewares: {
        store: [imageValidator.rules(), validate],
        update: [],
    },
    router: imageRouter
});

router.use(imageRouter);
router.get('/', controller.index.bind(controller));
router.get('/home', authCheck, controller.home.bind(controller));

module.exports = router;