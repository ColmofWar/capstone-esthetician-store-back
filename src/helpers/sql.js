/**
 * @param {Object} dataToUpdate - The fields to update (key-value pairs).
 * @param {Object} jsToSql - Maps JS-style field names to SQL column names.
 * @returns {{ setCols: string, values: any[] }}
 * @throws {Error} If no data is provided.
 */
function sqlForPartialUpdate(dataToUpdate, jsToSql = {}) {
  const keys = Object.keys(dataToUpdate);
  if (keys.length === 0) throw new Error("No data");

  // Build the SET clause
  const setCols = keys
    .map((colName, idx) =>
      `"${jsToSql[colName] || colName}" = $${idx + 1}`
    )
    .join(", ");

  // Build the values array
  const values = Object.values(dataToUpdate);

  return { setCols, values };
}


/**
 * @param {Object} db - The database client/connection.
 * @param {string} tableName - The table to query.
 * @param {Object} criteria - Key-value pairs for WHERE clause (optional).
 * @returns {Promise<Array<Object>>} Array of rows matching the criteria.
 */
async function asyncGet(db, tableName, criteria = {}) {
  const keys = Object.keys(criteria);
  let sql = `SELECT * FROM ${tableName}`;
  let values = [];
  if (keys.length > 0) {
    const conditions = keys.map((col, idx) => `"${col}" = $${idx + 1}`);
    sql += ` WHERE ${conditions.join(" AND ")}`;
    values = Object.values(criteria);
  }
  const result = await db.query(sql, values);
  return result.rows;
}


/**
 * @param {Object} db - The database client/connection.
 * @param {string} tableName - The table to insert into.
 * @param {Object} data - Key-value pairs for columns and their values.
 * @returns {Promise<Object>} The newly created row.
 * @throws {Error} If no data is provided.
 */
async function asyncCreate(db, tableName, data) {
  const keys = Object.keys(data);
  if (keys.length === 0) throw new Error("No data provided for creation");
  const cols = keys.map(k => `"${k}"`).join(", ");
  const placeholders = keys.map((_, idx) => `$${idx + 1}`).join(", ");
  const sql = `INSERT INTO ${tableName} (${cols}) VALUES (${placeholders}) RETURNING *`;
  const values = Object.values(data);
  const result = await db.query(sql, values);
  return result.rows[0];
}

module.exports = { sqlForPartialUpdate, asyncGet, asyncCreate };
