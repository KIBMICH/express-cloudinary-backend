const express = require('express');
const multer = require('multer');
const {
  uploadImage,
  uploadMultipleImages,
  deleteImage,
} = require('../controllers/upload.controller');
const { protect } = require('../middleware/auth.middleware');

const router = express.Router();

// Configure multer for file uploads
const upload = multer({
  dest: 'uploads/',
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB limit
  },
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only image files are allowed'), false);
    }
  },
});

router.post('/single', protect, upload.single('image'), uploadImage);
router.post('/multiple', protect, upload.array('images', 5), uploadMultipleImages);
router.delete('/:public_id', protect, deleteImage);

module.exports = router;