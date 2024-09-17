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

  //kiểm tra mật khẩu
  const isMatch = bcrypt.compareSync(password, customer.password);
  if (!isMatch) {
    throw new Error("Wrong password");
  }
  return customer;
};
module.exports = {
  createCustomer,
  emailExistsService,
  loginCustomer,
};
