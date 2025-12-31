const express = require('express');
const router = express.Router();
const orderController = require('../controllers/order.controller');
const { authenticate } = require('../middleware/auth.middleware');
const { requireAdmin } = require('../middleware/role.middleware');
const { validateCreateOrder, validateUpdateOrder } = require('../validations/order.validation');

// Public route - create order
router.post('/', validateCreateOrder, orderController.createOrder);

// Protected routes (admin only)
router.get('/', authenticate, requireAdmin, orderController.getAllOrders);
router.get('/:id', authenticate, requireAdmin, orderController.getOrder);
router.put('/:id', authenticate, requireAdmin, validateUpdateOrder, orderController.updateOrder);
router.delete('/:id', authenticate, requireAdmin, orderController.deleteOrder);

module.exports = router;
