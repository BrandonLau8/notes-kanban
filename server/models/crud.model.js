module.exports = (sequelize, Sequelize) => {
    const Crud = sequelize.define('crud', {
        username: {
            type: Sequelize.STRING,
        },
        input: {
            type: Sequelize.STRING,
        },
        content: {
            type: Sequelize.STRING,
        }
    });
    return Crud;
}