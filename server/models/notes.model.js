module.exports = (sequelize, Sequelize) => {
  const Notes = sequelize.define("notes", {
    id: {
      type: Sequelize.BIGINT,
      primaryKey: true,
      allowNull: false,
    },
    noteInput: {
      type: Sequelize.STRING,
    },
    userId: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
  });
};
