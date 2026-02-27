const { sqlForPartialUpdate, asyncGet, asyncCreate } = require('../helpers/sql');
const db = require('../../db');

describe('sql helper', () => {
  it('generates correct SQL for partial update', () => {
    const data = { firstName: 'Test', lastName: 'User' };
    const { setCols, values } = sqlForPartialUpdate(data);
    expect(setCols).toBe('"firstName" = $1, "lastName" = $2');
    expect(values).toEqual(['Test', 'User']);
  });

  it('throws error for empty data', () => {
    expect(() => sqlForPartialUpdate({})).toThrow('No data');
  });

  // --- asyncGet and asyncCreate tests ---
  let testUserId;
  const userData = {
    username: 'asyncsqluser',
    email: 'asyncsql@example.com',
    password_hash: 'hash'
  };

  afterAll(async () => {
    await db.query('DELETE FROM users WHERE id = $1', [testUserId]);
    await db.end();
  });

  it('asyncCreate inserts a row and returns it', async () => {
    const user = await asyncCreate(db, 'users', userData);
    expect(user).toHaveProperty('id');
    expect(user.username).toBe(userData.username);
    testUserId = user.id;
  });

  it('asyncGet retrieves a row by criteria', async () => {
    const users = await asyncGet(db, 'users', { username: userData.username });
    expect(Array.isArray(users)).toBe(true);
    expect(users.length).toBeGreaterThan(0);
    expect(users[0].username).toBe(userData.username);
  });

  it('asyncGet retrieves all rows if no criteria', async () => {
    const users = await asyncGet(db, 'users');
    expect(Array.isArray(users)).toBe(true);
    expect(users.find(u => u.username === userData.username)).toBeDefined();
  });

  it('asyncCreate throws error for empty data', async () => {
    await expect(asyncCreate(db, 'users', {})).rejects.toThrow('No data provided for creation');
  });
});
