const express = require("express");
const db = require("../config/db.config");
const router = express.Router();

router.get("/users", async (req, res) => {
    try {
      const [rows] = await db.query("SELECT * FROM kanban.usertable");
      res.json(rows);
    } catch (error) {
      console.error("Error fetching users:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  });

  module.exports = router;

// const { generateAccessToken, validateToken } = require("../JWT");

// router.use(bodyParser.urlencoded({ extended: false }));

// router.get('/', (req, res) => {
//     res.sendFile(path.join(__dirname, 'static', 'index.html'));
// })

// router.get('/blah', (req, res) => {
//     res.sendFile(__dirname + '/static/login.html')
// })

// router.post('/blah', (req, res) => {
//     let username = req.body.username;
//     let password = req.body.password;
//     res.send(`Username: ${username} Password: ${password}`)
// })

// //LOGIN (AUTHENTICATE USER)
// router.post("/login", async (req, res) => {
//     const username = req.body.username;
//     const password = req.body.password;

//     try {
//       const connection = await db.getConnection();
//       const sqlSearch = "SELECT * FROM kanban.usertable WHERE username = ?";
//       const search_query = mysql.format(sqlSearch, [username]);

//       const [result] = await connection.query(search_query);
//       connection.release();

//       //User does not exist
//       if (result.length === 0) {
//         console.log("-----> User does not exist");
//         res.sendStatus(401);
//       } else {
//         const hashedPassword = result[0].password;

//         //Login Successful
//         if (await bcrypt.compare(password, hashedPassword)) {
//           console.log("------> Login Successful");
//           console.log("----> Generating accessToken");

//           const accessToken = generateAccessToken({ username: username });
//           console.log(accessToken);

//           res.cookie("access-token", accessToken, {
//             httpOnly: true,
//             maxAge: 3600000,
//           });
//           res
//             .status(200)
//             .json({ message: `${username} is logged in! with ${accessToken}` });
//         }
//         //Incorrect Password
//         else {
//           console.log("----> Password Incorrect");
//           res.status(401).json({ message: "Password Incorrect!" });
//         }
//       }
//     } catch (err) {
//       console.error("Error:", err);
//       res.sendStatus(500);
//     }
//   });

// //Validate User
// router.get("/profile", validateToken, (req, res) => {
//     const accessToken = req.cookies.accessToken;

//     if(accessToken) {

//     } else {
//       res.send('Unauthorized');
//     }
//   });


