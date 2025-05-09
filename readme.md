# 🛍️ E-commerce REST API – Final Version

This is the final backend REST API project for an e-commerce system built using Node.js, Express, and MongoDB. It handles user authentication, product management (Apple products like iPhone 15 Pro Max), and invoice creation.

---

## 📦 Features

- ✅ **User Authentication** – Signup & login using JWT
- ✅ **Product Management** – Create, view Apple products
- ✅ **Invoice System** – Create and view invoices with product quantities
- ✅ **Protected Endpoints** – Secured using JWT middleware `verifyToken`
- ✅ **Profile Uploads** – Using `multer` and optional image processing via `sharp`
- ✅ **Well-structured** – Organized controllers, routes, middleware, models, and utilities

---

## 🗂️ Project Structure

---

## 📁 Project Structure

📦 root/
├── 📁 src/
│   ├── 📁 controllers/ → invoiceController.js, productController.js, userController.js
│   ├── 📁 middleware/ → authMiddleware.js, multerConfig.js, passwordEncrypt.js, sharpMiddleware.js
│   ├── 📁 models/
│   ├── 📁 routes/ → invoices.js, products.js, users.js
│   ├── 📁 utils/ → middleware.js
│   └── index.js
├── 📁 uploads/ → profilePic files
├── .env
├── package.json


---

## 🔒 Protected Endpoints

Routes below require authentication via JWT using `verifyToken` middleware:

| Method | Route                    | Description             |
|--------|--------------------------|-------------------------|
| POST   | /api/products            | Add new product         |
| POST   | /api/invoices            | Create new invoice      |
| GET    | /api/invoices            | Get all user invoices   |
| PUT    | /api/users/userUpdate    | Update user profile     |

📌 Use this format in headers:
```http
Authorization: Bearer <your_token_here>


⚙️ Getting Started

# 1. Clone the repository
git clone https://github.com/your-username/e-commerce-rest-api.git
cd e-commerce-rest-api

# 2. Install dependencies
npm install


# 4. Run the server in development mode
npm run dev


📡 API Endpoints
👤 Users

Method	 Route	                Description
POST	/api/users/signup	    Register new user
POST	/api/users/login	    Login user & get JWT
PUT	    /api/users/userUpdate	Update user profile


📦 Products

Method	 Route	        Description
POST	/api/products	Add new product (secure)
GET	    /api/products	List all products


🧾 Invoices

Method	 Route	        Description
POST	/api/invoices	Create invoice (secure)
GET	    /api/invoices	List user invoices (secure)


🔧 Sample Payloads
➕ Product
{
  "title": "iPhone 15 Pro Max",
  "description": "256GB, Titanium",
  "price": 1499,
  "category": "apple",
  "stock": 5
}


🧾 Invoice
{
  "products": [
    {
      "productId": "PRODUCT_ID_HERE",
      "quantity": 2
    }
  ]
}


🧪 Testing with Postman
1.Register or login to get your JWT token.

2.Use the token in Authorization header for protected endpoints:
  Authorization: Bearer <your_token_here>


3.Test the following:

    -POST /api/products to add a product

    -GET /api/products to fetch all products

    -POST /api/invoices to create an invoice

    -GET /api/invoices to see your invoices


✅ Final Notes
This project satisfies all final assignment requirements:

Branch created (e.g., final)

Products and Invoices implemented

Token-protected routes working


💻 Author

🔗 GitHub:https://github.com/jessK10/-E-commerce-rest-API/tree/final


