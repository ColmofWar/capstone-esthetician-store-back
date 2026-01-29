/** Routes for categories */

const jsonschema = require("jsonschema");
const express = require("express");
const { ExpressError } = require("../helpers/expressError");
const Category = require("../models/Category");
const categorySearchSchema = require("../schemas/categorySearch.json");

const router = express.Router();

// GET /categories - list all categories, with query validation
router.get("/", async (req, res, next) => {
  try {
    const validation = jsonschema.validate(req.query, categorySearchSchema);
    if (!validation.valid) {
      const errors = validation.errors.map(e => e.stack);
      throw new ExpressError(errors.join(", "), 400);
    }

    const criteria = { ...req.query };
    if (criteria.category_id !== undefined) criteria.category_id = Number(criteria.category_id);

    let categories;
    if (Object.keys(criteria).length === 0) {
      categories = await Category.get();
    } else {
      categories = await Category.get(criteria);
    }
    return res.json({ categories });
  } catch (err) {
    return next(err);
  }
});

// GET /categories/:id - get a single category by id
router.get("/:id", async (req, res, next) => {
  try {
    const id = req.params.id;
    const categories = await Category.get({ id });
    if (!categories || categories.length === 0) {
      throw new ExpressError(`Category with id ${id} not found`, 404);
    }
    return res.json({ category: categories[0] });
  } catch (err) {
    return next(err);
  }
});

module.exports = router;
