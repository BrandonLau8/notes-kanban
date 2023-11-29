const controller = require("../controllers/crud.controller");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.post('/box', controller.createBox)

  app.get('/box/:username', controller.getBoxes)

  app.put('/box/:username', controller.updateBoxes)

  app.delete('/box/:username', controller.deleteBoxes)
};
