const controller = require("../controllers/crud.controller");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.post('/profile/:userId/:notesId', controller.createBox)

  app.get('/profile/:userId/:notesId', controller.getBoxes)

  app.patch('/profile/:userId/:notesId', controller.updateBoxes)

  app.delete('/profile/:userId/:notesId', controller.deleteBoxes)
};
