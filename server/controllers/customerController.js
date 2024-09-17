const Joi = require("joi");
const {
  createCustomer,
  emailExistsService,
  loginCustomer,
} = require("../services/customerService");
const jwtAuth = require("../auth/JwtAuth");

//sign up
const createCustomerAPI = async (req, res) => {
  const schema = Joi.object({
    email: Joi.string()
      .email({
        minDomainSegments: 2,
        tlds: { allow: ["com", "net"] },
      })
      .required(),
    password: Joi.string()
      .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))
      .required(),
    ConfirmPassword: Joi.string()
      .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))
      .required(),
    name: Joi.string().alphanum().min(3).max(30).required(),
    phone: Joi.string().pattern(new RegExp("^[0-9]{8,11}$")).required(),
  });
  const { error, value } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  const { email, password, ConfirmPassword, name, phone } = value;
  try {
    const emailExists = await emailExistsService(email);
    if (emailExists) {
      return res
        .status(400)
        .json({ success: false, message: "email already exists" });
    }
    if (ConfirmPassword !== password) {
      return res
        .status(400)
        .json({ success: false, message: "passwords are not the same" });
    }
    const result = await createCustomer(email, password, name, phone);
    const token = jwtAuth.genToken(result._id);
    res.status(200).json({
      success: true,
      message: "created customer success",
      token: token,
    });
  } catch (error) {
    return res
      .status(400)
      .json({ success: false, error: error || error.message });
  }
};

//login
const loginCustomerAPI = async (req, res) => {
  const schema = Joi.object({
    email: Joi.string()
      .email({
        minDomainSegments: 2,
        tlds: { allow: ["com", "net"] },
      })
      .required(),
    password: Joi.string()
      .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))
      .required(),
  });
  const { error, value } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  const { email, password } = value;
  try {
    const result = await loginCustomer(email, password);
    console.log(result._id);

    const token = jwtAuth.genToken(result._id);
    res.status(200).json({
      success: true,
      message: "Login success",
      token: token,
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message || error });
    return;
  }
};
module.exports = {
  createCustomerAPI,
  loginCustomerAPI,
};
