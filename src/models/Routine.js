
const db = require("../../db");
const { sqlForPartialUpdate, asyncGet } = require("../helpers/sql");
const { ExpressError } = require("../helpers/expressError");

// Routine model
export default class Routine {
  constructor({ id, user_id, name, description }) {
    this.id = id;
    this.user_id = user_id;
    this.name = name;
    this.description = description;
  }
    static async get(criteria = {}) {
    return await asyncGet(db, "routines", criteria);
  }
}
