const db = require('../../db');
const Category = require('../models/Category');

describe('Category Model', () => {
  let testCategoryId;
  const testCategory = { name: 'ModelTest Category' };

  afterAll(async () => {
    await db.query('DELETE FROM categories WHERE id = $1', [testCategoryId]);
    await db.end();
  });

  it('can get categories by criteria', async () => {
    // Insert a test category
    const res = await db.query(`INSERT INTO categories (name) VALUES ($1) RETURNING id`, [testCategory.name]);
    testCategoryId = res.rows[0].id;
    
    const categories = await Category.get({ name: testCategory.name });
    expect(Array.isArray(categories)).toBe(true);
    expect(categories.length).toBeGreaterThan(0);
    expect(categories[0].id).toBe(testCategoryId);
    expect(categories[0].name).toBe(testCategory.name);
  });
  
  it('can get all categories', async () => {
    const categories = await Category.get();
    expect(Array.isArray(categories)).toBe(true);
    expect(categories.find(c => c.id === testCategoryId)).toBeDefined();
  });
});
