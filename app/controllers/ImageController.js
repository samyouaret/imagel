const ImageRepository = require('../repositories/ImageRepository');
const storage = require('../../utils/storage');

class ImageController {
    constructor() {
        this.repository = new ImageRepository();
    }

    async index(req, res) {
        let options = { raw: true, limit: 10 };
        if (req.query.owner) {
            options.where = { owner: parseInt(req.query.owner) }
        }
        const images = await this.repository
            .getModel()
            .findAll(options);
        if (!images) {
            return res.status(404).json([]);
        }
        return res.status(200).json(images);
    }

    async show(req, res) {
        const image = await this.repository
            .findById(req.params.image, { raw: true });
        if (!image) {
            return res.status(404).json({});
        }
        return res.status(200).json(image);
    }

    async create(req, res) {
        // const image = await this.repository.getModel().findOne({
        //     where: { id: 1 }, 
        // });
        // console.log(image);
        // const owner = await image.getUser();
        // console.log(owner);
        // console.log(await owner.getImages}));
        render('image/create', req, res);
    }

    async store(req, res) {
        if (!req.file) {
            return res.redirect('back');
        }
        const image = {};
        image.title = req.body.title;
        image.description = req.body.description;
        image.url = req.file.filename;
        let newImage = await this.repository.create(image, req.user.id)
        // res.status(201).json(newImage);
        res.redirect('/home');
    }

    async edit(req, res) {
        const image = await this.repository
            .findById(req.params.image, { raw: true });
        if (image.owner != req.user.id) {
            return res.status(401).json({ error: 'Unauthorized' })
        }
        if (!image) {
            return res.status(404).send('not Found');
        }
        let message = withMessage(req);
        render('image/edit', req, res, { image });
    }

    async update(req, res) {
        const image = await this.repository.findById(req.params.image);
        if (!image) {
            return res.status(404).send('not Found');
        }
        if (image.owner != req.user.id) {
            return res.status(401).json({ error: 'Unauthorized' })
        }
        image.title = req.body.title;
        image.description = req.body.description;
        if (req.file) {
            try {
                await storage.delete('/uploads/' + image.url);
                image.url = req.file.filename;
                const newImage = await image.save();
                return res.status(200).json(newImage);
            } catch (error) {
                console.log(error.stack);
                return res.status(200).json({ error: 'cannot delete image' })
            }
        } else {
            const newImage = await image.save();
            // return res.status(200).json(newImage);
            res.redirect("/home");
        }
    }

    async destroy(req, res) {
        const image = await this.repository
            .findById(req.params.image);
        if (!image) {
            return res.status(404).json({ error: 'image not found' })
        }
        if (image.owner != req.user.id) {
            return res.status(401).json({ error: 'Unauthorized' })
        }
        try {
            await storage.delete('/uploads/' + image.url);
            await image.destroy();
            return res.status(200).json({ message: 'image deleted' });
        } catch (error) {
            console.log(error.stack);
            return res.status(422).json({ error: 'cannot delete image' })
        }

    }

}

module.exports = ImageController;