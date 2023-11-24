const db = require("../models");
const config = require("../config/auth.config");
const User = db.user; //username, email, password
const Role = db.role; //id, name

const Op = db.Sequelize.Op; //use sequalize library

const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

exports.signup = (req, res) => {
  //Save User to database

  User.create({
    username: req.body.username,
    email: req.body.email,
    //complete hashing process before allowing program to move on to the next line
    // salt round of 8
    password: bcrypt.hashSync(req.body.password, 8),
  })

    //If roles are provided in the request body,
    //find all roles in the database where the name matches any of the roles specified.
    .then((user) => {
      if (req.body.roles) {
        const rolesArray = [req.body.roles];
        Role.findAll({
          where: {
            name: {
              [Op.or]: rolesArray,
            },
          },
        }).then((roles) => {
          console.log(roles);
          user.setRoles(roles).then(() => {
            res.send({
              message: "User Mod Admin was registered successfully!",
            });
          });
        });
      } else {
        //user has role = 1
        user.setRoles([1]).then(() => {
          res.send({ message: "User registered successfully!" });
        });
      }
    })
    .catch((error) => {
      res.status(500).send({ message: error.message });
    });
};

exports.signin = (req, res) => {
  console.log(req.body);
  User.findOne({
    where: {
      username: req.body.username,
    },
  })
    .then((user) => {
      if (!user) {
        return res.status(404).send({ message: "User not found." });
      }

      const passwordIsvalid = bcrypt.compareSync(
        req.body.password,
        user.password
      );

      if (!passwordIsvalid) {
        return res.status(401).send({
          accessToken: null,
          message: "Invalid Password!",
        });
      }

      const token = jwt.sign(
        { id: user.id }, //payload of jwt
        config.secret, //secret key to sign jwt to verify integrity of token
        {
          algorithm: "HS256", //commonly used hashing algo to sign token
          //alows for key sizes smaller than 256 bits. safer to use stronger key size
          allowInsecureKeySizes: true,
          expiresIn: 86400, // 24 hours in seconds
        }
      );

      //Layout roles associated with the user
      let authorities = [];
      user.getRoles().then((roles) => {
        console.log(roles)
        for (let i = 0; i < roles.length; i++) {
          //Uppercase common convention that use Spring Security or similar framework
          authorities.push("ROLE_" + roles[i].name.toUpperCase());
        }
        console.log({
          id: user.id,
          username: user.username,
          email: user.email,
          roles: authorities,
          accessToken: token,
      })
        res.status(200).send({
          id: user.id,
          username: user.username,
          email: user.email,
          roles: authorities,
          accessToken: token,
        });
      });
    })
    .catch((error) => {
      res.status(500).send({ message: error.message });
    });
};

exports.signout = async (req, res) => {
  try {
    req.session = null;
    return res.status(200).send({
      message: "You've been signed out!",
    });
  } catch (err) {
    this.next(err);
  }
};
