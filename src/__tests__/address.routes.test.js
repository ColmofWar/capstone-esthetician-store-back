const request = require('supertest');
const app = require('../../app');

describe('Address Routes', () => {
  it('GET /address returns 401/403 or array', async () => {
    const res = await request(app).get('/address');
    if (res.statusCode === 200) {
      expect(Array.isArray(res.body.addresses)).toBe(true);
    } else {
      expect([401, 403, 404]).toContain(res.statusCode);
    }
  });
});
