const db = require("../models");
const ROLES = db.ROLES; // array for user, admin, moderator
const User = db.user;

//During Sign up are there duplicates?
const checkDuplicateUsernameOrEmail = async (req, res, next) => {
  // Username
  User.findOne({
    where: {
      username: req.body.username,
    },
  }).then((user) => {
    if (user) {
      res.status(400).send({
        message: "Failed! Username is already in use!",
      });
      return;
    }

    // Email
    User.findOne({
      where: {
        email: req.body.email,
      },
    }).then((user) => {
      if (user) {
        res.status(400).send({
          message: "Failed! Email is already in use!",
        });
        return;
      }

      next();
    });
  });
};

//Check through each role in array to see if it exists.
//Note: there can be duplicates which is why for loop is used
const checkRolesExisted = (req, res, next) => {
  console.log(ROLES);
  if (req.body.roles) {
    const roleNames = req.body.roles;
    if (!ROLES.includes(roleNames)) {
      res.status(400).send({
        message: "Failed! Role does not exist = " + roleNames,
      });
      return;
    }
  }
  next();
};

const verifySignUp = {
  checkDuplicateUsernameOrEmail: checkDuplicateUsernameOrEmail,
  checkRolesExisted: checkRolesExisted,
};

module.exports = verifySignUp;
