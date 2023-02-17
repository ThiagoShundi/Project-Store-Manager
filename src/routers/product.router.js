const express = require('express');
const { productController } = require('../controllers');

const router = express.Router();

router.get(
  '/',
  productController.listProducts,
);

router.get(
  '/:id',
  productController.getProducts,
);

router.post(
  '/',
  productController.createProducts,
);

router.put(
  '/:id',
  productController.editProducts,
);

router.delete(
  '/:id',
  productController.deleteProducts,
);

module.exports = router;