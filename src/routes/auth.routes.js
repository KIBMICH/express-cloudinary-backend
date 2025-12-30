const express = require('express');
const { 
  register, 
  registerAdmin,
  login, 
  getMe, 
  changePassword, 
  updateProfile,
  getAllUsers,
  updateUser,
  resetUserPassword,
  deleteUser
} = require('../controllers/auth.controller');
const { protect } = require('../middleware/auth.middleware');
const { authorize } = require('../middleware/role.middleware');
const {
  validateRegister,
  validateLogin,
  validateChangePassword,
  validateUpdateProfile,
  validateResetPassword,
} = require('../validations/auth.validation');

const router = express.Router();

// Public routes
router.post('/register', validateRegister, register);
router.post('/register-admin', validateRegister, registerAdmin);
router.post('/login', validateLogin, login);

// Protected routes (authenticated users)
router.get('/me', protect, getMe);
router.put('/change-password', protect, validateChangePassword, changePassword);
router.put('/update-profile', protect, validateUpdateProfile, updateProfile);

// Admin only routes
router.get('/users', protect, authorize('admin'), getAllUsers);
router.put('/users/:userId', protect, authorize('admin'), validateUpdateProfile, updateUser);
router.put('/users/:userId/reset-password', protect, authorize('admin'), validateResetPassword, resetUserPassword);
router.delete('/users/:userId', protect, authorize('admin'), deleteUser);

module.exports = router;