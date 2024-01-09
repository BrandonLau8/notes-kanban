const controller = require("../controllers/crud.controller");
const notesControl = require('../controllers/notes.controller')

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  
  // app.post('/profile/:userId', controller.createBox)

  app.get('/profile/:userId', controller.getBoxes)

  app.patch('/profile/:userId', controller.updateBoxes)

  app.delete('/profile/:userId', controller.deleteBoxes)

  app.post('/profile/:userId', notesControl.createNote, controller.createBox)

  app.patch('/profile/:userId/:notesId', notesControl.updateNotes)

  app.get('/profile/:userId/:notesId', notesControl.getNotes)

};
