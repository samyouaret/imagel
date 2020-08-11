function applyExtraSetup(sequelize) {
    const { Image, User } = sequelize.models;
    Image.belongsToMany(User, {
        through: "image_likes",
        foreignKey: "image_id",
    });
    User.belongsToMany(Image, {
        through: "image_likes",
        foreignKey: "user_id",
    });

}

module.exports = { applyExtraSetup };