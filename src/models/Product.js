

const db = require("../../db");
const { sqlForPartialUpdate, asyncGet } = require("../helpers/sql");
const { ExpressError } = require("../helpers/expressError");

// Product model
class Product {
  constructor({ id, category_id, name, brand, description, price, stock_quantity, image_url, alt_text }) {
    this.id = id;
    this.category_id = category_id;
    this.name = name;
    this.brand = brand;
    this.description = description;
    this.price = price;
    this.stock_quantity = stock_quantity;
    this.image_url = image_url;
    this.alt_text = alt_text;
  }
    static async get(criteria = {}) {
    return await asyncGet(db, "products", criteria);
  }
    /**
   * Fetch all products sorted by name (ascending).
   * @returns {Promise<Array<Object>>} Array of product rows.
   */
  static async findAll() {
    const result = await db.query("SELECT * FROM products ORDER BY name ASC");
    return result.rows;
  }

  
}

module.exports = Product;