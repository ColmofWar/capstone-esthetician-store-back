const request = require('supertest');
const app = require('../../app');

const db = require('../../db');
const User = require('../models/User');

describe('Address Routes', () => {
  let token;
  let testUser;
  beforeAll(async () => {
    // Create a test user
    testUser = await User.register({
      username: 'addressrouteuser',
      email: 'addressroute@example.com',
      password_hash: 'testpass123',
      phone: null
    });
      // Authenticate to get JWT token
      const res = await request(app)
        .post('/auth/token')
        .send({ username: 'addressrouteuser', password: 'testpass123' });
      token = res.body.token;
  });

  afterAll(async () => {
    await db.query('DELETE FROM addresses WHERE user_id = $1', [testUser.id]);
    await db.query('DELETE FROM users WHERE id = $1', [testUser.id]);
    await db.end();
  });

  it('PATCH /address/:username/:type creates new address if not found', async () => {
    const res = await request(app)
      .patch(`/address/${testUser.username}/home`)
        .set('Authorization', `Bearer ${token}`)
      .send({
        street: '1 Test St',
        city: 'Testville',
        state: 'TS',
        postal_code: '12345',
        country: 'Testland'
      });
    expect(res.statusCode).toBe(201);
    expect(res.body.address).toHaveProperty('id');
    expect(res.body.address.street).toBe('1 Test St');
  });

  it('PATCH /address/:username/:type updates existing address', async () => {
    const res = await request(app)
      .patch(`/address/${testUser.username}/home`)
        .set('Authorization', `Bearer ${token}`)
      .send({
        street: '2 Updated St'
      });
    expect(res.statusCode).toBe(200);
    expect(res.body.address.street).toBe('2 Updated St');
  });

  it('PATCH /address/:username/:type returns 404 for invalid user', async () => {
    const res = await request(app)
      .patch(`/address/notarealuser/home`)
        .set('Authorization', `Bearer ${token}`)
      .send({ street: 'Nope' });
    expect(res.statusCode).toBe(404);
  });

  it('GET /address returns 401/403 or array', async () => {
    const res = await request(app).get('/address');
    if (res.statusCode === 200) {
      expect(Array.isArray(res.body.addresses)).toBe(true);
    } else {
      expect([401, 403, 404]).toContain(res.statusCode);
    }
  });
});
