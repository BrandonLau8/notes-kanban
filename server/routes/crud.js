const express = require("express");
const router = express.Router();

//Add to DB
router.post("/create", (req, res) => {
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
router.get("/boxes", (req, res) => {
  db.query("SELECT * FROM kanban", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

//Update DB
router.put("/update", (req, res) => {
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
router.delete("/delete/:input", (req, res) => {
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

module.exports = router;