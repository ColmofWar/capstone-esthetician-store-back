const request = require('supertest');
const app = require('../../app');
const db = require('../../db');

describe('Shopping Cart Items Routes', () => {
  const testUser = {
    username: 'cartuser',
    email: 'cartuser@example.com',
    password: 'cartpass123'
  };
  let token;
  let userId;
  let testProductId;
  let cartItemId;

  beforeAll(async () => {
    // Clean up and create user
    await db.query('DELETE FROM users WHERE username = $1', [testUser.username]);
    const userRes = await request(app).post('/users').send(testUser);
    token = userRes.body.token;
    // Get user id
    const userDbRes = await db.query('SELECT id FROM users WHERE username = $1', [testUser.username]);
    userId = userDbRes.rows[0].id;
    // Create a product for cart
    const prodRes = await db.query(`INSERT INTO products (name, brand, price, stock_quantity, image_url) VALUES ('Test Product', 'TestBrand', 9.99, 10, 'http://example.com/img.png') RETURNING id`);
    testProductId = prodRes.rows[0].id;
  });

  afterAll(async () => {
    await db.query('DELETE FROM shopping_cart_items WHERE user_id = $1', [userId]);
    await db.query('DELETE FROM products WHERE id = $1', [testProductId]);
    await db.query('DELETE FROM users WHERE username = $1', [testUser.username]);
    await db.end();
  });

  it('POST /shopping_cart_items/:username adds item to cart', async () => {
    const res = await request(app)
      .post(`/shopping_cart_items/${testUser.username}`)
      .set('Authorization', `Bearer ${token}`)
      .send({ product_id: testProductId, quantity: 2 });
    expect(res.statusCode).toBe(200);
    expect(res.body.cart).toHaveProperty('id');
    expect(res.body.cart.product_id).toBe(testProductId);
    expect(res.body.cart.quantity).toBe(2);
    cartItemId = res.body.cart.id;
  });

  it('GET /shopping_cart_items/:username returns user cart', async () => {
    const res = await request(app)
      .get(`/shopping_cart_items/${testUser.username}`)
      .set('Authorization', `Bearer ${token}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.cart).toHaveProperty('items');
    expect(Array.isArray(res.body.cart.items)).toBe(true);
    expect(res.body.cart.items.length).toBeGreaterThan(0);
    expect(res.body.cart.items[0].product_id).toBe(testProductId);
  });

  it('DELETE /shopping_cart_items/:username/:itemId removes item from cart', async () => {
    const res = await request(app)
      .delete(`/shopping_cart_items/${testUser.username}/${cartItemId}`)
      .set('Authorization', `Bearer ${token}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.cart).toHaveProperty('items');
    expect(Array.isArray(res.body.cart.items)).toBe(true);
    // Should be empty after delete
    expect(res.body.cart.items.find(i => i.id === cartItemId)).toBeUndefined();
  });
});
