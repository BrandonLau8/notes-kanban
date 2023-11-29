const db = require("../models");
const Crud = db.crud; // id, input, content

exports.createBox = async (req, res) => {
  const data = req.body;
  try{
    const note = await Crud.create(data).then((input) => {
    if (!input) {
      return res.status(404).send({ message: "No input" });
    }
  });

  if (note) {
    return res.status(201).json({ message: "New Note Created" });
  }
  else {
    return res.status(400).json({ message: "Invalid note data received" });
  }
} catch (err) {
  res.send(err)
}
  }
  

exports.getBoxes = (req, res) => {
  Crud.findAll({
    where: {
      input: req.body.input,
      content: req.body.content,
    },
  }).then((content) => {
    if (!content?.length) {
      res.status(400).send({ message: "No content" });
    }
  });
  res.json(req.body);
};

exports.updateBoxes = async (req, res) => {
  const username = req.params.username;
  const data = req.body;
  
  try {
    const note = await Crud.update(data, {
      where: {
        username
      }
    });
    res.status(200).send({message: 'note updated'})
  } catch (err) {
    res.status(400).send(err)
  }
  
};

exports.deleteBoxes = async (req, res) => {
  const username = req.params.username;
  try {
    await Crud.destroy({
      where: {
        username,
      },
    });
    res.status(200).json({ message: "Note deleted" });
  } catch (err) {
    res.status(404).json({ message: "Not not found" });
  }
};

