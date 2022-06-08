const Joi = require("joi");

const boardSchema = Joi.object().keys({
  id: Joi.number().integer(),
  name: Joi.string().alphanum().min(3).max(50).required(),
  color: Joi.string().alphanum().min(3).max(100).required(),
  description: Joi.string().max(300).required(),
  createdAt: Joi.date(),
});

const cardSchema = Joi.object().keys({
  id: Joi.number().integer(),
  name: Joi.string().min(3).max(50).required(),
  description: Joi.string().max(300).required(),
  createdAt: Joi.date(),
  estimate: Joi.string().min(3).max(50).required(),
  status: Joi.string().alphanum().min(3).max(50).required(),
  dueDate: Joi.string().required(),
  labels: Joi.array().items(Joi.string().alphanum().min(3).max(50)).required(),
  boardId: Joi.number().integer().required(),
});

module.exports = { boardSchema, cardSchema };
