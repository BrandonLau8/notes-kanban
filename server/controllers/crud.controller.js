const db = require("../models");
const Crud = db.crud; // id, input, content

exports.createBox = async (req, res) => {
  const id = req.params.userId;
  const data = req.body;
  try {
    const note = await Crud.create({ ...data, userId: id }).then((input) => {
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
  const userId = req.params.userId;
  Crud.findAll({
    where: {
      userId,
    },
  })
    .then((content) => {
      // if (!content?.length) {
      //   return res.status(400).send({ message: "No content" });
      // }
      res.status(200).json({ content });
    })
    .catch((err) => {
      console.error("Error retrieving boxes:", err);
      return res.status(500).json({ message: "Internal server error" });
    });
};

exports.updateBoxes = async (req, res) => {
  const id = req.params.userId;
  const data = req.body;

  try {
    const note = await Crud.update(data, {
      where: {
        id,
      },
    });
    res.status(200).send({ message: "note updated" });
  } catch (err) {
    res.status(400).send(err);
  }
};

exports.deleteBoxes = async (req, res) => {
  const input = req.body.input;
  const data = req.body;
  try {
    await Crud.destroy({
      where: {
        input,
      },
    });
    res.status(200).json({ message: "Note deleted" });
  } catch (err) {
    res.status(404).json({ message: "Note not found" });
  }
};
