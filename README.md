# Express Cloudinary Backend

A robust Node.js backend API built with Express.js, MongoDB, and Cloudinary for image management. Features complete authentication, user management, product CRUD operations, and file upload capabilities.

## 🚀 Features

- **Authentication & Authorization**
  - User registration and login
  - JWT-based authentication
  - Role-based access control (User/Admin)
  - Password change and profile updates
  - Admin user management

- **Product Management**
  - CRUD operations for products
  - Image upload integration with Cloudinary
  - Pagination and search functionality
  - User ownership validation

- **File Upload**
  - Single and multiple image uploads
  - Cloudinary integration for image optimization
  - Image deletion capabilities

- **Security Features**
  - Password hashing with bcrypt
  - Input validation and sanitization
  - CORS protection
  - Helmet for security headers
  - Rate limiting ready

## 🛠️ Tech Stack

- **Backend:** Node.js, Express.js
- **Database:** MongoDB with Mongoose
- **Authentication:** JWT (JSON Web Tokens)
- **File Storage:** Cloudinary
- **Security:** bcryptjs, helmet, cors
- **Validation:** Custom middleware
- **Development:** Nodemon

## 📋 Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or MongoDB Atlas)
- Cloudinary account
- npm or yarn

## ⚙️ Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd express-cloudinary-backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   
   Create a `.env` file in the root directory:
   ```env
   # Database
   MONGODB_URI=mongodb://localhost:27017/express-cloudinary-db
   # or use MongoDB Atlas:
   # MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/database

   # JWT
   JWT_SECRET=your-super-secret-jwt-key-here
   JWT_EXPIRES_IN=7d

   # Admin (for creating admin users)
   ADMIN_SECRET=super-secret-admin-key-2024

   # Cloudinary
   CLOUDINARY_CLOUD_NAME=your-cloud-name
   CLOUDINARY_API_KEY=your-api-key
   CLOUDINARY_API_SECRET=your-api-secret

   # Server
   PORT=3000
   ```

4. **Start the server**
   ```bash
   # Development mode
   npm run dev

   # Production mode
   npm start
   ```

## 👤 Creating Admin User

### Method 1: Using Script (Recommended)
```bash
npm run create-admin
```

### Method 2: Using API Endpoint
```bash
POST /api/auth/register-admin
{
  "name": "Admin User",
  "email": "admin@example.com",
  "password": "admin123",
  "adminSecret": "super-secret-admin-key-2024"
}
```

## 📚 API Documentation

### Authentication Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/api/auth/register` | Register new user | No |
| POST | `/api/auth/register-admin` | Register admin user | No (requires admin secret) |
| POST | `/api/auth/login` | User login | No |
| GET | `/api/auth/me` | Get current user | Yes |
| PUT | `/api/auth/change-password` | Change password | Yes |
| PUT | `/api/auth/update-profile` | Update profile | Yes |

### User Management (Admin Only)

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/api/auth/users` | Get all users | Admin |
| PUT | `/api/auth/users/:userId` | Update user | Admin |
| PUT | `/api/auth/users/:userId/reset-password` | Reset user password | Admin |
| DELETE | `/api/auth/users/:userId` | Delete user | Admin |

### Product Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/api/products` | Get all products | No |
| POST | `/api/products` | Create product | Yes |
| GET | `/api/products/:id` | Get single product | No |
| PUT | `/api/products/:id` | Update product | Yes (Owner/Admin) |
| DELETE | `/api/products/:id` | Delete product | Yes (Owner/Admin) |

### File Upload Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/api/upload/single` | Upload single image | Yes |
| POST | `/api/upload/multiple` | Upload multiple images | Yes |
| DELETE | `/api/upload/:public_id` | Delete image | Yes |

## 🧪 Testing with Postman

Import the provided Postman collection and environment:

1. **Collection:** `Express-Cloudinary-Backend.postman_collection.json`
2. **Environment:** `Express-Cloudinary-Backend.postman_environment.json`

The collection includes:
- Pre-configured requests for all endpoints
- Automatic token management
- Environment variables for easy testing
- Sample request bodies

## 📁 Project Structure

```
express-cloudinary-backend/
├── src/
│   ├── config/
│   │   ├── db.js              # Database connection
│   │   └── cloudinary.js      # Cloudinary configuration
│   ├── controllers/
│   │   ├── auth.controller.js # Authentication logic
│   │   ├── product.controller.js # Product CRUD
│   │   └── upload.controller.js # File upload logic
│   ├── middleware/
│   │   ├── auth.middleware.js # JWT authentication
│   │   ├── role.middleware.js # Role-based access
│   │   └── error.middleware.js # Error handling
│   ├── models/
│   │   ├── User.js           # User schema
│   │   └── Product.js        # Product schema
│   ├── routes/
│   │   ├── auth.routes.js    # Authentication routes
│   │   ├── product.routes.js # Product routes
│   │   └── upload.routes.js  # Upload routes
│   ├── validations/
│   │   └── auth.validation.js # Input validation
│   ├── app.js               # Express app setup
│   └── server.js            # Server entry point
├── scripts/
│   └── create-admin.js      # Admin user creation script
├── .env                     # Environment variables
├── .gitignore              # Git ignore rules
└── package.json            # Dependencies and scripts
```

## 🔒 Security Features

- **Password Hashing:** bcryptjs with salt rounds
- **JWT Authentication:** Secure token-based auth
- **Input Validation:** Custom validation middleware
- **CORS Protection:** Configurable CORS settings
- **Security Headers:** Helmet.js integration
- **Role-Based Access:** Admin/User role separation

## 🚀 Deployment

### Environment Variables for Production

Make sure to set these environment variables in your production environment:

- `MONGODB_URI` - Your production MongoDB connection string
- `JWT_SECRET` - Strong, unique JWT secret
- `ADMIN_SECRET` - Strong admin secret (remove admin endpoint in production)
- `CLOUDINARY_CLOUD_NAME` - Your Cloudinary cloud name
- `CLOUDINARY_API_KEY` - Your Cloudinary API key
- `CLOUDINARY_API_SECRET` - Your Cloudinary API secret
- `PORT` - Server port (usually provided by hosting platform)

### Production Recommendations

1. Remove or secure the admin registration endpoint
2. Use strong, unique secrets
3. Enable rate limiting
4. Set up proper logging
5. Use HTTPS in production
6. Regular security updates

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the ISC License.

## 📞 Support

For support, email your-email@example.com or create an issue in the repository.

---

**Happy Coding! 🚀**