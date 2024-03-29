const { idSchema, addProductSchemaString, addProductSchema } = require('./schemas');

const validateId = (id) => {
  const { error } = idSchema.validate(id);
  if (error) return { type: 'INVALID_VALUE', message: '"id" must be a number' };
  
  return { type: null, message: '' };
};

const validateNewProductString = (name) => {
  console.log(name);
  const { error } = addProductSchemaString.validate(name);
  console.log(error);
  if (error) {
    return { type: 'INVALID_STR', message: '"name" is required' };
  }
  return { type: null, message: '' };
};

const validateNewProduct = (name) => {
  const { error } = addProductSchema.validate(name);
  if (error) {
    return { type: 'INVALID_VALUE', message: '"name" length must be at least 5 characters long' };
  }
  return { type: null, message: '' };
};

module.exports = {
  validateId,
  validateNewProductString,
  validateNewProduct,
};