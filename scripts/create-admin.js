const mongoose = require('mongoose');
const User = require('../src/models/User');
require('dotenv').config();

const createAdmin = async () => {
  try {
    // Connect to database
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    // Admin user data
    const adminData = {
      name: 'Super Admin',
      email: 'admin@example.com',
      password: 'admin123456',
      role: 'admin'
    };

    // Check if admin already exists
    const existingAdmin = await User.findOne({ email: adminData.email });
    if (existingAdmin) {
      console.log('Admin user already exists with email:', adminData.email);
      process.exit(0);
    }

    // Create admin user
    const admin = await User.create(adminData);
    console.log('Admin user created successfully:');
    console.log('Email:', admin.email);
    console.log('Password: admin123456');
    console.log('Role:', admin.role);
    
    process.exit(0);
  } catch (error) {
    console.error('Error creating admin user:', error.message);
    process.exit(1);
  }
};

createAdmin();