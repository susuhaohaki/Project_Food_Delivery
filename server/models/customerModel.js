const mongoose = require("mongoose");

const customerSchema = new mongoose.Schema({
  email: { type: String, require: true, unique: true, trim: true },
  password: { type: String, require: true },
  phone: { type: String, trim: true },
  name: { type: String, require: true },
});

const customer = mongoose.model("Customer", customerSchema);
module.exports = customer;
