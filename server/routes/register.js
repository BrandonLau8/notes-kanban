const express = require('express')
const router = express.Router()

//Create USER
router.post("/", async (req, res) => {
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

  module.exports = router