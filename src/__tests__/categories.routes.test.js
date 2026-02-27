const request = require('supertest');
const app = require('../../app');

describe('Categories Routes', () => {
  it('GET /categories returns array of categories', async () => {
    const res = await request(app).get('/categories');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body.categories)).toBe(true);
  });
});
