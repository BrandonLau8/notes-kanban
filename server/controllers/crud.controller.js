const db = require("../models");
const Crud = db.crud; // id, input, content

exports.createBox = async (req, res) => {
  const id = req.params.userId;
  const data = req.body;
  try {
    const note = await Crud.create(data, {
      where: {
        id,
      }
    }).then((input) => {
      if (!input) {
        return res.status(404).send({ message: "No input" });
      }
    });
    return res.status(201).json({ message: "New Note Created" });
  } catch (err) {
    console.error(err);
    return res.status(400).json({ message: "Invalid note data received" });
  }
};

exports.getBoxes = (req, res) => {
  Crud.findAll({
    where: {
      username: req.params.username,
    },
  }).then((content) => {
    if (!content?.length) {
      return res.status(400).send({ message: "No content" });
    }
    res.status(200).json({content});
  }).catch((err) => {
    console.error('Error retrieving boxes:', err);
    return res.status(500).json({ message: "Internal server error" });
  })
};

exports.updateBoxes = async (req, res) => {
  const username = req.params.username;
  const data = req.body;

  try {
    const note = await Crud.update(data, {
      where: {
        username,
      },
    });
    res.status(200).send({ message: "note updated" });
  } catch (err) {
    res.status(400).send(err);
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
