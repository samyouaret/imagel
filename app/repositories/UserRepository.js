const Repository = require('./Repository');
const bcrypt = require('bcrypt');

class UserRepository extends Repository {
    getModelName() {
        return 'user';
    }

    async hash(password) {
        const saltRounds = 10;
        return bcrypt.hash(password, saltRounds);
    }

    async create(user) {
        let hash = await this.hash(user.password);
        user.password = hash;
        return this.model.create(user);
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

    // fix user is created even if exists
    async findOrCreate({ firstname, lastname, email, password }) {
        try {
            const user = await this.findByEmail(email)
            if (user) {
                return this.emit('exists');
            }
        } catch (err) {
            this.emit('error', err)
            console.log(err);
            return;
        }
        this.create({
            firstName: firstname,
            lastName: lastname,
            email: email,
            password: password,
        }).then(user => this.emit('create', user))
            .catch(err => this.emit('error', err))
    }

    async findByEmail(email) {
        return this.model.findOne({ where: { email } });
    }
}

module.exports = UserRepository;