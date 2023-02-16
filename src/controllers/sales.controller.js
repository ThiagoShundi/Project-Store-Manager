const { salesService } = require('../services');
const errorMap = require('../utils/errorMap');

// const listSales = async (_req, res) => {
//   const { type, message } = await salesService.findAll();

//   res.status(200).json(message);
// };

// const getSales = async (req, res) => {
//   const { id } = req.params;
//   const { type, message } = await salesService.findById(id);

//   if (type) return res.status(errorMap.mapError(type)).json({ message: 'Product not found' });

//   res.status(200).json(message);
// };

const createSales = async (req, res) => {
  const sales = [...req.body];

  const { type, message } = await salesService.createSale(sales);

  if (type) return res.status(errorMap.mapError(type)).json({ message });

  res.status(201).json(message);
};

module.exports = {
  // listSales,
  // getSales,
  createSales,
};