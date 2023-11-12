const mysql = require('mysql2/promise');
require('dotenv').config();

module.exports = {
  HOST: 'localhost',
  USER: 'root',
  PASSWORD: 'password',
  DB: 'kanban',
  dialect: 'mysql',
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  }
};
// const DB_HOST = process.env.DB_HOST;
// const DB_USER = process.env.DB_USER;
// const DB_PASSWORD = process.env.DB_PASSWORD;
// const DB_DATABASE = process.env.DB_DATABASE;
// const DB_PORT = process.env.DB_PORT;

// const dbConfig = {
//   connectionLimit: 100,
//   user: DB_USER,
//   host: DB_HOST,
//   password: DB_PASSWORD,
//   database: DB_DATABASE,
//   port: DB_PORT,
// };

// const db = mysql.createPool(dbConfig);

// //Connect to DB
// db.getConnection((err, connection) => {
//     try {
//       if (err) {
//         console.error("Error connecting to the database:", err);
//         throw err; // or handle the error in a way that makes sense for your application
//       }
//       console.log("DB connected successfully: " + connection.threadId);
//     } catch (error) {
//       console.error("Unexpected error during database connection:", error);
//       // Handle the error, log it, or throw it further if needed
//     } finally {
//       if (connection) {
//         connection.release();
//       }
//     }
//   });

// module.exports = db;
