const config = require("../config/db.config.js");

const Sequelize = require("sequelize");

//from db.config initialzie Sequalize instance
const sequelize = new Sequelize(
    config.DB, 
    config.USER, 
    config.PASSWORD, {
  host: config.HOST,
  dialect: config.dialect,
  pool: {
    max: config.pool.max,
    min: config.pool.min,
    acquire: config.pool.acquire,
    idle: config.pool.idle,
  },
});

//Add Sequalize library and Sequalize instance to db object
const db = {};
db.Sequelize = Sequelize; //represents library
db.sequelize = sequelize; //Represents connection to db

db.user = require("../models/user.model.js")(sequelize, Sequelize);
db.role = require("../models/role.model.js")(sequelize, Sequelize);
db.crud = require("../models/crud.model.js")(sequelize, Sequelize);

//Many to many association
//Role can belong to many users through the 'user_roles' join table
db.role.belongsToMany(db.user, {
  through: "user_roles"
});

//User can belong to many roles through the 'user_roles' join table
db.user.belongsToMany(db.role, {
  through: "user_roles"
});

//Predefined array for roles
db.ROLES = ["user", "admin", "moderator"];

module.exports = db;
