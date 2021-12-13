const Repository = require('./Repository');

class ImageRepository extends Repository {

    getModelName() {
        return 'Image';
    }

    async create(image, ownerId) {
        image.likes = 0;
        image.owner = ownerId;
        return this.model.create(image);
    }

    async findById(id, options = null) {
        return this.model.findOne({
            where: { id },
            ...options
        });
    }

}

module.exports = ImageRepository;