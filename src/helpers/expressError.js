/** ExpressError extends normal JS error so we can
 *  add a status when we make an instance of it.
 *
 *  The error-handling middleware will return this.
 */

class ExpressError extends Error {
  constructor(message, status) {
    super(message);
    this.status = status;
  }

  // 404 Not Found
  static NotFound(message = "Not Found") {
    return new ExpressError(message, 404);
  }

  // 401 Unauthorized
  static Unauthorized(message = "Unauthorized") {
    return new ExpressError(message, 401);
  }

  // 400 Bad Request
  static BadRequest(message = "Bad Request") {
    return new ExpressError(message, 400);
  }

  // 403 Forbidden
  static Forbidden(message = "Forbidden") {
    return new ExpressError(message, 403);
  }
}

module.exports = ExpressError;
