
const db = require("../../db");
const { sqlForPartialUpdate, asyncGet } = require("../helpers/sql");
const { ExpressError } = require("../helpers/expressError");

// Address model

class Address {
  constructor({ id, user_id, street, city, state, postal_code, country, address_type }) {
    this.id = id;
    this.user_id = user_id;
    this.street = street;
    this.city = city;
    this.state = state;
    this.postal_code = postal_code;
    this.country = country;
    this.address_type = address_type;
  }

  /**
   * Create a new address in the database.
   * @param {Object} data - Address data: user_id, street, city, state, postal_code, country, address_type
   * @returns {Object} The newly created address row
   */


  static async create(data) {
    const { asyncCreate } = require("../helpers/sql");
    return await asyncCreate(db, "addresses", data);
  }

  
  static async get(criteria = {}) {
    return await asyncGet(db, "addresses", criteria);
  }

  /**
   * Update an address by id with partial data
   * @param {number} id - Address id
   * @param {Object} data - Partial address data
   * @returns {Object} The updated address row
   */
  static async update(id, data) {
    if (!id || !data || Object.keys(data).length === 0) throw new Error("Missing id or data for update");
    const { setCols, values } = sqlForPartialUpdate(data);
    const result = await db.query(
      `UPDATE addresses SET ${setCols} WHERE id = $${values.length + 1} RETURNING *`,
      [...values, id]
    );
    if (result.rows.length === 0) throw new ExpressError("Address not found", 404);
    return result.rows[0];
  }
  
}

module.exports = Address;
