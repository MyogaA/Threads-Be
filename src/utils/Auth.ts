import Joi = require("joi");

export const registerSchema = Joi.object().keys({
    username: Joi.string().required(),
    full_name: Joi.string().required(),
    email: Joi.string().required(),
    password: Joi.string().required(),
})

export const loginSchema = Joi.object().keys({
    email: Joi.string().required(),
    password: Joi.string().required(),
})