import Joi, { Schema } from "joi";

export const UserSchema: Schema = Joi.object().keys({
  name: Joi.string().alphanum().min(3).max(50).required(),
  pwd: Joi.string().min(8).max(50).required(),
});

export const BoardSchema: Schema = Joi.object().keys({
  id: Joi.number().integer(),
  name: Joi.string().alphanum().min(3).max(50).required(),
  color: Joi.string().alphanum().min(3).max(100).required(),
  description: Joi.string().max(300).required(),
  createdAt: Joi.date(),
});

export const CardSchema: Schema = Joi.object().keys({
  id: Joi.number().integer(),
  name: Joi.string().min(3).max(50).required(),
  description: Joi.string().max(300).required(),
  createdAt: Joi.date(),
  estimate: Joi.string().min(3).max(50).required(),
  status: Joi.string().alphanum().min(3).max(50).required(),
  dueDate: Joi.date(),
  labels: Joi.array().items(Joi.string().alphanum().min(3).max(50)).required(),
  boardId: Joi.string().required(),
});
