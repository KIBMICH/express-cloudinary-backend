const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phoneRegex = /^[\d\s\-+()]{7,20}$/;

const validateCreateOrder = (req, res, next) => {
  const { fullName, phone, email, truckBrand, productNeeded, quantity, deliveryPreference } = req.body;

  // Required fields check
  if (!fullName || !phone || !email || !truckBrand || !productNeeded || !quantity || !deliveryPreference) {
    return res.status(400).json({
      error: 'Full name, phone, email, truck brand, product needed, quantity, and delivery preference are required',
    });
  }

  // Validate fullName
  if (fullName.trim().length < 2) {
    return res.status(400).json({ error: 'Full name must be at least 2 characters long' });
  }

  // Validate email
  if (!emailRegex.test(email)) {
    return res.status(400).json({ error: 'Please provide a valid email address' });
  }

  // Validate phone
  if (!phoneRegex.test(phone)) {
    return res.status(400).json({ error: 'Please provide a valid phone number' });
  }

  // Validate quantity
  if (typeof quantity !== 'number' || quantity < 1 || !Number.isInteger(quantity)) {
    return res.status(400).json({ error: 'Quantity must be a positive integer' });
  }

  // Validate deliveryPreference
  const validDeliveryOptions = ['pickup', 'delivery', 'express'];
  if (!validDeliveryOptions.includes(deliveryPreference)) {
    return res.status(400).json({
      error: `Delivery preference must be one of: ${validDeliveryOptions.join(', ')}`,
    });
  }

  next();
};

const validateUpdateOrder = (req, res, next) => {
  const { fullName, email, phone, quantity, deliveryPreference, status } = req.body;

  // At least one field should be provided
  if (Object.keys(req.body).length === 0) {
    return res.status(400).json({ error: 'At least one field is required for update' });
  }

  // Validate fullName if provided
  if (fullName && fullName.trim().length < 2) {
    return res.status(400).json({ error: 'Full name must be at least 2 characters long' });
  }

  // Validate email if provided
  if (email && !emailRegex.test(email)) {
    return res.status(400).json({ error: 'Please provide a valid email address' });
  }

  // Validate phone if provided
  if (phone && !phoneRegex.test(phone)) {
    return res.status(400).json({ error: 'Please provide a valid phone number' });
  }

  // Validate quantity if provided
  if (quantity !== undefined) {
    if (typeof quantity !== 'number' || quantity < 1 || !Number.isInteger(quantity)) {
      return res.status(400).json({ error: 'Quantity must be a positive integer' });
    }
  }

  // Validate deliveryPreference if provided
  if (deliveryPreference) {
    const validDeliveryOptions = ['pickup', 'delivery', 'express'];
    if (!validDeliveryOptions.includes(deliveryPreference)) {
      return res.status(400).json({
        error: `Delivery preference must be one of: ${validDeliveryOptions.join(', ')}`,
      });
    }
  }

  // Validate status if provided
  if (status) {
    const validStatuses = ['pending', 'confirmed', 'processing', 'shipped', 'delivered', 'cancelled'];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({
        error: `Status must be one of: ${validStatuses.join(', ')}`,
      });
    }
  }

  next();
};

module.exports = {
  validateCreateOrder,
  validateUpdateOrder,
};
