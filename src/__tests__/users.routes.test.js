const request = require('supertest');
const app = require('../../app');
const db = require('../../db');

describe('Users Routes', () => {
  const testUser = {
    username: 'testrouteuser',
    email: 'testroute@example.com',
    password: 'testpass123'
  };
  let token;

  beforeAll(async () => {
    // Clean up if user exists
    await db.query('DELETE FROM users WHERE username = $1', [testUser.username]);
  });

  afterAll(async () => {
    await db.query('DELETE FROM users WHERE username = $1', [testUser.username]);
    await db.end();
  });

  it('POST /users registers a new user and returns token', async () => {
    const res = await request(app)
      .post('/users')
      .send(testUser);
    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('user');
    expect(res.body.user.username).toBe(testUser.username);
    expect(res.body).toHaveProperty('token');
    token = res.body.token;
  });

  it('POST /users with empty phone stores null', async () => {
    const userWithEmptyPhone = {
      username: 'testemptyphone',
      email: 'emptyphone@example.com',
      password: 'testpass123',
      phone: ''
    };
    // Clean up if exists
    await db.query('DELETE FROM users WHERE username = $1', [userWithEmptyPhone.username]);
    const res = await request(app)
      .post('/users')
      .send(userWithEmptyPhone);
    expect(res.statusCode).toBe(201);
    expect(res.body.user.username).toBe(userWithEmptyPhone.username);
    // Check DB for null phone
    const dbRes = await db.query('SELECT phone FROM users WHERE username = $1', [userWithEmptyPhone.username]);
    expect(dbRes.rows[0].phone).toBeNull();
    // Clean up
    await db.query('DELETE FROM users WHERE username = $1', [userWithEmptyPhone.username]);
  });

  it('GET /users (admin required) returns 401/403 or users array', async () => {
    const res = await request(app)
      .get('/users')
      .set('Authorization', `Bearer ${token}`);
    // If protected, expect 401/403, else expect array
    if (res.statusCode === 200) {
      expect(Array.isArray(res.body.users)).toBe(true);
    } else {
      expect([401, 403]).toContain(res.statusCode);
    }
  });

  it('GET /users/:username returns user or 401/403', async () => {
    const res = await request(app)
      .get(`/users/${testUser.username}`)
      .set('Authorization', `Bearer ${token}`);
    if (res.statusCode === 200) {
      expect(res.body).toHaveProperty('user');
      expect(res.body.user.username).toBe(testUser.username);
    } else {
      expect([401, 403]).toContain(res.statusCode);
    }
  });

  it('PATCH /users/:username updates user or returns 401/403', async () => {
    const res = await request(app)
      .patch(`/users/${testUser.username}`)
      .set('Authorization', `Bearer ${token}`)
      .send({ email: 'updated@example.com' });
    if (res.statusCode === 200) {
      expect(res.body.user.email).toBe('updated@example.com');
    } else {
      expect([401, 403]).toContain(res.statusCode);
    }
  });

  it('PATCH /users/:username with empty phone stores null', async () => {
    // Register a user for this test
    const userWithEmptyPhone = {
      username: 'patchphoneuser',
      email: 'patchphone@example.com',
      password: 'testpass123',
      phone: '1234567890'
    };
    await db.query('DELETE FROM users WHERE username = $1', [userWithEmptyPhone.username]);
    await request(app).post('/users').send(userWithEmptyPhone);
    // Authenticate
    const loginRes = await request(app)
      .post('/auth/token')
      .send({ username: userWithEmptyPhone.username, password: userWithEmptyPhone.password });
    const patchToken = loginRes.body.token;
    // Patch phone to empty string
    const res = await request(app)
      .patch(`/users/${userWithEmptyPhone.username}`)
      .set('Authorization', `Bearer ${patchToken}`)
      .send({ phone: '' });
    if (res.statusCode === 200) {
      expect(res.body.user.phone).toBeNull();
      // Check DB for null phone
      const dbRes = await db.query('SELECT phone FROM users WHERE username = $1', [userWithEmptyPhone.username]);
      expect(dbRes.rows[0].phone).toBeNull();
    } else {
      expect([401, 403]).toContain(res.statusCode);
    }
    // Clean up
    await db.query('DELETE FROM users WHERE username = $1', [userWithEmptyPhone.username]);
  });

  it('DELETE /users/:username deletes user or returns 401/403', async () => {
    const res = await request(app)
      .delete(`/users/${testUser.username}`)
      .set('Authorization', `Bearer ${token}`);
    if (res.statusCode === 200) {
      expect(res.body).toHaveProperty('deleted', testUser.username);
    } else {
      expect([401, 403]).toContain(res.statusCode);
    }
  });
});
