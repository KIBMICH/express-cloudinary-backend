const validateRegister = (req, res, next) => {
  const { name, email, password } = req.body;
  
  if (!name || !email || !password) {
    return res.status(400).json({ error: 'Name, email, and password are required' });
  }
  
  if (password.length < 6) {
    return res.status(400).json({ error: 'Password must be at least 6 characters long' });
  }
  
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ error: 'Please provide a valid email' });
  }
  
  next();
};

const validateLogin = (req, res, next) => {
  const { email, password } = req.body;
  
  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required' });
  }
  
  next();
};

const validateChangePassword = (req, res, next) => {
  const { currentPassword, newPassword } = req.body;
  
  if (!currentPassword || !newPassword) {
    return res.status(400).json({ error: 'Current password and new password are required' });
  }
  
  if (newPassword.length < 6) {
    return res.status(400).json({ error: 'New password must be at least 6 characters long' });
  }
  
  if (currentPassword === newPassword) {
    return res.status(400).json({ error: 'New password must be different from current password' });
  }
  
  next();
};

const validateUpdateProfile = (req, res, next) => {
  const { name, email } = req.body;
  
  if (!name && !email) {
    return res.status(400).json({ error: 'At least one field (name or email) is required' });
  }
  
  if (email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: 'Please provide a valid email' });
    }
  }
  
  if (name && name.trim().length < 2) {
    return res.status(400).json({ error: 'Name must be at least 2 characters long' });
  }
  
  next();
};

const validateResetPassword = (req, res, next) => {
  const { newPassword } = req.body;
  
  if (!newPassword) {
    return res.status(400).json({ error: 'New password is required' });
  }
  
  if (newPassword.length < 6) {
    return res.status(400).json({ error: 'Password must be at least 6 characters long' });
  }
  
  next();
};

module.exports = {
  validateRegister,
  validateLogin,
  validateChangePassword,
  validateUpdateProfile,
  validateResetPassword,
};