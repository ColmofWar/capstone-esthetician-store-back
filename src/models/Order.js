
const db = require("../../db");
const { sqlForPartialUpdate, asyncGet } = require("../helpers/sql");
const { ExpressError } = require("../helpers/expressError");

// Order model
export default class Order {
  constructor({ id, user_id, order_date, status, total_amount, shipping_address_id, billing_address_id }) {
    this.id = id;
    this.user_id = user_id;
    this.order_date = order_date;
    this.status = status;
    this.total_amount = total_amount;
    this.shipping_address_id = shipping_address_id;
    this.billing_address_id = billing_address_id;
  }

    static async get(criteria = {}) {
    return await asyncGet(db, "orders", criteria);
  }
}
