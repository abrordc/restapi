import Joi from "joi";

const registerValidation = (data) => {
  const schema = Joi.object({
    username: Joi.string().required(),
    password: Joi.string().min(6).required(),
  });

  return schema.validate(data);
};

const loginValidation = (data) => {
  const schema = Joi.object({
    username: Joi.string().required(),
    password: Joi.string().min(6).required(),
  });

  return schema.validate(data);
};

const validation = {
  registerValidation,
  loginValidation,
};

export default validation;
