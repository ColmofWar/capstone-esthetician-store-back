
const db = require("../../db");
const { sqlForPartialUpdate, asyncGet } = require("../helpers/sql");
const { ExpressError } = require("../helpers/expressError");

// ShoppingCart model
export default class ShoppingCart {
  constructor({ id, user_id }) {
    this.id = id;
    this.user_id = user_id;
  }
    static async get(criteria = {}) {
    return await asyncGet(db, "shopping_carts", criteria);
  }
}
