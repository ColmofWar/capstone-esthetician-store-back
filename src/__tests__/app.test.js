const request = require('supertest');
const app = require('../../app');
const db = require('../../db');

describe('App', () => {
  afterAll(async () => {
    await db.end();
  });

  it('GET /health returns status ok', async () => {
    const res = await request(app).get('/health');
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({ status: 'ok' });
  });

  it('GET /nonexistent returns 404', async () => {
    const res = await request(app).get('/nonexistent');
    expect(res.statusCode).toBe(404);
  });
});
