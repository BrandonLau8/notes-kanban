const db = require('../models');
const Crud = db.crud; // id, input, content

exports.createBox = async (req, res) => {
  const note = await Crud.create({
    username: req.body.username,
    input: req.body.input,
    content: req.body.content,
  })
  .then((input) => {
    if(!input) {
      return res.status(404).send({message: 'No input'})
    }
  })
  
  if(note) {
    return res.status(201).json({message:"New Note Created"})
  } else {
    return res.status(400).json({message: 'Invalid note data received'})
  }
}

exports.getBoxes = (req, res) => {
  Crud.findAll({
    where: {
      input: req.body.input,
      content: req.body.content,
    }
  })
  .then((content) => {
    if(!content?.length) {
      res.status(400).send({message: 'No content'})
    }
  })
  res.json(req.body)
}


exports.updateBoxes = (req, res) => {
  Crud.put({

    input: req.body.input,
    content: req.body.content,
  })
}

exports.deleteBoxes = async (req,res) => {
  const result = await Crud.destroy({
    where: {
      id: req.body.id,
    }
  })
  if (result === 0) {
    return res.status(404).json({ message: 'Not not found' })
  }
  
    return res.status(200).json({ message: 'Note deleted' })

  

}


// //Add to DB
// router.post("/create", (req, res) => {
//   const input = req.body.input;
//   const content = req.body.content;

//   db.query(
//     `INSERT INTO kanban (input, content) VALUES (?,?)`,
//     [input, content],
//     (err, result) => {
//       if (err) {
//         console.log(err);
//       } else {
//         res.send("Values Inserted");
//       }
//     }
//   );
//   console.log(req.body);
// });

//Get from DB
// router.get("/boxes", (req, res) => {
//   db.query("SELECT * FROM kanban", (err, result) => {
//     if (err) {
//       console.log(err);
//     } else {
//       res.send(result);
//     }
//   });
// });

// //Update DB
// router.put("/update", (req, res) => {
//   console.log(req.body);
//   const content = req.body.content;
//   const input = req.body.input;
//   db.query(
//     "UPDATE kanban SET content = ? WHERE input = ?",
//     [content, input],
//     (err, result) => {
//       if (err) {
//         console.log(err);
//       } else {
//         res.send(result);
//       }
//     }
//   );
// });

// //Delete DB
// router.delete("/delete/:input", (req, res) => {
//   const input = req.params.input;
//   console.log(req.params);
//   db.query("DELETE FROM kanban WHERE input = ?", input, (err, result) => {
//     if (err) {
//       console.log(err);
//     } else {
//       res.send(result);
//     }
//   });
// });

// module.exports = router;
