const jwt = require("jsonwebtoken");

//Create Token
const generateAccessToken = (user) => {
  try {
    const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: "15m",
    });
    return accessToken;
  } catch (error) {
    console.error("Error generating access token:", error);
    throw error;
  }
};

//Valdate Token
const validateToken = (req, res, next) => {
  const generateAccessToken = req.headers["access-token"];

  if (!generateAccessToken)
    return res.status(400).json({ error: "User not Authenticated!" });

  try {
    const validateToken = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
    if (validateToken) {
      req.userId = decoded.id;
      return next();
    }
  } catch (err) {
    return res.status(400).json({ error: err });
  }
};

module.exports = { generateAccessToken, validateToken };
