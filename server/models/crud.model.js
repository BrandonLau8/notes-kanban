module.exports = (sequelize, Sequelize) => {
    const Crud = sequelize.define('crud', {
        input: {
            type: Sequelize.STRING,
        },
        content: {
            type: Sequelize.STRING,
        },
        userId: {
            type: Sequelize.INTEGER,
            allowNull: false,
        }
    });
    return Crud;
}