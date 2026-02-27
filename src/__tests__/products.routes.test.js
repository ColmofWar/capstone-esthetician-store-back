const request = require('supertest');
const app = require('../../app');
const db = require('../../db');

describe('Products Routes', () => {
  let testProductId;

  beforeAll(async () => {
    // Insert a test product
    const prodRes = await db.query(`INSERT INTO products (name, brand, price, stock_quantity, image_url) VALUES ('RouteTest Product', 'RouteBrand', 19.99, 5, 'http://example.com/routeimg.png') RETURNING id`);
    testProductId = prodRes.rows[0].id;
  });

  afterAll(async () => {
    await db.query('DELETE FROM products WHERE id = $1', [testProductId]);
    await db.end();
  });

  it('GET /products returns array of products including test product', async () => {
    const res = await request(app).get('/products');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body.products)).toBe(true);
    const found = res.body.products.find(p => p.id === testProductId);
    expect(found).toBeDefined();
    expect(found.name).toBe('RouteTest Product');
    expect(found.brand).toBe('RouteBrand');
    expect(found.price).toBe("19.99"); // price may be string depending on pg
  });

  it('GET /products/:id returns the correct product', async () => {
    const res = await request(app).get(`/products/${testProductId}`);
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('product');
    expect(res.body.product.id).toBe(testProductId);
    expect(res.body.product.name).toBe('RouteTest Product');
  });

  it('GET /products/:id returns 500 for non-existent product', async () => {
    const res = await request(app).get('/products/999999');
    expect(res.statusCode).toBe(500);
    expect(res.body.error || res.body.message).toBeDefined();
  });
});
