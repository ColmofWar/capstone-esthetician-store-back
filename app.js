// Minimal Express app for backend connectivity testing

const express = require("express");
const cors = require("cors");

// routes
const productsRoutes = require('./src/routes/products.js');
const categoriesRoutes = require('./src/routes/categories.js');

const app = express();
app.use(cors());
app.use(express.json());


app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

// Mount API routes
app.use('/products', productsRoutes);
app.use('/categories', categoriesRoutes);

// 404 handler
app.use((req, res, next) => {
  res.status(404).json({ error: 'Not Found' });
});

// Generic error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({ error: err.message || 'Internal Server Error' });
});

module.exports = app;
