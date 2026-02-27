# Esthetician Store Back-End

[Live Site](https://your-deployment-url.com)

## Overview

Esthetician Store is a full-featured e-commerce backend for a skincare and beauty products shop. It provides a robust REST API for managing products, users, shopping carts, orders, and more. The backend is designed for integration with a frontend client and supports secure authentication, user management, and product inventory operations.

## Features

- **User Registration & Authentication:** Secure JWT-based login and registration.
- **Product Catalog:** Browse, search, and filter products by category, price, and stock.
- **Shopping Cart:** Add, update, and remove items from a user’s cart.
- **Order Management:** Place and view orders (extendable for payment integration).
- **Address Management:** Users can add/update addresses for shipping.
- **Admin Controls:** (If implemented) Admins can manage products and categories.
- **Robust Error Handling:** Consistent RESTful error codes and messages.
- **Comprehensive Testing:** Automated tests for all major routes and models.

*Why these features?*  
These features cover the core requirements for a modern e-commerce backend, focusing on security, usability, and extensibility for future frontend or admin features.

## Running Tests

All tests are located in `src/__tests__/`.  
To run the tests, use:

```bash
npm test
```

or to run a specific test file:

```bash
npm test src/__tests__/products.routes.test.js
```

## Standard User Flow

1. **Register** as a new user via the `/users/register` endpoint.
2. **Login** to receive a JWT token.
3. **Browse Products** using `/products` (with optional filters).
4. **Add Items to Cart** via `/shopping_cart_items/:username`.
5. **Update Cart** (change quantities or remove items).
6. **Checkout** (place an order, if implemented).
7. **Manage Addresses** for shipping.
8. **View Orders** (if implemented).

## API Documentation
- **Link:** postgres://@localhost/esthetician_store
This project exposes a RESTful API.  
- **Endpoints:**  
	- `/products` — List/search products  
	- `/products/:id` — Get product details  
	- `/products/:id/stock` — Update stock (PATCH)  
	- `/users` — User registration, login, update  
	- `/shopping_cart_items/:username` — Cart management  
	- `/orders` — Order management  
	- `/addresses/:username/:type` — Address management  
- **Authentication:** JWT required for protected routes.
- **Error Handling:** Standard HTTP status codes and JSON error messages.

*API Notes:*  
- All endpoints return JSON.
- PATCH and POST routes validate input using JSON Schema.
- The API is designed for easy integration with any frontend.

## Technology Stack

- **Backend:** Node.js, Express.js
- **Database:** PostgreSQL
- **Authentication:** JWT (jsonwebtoken)
- **Validation:** jsonschema, ajv
- **Testing:** Jest, Supertest
- **Other:** Custom error handling, modular route/model structure


