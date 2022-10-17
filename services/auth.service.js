const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");
dotenv.config();

/**Token Generation */
const generateToken = (data) => {
  let jwtSecretKey = process.env.JWT_SECRET_KEY || "Change_YOUR_SECRET";
  return jwt.sign(data, jwtSecretKey);
};

const authService = {
  generateToken,
};

module.exports = authService;
