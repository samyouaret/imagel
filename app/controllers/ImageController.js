const ImageRepository = require('../repositories/ImageRepository');
const flash = require('connect-flash');

class ImageController {
    constructor() {
        this.repository = new ImageRepository();
    }

    index(req, res) {
        console.log(req.headers);
        console.log(req.xhr);
        console.log(req.isApi);
        res.end('index image');
    }

    show(req, res) {
        res.end('show image ' + req.params.image);
    }

    async create(req, res) {
        const csrfToken = req.csrfToken ? req.csrfToken() : '';
        const image = await this.repository.getModel().findOne({
            where: { id: 1 }, 
        });
        console.log(image);
        const owner = await image.getUser();
        console.log(owner);
        // console.log(await owner.getImages}));
        let message = withMessage(req);
        res.render('image/create', {
            csrfToken, message
        });
    }

    edit(req, res) {
        res.end('edit image ' + req.params.image);
    }

    async store(req, res) {
        // let ownerId = req.user.id;
        console.log(req.file, req.body);
        console.log(req.user);
        if (!req.file) {
            return res.redirect('back');
        }
        const image = {};
        image.title = req.body.title;
        image.description = req.body.description;
        image.url = req.file.filename;
        let newImage = await this.repository.create(image, req.user.id)
        res.end(JSON.stringify(newImage));
    }

    update(req, res) {
        res.end('update image ' + req.params.image);
    }

    destroy(req, res) {
        res.end('destroy image ' + req.params.image);
    }


}

module.exports = ImageController;