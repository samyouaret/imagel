const UserRepository = require('../app/repositories/UserRepository');
const connection = require('../app/connection');
const userRepo = new UserRepository();
const fakeUser = require('./fakers/user');

beforeAll((done) => {
    app.init();
    done();
});

afterAll(done => {
    connection.close();
    done()
});

describe('authentication actions', () => {
    it('should login', (done) => {
        let user = Object.assign({}, fakeUser);
        user.email = "adam@james.com";
        delete user.id;
        const credentials = {
            email: user.email, password: user.password
        };
        userRepo.create(user).then(user => {
            request.agent(app.getServer())
                .post('/signin')
                .send(urlencode(credentials))
                .expect(302)
                .expect('Location', '/home')
                .end((err, res) => {
                    expect(err).toBeNull();
                    done();
                });
        })
    });

    it('should fail login with invalid credentials', (done) => {
        const credentials = {
            email: "", password: ''
        };
        request.agent(app.getServer())
            .post('/signin')
            .send(urlencode(credentials))
            .expect(302)
            // this back location 
            .expect('Location', '/')
            .end((err, res) => {
                expect(err).toBeNull();
                done();
            });
    });

    it('should signup a new user', (done) => {
        const user = {
            firstname: fakeUser.firstName,
            lastname: fakeUser.lastName,
            email: fakeUser.email,
            password: fakeUser.password,
        };
        request.agent(app.getServer())
            .post('/signup')
            .send(urlencode(user))
            .expect(302)
            .expect('Location', '/home')
            .end(function (err, res) {
                // res.should.have.status(200);
                // let cookie = res.headers['set-cookie'];
                expect(err).toBeNull();
                userRepo.findByEmail(fakeUser.email)
                    .then(user => {
                        expect(user).not.toBeNull();
                        done();
                    });
            });
    });

    it('should fail signup with empty fields', (done) => {
        const user = {
            firstname: '',
            lastname: '',
            email: '',
            password: '',
        };
        request.agent(app.getServer())
            .post('/signup')
            .send(urlencode(user))
            .expect(302)
            .expect('Location', '/')
            .end(function (err, res) {
                expect(err).toBeNull();
                done();
            });
    });

    it('should fail signup with invalid email', (done) => {
        const user = {
            firstname: fakeUser.firstName,
            lastname: fakeUser.lastName,
            email: 'invalidemail',
            password: fakeUser.password,
        };
        request.agent(app.getServer())
            .post('/signup')
            .send(urlencode(user))
            .expect(302)
            .expect('Location', '/')
            .end(function (err, res) {
                expect(err).toBeNull();
                done();
            });
    });
});
