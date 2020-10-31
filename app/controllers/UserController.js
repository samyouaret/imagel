const UserRepository = require('../repositories/UserRepository');
const ImageRepository = require('../repositories/ImageRepository');
const sequelize = require('../connection');
const { QueryTypes } = require('sequelize');

class UserController {
    constructor() {
        this.repository = new UserRepository();
        this.imageRepository = new ImageRepository();
    }

    async show(req, res) {
        const user = await this.repository
            .findById(req.params.user, { raw: true });
        if (!user) {
            return res.status(404).render('404');
        }
        render('user/show', req, res, { user });
    }

    async likeImage(req, res) {
        let bind = {
            userId: req.user.id,
            imageId: req.params.image
        };
        await sequelize.query("SELECT image_id FROM `image_likes` WHERE user_id=$userId AND image_id=$imageId",
            {
                type: QueryTypes.SELECT,
                bind
            });
        let likes = req.body.likes;
        if (likes == 0) {
            await sequelize.query("DELETE FROM `image_likes` WHERE user_id=$userId AND image_id=$imageId LIMIT 1",
                {
                    type: QueryTypes.DELETE,
                    bind
                });
        } else {
            const [result, meta] = await
                sequelize.query("INSERT INTO `image_likes`(user_id,image_id) VALUES($userId,$imageId)",
                    {
                        type: QueryTypes.INSERT,
                        bind
                    });
        }
        await this.imageRepository.getModel().update({ likes }, {
            where: {
                id: req.params.image
            }
        });
        res.status(200).json({ success: "image like update" });
    }
}

module.exports = UserController;