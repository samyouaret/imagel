const express = require('express');
const csrf = require('../app/middlewares/csrf')
const authMiddleware = require('../app/middlewares/auth')
const { createController } = require('../helpers/factory');
const guest = require('../app/middlewares/guest');
const { rules, validateWeb } = require('../validators/userValidator');
const passport = require('passport');

const csrfProtection = csrf();
const mergeMiddlewares = (options) => {
    let middlewares = {
        index: [],
        show: [],
        create: [],
        edit: [],
        store: [],
        update: [],
        destroy: [],
        before: []
    };
    if (options.middlewares) {
        for (const method in middlewares) {
            if (options.middlewares.hasOwnProperty(method)) {
                if (Array.isArray(options.middlewares[method])) {
                    middlewares[method].push(...options.middlewares[method]);
                } else {
                    throw new Error(`expected ${method} to be array but ${options.middlewares[method]} given`);
                }
            }
        }
    }
    return middlewares;
}

function auth(router,options = {}) {
    function authenticate(name) {
        return passport.authenticate(name, {
            successRedirect: '/home',
            failureRedirect: 'back',
            failureFlash: true,
            ...options.passport
        });
    }
    let AuthController = createController('AuthController');
    // guest, rules(), validateWeb
    router.get('/signup', guest, AuthController.register.bind(AuthController));
    router.post('/signup', guest, rules(), validateWeb, authenticate('local-signup'));
    router.get('/signin', guest, AuthController.login.bind(AuthController));
    router.post('/signin', guest, authenticate('local-login'));
    router.post('/logout', AuthController.logout.bind(AuthController));

    return router;
}
module.exports = {
    resources(url, controllerName, options = {}) {
        let middlewares = mergeMiddlewares(options);
        console.log(middlewares);
        const router = options.router || express.Router();
        url = url.replace(/\//g, '');
        let param = options.param ? options.param : url.replace(/s$/, '');
        let controller = createController(controllerName);
        url = '/' + url;
        let singleResourceUrl = url + "/:" + param;
        // router.use(csrfProtection);
        // create view
        router.get(url + '/create', middlewares.create, controller.create.bind(controller));
        // edit view
        router.get(singleResourceUrl + '/edit', middlewares.edit, controller.edit.bind(controller));
        // update method
        router.put(singleResourceUrl, middlewares.update, controller.update.bind(controller));
        // destroy
        router.delete(singleResourceUrl, middlewares.destroy, controller.destroy.bind(controller));
        // get single resource
        router.get(singleResourceUrl, middlewares.show, controller.show.bind(controller));
        // collection of resources
        router.get(url, middlewares.index, controller.index.bind(controller));
        // store method
        router.post(url, middlewares.store, controller.store.bind(controller));
        // router.use(csrf());
        return router;
    }, auth
}