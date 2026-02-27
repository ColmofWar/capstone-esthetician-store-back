const jwt = require('jsonwebtoken');
const { SECRET_KEY } = require('../../config');
const {
  authenticateJWT,
  ensureLoggedIn,
  ensureAdmin,
  ensureCorrectUserOrAdmin
} = require('../middleware/authenticate');

describe('authenticate.js middleware', () => {
  let req, res, next, userToken, adminToken;

  beforeAll(() => {
    userToken = jwt.sign({ username: 'testuser', isAdmin: false }, SECRET_KEY);
    adminToken = jwt.sign({ username: 'adminuser', isAdmin: true }, SECRET_KEY);
  });

  beforeEach(() => {
    req = { headers: {} };
    res = { locals: {} };
    next = jest.fn();
  });

  describe('authenticateJWT', () => {
    it('sets res.locals.user if valid token', () => {
      req.headers.authorization = `Bearer ${userToken}`;
      authenticateJWT(req, res, next);
      expect(res.locals.user).toBeDefined();
      expect(res.locals.user.username).toBe('testuser');
      expect(next).toHaveBeenCalled();
    });

    it('calls next with no user if no token', () => {
      authenticateJWT(req, res, next);
      expect(res.locals.user).toBeUndefined();
      expect(next).toHaveBeenCalled();
    });

    it('calls next with no user if invalid token', () => {
      req.headers.authorization = 'Bearer invalidtoken';
      authenticateJWT(req, res, next);
      expect(res.locals.user).toBeUndefined();
      expect(next).toHaveBeenCalled();
    });
  });

  describe('ensureLoggedIn', () => {
    it('calls next if user is logged in', () => {
      res.locals.user = { username: 'testuser' };
      ensureLoggedIn(req, res, next);
      expect(next).toHaveBeenCalled();
    });
    it('throws Unauthorized if not logged in', () => {
      ensureLoggedIn(req, res, next);
      expect(next).toHaveBeenCalledWith(expect.any(Error));
    });
  });

  describe('ensureAdmin', () => {
    it('calls next if user is admin', () => {
      res.locals.user = { username: 'adminuser', isAdmin: true };
      ensureAdmin(req, res, next);
      expect(next).toHaveBeenCalled();
    });
    it('throws Unauthorized if not admin', () => {
      res.locals.user = { username: 'testuser', isAdmin: false };
      ensureAdmin(req, res, next);
      expect(next).toHaveBeenCalledWith(expect.any(Error));
    });
  });

  describe('ensureCorrectUserOrAdmin', () => {
    it('calls next if user is admin', () => {
      res.locals.user = { username: 'adminuser', isAdmin: true };
      req.params = { username: 'someoneelse' };
      ensureCorrectUserOrAdmin(req, res, next);
      expect(next).toHaveBeenCalled();
    });
    it('calls next if user matches param', () => {
      res.locals.user = { username: 'testuser', isAdmin: false };
      req.params = { username: 'testuser' };
      ensureCorrectUserOrAdmin(req, res, next);
      expect(next).toHaveBeenCalled();
    });
    it('throws Unauthorized if not correct user or admin', () => {
      res.locals.user = { username: 'testuser', isAdmin: false };
      req.params = { username: 'otheruser' };
      ensureCorrectUserOrAdmin(req, res, next);
      expect(next).toHaveBeenCalledWith(expect.any(Error));
    });
  });
});
