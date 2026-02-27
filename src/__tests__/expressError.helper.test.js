const ExpressError = require('../helpers/expressError');

describe('ExpressError helper', () => {
  it('creates an error with message and status', () => {
    const err = new ExpressError('Test error', 418);
    expect(err.message).toBe('Test error');
    expect(err.status).toBe(418);
  });

  it('default status is 500', () => {
    const err = new ExpressError('Default error');
    expect(err.status).toBe(500);
  });

  it('static Unauthorized returns 401 error', () => {
    const err = ExpressError.Unauthorized();
    expect(err.status).toBe(401);
  });

  it('static BadRequest returns 400 error', () => {
    const err = ExpressError.BadRequest('Bad!');
    expect(err.status).toBe(400);
    expect(err.message).toBe('Bad!');
  });
});
