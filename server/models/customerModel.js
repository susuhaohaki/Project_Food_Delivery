const mongoose = require("mongoose");
const crypto = require("crypto");
const customerSchema = new mongoose.Schema({
  email: { type: String, require: true, unique: true, trim: true },
  password: { type: String, require: true },
  phone: { type: String, trim: true },
  name: { type: String, require: true },
  isVerified: { type: Boolean, default: false },
  verificationToken: { type: String },
});

customerSchema.pre("save", function (next) {
  if (this.isNew && !this.isVerified) {
    this.verificationToken = crypto.randomBytes(32).toString("hex");
  }
  next();
});
const customer = mongoose.model("Customer", customerSchema);
module.exports = customer;
