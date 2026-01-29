/** Routes for products */

// External libraries
const jsonschema = require("jsonschema");
const express = require("express");
const { ExpressError } = require("../helpers/expressError");

// Models
const Product = require("../models/Product");

// Schemas
const productSearchSchema = require("../schemas/productSearch.json");

const router = express.Router();

// GET /products - list all products sorted by name, with query validation
router.get("/", async (req, res, next) => {
  try {
    // Validate query params using productSearch schema
    const validation = jsonschema.validate(req.query, productSearchSchema);
    if (!validation.valid) {
      const errors = validation.errors.map(e => e.stack);
      throw new ExpressError(errors.join(", "), 400);
    }

    // Optionally, convert query params to correct types
    const criteria = { ...req.query };
    if (criteria.category_id !== undefined) criteria.category_id = Number(criteria.category_id);
    if (criteria.min_price !== undefined) criteria.min_price = Number(criteria.min_price);
    if (criteria.max_price !== undefined) criteria.max_price = Number(criteria.max_price);
    if (criteria.in_stock !== undefined) criteria.in_stock = (criteria.in_stock === 'true' || criteria.in_stock === true);

    // If no search params, return all products sorted by name
    let products;
    if (Object.keys(criteria).length === 0) {
      products = await Product.findAll();
    } else {
      products = await Product.get(criteria); // Assumes Product.get supports filtering
    }
    return res.json({ products });
  } catch (err) {
    return next(err);
  }
});

// GET /products/:id - get a single product by id
router.get("/:id", async (req, res, next) => {
  try {
    const id = req.params.id;
    const products = await Product.get({ id });
    if (!products || products.length === 0) {
      throw new ExpressError(`Product with id ${id} not found`, 404);
    }
    return res.json({ product: products[0] });
  } catch (err) {
    return next(err);
  }
});


module.exports = router;
