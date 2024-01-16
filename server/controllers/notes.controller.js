const db = require("../models");
const Notes = db.notes;

exports.getNotes = (req, res) => {
  const userId = req.params.userId;

  Notes.findAll({
    where: {
      userId,
    },
  })

    .then((allNotes) => {
      const transformedNotes = allNotes.map((note) => ({
        id: note.dataValues.id,
        noteInput: note.dataValues.noteInput,
      }));
      res.status(200).json(transformedNotes);
      // console.log("transformedNotes:", transformedNotes);
    })
    .catch((error) => {
      console.error("Error fetching notes:", error);
      res.status(500).json({ error: "Internal Server Error" });
    });
};

exports.createNote = async (req, res) => {
  // const notesId = req.body.notesId;
  const userId = req.params.userId;
  const data = req.body;

  try {
    const note = await Notes.create({
      // notesId: notesId,
      userId: userId,
      noteInput: data.defaultNoteInput,
    });

    const createdNote = {
      id: note.dataValues.id,
      noteInput: note.dataValues.noteInput,
      message: "New Note Created",
    };

    return res.status(201).json(createdNote);
  } catch (err) {
    console.error(err);
    return res.status(400).json({ message: "Invalid note data received" });
  }
};

exports.deleteNote = async (req, res) => {
  const notesId = req.body.id;
  const userId = req.params.userId

  await Notes.destroy({
    where: {
      id: notesId,
      userId: userId
    },
  })
  .then(() => {
    res.status(200).json({ message: "note deleted" });
  });
};

exports.updateNotes = async (req, res) => {
  try {
    const updatedNotes = req.body;
    //   for (updatedNote of updatedNotes) {
    const { id, noteInput } = updatedNotes;
    const note = await Notes.update(
      { noteInput },
      {
        where: { id },
      }
    );
    //   }
    console.log(req.body);

    res.status(200).send({ message: "note updated" });
  } catch (err) {
    console.error(err);
    res.status(400).send(err);
  }
};
