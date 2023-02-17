const { productModel } = require('../models');
const schema = require('./validations/validationsInputValues');

const findAll = async () => {
  const products = await productModel.findAll();
  return { type: null, message: products };
};

const findById = async (productId) => {
  const error = schema.validateId(productId);
  if (error.type) return error;

  const product = await productModel.findById(productId);
  if (!product) return { type: 'PRODUCT_NOT_FOUND', message: 'Product not found' };

  return { type: null, message: product };
};

const createProduct = async (name) => {
  const error = schema.validateNewProductString({ name });
  if (error.type) return error;

  const error2 = schema.validateNewProduct({ name });
  if (error2.type) return error2;

  const newProductId = await productModel.insert(name);

  const newProduct = await productModel.findById(newProductId);

  return { type: null, message: newProduct };
};

const editById = async (productId, productName) => {
  const error1 = schema.validateId(productId);
  if (error1.type) return error1;

  const error2 = schema.validateNewProductString({ name: productName });
  if (error2.type) return error2;

  const error3 = schema.validateNewProduct({ name: productName });
  if (error3.type) return error3;

  const product = await productModel.findById(productId);
  if (!product) return { type: 'PRODUCT_NOT_FOUND', message: 'Product not found' };

  await productModel.editById(productId, productName);

  const product2 = await productModel.findById(productId);

  return { type: null, message: product2 };
};

const deleteById = async (productId) => {
  const error = schema.validateId(productId);
  if (error.type) return error;

  const product = await productModel.findById(productId);
  if (!product) return { type: 'PRODUCT_NOT_FOUND', message: 'Product not found' };

  await productModel.deleteById(productId);

  return { type: null, message: null };
};

module.exports = {
  findAll,
  findById,
  createProduct,
  editById,
  deleteById,
};