const ShoppingCartItem = require('../models/ShoppingCartItems');
const db = require('../../db');

describe('ShoppingCartItem Model', () => {
  let userId, productId, cartItemId;

  beforeAll(async () => {
    // Create a user and product for the cart item
    const userRes = await db.query(`INSERT INTO users (username, email, password_hash) VALUES ('cartmodeluser', 'cartmodel@example.com', 'hash') RETURNING id`);
    userId = userRes.rows[0].id;
    const prodRes = await db.query(`INSERT INTO products (name, brand, price, stock_quantity, image_url) VALUES ('CartModel Product', 'CartBrand', 11.99, 3, 'http://example.com/cartimg.png') RETURNING id`);
    productId = prodRes.rows[0].id;
  });

  afterAll(async () => {
    await db.query('DELETE FROM shopping_cart_items WHERE user_id = $1', [userId]);
    await db.query('DELETE FROM products WHERE id = $1', [productId]);
    await db.query('DELETE FROM users WHERE id = $1', [userId]);
    await db.end();
  });

  it('can add item to cart', async () => {
    const item = await ShoppingCartItem.UpdateCartItem({ user_id: userId, product_id: productId, quantity: 2 });
    expect(item).toHaveProperty('id');
    expect(item.user_id).toBe(userId);
    expect(item.product_id).toBe(productId);
    expect(item.quantity).toBe(2);
    cartItemId = item.id;
  });

  it('can view cart for user', async () => {
    const cart = await ShoppingCartItem.viewCart(userId);
    expect(cart).toHaveProperty('items');
    expect(Array.isArray(cart.items)).toBe(true);
    expect(cart.items.find(i => i.id === cartItemId)).toBeDefined();
  });

  it('can delete cart item', async () => {
    const cart = await ShoppingCartItem.deleteCartItem(userId, cartItemId);
    expect(Array.isArray(cart.items)).toBe(true);
    expect(cart.items.find(i => i.id === cartItemId)).toBeUndefined();
  });
});
