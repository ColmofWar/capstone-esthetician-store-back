
const db = require("../../db");
const { sqlForPartialUpdate, asyncGet } = require("../helpers/sql");
const { ExpressError } = require("../helpers/expressError");

// User model
export default class User {
  constructor({ id, username, email, password_hash, phone }) {
    this.id = id;
    this.username = username;
    this.email = email;
    this.password_hash = password_hash;
    this.phone = phone;
  }
    static async get(criteria = {}) {
    return await asyncGet(db, "users", criteria);
  }
}
