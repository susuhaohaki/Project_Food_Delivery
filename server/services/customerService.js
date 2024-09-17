const customerModel = require("../models/customerModel");
const bcrypt = require("bcrypt");
const emailExistsService = async (email) => {
  return await customerModel.findOne({ email });
};
//sign up customer
const createCustomer = async (email, password, name, phone) => {
  const salt = bcrypt.genSaltSync(10);
  const hashPassword = bcrypt.hashSync(password, salt);
  const customer = {
    email,
    password: hashPassword,
    name,
    phone,
  };
  return await customerModel.create(customer);
};

//login customer
const loginCustomer = async (email, password) => {
  const customer = await emailExistsService(email);
  if (!customer) {
    throw new Error("email does not exist");
  }
  console.log("customer", customer);
  if (customer.isVerified) {
    //kiểm tra mật khẩu
    const isMatch = bcrypt.compareSync(password, customer.password);
    if (!isMatch) {
      throw new Error("Wrong password");
    }
    return customer;
  } else {
    throw new Error("email has not been authenticated");
  }
};
const verifyCustomer = async (token) => {
  const customer = await customerModel.findOne({ verificationToken: token });
  if (!customer) {
    return res.status(400).json({ message: "Invalid or expired token." });
  }
  customer.isVerified = true;
  customer.verificationToken = undefined; // Clear the token
  const result = await customer.save();
  return result;
};
module.exports = {
  createCustomer,
  emailExistsService,
  loginCustomer,
  verifyCustomer,
};
