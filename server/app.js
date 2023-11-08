const express = require("express");
const app = express();
const mysql = require("mysql2/promise");
require("dotenv").config();
const cors = require("cors");
const bcrypt = require("bcrypt");
const bodyParser = require('body-parser');


const cookieParser = require("cookie-parser");

const registerRouter = require('./routes/register')
const loginRouter = require('./routes/login')
const crudRouter = require('./routes/crud')



app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.use('/register', registerRouter)
app.use('/login', loginRouter)
app.use('/crud', crudRouter)

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

app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'static', 'index.html'));
})

app.get('/blah', (req, res) => {
    res.sendFile(__dirname + '/static/login.html')
})

app.post('/blah', (req, res) => {
    let username = req.body.username;
    let password = req.body.password;
    res.send(`Username: ${username} Password: ${password}`)
})


//Connect to DB
db.getConnection((err, connection) => {
  if (err) throw err;
  console.log("DB connected succesfully:" + connection.threadId);
  connection.release();
});



//Start Server
app.listen(port, () => console.log(`Server Started on port ${port}...`));
