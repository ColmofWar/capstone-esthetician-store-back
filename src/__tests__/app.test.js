const request = require('supertest');
const app = require('../../app');
const db = require('../../db');

describe('App Connectivity', () => {
  
  it('GET /health returns status ok', async () => {
    const res = await request(app).get('/health');
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({ status: 'ok' });
  });

  it('DB is connected for app test', async () => {
    try {
      await db.query('SELECT 1');
      console.log('[TEST] Connected to DB in app.test.js');
    } catch (err) {
      console.error('[TEST] DB connection failed in app.test.js:', err);
      throw err;
    }
  });
});
    beforeAll(async () => {
      try {
        await db.query('SELECT 1');
        console.log('[TEST] Connected to DB in app.test.js');
      } catch (err) {
        console.error('[TEST] DB connection failed in app.test.js:', err);
        throw err;
      }
    });
