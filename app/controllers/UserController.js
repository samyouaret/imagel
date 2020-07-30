const Controller = require('./Controller');
const UserRepository = require('../repositories/UserRepository');

class UserController extends Controller {
    constructor(app) {
        super(app);
        this.repository = new UserRepository(app.getConnection());
    }
}

module.exports = UserController;