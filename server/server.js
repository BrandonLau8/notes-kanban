const express = require("express");
const app = express();
const mysql = require("mysql2");
require("dotenv").config();
const cors = require("cors");
const bcrypt = require("bcrypt");
const path = require("path");

const cookieParser = require("cookie-parser");

const registerRouter = require("./routes/register");
const loginRouter = require("./routes/login");
const crudRouter = require("./routes/crud");
const handlerRouter = require("./routes/handler");

const port = process.env.PORT;

app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.use("/register", registerRouter);
app.use("/login", loginRouter);
app.use("/crud", crudRouter);
app.use("/", handlerRouter);

//Start Server
app.listen(port, () => console.log(`Server Started on port ${port}...`));
