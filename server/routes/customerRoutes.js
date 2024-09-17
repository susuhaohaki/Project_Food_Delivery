const express = require("express");
const {
  createCustomerAPI,
  loginCustomerAPI,
} = require("../controllers/customerController");
const jwtAuth = require("../auth/JwtAuth");
const router = express.Router();

//customer
router.post("/signup", createCustomerAPI);
router.post("/login", loginCustomerAPI);
router.get("/token", jwtAuth.checkToken, function (req, res) {
  const token = req.headers["x-access-token"] || req.headers["authorization"];
  const id = req.decoded.id;
  res.json({ success: true, message: "Token is valid", token: token, id: id });
});

module.exports = router;
