import Joi = require("joi");


export const createdThreadSchema = Joi.object().keys({
    content: Joi.string().required(),
    image: Joi.string(),
})
export const updateThreadSchema = Joi.object({
    content: Joi.string(),
    image: Joi.string(),
})