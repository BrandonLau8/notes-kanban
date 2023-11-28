"use strict";
const express = require("express");
const app = express();
require("dotenv").config();
const cors = require("cors");
const cookieSession = require("cookie-session");
const db = require("./models");
const port = process.env.PORT;

//Middleware
app.use(cors({
  allowedHeaders:['x-access-token', 'Origin', 'Content-Type', 'Accept']
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

require("./routes/auth.routes")(app);
require("./routes/user.routes")(app);
require("./routes/crud.routes")(app);

//Stored on client side
app.use(
  cookieSession({
    //identify app's session cookie
    name: "brandon-session",
    // secret keys used to sign the session ID cookie.
    //verify integrity of session data
    keys: ["key1", "key2"],
    //secret key used to sign the session ID cookie. extra layer
    secret: "COOKIE_SECRET",
    //when true prevents client side js from accessing sesh cookie.
    //reduce risk of cross site scripting attacks
    httpOnly: true,
  })
);

//Sync to db using sequalize.
//Force true drops existing tables and recrates them
db.sequelize.sync({ force: true }).then(() => {
  console.log("Drop and Resync DB");
  initial();
});

//Create roles
const Role = db.role; //Connect to db index connected to role.model
function initial() {
  Role.create({
    id: 1,
    name: "user",
  });
  Role.create({
    id: 2,
    name: "moderator",
  });
  Role.create({
    id: 3,
    name: "admin",
  });
}

//Start Server
app.listen(port, () => console.log(`Server Started on port ${port}...`));
