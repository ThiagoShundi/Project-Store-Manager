const { salesModel } = require('../models');
const { productModel } = require('../models');
// const schema = require('./validations/validationsInputValues');

// const findAll = async () => {
//   const products = await salesModel.findAll();
//   return { type: null, message: products };
// };

// const findById = async (productId) => {
//   const error = schema.validateId(productId);
//   if (error.type) return error;

//   const product = await salesModel.findById(productId);
//   if (!product) return { type: 'PRODUCT_NOT_FOUND', message: 'Product not found' };

//   return { type: null, message: product };
// };

const createSale = async (sales) => {
  const products = await productModel.findAll();

  const product = products.map((prod) => prod.id);

  const verifySale = sales.map((ver) => (product.includes(ver.productId)))
    .some((verf) => verf === false);
  
  if (verifySale === true) return { type: 'PRODUCT_NOT_FOUND', message: 'Product not found' };

  const newSaleId = await salesModel.insertSales();

  const newSale = await salesModel.insertSalesProduct({ id: newSaleId, sales });
  console.log(newSale.itemsSold);

  // await Promise.all(verifySale);

  return { type: null, message: newSale };
};

module.exports = {
  // findAll,
  // findById,
  createSale,
};