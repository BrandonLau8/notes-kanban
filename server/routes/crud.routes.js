const controller = require("../controllers/crud.controller");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.post('/:userId', controller.createBox)

  app.get("/:username", controller.getBoxes)

  app.patch('/:username/:input', controller.updateBoxes)

  app.delete('/:username/:input/:content', controller.deleteBoxes)
};
