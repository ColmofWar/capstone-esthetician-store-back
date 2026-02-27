const { createToken } = require('../helpers/tokens');
const jwt = require('jsonwebtoken');
const { SECRET_KEY } = require('../../config');

describe('tokens helper', () => {
  it('creates a valid JWT token with username and isAdmin', () => {
    const user = { username: 'tokentest', isAdmin: false };
    const token = createToken(user);
    const decoded = jwt.verify(token, SECRET_KEY);
    expect(decoded.username).toBe('tokentest');
    expect(decoded.isAdmin).toBe(false);
  });

  it('creates a token with isAdmin true', () => {
    const user = { username: 'adminuser', isAdmin: true };
    const token = createToken(user);
    const decoded = jwt.verify(token, SECRET_KEY);
    expect(decoded.username).toBe('adminuser');
    expect(decoded.isAdmin).toBe(true);
  });

  it('defaults isAdmin to false if not set', () => {
    const user = { username: 'plainuser', isAdmin: undefined };
    const token = createToken(user);
    const decoded = jwt.verify(token, SECRET_KEY);
    expect(decoded.isAdmin).toBe(false);
  });
});
