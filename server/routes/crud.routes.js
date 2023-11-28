const controller = require("../controllers/crud.controller");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.route("/boxes")
    .get(controller.getBoxes)
    .post(controller.createBox)
    .patch(controller.updateBoxes)
    .delete(controller.deleteBoxes)
};
