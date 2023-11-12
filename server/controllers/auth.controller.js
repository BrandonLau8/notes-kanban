const db = require("../models");
const config = require("../config/auth.config");
const User = db.user; //username, email, password
const Role = db.role; //id, name

const Op = db.Sequelize.Op; //use sequalize library

const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

exports.signup = async (req, res) => {
  //Save User to database
  try {
    const user = await User.create({
      username: req.body.username,
      email: req.body.email,
      //complete hashing process before allowing program to move on to the next line
      // salt round of 8
      password: bcrypt.hashSync(req.body.password, 8),
    });

    //If roles are provided in the request body,
    //find all roles in the database where the name matches any of the roles specified.
    if (req.body.roles) {
      const roles = await Role.findAll({
        where: {
          name: {
            //OR operation checking for roles where name is one of the values specifed in req body
            [Op.or]: req.body.roles,
          },
        },
      });

      const result = user.setRoles(roles);
      if (result) res.send({ message: "User registered successfully!" });
    } else {
      //user has role = 1
      const result = user.setRoles([1]);
      if (result) res.send({ message: "User registered successfully!" });
    }
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

exports.signin = async (req, res) => {
  try {
    const user = await User.findOne({
      where: {
        username: req.body.username,
      },
    });

    if (!user) {
      res.status(400).send({ message: "User not found." });
    }

    const passwordIsvalid = bcrypt.compareSync(
      req.body.password,
      user.password
    );

    if (!passwordIsvalid) {
      return res.status(401).send({
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
    const roles = await user.getRoles();
    for (let i = 0; i < roles.length; i++) {
      //Uppercase common convention that use Spring Security or similar framework
      authorities.push("ROLE_" + roles[i].name.toUpperCase());
    }

    //Generate token
    req.session.token = token;
    return res.status(200).send({
      id: user.id,
      username: user.username,
      email: user.email,
      roles: authorities,
    });
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};

exports.signout = async (req, res) => {
    try{
        req.session = null;
        return res.status(200).send({
            message: "You've been signed out!"
        });
    } catch(err) {
        this.next(err)
    }
}
