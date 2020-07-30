const Application = require('../app/Application');
const UserRepository = require('../app/repositories/UserRepository');
const app = new Application();
app.loadServices();
const userRepo = new UserRepository(app.connection);

describe('authentication /register,/login', () => {
    it('should login', async () => {
        await request.agent(app.getApp())
            .post('/login')
            .send({
                email: 'maily@mail.com',
                password: 'maily123456',
            }).expect(302)
            .expect('Location', '/');
    });

    it('should create a new user', async () => {
        await request.agent(app.getApp())
            .post('/register')
            .send({
                firstName: "Milano",
                lastName: 'binari',
                email: 'milano@mail.com',
                password: 'Milano123456',
            }).expect(302)
            .expect('Location', '/');
        let newUser = await userRepo.findByEmail('milano@mail.com');
        expect(newUser).not.toBeNull();
    });
});
