const validateCreateProduct = (req, res, next) => {
  const { name, description, category, price, stock } = req.body;
  
  // Required fields
  if (!name || !description || !category) {
    return res.status(400).json({ 
      error: 'Name, description, and category are required' 
    });
  }
  
  // Validate name
  if (name.trim().length < 2) {
    return res.status(400).json({ 
      error: 'Product name must be at least 2 characters long' 
    });
  }
  
  // Validate description
  if (description.trim().length < 10) {
    return res.status(400).json({ 
      error: 'Product description must be at least 10 characters long' 
    });
  }
  
  // Validate price if provided
  if (price !== undefined && price !== null) {
    if (typeof price !== 'number' || price < 0) {
      return res.status(400).json({ 
        error: 'Price must be a positive number' 
      });
    }
  }
  
  // Validate stock if provided
  if (stock !== undefined && stock !== null) {
    if (typeof stock !== 'number' || stock < 0 || !Number.isInteger(stock)) {
      return res.status(400).json({ 
        error: 'Stock must be a positive integer' 
      });
    }
  }
  
  next();
};

const validateUpdateProduct = (req, res, next) => {
  const { name, description, category, price, stock } = req.body;
  
  // At least one field should be provided for update
  if (!name && !description && !category && price === undefined && stock === undefined && !req.body.images) {
    return res.status(400).json({ 
      error: 'At least one field is required for update' 
    });
  }
  
  // Validate name if provided
  if (name && name.trim().length < 2) {
    return res.status(400).json({ 
      error: 'Product name must be at least 2 characters long' 
    });
  }
  
  // Validate description if provided
  if (description && description.trim().length < 10) {
    return res.status(400).json({ 
      error: 'Product description must be at least 10 characters long' 
    });
  }
  
  // Validate price if provided
  if (price !== undefined && price !== null) {
    if (typeof price !== 'number' || price < 0) {
      return res.status(400).json({ 
        error: 'Price must be a positive number' 
      });
    }
  }
  
  // Validate stock if provided
  if (stock !== undefined && stock !== null) {
    if (typeof stock !== 'number' || stock < 0 || !Number.isInteger(stock)) {
      return res.status(400).json({ 
        error: 'Stock must be a positive integer' 
      });
    }
  }
  
  next();
};

module.exports = {
  validateCreateProduct,
  validateUpdateProduct,
};