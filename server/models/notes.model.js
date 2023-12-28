module.exports = (sequelize, Sequelize) => {
  const Notes = sequelize.define("notes", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    noteInput: {
      type: Sequelize.STRING,
    },
    userId: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
  });
  return Notes
};

