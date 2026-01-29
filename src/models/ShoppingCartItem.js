
const db = require("../../db");
const { sqlForPartialUpdate, asyncGet } = require("../helpers/sql");
const { ExpressError } = require("../helpers/expressError");

// ShoppingCartItem model
export default class ShoppingCartItem {
  constructor({ id, cart_id, product_id, quantity }) {
    this.id = id;
    this.cart_id = cart_id;
    this.product_id = product_id;
    this.quantity = quantity;
  }
    static async get(criteria = {}) {
    return await asyncGet(db, "shopping_cart_items", criteria);
  }
}
