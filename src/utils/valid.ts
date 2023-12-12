import * as Joi from 'joi';

export const createThreadSchema = Joi.object({
  content: Joi.string().required(),
  image: Joi.string(),
  userId: Joi.number()
});

export const createUserSchema = Joi.object({
  username: Joi.string(),
  full_name: Joi.string(),
  email: Joi.string(),
  password: Joi.string(),
  bio: Joi.string().allow('', null),

});

export const createRepliesSchema = Joi.object({
  image: Joi.string(),
  content: Joi.string(),
  user: Joi.number(),
  thread: Joi.number()
})

export const createLikesSchema = Joi.object({
  userId: Joi.number().required(),
  threadId: Joi.number().required()
})

export const followingSchema = Joi.object({
	followingToUser: Joi.number(),
});

export const followerSchema = Joi.object({
	followerToUser: Joi.number(),
});