const Application = require('../app/Application');
const UserRepository = require('../app/repositories/UserRepository');
const connection = require('../app/connection');
const userRepo = new UserRepository();

afterEach(done => {
    connection().close();
    done()
});

describe('authentication /signup,/signin', () => {
    it('should login', (done) => {
        const user = {
            firstName: 'bilal',
            lastName: 'bichbich',
            email: 'bilal@mail.com',
            password: 'bilal123456',
        }
        const credentials = {
            email: user.email, password: user.password
        };
        userRepo.create(user).then(user => {
            console.log(credentials);
            request.agent(app.getServer())
                .post('/signin')
                .send(urlencode(credentials))
                .expect(302)
                .expect('Location', '/home')
                .end(done);
        })
    });

    it('should create a new user', (done) => {
        const user = {
            firstname: "Milano",
            lastname: 'binari',
            email: 'milano@mail.com',
            password: 'Milano123456',
        }
        request.agent(app.getServer())
            .post('/signup')
            .send(urlencode(user))
            .expect(302)
            .expect('Location', '/home')
            .end(function (err, res) {
                // res.should.have.status(200);
                // let cookie = res.headers['set-cookie'];
                userRepo.findByEmail('milano@mail.com').then(user => {
                    expect(user).not.toBeNull();
                    done();
                });
            });
    });
});
