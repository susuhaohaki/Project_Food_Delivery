const jwt = require("jsonwebtoken");
require("dotenv").config();
const jwtAuth = {
  genToken(id) {
    const token = jwt.sign({ id: id }, process.env.JWT_SECRET, {
      expiresIn: parseInt(process.env.JWT_EXPIRES),
    });
    return token;
  },
  checkToken(req, res, next) {
    const token = req.headers["x-access-token"] || req.headers["authorization"];
    if (token) {
      jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
          return res.json({ success: false, message: "Token is not valid" });
        } else {
          req.decoded = decoded;
          next();
        }
      });
    } else {
      return res.json({
        success: false,
        message: "Auth token is not supplied",
      });
    }
  },
};
module.exports = jwtAuth;
