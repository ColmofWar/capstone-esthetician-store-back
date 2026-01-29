const db = require("../../db");
const { sqlForPartialUpdate } = require("../helpers/sql");
const { ExpressError } = require("../helpers/expressError");
const { asyncGet } = require("../helpers/sql");

// Category model

class Category {
  constructor({ id, category_id, name }) {
    this.id = id;
    this.category_id = category_id;
    this.name = name;
  }

  /**
   * Dynamically fetches categories from the database by criteria.
   *
   * Builds a SELECT statement based on the fields provided in the criteria object.
   * If no criteria are provided, returns all categories.
   *
   * @param {Object} criteria - Key-value pairs representing columns and their desired values.
   *   Example: { name: "Cleansers" }
   *   Only the provided fields will be used in the WHERE clause.
   *
   * @returns {Array<Object>} Array of category rows matching the criteria.
   */
  static async get(criteria = {}) {
    return await asyncGet(db, "categories", criteria);
  }
  
    static async findAll() {
    const result = await db.query("SELECT * FROM categories ORDER BY name ASC");
    return result.rows;
  }
}

module.exports = Category;
