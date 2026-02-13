// Minimal Express app for backend connectivity testing

const express = require("express");
const cors = require("cors");

// routes
const productsRoutes = require('./src/routes/products.js');
const categoriesRoutes = require('./src/routes/categories.js');
const shoppingCartItemsRoutes = require('./src/routes/shopping_cart_items.js');
const userRoutes = require('./src/routes/users.js');
const authRoutes = require('./src/routes/auth.js');
const { authenticateJWT } = require("./src/middleware/authenticate");


const app = express();
app.use((req, res, next) => {
  console.log(`[REQUEST] ${req.method} ${req.url}`);
  next();
});
app.use(cors());
app.use(express.json());
//app.use(authenticateJWT);

app.get('/health', (req, res) => {
  console.log("[ROUTE] /health hit");
  res.json({ status: 'ok' });
});

// Mount API routes
app.use('/products', (req, res, next) => { console.log("[ROUTE] /products hit"); next(); }, productsRoutes);
app.use('/categories', (req, res, next) => { console.log("[ROUTE] /categories hit"); next(); }, categoriesRoutes);
app.use('/shopping_cart_items', (req, res, next) => { console.log("[ROUTE] /shopping_cart_items hit"); next(); }, shoppingCartItemsRoutes);
app.use('/users', (req, res, next) => { console.log("[ROUTE] /users hit"); next(); }, userRoutes);
app.use('/auth', (req, res, next) => { console.log("[ROUTE] /auth hit"); next(); }, authRoutes);

// 404 handler
app.use((req, res, next) => {
  console.log(`[404] ${req.method} ${req.url}`);
  res.status(404).json({ error: 'Not Found' });
});

// Generic error handler
app.use((err, req, res, next) => {
  console.error("[ERROR]", err.stack);
  res.status(err.status || 500).json({ error: err.message || 'Internal Server Error' });
});

module.exports = app;
