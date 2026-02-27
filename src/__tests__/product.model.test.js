const Product = require('../models/Product');
const db = require('../../db');

describe('Product Model', () => {
  let testProductId;
  const testProduct = {
    name: 'ModelTest Product',
    brand: 'ModelBrand',
    price: 29.99,
    stock_quantity: 7,
    image_url: 'http://example.com/modelimg.png'
  };

  beforeAll(async () => {
    // Manually insert product into DB
    const res = await db.query(
      `INSERT INTO products (name, brand, price, stock_quantity, image_url)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING id`,
      [testProduct.name, testProduct.brand, testProduct.price, testProduct.stock_quantity, testProduct.image_url]
    );
    testProductId = res.rows[0].id;
  });

  afterAll(async () => {
    await db.query('DELETE FROM products WHERE id = $1', [testProductId]);
    await db.end();
  });

  it('can find all products', async () => {
    const products = await Product.findAll();
    expect(Array.isArray(products)).toBe(true);
    expect(products.find(p => p.id === testProductId)).toBeDefined();
  });

  it('can get product by id', async () => {
    const products = await Product.get({ id: testProductId });
    expect(Array.isArray(products)).toBe(true);
    expect(products[0].id).toBe(testProductId);
  });
});
