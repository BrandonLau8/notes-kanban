const express = require("express");
const app = express();
const mysql = require("mysql2/promise");
const cors = require("cors");
const bcrypt = require("bcrypt");
require("dotenv").config();

app.use(cors());
app.use(express.json());

const DB_HOST = process.env.DB_HOST;
const DB_USER = process.env.DB_USER;
const DB_PASSWORD = process.env.DB_PASSWORD;
const DB_DATABASE = process.env.DB_DATABASE;
const DB_PORT = process.env.DB_PORT;

const db = mysql.createPool({
  connectionLimit: 100,
  user: DB_USER,
  host: DB_HOST,
  password: DB_PASSWORD,
  database: DB_DATABASE,
  port: DB_PORT,
});

const port = process.env.PORT;

//Connect to DB
db.getConnection((err, connection) => {
  if (err) throw err;
  console.log("DB connected succesfully:" + connection.threadId);
  connection.release();
});

//Create USER
app.post("/createuser", async (req, res) => {
  const username = req.body.username;
  const hashedPassword = await bcrypt.hash(req.body.password, 10);

  const connection = await db.getConnection();

  try {
    const sqlSearch = "SELECT * FROM kanban.usertable WHERE username = ?";
    const search_query = mysql.format(sqlSearch, [username]);
    const sqlInsert = "INSERT INTO kanban.usertable VALUES (0,?,?)";
    const insert_query = mysql.format(sqlInsert, [username, hashedPassword]);

    const [result] = await connection.query(search_query);

    console.log("------> Search Results");
    console.log(result.length);

    if (result.length != 0) {
      connection.release();
      console.log("------> User already exists");
      res.sendStatus(409);
    } else {
      await connection.query(insert_query);
      connection.release();
      console.log("--------> Created new User");
      res.sendStatus(201);
    }
  } catch (error) {
    connection.release();
    console.error("Error:", error);
    res.sendStatus(500);
  }
});

//LOGIN (AUTHENTICATE USER)
app.post("/login", async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  try {
    const connection = await db.getConnection();
    const sqlSearch = "SELECT * FROM kanban.usertable WHERE username = ?";
    const search_query = mysql.format(sqlSearch, [username]);

    const [result] = await connection.query(search_query);
    connection.release();

    if (result.length === 0) {
        console.log('-----> User does not exist');
        res.sendStatus(401);
    } else {
        const hashedPassword = result[0].password;

        if (await bcrypt.compare(password, hashedPassword)) {
            console.log('------> Login Successful');
            res.status(200).json({message: `${username} is logged in!`});
        } else {
            console.log('----> Password Incorrect');
            res.status(401).json({message: 'Password Incorrect!'})
        }
    }
  } catch (err) {
    console.error('Error:', err);
    res.sendStatus(500)
  }
});

//Add to DB
app.post("/create", (req, res) => {
  const input = req.body.input;
  const content = req.body.content;

  db.query(
    `INSERT INTO kanban (input, content) VALUES (?,?)`,
    [input, content],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send("Values Inserted");
      }
    }
  );
  console.log(req.body);
});

//Get from DB
app.get("/boxes", (req, res) => {
  db.query("SELECT * FROM kanban", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

//Update DB
app.put("/update", (req, res) => {
  console.log(req.body);
  const content = req.body.content;
  const input = req.body.input;
  db.query(
    "UPDATE kanban SET content = ? WHERE input = ?",
    [content, input],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

//Delete DB
app.delete("/delete/:input", (req, res) => {
  const input = req.params.input;
  console.log(req.params);
  db.query("DELETE FROM kanban WHERE input = ?", input, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

//Start Server
app.listen(port, () => console.log(`Server Started on port ${port}...`));
