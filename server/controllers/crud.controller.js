const db = require("../models");
const Crud = db.crud; // id, input, content

exports.createBox = async (req, res) => {
  const notesId = req.params.notesId;
  const userId = req.params.userId;
  const data = req.body;
  
  try {
    const box = await Crud.create({
      notesId: notesId,
      userId: userId,
      content: data.defaultContent,
      input: data.input,
    });
    
    if (!box) {
      return res.status(404).send({ message: "No input" });
    }
    
    const createdBox = {
      id: box.dataValues.id,
      input: box.dataValues.input,
      content: box.dataValues.content,
      notesId: box.dataValues.notesId,
      message: "New Box Created",
    };

    return res.status(201).json(createdBox);
    
  } catch (err) {
    console.error(err);
    return res.status(400).json({ message: "Invalid note data received" });
  }
};

exports.getBoxes = async (req, res) => {
  const userId = req.params.userId;
  const notesId = req.params.notesId;
  await Crud.findAll({
    where: {
      // userId: userId,
      notesId,
    },
  })
    .then((allBoxes) => {
      const transformedBoxes = allBoxes.map((box) => ({
        id: box.dataValues.id,
        input: box.dataValues.input,
        content: box.dataValues.content,
        notesId: box.dataValues.notesId,
      }));
      console.log('transformedBoxes',transformedBoxes)
      res.status(200).json(transformedBoxes);
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
  const id = req.body.id;
  const data = req.body;

  try {
    await Crud.destroy({
      where: {
        id: id,
      },
    });
    res.status(200).json({ message: "Note deleted" });
  } catch (err) {
    res.status(404).json({ message: "Note not found" });
  }
};
