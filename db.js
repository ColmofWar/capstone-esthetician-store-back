"use strict";
/** Database setup for esthetician_store. */
const { Client } = require("pg");
const { getDatabaseUri } = require("./config");

let db;

if (process.env.NODE_ENV === "production") {
  db = new Client({
    connectionString: getDatabaseUri(),
    ssl: {
      rejectUnauthorized: false
    }
  });
} else {
  db = new Client({
    connectionString: getDatabaseUri()
  });
}

console.log('[DB] Attempting to connect to database:', getDatabaseUri());
db.connect(err => {
  if (err) {
    console.error('[DB] Connection error:', err.stack);
  } else {
    console.log('[DB] Connected successfully');
  }
});

module.exports = db;