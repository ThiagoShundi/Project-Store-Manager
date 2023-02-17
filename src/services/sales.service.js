const { salesModel } = require('../models');
const { productModel } = require('../models');
const schema = require('./validations/validationsInputValues');

const findAll = async () => {
  const sales = await salesModel.findAll();
  return { type: null, message: sales };
};

const findById = async (saleId) => {
  const error = schema.validateId(saleId);
  if (error.type) return error;

  const saleIdNumb = [];
  saleIdNumb.push(Number(saleId));

  const sales = await salesModel.findAllSales();

  const salesId = sales.map((sal) => sal.id);

  const verifySale = salesId.some((verf) => saleIdNumb.includes(verf));

  if (!verifySale) return { type: 'PRODUCT_NOT_FOUND', message: 'Sale not found' };

  const salesResult = await salesModel.findById(saleId);

  return { type: null, message: salesResult };
};

const createSale = async (sales) => {
  const products = await productModel.findAll();

  const productId = products.map((prod) => prod.id);

  const verifySale = sales.map((ver) => (productId.includes(ver.productId)))
    .some((verf) => verf === false);
  
  if (verifySale === true) return { type: 'PRODUCT_NOT_FOUND', message: 'Product not found' };

  const newSaleId = await salesModel.insertSales();

  const newSale = await salesModel.insertSalesProduct({ id: newSaleId, sales });

  // await Promise.all(verifySale);

  return { type: null, message: newSale };
};

module.exports = {
  findAll,
  findById,
  createSale,
};