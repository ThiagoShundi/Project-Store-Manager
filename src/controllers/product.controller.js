const { productService } = require('../services');
const errorMap = require('../utils/errorMap');

const listProducts = async (_req, res) => {
  const { type, message } = await productService.findAll();

  if (type) return res.status(errorMap.mapError(type)).json({ message: 'Product not found' });

  res.status(200).json(message);
};

const getProducts = async (req, res) => {
  const { id } = req.params;
  const { type, message } = await productService.findById(id);

  if (type) return res.status(errorMap.mapError(type)).json({ message: 'Product not found' });

  res.status(200).json(message);
};

const createProducts = async (req, res) => {
  const { name } = req.body;
  
  const { type, message } = await productService.createProduct(name);

  if (type) return res.status(errorMap.mapError(type)).json({ message });

  res.status(201).json(message);
};

const editProducts = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  const { type, message } = await productService.editById(id, name);

  if (type) return res.status(errorMap.mapError(type)).json({ message });

  res.status(200).json(message);
};

module.exports = {
  listProducts,
  getProducts,
  createProducts,
  editProducts,
};