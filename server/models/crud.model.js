module.exports = (sequelize, Sequelize) => {
  const Crud = sequelize.define("crud", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    input: {
      type: Sequelize.STRING,
    },
    content: {
      type: Sequelize.STRING,
    },
    notesId: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: "notes", // This should match the table name of the 'notes' model
        key: "id",
        onDelete: "CASCADE",
        onUpdate: 'CASCADE',
      },
    },
  });

  return Crud;
};
