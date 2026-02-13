
const db = require("../../db");
const { sqlForPartialUpdate, asyncGet } = require("../helpers/sql");
const { ExpressError } = require("../helpers/expressError");

// User model
class User {
  constructor({ id, username, email, password_hash, phone }) {
    this.id = id;
    this.username = username;
    this.email = email;
    this.password_hash = password_hash;
    this.phone = phone;
  }

  /**
   * Register a new user
   * @param {Object} userData - { username, email, password_hash, phone }
   * @returns {User}
   */
  static async register({ username, email, password_hash, phone }) {
    const result = await db.query(
      `INSERT INTO users (username, email, password_hash, phone)
       VALUES ($1, $2, $3, $4)
       RETURNING id, username, email, password_hash, phone`,
      [username, email, password_hash, phone]
    );
    return new User(result.rows[0]);
  }

  /**
   * Authenticate a user by username and password hash
   * @param {string} username
   * @param {string} password_hash
   * @returns {User|null}
   */
  static async authenticate(username, password_hash) {
    const result = await db.query(
      `SELECT id, username, email, password_hash FROM users WHERE username = $1 AND password_hash = $2`,
      [username, password_hash]
    );
    if (result.rows.length === 0) return null;
    return new User(result.rows[0]);
  }

  /**
   * Find all users
   * @returns {User[]}
   */
  static async findAll() {
    const result = await db.query(
      `SELECT id, username, email, password_hash, phone FROM users`
    );
    return result.rows.map(row => new User(row));
  }

  /**
   * Get a user by username
   * @param {string} username
   * @returns {User|null}
   */
  static async get(username) {
    const result = await db.query(
      `SELECT id, username, email FROM users WHERE username = $1`,
      [username]
    );
    if (result.rows.length === 0) return null;
    return new User(result.rows[0]);
  }

  /**
   * Update a user by username
   * @param {string} username
   * @param {Object} data
   * @returns {User|null}
   */
  static async update(username, data) {
    const { setCols, values } = sqlForPartialUpdate(data);
    const result = await db.query(
      `UPDATE users SET ${setCols} WHERE username = $${values.length + 1}
       RETURNING id, username, email, password_hash, phone`,
      [...values, username]
    );
    if (result.rows.length === 0) return null;
    return new User(result.rows[0]);
  }

  /**
   * Remove a user by username
   * @param {string} username
   * @returns {boolean} true if deleted, false if not found
   */
  static async remove(username) {
    const result = await db.query(
      `DELETE FROM users WHERE username = $1 RETURNING username`,
      [username]
    );
    return result.rows.length > 0;
  }
  
}

module.exports = User;