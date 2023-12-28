module.exports = (sequelize, Sequelize) => {
  const Crud = sequelize.define(
    "crud",
    {
      id: {
        type: Sequelize.BIGINT,
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
      // notesId: {
      //   type: Sequelize.INTEGER,
      //   allowNull: false,
      // },
    },
    
  );

  return Crud;
};
