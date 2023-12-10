const db = require("../models");
const Crud = db.crud; // id, input, content

exports.createBox = async (req, res) => {
  const userId = req.params.userId;
  const data = req.body;
  const customId = req.body.id
  console.log(req.body.id)
  try {
    const note = await Crud.create({ ...data, userId: userId, id: customId }).then((input) => {
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
  try {
    const updatedBoxes = req.body;
    for (updatedBox of updatedBoxes) {
      const { id, content } = updatedBox;
      const note = await Crud.update(
        { content },
        {
          where: { id },
        }
      );
    }
    console.log(req.body);

    res.status(200).send({ message: "note updated" });
  } catch (err) {
    console.error(err);
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
