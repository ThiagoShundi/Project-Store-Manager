const validateSales = (req, res, next) => {
  const sales = [...req.body];
  
  const VerifyProductId = sales.map((verProId) => verProId.productId === undefined)
    .some((ver) => ver === true);

  const VerifyQuant = sales.map((verQuan) => verQuan.quantity === undefined)
    .some((ver) => ver === true);
  
  const VerifyQuantValue = sales.map((verQuan) => verQuan.quantity <= 0)
    .some((ver) => ver === true);

  if (VerifyProductId === true) {
    return res.status(400).json({ message: '"productId" is required' });
  }

  if (VerifyQuant === true) {
    return res.status(400).json({ message: '"quantity" is required' });
  }

  if (VerifyQuantValue === true) {
    return res.status(422).json({ message: '"quantity" must be greater than or equal to 1' });
  }  

  return next();
};

module.exports = {
  validateSales,
};