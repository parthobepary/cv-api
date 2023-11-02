const Joi = require("joi");

const authSchema = Joi.object({
    name: Joi.string(),
    phone: Joi.number(),
    email: Joi.string().email().lowercase(),
    password: Joi.string().required().min(6)
});

module.exports = { authSchema }