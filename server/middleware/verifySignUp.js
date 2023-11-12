const db = require("../models");
const ROLES = db.ROLES; // array for user, admin, moderator
const User = db.user; 

//During Sign up are there duplicates? 
checkDuplicateUsernameOrEmail = async (req, res, next) => {
  try {
    //Username in User Object which has username, email, password 
    //findOne is a Sequelize method to find record
    let user = await User.findOne({
      where: {
        username: req.body.username,
      },
    });
    if (user) {
      return res.status(400).send({
        message: "Failed! Username is already in use",
      });
    }

    //Email
    user = await User.findOne({
      where: {
        email: req.body.email,
      },
    });

    if (user) {
      return res.status(400).send({
        message: "Failed! Email is already in use",
      });
    }

    next();
  } catch (error) {
    return res.status(500).send({
      message: "Unable to validate Username",
    });
  }
};

//Check through each role in array to see if it exists. 
//Note: there can be duplicates which is why for loop is used
checkRolesExisted = (req, res, next) => {
  if (req.body.roles) {
    for (let i = 0; i < req.body.roles.length; i++) {
      if (!ROLES.includes(req.body.roles[i])) {
        res.status(400).send({
          message: "Failed! Role does not exist = " + req.body.roles[i],
        });
        return;
      }
    }
  }
};

const verifySignUp = {
  checkDuplicateUsernameOrEmail,
  checkRolesExisted,
};

module.exports = verifySignUp;
