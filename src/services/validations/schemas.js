const Joi = require('joi');

const idSchema = Joi.number().integer().min(1).required();

const addProductSchemaString = Joi.object({
  name: Joi.string().required(),
});

const addProductSchema = Joi.object({
  name: Joi.string().min(5).required(),
});

module.exports = {
  idSchema,
  addProductSchemaString,
  addProductSchema,
};