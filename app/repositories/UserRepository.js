const userInitializer = require('../models/user');
const bcrypt = require('bcrypt');

class UserRepository {
    constructor(sequelize, DataTypes) {
        this.sequelize = sequelize;
        this.User = userInitializer(sequelize, DataTypes);
    }

    async hash(password) {
        const saltRounds = 10;
        return bcrypt.hash(password, saltRounds);
    }

    async create(user) {
        let hash = await this.hash(user.password);
        user.password = hash;
        return this.User.create(user);
    }

    async authenticate(email, password) {
        const user = await this.findByEmail(email);
        try {
            const match = await bcrypt.compare(password, user.password);
            if (match) {
                return user;
            }
        } catch (err) {
            console.log(err);
        }

        return null;
    }

    async findOrCreate(req, done) {
        const { firstname, lastname, email, password } = req.body;
        try {
            const user = await this.findByEmail(email)
            if (user) {
                return done(null, false, req.flash('signupMessage', 'That email is already taken.'));
            }
        } catch (err) {
            console.log(err);
            return;
        }

        this.create({
            firstName: firstname,
            lastName: lastname,
            email: email,
            password: password,
        }).then(user => done(null, user))
            .catch(err => console.log(err))
    }

    async findByEmail(email) {
        return this.User.findOne({ where: { email } });
    }
    
    getModel() {
        return this.User;
    }
}

module.exports = UserRepository;