const ImageRepository = require('../app/repositories/ImageRepository');
const connection = require('../app/connection');
const fakeUser = require('./fakers/user');
const { actAs } = require('../utils/test');
const storage = require('../utils/storage');
const imageRepo = new ImageRepository();
const { root_path } = require('../utils/PathHelper');

let image;

beforeAll(async () => {
    image = await imageRepo.getModel().findOne({ raw: true });
    await storage.create('uploads/' + image.url);
    app.getServer()
        .use(actAs(fakeUser));
    app.init();
});

afterAll(async (done) => {
    await storage.truncate("uploads");
    connection.close();
    done()
});

describe('image controller CRUD', () => {

    it('should create an image', (done) => {
        request.agent(app.getServer())
            .post('/images')
            .attach('image', root_path('tests/files/test.jpg'))
            .field('title', 'new title')
            .field('description', 'new desc')
            .expect(201)
            .end(async function (err, res) {
                expect(err).toBeNull();
                expect(res.body.title).toBe('new title');
                expect(res.body.description).toBe('new desc');
                expect(res.body.url).toMatch(/test\$_.+\.jpg$/);
                storage.has('uploads/' + res.body.url)
                    .then(bool => expect(bool).toBeTruthy())
                    .then(() => done());
                // await storage.delete('uploads/' + image.url);
            })
    });

    it('should fail create an image with empty fields', (done) => {
        request.agent(app.getServer())
            .post('/images')
            .field('title', '')
            .field('description', '')
            .expect(302)
            .expect('Location', '/')
            .end(async function (err, res) {
                expect(err).toBeNull();
                done();
            })
    });

    it('should fail create an image with empty file', (done) => {
        request.agent(app.getServer())
            .post('/images')
            .field('title', 'new title')
            .field('description', 'new desc')
            .expect(302)
            .expect('Location', '/')
            .end(async function (err, res) {
                expect(err).toBeNull();
                done();
            })
    });

    it('should show an image', (done) => {
        clonedImage = Object.assign({}, image);
        clonedImage.createdAt = image.createdAt.toISOString();
        clonedImage.updatedAt = image.updatedAt.toISOString();
        request.agent(app.getServer())
            .get('/images/' + image.id)
            .expect(200)
            .end(function (err, res) {
                expect(err).toBeNull();
                expect(res.body).toEqual(clonedImage);
                done()
            })
    });

    it('should show collection of images', (done) => {
        clonedImage = Object.assign({}, image);
        clonedImage.createdAt = image.createdAt.toISOString();
        clonedImage.updatedAt = image.updatedAt.toISOString();
        request.agent(app.getServer())
            .get('/images/')
            .expect(200)
            .end(function (err, res) {
                expect(err).toBeNull();
                let firstImage = res.body[0];
                expect(firstImage).toEqual(clonedImage);
                expect(res.body).toHaveLength(2);
                done()
            })
    });

    it('should update an image', (done) => {
        let oldImageurl = image.url;
        request.agent(app.getServer())
            .post(`/images/${image.id}/?_method=PUT`)
            .attach('image', root_path('tests/files/test.jpg'))
            .field('title', 'updated title')
            .field('description', 'updated desc')
            .expect(200)
            .end(function (err, res) {
                expect(err).toBeNull();
                expect(res.body.title).toBe('updated title');
                expect(res.body.description).toBe('updated desc');
                expect(res.body.url).toMatch(/test\$_.+\.jpg$/);
                storage.has('uploads/' + res.body.url)
                    .then(bool => expect(bool).toBeTruthy())
                    .then(() => {
                        storage.has('uploads/' + oldImageurl)
                            .catch((err) => expect(err).toBeInstanceOf(Error))
                            .catch(() => done());
                    });
            })
    });

    it('should update an image with no file', (done) => {
        request.agent(app.getServer())
            .post(`/images/${image.id}/?_method=PUT`)
            .field('title', 'some new title')
            .field('description', 'some new desc')
            .expect(200)
            .end(function (err, res) {
                expect(err).toBeNull();
                expect(res.body.title).toBe('some new title');
                expect(res.body.description).toBe('some new desc');
                storage.has('uploads/' + res.body.url)
                    .then(bool => expect(bool).toBeTruthy())
                    .then(done);
            })
    });

    it('should fail update non-existing image', (done) => {
        let randomId = Math.floor(Math.random() * 100000);
        request.agent(app.getServer())
            .post(`/images/${randomId}/?_method=PUT`)
            .field('title', 'some new title')
            .field('description', 'some new desc')
            .expect(404)
            .end((err, res) => {
                expect(err).toBeNull();
                done()
            })
    });

    it('should delete image', (done) => {
        request.agent(app.getServer())
            .delete('/images/' + image.id)
            .expect(200)
            .end(function (err, res) {
                expect(err).toBeNull();
                expect(res.body).toEqual({ message: 'image deleted' });
                done()
            })
    });

    it('should fail delete non-existing image', (done) => {
        let randomId = Math.floor(Math.random() * 100000);
        request.agent(app.getServer())
            .delete('/images/' + randomId)
            .expect(404)
            .end(function (err, res) {
                expect(err).toBeNull();
                expect(res.body).toEqual({ error: 'image not found' });
                done()
            })
    });
});
