const express = require("express");
const app = express();
const mysql = require("mysql2");
require("dotenv").config();
const cors = require("cors");
const bcrypt = require("bcrypt");
const path = require("path");
const cookieSession = require('cookie-session')
// const cookieParser = require("cookie-parser");

// const registerRouter = require("./routes/register");
// const loginRouter = require("./routes/login");
// const crudRouter = require("./routes/crud");
// const handlerRouter = require("./routes/handler");

require('./routes/auth.routes')(app)
require('./routes/user.routes')(app)

const db = require('./models')


const port = process.env.PORT;

app.use(cors());
app.use(express.json());
// app.use(cookieParser());

//Stored on client side
app.use(
  cookieSession({
    //identify app's session cookie
    name:'brandon-session', 
    // secret keys used to sign the session ID cookie. 
    //verify integrity of session data
    keys: ['key1', 'key2'], 
    //secret key used to sign the session ID cookie. extra layer
    secret: 'COOKIE_SECRET', 
    //when true prevents client side js from accessing sesh cookie.
    //reduce risk of cross site scripting attacks
    httpOnly: true,
  })
)


// app.use("/register", registerRouter);
// app.use("/login", loginRouter);
// app.use("/crud", crudRouter);
// app.use("/", handlerRouter);

//Write something on the root page
app.get('/', (req, res) => {
  res.json({message: 'Welcome to my app'})
})

//Sync to db using sequalize. 
//Force true drops existing tables and recrates them
db.sequelize.sync({force: true}).then(() => {
  console.log('Drop and Resync DB')
  initial();
})

//Create roles 
const Role = db.role; //Connect to db index connected to role.model
const initial = () => {
  Role.create({
    id: 1,
    name: 'user'
  });
  Role.create({
    id:2,
    name:'moderator'
  });
  Role.create({
    id:3,
    name:'admin'
  });
}

//Start Server
app.listen(port, () => console.log(`Server Started on port ${port}...`));
