
const db = require("../../db");
const { sqlForPartialUpdate, asyncGet } = require("../helpers/sql");
const { ExpressError } = require("../helpers/expressError");

// OrderItem model
export default class OrderItem {
  constructor({ id, order_id, product_id, quantity, unit_price }) {
    this.id = id;
    this.order_id = order_id;
    this.product_id = product_id;
    this.quantity = quantity;
    this.unit_price = unit_price;
  }
    static async get(criteria = {}) {
    return await asyncGet(db, "order_items", criteria);
  }
}
