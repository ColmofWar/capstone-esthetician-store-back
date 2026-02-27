const Address = require('../models/Address');
const db = require('../../db');

describe('Address Model', () => {
  let testAddressId;
  let testUserId;
  const addressData = {
    street: '123 Main St',
    city: 'Testville',
    state: 'TS',
    postal_code: '12345',
    country: 'Testland',
    address_type: 'home'
  };

  beforeAll(async () => {
    // Create a user for the address
    const userRes = await db.query(`INSERT INTO users (username, email, password_hash) VALUES ('addressmodeluser', 'addressmodel@example.com', 'hash') RETURNING id`);
    testUserId = userRes.rows[0].id;
    // Insert address for that user
    const addrRes = await db.query(
      `INSERT INTO addresses (user_id, street, city, state, postal_code, country, address_type)
       VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING id`,
      [testUserId, addressData.street, addressData.city, addressData.state, addressData.postal_code, addressData.country, addressData.address_type]
    );
    testAddressId = addrRes.rows[0].id;
  });

  afterAll(async () => {
    await db.query('DELETE FROM addresses WHERE id = $1', [testAddressId]);
    await db.query('DELETE FROM users WHERE id = $1', [testUserId]);
    await db.end();
  });

  it('can get address by criteria', async () => {
    const addresses = await Address.get({ street: addressData.street });
    expect(Array.isArray(addresses)).toBe(true);
    expect(addresses.length).toBeGreaterThan(0);
    expect(addresses[0].street).toBe(addressData.street);
    expect(addresses[0].user_id).toBe(testUserId);
  });

  it('can create a new address', async () => {
    const newAddress = {
      user_id: testUserId,
      street: '456 Side St',
      city: 'Testville',
      state: 'TS',
      postal_code: '54321',
      country: 'Testland',
      address_type: 'home'
    };
    const result = await Address.create(newAddress);
    expect(result).toHaveProperty('id');
    expect(result.street).toBe('456 Side St');
    // Clean up
    await db.query('DELETE FROM addresses WHERE id = $1', [result.id]);
  });

  it('returns empty array for non-existent address', async () => {
    const addresses = await Address.get({ street: 'No Such St' });
    expect(Array.isArray(addresses)).toBe(true);
    expect(addresses.length).toBe(0);
  });
});
