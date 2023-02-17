const express = require('express');
const { salesController } = require('../controllers');

const { validateSales } = require('../middlewares/validateRequestSales');

const router = express.Router();

router.get(
  '/',
  salesController.listSales,
);

router.get(
  '/:id',
  salesController.getSales,
);

router.post(
  '/',
  validateSales,
  salesController.createSales,
);

module.exports = router;