const express = require('express');
const {
  getAllProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
} = require('../controllers/product.controller');
const { protect } = require('../middleware/auth.middleware');
const { validateCreateProduct, validateUpdateProduct } = require('../validations/product.validation');

const router = express.Router();

router.route('/')
  .get(getAllProducts)
  .post(protect, validateCreateProduct, createProduct);

router.route('/:id')
  .get(getProduct)
  .put(protect, validateUpdateProduct, updateProduct)
  .delete(protect, deleteProduct);

module.exports = router;