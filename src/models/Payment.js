
const db = require("../../db");
const { sqlForPartialUpdate, asyncGet } = require("../helpers/sql");
const { ExpressError } = require("../helpers/expressError");

// Payment model
export default class Payment {
  constructor({ id, order_id, payment_method, amount, status, transaction_reference, transaction_time }) {
    this.id = id;
    this.order_id = order_id;
    this.payment_method = payment_method;
    this.amount = amount;
    this.status = status;
    this.transaction_reference = transaction_reference;
    this.transaction_time = transaction_time;
  }
    static async get(criteria = {}) {
    return await asyncGet(db, "payments", criteria);
  }
}
