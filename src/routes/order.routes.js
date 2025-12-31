const express = require('express');
const router = express.Router();
const orderController = require('../controllers/order.controller');
const { protect } = require('../middleware/auth.middleware');
const { authorize } = require('../middleware/role.middleware');
const { validateCreateOrder, validateUpdateOrder } = require('../validations/order.validation');

// Public route - create order
router.post('/', validateCreateOrder, orderController.createOrder);

// Protected routes (admin only)
router.get('/', protect, authorize('admin'), orderController.getAllOrders);
router.get('/:id', protect, authorize('admin'), orderController.getOrder);
router.put('/:id', protect, authorize('admin'), validateUpdateOrder, orderController.updateOrder);
router.delete('/:id', protect, authorize('admin'), orderController.deleteOrder);

module.exports = router;
