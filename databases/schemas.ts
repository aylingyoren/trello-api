import Joi, { Schema } from "joi";

export const UserSchema: Schema = Joi.object().keys({
  name: Joi.string().alphanum().min(3).max(50).required(),
  pwd: Joi.string().min(8).max(50).required(),
});

export const BoardSchema: Schema = Joi.object().keys({
  id: Joi.number().integer(),
  name: Joi.string().min(3).max(50).required(),
  color: Joi.string().alphanum().min(3).max(100).required(),
  description: Joi.string().max(300).required(),
});

export const CardSchema: Schema = Joi.object().keys({
  id: Joi.number().integer(),
  name: Joi.string().min(3).max(50).required(),
  description: Joi.string().max(300).required(),
  estimate: Joi.string().min(3).max(50).required(),
  status: Joi.string().min(3).max(50).required(),
  due_date: Joi.date(),
  labels: Joi.array().items(Joi.string().min(2).max(50)).required(),
});
