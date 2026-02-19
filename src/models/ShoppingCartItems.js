const db = require("../../db");
const { sqlForPartialUpdate, asyncGet } = require("../helpers/sql");
const { ExpressError } = require("../helpers/expressError");

// ShoppingCartItem model

// ShoppingCartItem model matching SQL schema (id, user_id, product_id, quantity)

class ShoppingCartItem {
  constructor({ id, user_id, product_id, quantity }) {
    this.id = id;
    this.user_id = user_id;
    this.product_id = product_id;
    this.quantity = quantity;
  }

  static async get(criteria = {}) {
    // Build WHERE clause for filtering
    const where = [];
    const values = [];
    let idx = 1;
    if (criteria.user_id !== undefined) {
      where.push(`sci.user_id = $${idx++}`);
      values.push(criteria.user_id);
    }
    if (criteria.product_id !== undefined) {
      where.push(`sci.product_id = $${idx++}`);
      values.push(criteria.product_id);
    }
    // Add more filters as needed

    const whereClause = where.length > 0 ? `WHERE ${where.join(' AND ')}` : '';
    const sql = `SELECT sci.id, sci.user_id, sci.product_id, sci.quantity, p.name, p.price, p.image_url
                FROM shopping_cart_items sci
                JOIN products p ON sci.product_id = p.id
                ${whereClause}`;
    const result = await db.query(sql, values);
    return result.rows;
  }

  // Add a new item to the shopping_cart_items table, or update quantity if it exists
  static async UpdateCartItem(item) {
    console.log('[SHOPPING_CART_ITEMS] UpdateCartItem called with item:', item.quantity, item.user_id, item.product_id);
    const updatedCartItem = await db.query(
      `
      INSERT INTO shopping_cart_items (user_id, product_id, quantity)
      VALUES ($1, $2, $3)
      ON CONFLICT (user_id, product_id)
      DO UPDATE
      SET quantity = $3
      WHERE shopping_cart_items.user_id = $1 AND shopping_cart_items.product_id = $2
      RETURNING id, user_id, product_id, quantity
      `,
      [item.user_id, item.product_id,item.quantity]
    );
    return updatedCartItem.rows[0];
  }
  

  // View the shopping cart for a specific user, including product details
  static async viewCart(user_id) {
    console.log('[SHOPPING_CART_ITEMS] Viewing cart for user_id:', user_id);
    const result = await db.query(
      `SELECT sci.id, sci.user_id, sci.product_id, sci.quantity, p.name, p.price, p.image_url
       FROM shopping_cart_items sci
       JOIN products p ON sci.product_id = p.id
       WHERE sci.user_id = $1`,
      [user_id]
    );
    return { items: result.rows };
  }
    // Update the shopping cart for a user: replace all items with newItems array
  static async deleteCartItem(user_id, item_id) {
    // Remove only the specific item for the user
    await db.query(
      `DELETE FROM shopping_cart_items WHERE user_id = $1 AND id = $2`,
      [user_id, item_id]
    );
    // Return updated cart
    return await ShoppingCartItem.viewCart(user_id);
  }
}

module.exports = ShoppingCartItem;
