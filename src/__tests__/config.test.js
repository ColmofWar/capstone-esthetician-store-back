const { getDatabaseUri, SECRET_KEY, PORT, BCRYPT_WORK_FACTOR } = require('../../config');

describe('Config module', () => {
  const OLD_ENV = process.env;

  beforeEach(() => {
    jest.resetModules();
    process.env = { ...OLD_ENV };
  });

  afterAll(() => {
    process.env = OLD_ENV;
  });

  test('getDatabaseUri returns TEST_DATABASE_URL when NODE_ENV is test', () => {
    process.env.NODE_ENV = 'test';
    process.env.TEST_DATABASE_URL = 'postgres://test_url';
    const { getDatabaseUri } = require('../../config');
    expect(getDatabaseUri()).toBe('postgres://test_url');
  });

  test('getDatabaseUri returns DATABASE_URL when NODE_ENV is not test', () => {
    process.env.NODE_ENV = 'development';
    process.env.DATABASE_URL = 'postgres://dev_url';
    const { getDatabaseUri } = require('../../config');
    expect(getDatabaseUri()).toBe('postgres://dev_url');
  });

  test('BCRYPT_WORK_FACTOR is 1 when NODE_ENV is test', () => {
    process.env.NODE_ENV = 'test';
    jest.resetModules();
    const { BCRYPT_WORK_FACTOR } = require('../../config');
    expect(BCRYPT_WORK_FACTOR).toBe(1);
  });

  test('BCRYPT_WORK_FACTOR is 12 when NODE_ENV is not test', () => {
    process.env.NODE_ENV = 'production';
    jest.resetModules();
    const { BCRYPT_WORK_FACTOR } = require('../../config');
    expect(BCRYPT_WORK_FACTOR).toBe(12);
  });

  test('SECRET_KEY and PORT are loaded from env', () => {
    process.env.SECRET_KEY = 'mysecret';
    process.env.PORT = '1234';
    jest.resetModules();
    const { SECRET_KEY, PORT } = require('../../config');
    expect(SECRET_KEY).toBe('mysecret');
    expect(PORT).toBe(1234);
  });
});
