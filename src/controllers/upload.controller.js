const cloudinary = require('../config/cloudinary');

// Upload single image
exports.uploadImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    // Upload to cloudinary
    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: 'products',
      transformation: [
        { width: 800, height: 600, crop: 'limit' },
        { quality: 'auto' }
      ]
    });

    res.json({
      success: true,
      image: {
        url: result.secure_url,
        public_id: result.public_id,
      },
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Upload multiple images
exports.uploadMultipleImages = async (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ error: 'No files uploaded' });
    }

    const uploadPromises = req.files.map(file =>
      cloudinary.uploader.upload(file.path, {
        folder: 'products',
        transformation: [
          { width: 800, height: 600, crop: 'limit' },
          { quality: 'auto' }
        ]
      })
    );

    const results = await Promise.all(uploadPromises);

    const images = results.map(result => ({
      url: result.secure_url,
      public_id: result.public_id,
    }));

    res.json({
      success: true,
      images,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete image
exports.deleteImage = async (req, res) => {
  try {
    const { public_id } = req.params;

    await cloudinary.uploader.destroy(public_id);

    res.json({
      success: true,
      message: 'Image deleted successfully',
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};