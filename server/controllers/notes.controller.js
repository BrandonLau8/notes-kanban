const db = require('../models')
const Notes = db.notes; 

exports.createNote = async (req, res) => {  
    // const notesId = req.body.notesId;
    const userId = req.params.userId;
    const data = req.body;

    try {
        const note = await Notes.create({
            ...data,
            // notesId: notesId,
            userId: userId
        })
        console.log(note)

        const createdNote = {
            id: note.dataValues.id,
            message: 'New Note Created'
        }

        return res.status(201).json(createdNote);
    } catch (err) {
        console.error(err)
        return res.status(400).json({ message: "Invalid note data received" });
    }
}

exports.updateNotes = async (req, res) => {
    try {
      const updatedNotes = req.body;
      for (updatedNote of updatedNotes) {
        const { id, noteInput } = updatedNote;
        const note = await Notes.update(
          { noteInput },
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